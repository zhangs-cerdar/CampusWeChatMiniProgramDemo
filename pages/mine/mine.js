// pages/mine/mine.js
const app = getApp()
const util = require("../../utils/util")
Page({
  
  data: {
    // 性别
    gender:0,
    imgUrl:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10002.jpg',
    // 功能
     imgUrls: [
       {
         imgurl: "/img/shizhong.png",
         name: '时钟',
         id: 0

       },
      {
         imgurl: "/img/daka.png",
         name:'打卡',
         id: 1

      },
      {
        imgurl: "/img/chengji.png",
        name: '成绩',
        id: 2
      },
      {
        imgurl: "/img/kechengbiao.png",
        name: '课程表',
        id: 3
      },
      {
        imgurl: "/img/xinshengbaodao.png",
        name: '新生报到',
        id: 4
      },
      {
        imgurl: "/img/ditu.png",
        name: '校内地图',
        id: 5
      },
      {
        imgurl: "/img/ip.png",
        name: '宿舍ip查询',
        id: 6
      },
      {
        imgurl: "/img/zhengjian.png",
        name: '证件存档',
        id: 7
      },
       {
         imgurl: "/img/wangzhi.png",
         name: '学校官方网址',
         id: 8
       },
       {
         imgurl: "/img/xiaoli.png",
         name: '校历',
         id: 9
       },
    ],
    findUser: [],
    id:1,
  },
  gongneng(e) {
    console.log(e.currentTarget.dataset.id);
    console.log(e.currentTarget.dataset.name);
    if (e.currentTarget.dataset.id == 0) {

      console.log(e.currentTarget.dataset.id);
      console.log(e.currentTarget.dataset.name);
      // 
      wx.navigateTo({
        url: 'D-gongneng/shizhong',
      })

      }
     else{
       wx.showToast({
         title: '内测中未开放',
         icon:'none',
       })

     } 
    
  },

  // wx.request获取用户信息
  onShow() {
    var that = this;
    this.setData({
      loading: true,
      a:2
    })
    var that = this;
    that.setData({
      username: app.globalData.username,
      avatar:app.globalData.avatar,
      gender:app.globalData.gender
    })
    // 获取粉丝数
    var data = {
      followId: 1
    }
    util.request('/user/myFansCount', 'GET', data, function (res) {
       console.log(res)
        var myFansCount = res.data;
        that.setData({
        myFansCount: myFansCount,
       })
      })
    // 获取关注数
    data: { } 
    util.request('/user/myFollowCount', 'GET', data, function (res) {
        console.log(res)
        var myFollowCount = res.data;
        that.setData({
          myFollowCount: myFollowCount,
          a:1
        })
      })
    // 获取发帖数
    data: {}
    util.request('/circle/myListCount', 'GET', data, function (res) {
        console.log(res.data)
        var myListCount = res.data;
        that.setData({
          myListCount: myListCount,
        })
    })
  },
// 发帖
  tiaozhuan1: function (e) {
    var id =1
    wx.navigateTo({
      url: 'A-post/A-post?id=' + id ,
    })
  },
// 关注
  tiaozhuan2: function () {
    wx.navigateTo({
      url: 'B-Attention/B-Attention',
    })
  },
// 粉丝
  tiaozhuan3: function () {
    wx.navigateTo({
      url: 'C-Fans/C-Fans',
    })
  },
//个人信息
  tiaozhuan7: function () {
    wx.navigateTo({
      url: 'G-Information/G-Information',
    })
  },
// 实名认证
  tiaozhuan8: function () {
    wx.navigateTo({
      url: '../logon/landing/landing',
    })
  },
// 我的收藏
  tiaozhuan9: function () {
    wx.navigateTo({
      url: 'I-Collection/I-Collection',
    })
  },
  //关于我们
  tiaozhuan10: function () {
    wx.navigateTo({
      url: 'J-Set/J-Set',
    })
  },
})