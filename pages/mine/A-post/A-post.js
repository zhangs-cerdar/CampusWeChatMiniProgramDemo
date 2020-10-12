const app = getApp()
const util = require("../../../utils/util")
Page({
  data: {
    page: 0,
    circleList:[]

  },
  // 动态修改页面标题setNavigationBarTitle
onShow() {
    var id = this.data.id
  // 实时更新用户头像性别名字之类信息
    //  用户接口获取用户信息
    var that =this
  that.setData({
    username:app.globalData.username,
    avatar: app.globalData.avatar,
    gender: app.globalData.gender
  })
   // 获取粉丝数
  var data = { }
  util.request('/user/myFansCount', 'GET', data, function (res) {
    console.log(res)
    let status = res.code;
    if (status === 200) {
      var myFansCount = res.data;
      that.setData({
        myFansCount: myFansCount,
      })
    }
  })
  util.request('/user/myFollowCount', 'GET', data, function (res) {
    console.log(res.data)
    let status = res.code;
    if (status === 200) {
      var myFollowCount = res.data;
      that.setData({
        myFollowCount: myFollowCount,
        a: 1
      })
    }
  })
  // 获取发帖数
  util.request('/circle/myListCount', 'GET', data, function (res) {
    console.log(res.data)
    let status = res.code;
    if (status === 200) {
      var myListCount = res.data;
      that.setData({
        myListCount: myListCount,
      })
    }
  })
},
  //动态接口请求获取朋友圈
onLoad: function (options) {
    // 获取手机高度
    wx.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        this.setData({
          winHeight: calc
        });
      }
    });
    this.getmylist()
  },
    // 接收上页传来的Id，保存
  getmylist(){
    var id = 1
    this.setData({ id: 1})
    var that = this
    var page = that.data.page // 获取当前页码
    // mylist接口
     var data = {
      currPage: this.data.page * 10,
      pageSize: 10
     }
    util.request('/circle/targetUserList', 'GET', data, function (res) {
        console.log(res)
        wx.hideLoading();
        var temcircle = res.data;
        that.setData({ ["circleList[" + page + "]"]: temcircle });
    })
 },
  // 加载下一页数据
  loadMoreData: function () {
    var id = this.data.id
    this.data.page = this.data.page + 1;
    this.getmylist()
  },
  // 删除动态
  //删除动态：DELETE /circle/delete/ 254
  delete:function (e) {
  let circleList = this.data.circleList;
  let index1 = e.currentTarget.dataset.index1;
  let index2 = e.currentTarget.dataset.index2;
  let circle1 = circleList[index1];
  let circle2 = circle1[index2];
  let that = this; 
    wx.showModal({
      // title: '提示',
      content: '是否删除该条帖子',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          util.request('/circle/delete?id=' + circle2.id, "DELETE", {}, function (res) {
              console.log(res.data)
              let key = 'circleList['+ index1 +'][' + index2 + '].deleted';
              that.setData({
                [key]: true
              });
            })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  touchStart(e) {
    this.touchStartTime = e.timeStamp;
  },
  touchEnd(e) {
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
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    let that = this;
    var data = { targetId: circle2.id }
    var url = '/circle/collect?targetId=' + circle2.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res)
      let key = 'circleList[' + index1 + '][' + index2 + '].collected';
      that.setData({ [key]: true });
    });
  },
  unCollect(e) {
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    let that = this;
    var data = { targetId: circle2.id }
    var url = '/circle/unCollect?targetId=' + circle2.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res)
      let key = 'circleList[' + index1 + '][' + index2 + '].collected';
      that.setData({ [key]: false });
    });
  },
  tofollow() {
    var that = this;
    var userId = this.data.userId
    var url = "/user/follow?followId=" + userId
    util.request(url, "POST", {}, function (res) {
      console.log(res)
      let key1 = 'getUser.followed';
      that.setData({
        [key1]: true
      })
    })
  },
  unFollow(e) {
    var that = this;
    var userId = this.data.userId
    var url = "/user/unFollow?followId=" + userId
    util.request(url, "POST", {}, function (res) {
      console.log(res)
      let key1 = 'getUser.followed';
      that.setData({
        [key1]: false
      })
    })
  },
  // 跳转至动态详情页
  gotodetail: function (e) {
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    var json = {}
    json.curcircle = circle2
    json.index1 = index1
    json.index2 = index2
    wx.navigateTo({
      url: '/pages/index/circledetail/circledetail?data=' + JSON.stringify(json)
    })
  },
  //图片预览
  view: function (e) {
    // console.log(e)
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    let that = this;
    var arr = [];
    var src = e.currentTarget.dataset.url;//获取data-src
    for (var i = 0; i < circle2.attachments.length; i++) {
      arr.push(circle2.attachments[i].url)
    }
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },

  // 编辑个人资料
  Tomine() {
    console.log("aa")
    wx.navigateTo({
      url: '../G-Information/G-Information',
    })

  },

})


