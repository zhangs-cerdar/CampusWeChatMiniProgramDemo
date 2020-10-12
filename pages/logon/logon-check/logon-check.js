// pages/logon/logon-check/logon-check.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    yuanxi: '选择学院',

    nianfen: '入学年份',
    xueli: '本科/专科',

    // disabled: true,
    // buttonType: 'default',
   
  },
     
  //  跳页
  select: function () {
    wx.navigateTo({
      url: '../college/college'
    })
  },
  select02: function () {
    wx.navigateTo({
      url: '../year/year'
    })
  },
  select03: function () {
    wx.navigateTo({
      url: '../education/education'
    })
  },



  tiaozhuan: function () {
    wx.navigateTo({
      url: '../avatar/avatar',
    })
  }
})