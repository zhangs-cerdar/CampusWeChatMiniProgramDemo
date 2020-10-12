const app = getApp()
const util = require("../../utils/util")
import { timeHandle } from '../../utils/timehandle';
const onfire = require("../../onfire.js")
Page({
  data: {
    rankTitle: ['关注', '推荐', '开学季', '表白墙', '二手置换', '考研', '社团招新', '学生会招新', '毕业季', '留学'],
    currentTab: 1,
    scrollLeft: 0,
    page: 0,
    showloading: true,
  },
  onLoad: function (options) {
    var that = this;
    setTimeout(function () {
      // 高度自适应
      if (options.topicid) {
        that.setData({ currentTab: options.topicid - 1 })
        that.circleRequest()
      } else {
        that.hotcircleRequest()
      }
      that.data.page = 0
      util.request('/user/getUser', 'GET', {}, function (res) {
        console.log(res)
        app.globalData.username = res.data.username;
        app.globalData.avatar = res.data.avatar;
        app.globalData.gender = res.data.gender;
      })
    }, 100);






    wx.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 80;
        this.setData({
          winHeight: calc
        });
      }
    });
  },

  onShow(options) {
    var that = this;
    that.setData({
      myavatar: app.globalData.avatar
    })
  },
  // 滑动切换
  swiperTab: function (e) {
    this.setData({
      showloading: true
    })
    if (e.detail.source == 'touch') {
      this.setData({
        currentTab: e.detail.current,
        scrollLeft: (e.detail.current) * 50,
      })
      this.data.circleList = []  //每次请求新swiper内容时  清空circleList
      this.data.page = 0
      console.log(this.data.currentTab)
      if (this.data.currentTab == 0) {
        this.followListRequest()
      }      //关注页
      else if (this.data.currentTab == 1) {
        this.hotcircleRequest()        //推荐页
      }
      else { this.circleRequest() }
    }  //话题页

  },
  //   点击切换
  swichNav: function (e) {
    this.setData({
      showloading: true
    })
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
    this.data.circleList = []  //每次请求新swiper内容时  清空circleList
    this.data.page = 0
    console.log(this.data.currentTab)
    if (this.data.currentTab == 0) {
      this.followListRequest()
    }      //关注页
    else if (this.data.currentTab == 1) {
      this.hotcircleRequest()        //推荐页
    }
    else { this.circleRequest() }   //话题页
  },
  //话题动态请求
  circleRequest: function () {
    var that = this;
    var page = that.data.page; // 获取当前页码
    var data = {
      currPage: this.data.page * 10,
      pageSize: 10,
      topicId: that.data.currentTab+1
    }   //定义data  
    util.request('/circle/list', 'GET', data, function (res) {
      console.log(res)
      var temcircle = res.data;
      that.setData({ ["circleList[" + page + "]"]: temcircle, });
      console.log(that.data.circleList)
      wx.hideLoading();
      setTimeout(function () { that.setData({ showloading: false }) }, 900) //等待加载动画延时消失 
      that.data.loadMore = true
    })
  },
  //推荐内容请求
  hotcircleRequest: function () {
    var that = this;
    var temcircle = [];
    var page = that.data.page; // 获取当前页码
    var data = {
      currPage: this.data.page * 10,
      pageSize: 10,
      hot: 1
    }
    util.request('/circle/list', 'GET', data, function (res) {
      console.log(res)
      var temcircle = res.data;
      that.setData({ ["circleList[" + page + "]"]: temcircle, });
      console.log(that.data.circleList)
      wx.hideLoading();
      setTimeout(function () {
        that.setData({ showloading: false })
        console.log(that.data.showloading)
      }, 900) //等待加载动画延时消失 
      that.data.loadMore = true
    })
  },
  //关注内容请求
  followListRequest() {
    console.log("关注")
    var that = this;
    var data = {
      currPage: this.data.page * 10,
      pageSize: 10
    }
    var page = that.data.page; // 获取当前页码
    util.request('/circle/myFollowList', 'GET', data, function (res) {
      console.log(res)
      var temcircle = res.data;
      that.setData({ ["circleList[" + page + "]"]: temcircle, });
      console.log(that.data.circleList)
      wx.hideLoading();
      setTimeout(function () {
        that.setData({ showloading: false })
        console.log(that.data.showloading)
      }, 900) //等待加载动画延时消失 
      that.data.loadMore = true
    })
  },
  //分页加载更多
  loadMore: function () {
    console.log(this.data.loadMore)
    this.data.page = this.data.page + 1;
    this.data.loadMore = false
    if (this.data.currentTab == 0) {
      this.followListRequest()       //在关注页
    }
    else if (this.data.currentTab == 1) {
      this.hotcircleRequest()        //在推荐页
    }
    else { this.circleRequest() }    //在其他页
    console.log(this.data.page)
  },
  // 举报按钮
  jubao: function (e) {
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    let that = this;
    //动态是匿名发送 只显示举报选项
    if (circle2.anonymous == true) {
      wx.showActionSheet({
        itemList: ['我要举报'],
        success(res) {
          if (res.tapIndex == 0) {
            console.log('举报')
            wx.navigateTo({
              url: 'report/report?circleid=' + circle2.id,
            })
          }
        }
      })
    }
    // 不匿名
    else {
      // 关注了
      if (circle2.followed == true) {
        wx.showActionSheet({
          itemList: ['取消关注', '我要举报'],
          success(res) {
            if (res.tapIndex == 0) {
              wx.showModal({
                title: '取消关注',
                content: '重新加载页面后，你可能再也和无法和他（她）相遇！',
                success(res) {
                  if (res.confirm) {  //确认屏蔽后调取接口，需要这个人的id
                    console.log('取消关注')
                    //  去注接口
                    // var data = { followId: circle2.userId}
                    var url = "/user/unFollow?followId=" + circle2.userId
                    util.request(url, "POST", {}, function (res) {
                      console.log(res)
                      let key1 = 'circleList[' + index1 + '][' + index2 + '].followed';
                      that.setData({
                        [key1]: false
                      })
                    })
                  }
                }
              })
            }
            if (res.tapIndex == 1) {
              //用户选择举报  跳转到举报页并把出传递当前动态的circleId
              wx.navigateTo({
                url: 'report/report?circleid=' + circle2.id,
              })
            }
          },
        })


      }
      // 未关注的
      else {
        wx.showActionSheet({
          itemList: ['关注', '我要举报'],
          success(res) {
            if (res.tapIndex == 0) {
              
                
                
                  //  关注接口
                  var url = "/user/follow?followId=" + circle2.userId
                  util.request(url, "POST", {}, function (res) {
                    console.log(res)
                    let key1 = 'circleList[' + index1 + '][' + index2 + '].followed';
                    that.setData({
                      [key1]: true
                    })
                  })
               
              
            }
            if (res.tapIndex == 1) {       //用户选择举报  跳转到举报页并把出传递当前动态的circleId
              wx.navigateTo({
                url: 'report/report?circleid=' + circle2.id,
              })
            }
          },
        })
      }
    }
  },
  touchStart(e) {
    this.touchStartTime = e.timeStamp;
    console.log(1)
  },
  touchEnd(e) {
    console.log(2)
    this.touchEndTime = e.timeStamp;
  },
  toPraise: function (e) {
    let that = this;
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
        var currentTime = e.timeStamp;
      var lastTapTime = that.lastTapTime;
      // 更新最后一次点击时间
      that.lastTapTime = currentTime;
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      var aa = currentTime - lastTapTime
      if (currentTime - lastTapTime > 1000 || lastTapTime == undefined) {
        console.log(3)
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    let key1 = 'circleList[' + index1 + '][' + index2 + '].liked';
    let key2 = 'circleList[' + index1 + '][' + index2 + '].likeCount';
    that.setData({
      [key1]: true,
      [key2]: circle2.likeCount + 1
    })
    //点赞接口
    //  var data = { targetId: circle2.id }
    var url = '/circle/like?targetId=' + circle2.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res)
    })
    }
   }
  },
  unPraise(e) {
    let that = this;
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp;
      var lastTapTime = that.lastTapTime;
      // 更新最后一次点击时间
      that.lastTapTime = currentTime;
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime > 1000 || lastTapTime == undefined) {
      let circleList = this.data.circleList;
      let index1 = e.currentTarget.dataset.index1;
      let index2 = e.currentTarget.dataset.index2;
      let circle1 = circleList[index1];
      let circle2 = circle1[index2];
      let key1 = 'circleList[' + index1 + '][' + index2 + '].liked';
      let key2 = 'circleList[' + index1 + '][' + index2 + '].likeCount';
      that.setData({
        [key1]: false,
        [key2]: circle2.likeCount - 1
      })
      //  var data = { targetId: circle2.id }
      var url = '/circle/unLike?targetId=' + circle2.id
      util.request(url, 'POST', {}, function (res) {
        console.log(res)
      })
     }
    }
  },

  //收藏事件
  toCollect: function (e) {
    let that = this;
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    let key = 'circleList[' + index1 + '][' + index2 + '].collected';
    that.setData({ [key]: true });
   
    var url = '/circle/collect?targetId=' + circle2.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res)
    });
  },
  unCollect(e) {
    let that = this;
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    let key = 'circleList[' + index1 + '][' + index2 + '].collected';
    that.setData({ [key]: false });
    var url = '/circle/unCollect?targetId=' + circle2.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res)
    });
  },
  // onPullDownRefresh: function () {
  //   wx.showModal({
  //     title: 'Jack Sparrow',
  //     content: '刷新成功',
  //     success(res) {
  //       if (res.confirm) {
  //         wx.stopPullDownRefresh;
  //       } else if (res.cancel) {
  //         wx.stopPullDownRefresh;
  //       }
  //     }
  //   })
  //   this.circleRequest()
  // },
  //图片预览
  view: function (e) {
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    var arr = [];
    var src = e.currentTarget.dataset.url;//获取data-src
    for (var i = 0; i < circle2.attachments.length; i++) {
      arr.push(circle2.attachments[i].url)
    }
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  gotodetail: function (e) {
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    console.log(circle2)
    var json = {}
    json.curcircle = circle2
    json.index1 = index1
    json.index2 = index2
    wx.navigateTo({
      url: 'circledetail/circledetail?data=' + JSON.stringify(json)
    })
  },
  //跳转到动态发布页
  //跳转到动态发布页
  add: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/middle/middle',
      })
    }, 200);
  },
  ToPersonaldetail(e) {
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    if (circle2.anonymous == false) {
      var that = this
      // 监听发帖页的点赞事件
      // let key1 = 'circleList['+ index1 +'][' + index2 + '].liked';
      // let key2 = 'circleList['+ index1 +'][' + index2 + '].likeCount';
      //   onfire.on("praise", (a,b) => {
      //   that.setData({
      //     [key1]: a,
      //     [key2]: b
      //   })
      // console.log("iindex绑定点赞事件")
      //  })

      // 监听发帖页的评论事件
      // let key3 = 'circleList['+ index1 +'][' + index2 + '].commentCount';
      // // let key2 = 'circleList['+ index1 +'][' + index2 + '].likeCount';
      //   onfire.on("comment", c => {
      //   that.setData({
      //     [key3]:c
      //   })
      //   console.log("iindex绑定评论事件")
      //  })
      // 监听发帖页的收藏事件
      //  let key5= 'circleList['+ index1 +'][' + index2 + '].collected';
      // // let key2 = 'circleList['+ index1 +'][' + index2 + '].likeCount';
      //   onfire.on("collect", e => {
      //   that.setData({
      //     [key5]:e
      //   })
      //   console.log("index绑定收藏事件")
      //  })

      if (circle2.myself) {
        wx.navigateTo({
          url: '/pages/mine/A-post/A-post'
        })
      } else {
        wx.navigateTo({
          url: '/pages/His-page/His-page?userId=' + circle2.userId
        })
        console.log(circle2.userId)
      }
    }
  },
  labelTo(e){
    let topic = e.currentTarget.dataset.topic;
    console.log(topic)
    this.setData({
      current : topic-1,
      currentTab:topic-1,
      scrollLeft: topic * 30,
    })
    this.data.page == 0
    this.circleRequest()
  }

})
