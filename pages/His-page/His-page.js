const util = require("../../utils/util")
const app = getApp()
import { timeHandle } from '../../utils/timehandle'
const onfire = require("../../onfire.js")
Page({
  data: {  
    page:0
  },
 // 动态修改页面标题setNavigationBarTitle
 onShow(){
  //  var username=this.data.username
  //  wx.setNavigationBarTitle({
  //    title: username
  //  })
 }, 
  onLoad: function (options) {
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
    console.log(options)
    this.data.userId = options.userId
    var userId = this.data.userId
    var that = this
    var data = {
     targetUserId: userId
    }
    util.request('/user/getUser', 'GET', data, function (res) {
      var getUser = res.data
      that.setData({
        getUser: getUser,
        gender: getUser.gender
      })
    })
    // 获取粉丝数
    util.request('/user/myFansCount', 'GET', { followId:userId}, function (res) {
      that.setData({
        myFansCount: res.data,
      })
    })
    // 获取关注数
    util.request('/user/myFollowCount', 'GET', { userId: userId }, function (res) {
      that.setData({
        myFollowCount: res.data,
      })
    })
    // 获取发帖数
    util.request('/circle/myListCount', 'GET', { targetUserId: userId }, function (res) {
      that.setData({
        myListCount: res.data,
      })
    })
    this.getlist()
  },

  getlist(){
    var that = this;
    var userId = this.data.userId
    var page = this.data.page;
    var data = {
      targetUserId: userId,//查看对象
      currPage: page*10,
      pageSize: 10,
    }
    util.request('/circle/targetUserList', 'GET', data, function (res) {
      console.log(res)
      // wx.hideLoading();
      console.log(res)
      var temcircle = res.data;
      that.setData({ ["circleList[" + page + "]"]: temcircle });
    })  
  },
  // 加载下一页数据
  loadMoreData: function () {
    this.data.page = this.data.page+1
    this.getlist()
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
  unCollect(e){
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
 tofollow(){
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
 unFollow(e){
   var that =this;
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

})