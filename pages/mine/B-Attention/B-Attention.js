// pages/mine/B-Attention/B-Attention.js
const app = getApp();
const util = require("../../../utils/util")
Page({

  data: {
  },
  // 连接数据库获取关注列表
  onLoad() {
    var that = this
    var data={}
    util.request('/user/myFollow', 'GET', data, function (res) {
        console.log(res)
        var myFollow = res.data;
           that.setData({
            myFollow: myFollow,
         })
       })
  },
// 关注与取消关注
  follow(e) {
   var that =this
   var myFollow = this.data.myFollow;
   var index = e.currentTarget.dataset.index;
    var curmyFollow = myFollow[index]
    var url = "/user/follow?followId=" + curmyFollow.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res.data)
      let key = 'myFollow[' + index + '].followed';
      that.setData({ [key]: true }) 
   })
  },
  unFollow(e) {
    var that = this
    var myFollow = this.data.myFollow;
    var index = e.currentTarget.dataset.index;
    var curmyFollow = myFollow[index]
    var url = "/user/unFollow?followId=" + curmyFollow.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res.data)
      let key = 'myFollow[' + index + '].followed';
      that.setData({ [key]: false})
    })
  },
  tiaozhuan: function (e) {
    var userid = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/pages/His-page/His-page?userId=' + userid
    })
  },
})