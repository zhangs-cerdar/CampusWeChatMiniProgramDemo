// pages/mine/I-Collection/I-Collection.js
const app = getApp();
var util = require('../../../utils/util.js')
Page({
  data: {
    circleList: [],
    page: 0
  },
  onLoad: function (options) {
    var that = this;
    // 获取手机高度
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });
  
    this.collectCircleRequest()
 
  },
  collectCircleRequest: function () {
    var that = this;
    var page = that.data.page; // 获取当前页码
    var data = {
      currPage: this.data.page * 10,
      pageSize: 10,
      collected:true
    } 
    util.request('/circle/list', 'GET', data, function (res) {
      console.log(res)
      var temcircle = res.data;
      that.setData({ ["circleList[" + page + "]"]: temcircle, });
      console.log(that.data.circleList)
      wx.hideLoading();
      setTimeout(function () { that.setData({ showloading: false }) }, 300) //等待加载动画延时消失 
      that.data.loadMore = true
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
      url: '/pages/index/circledetail/circledetail?data=' + JSON.stringify(json)
    })
  },
  //跳转到动态发布页
  add: function () {
    wx.navigateTo({
      url: '/pages/middle/middle',
    })
  },
  ToPersonaldetail(e) {
    let circleList = this.data.circleList;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let circle1 = circleList[index1];
    let circle2 = circle1[index2];
    if (circle2.anonymous == false) {
      var that = this
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
  //分页加载更多
  loadMore: function () {
    console.log(this.data.loadMore)
    this.data.page = this.data.page + 1;
    this.data.loadMore = false
   this.collectCircleRequest() 
  },        
})