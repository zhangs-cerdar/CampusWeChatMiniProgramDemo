// pages/logon/education/education.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  goToFirst1() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      xueli: '本科'
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },


  goToFirst2() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      xueli: '专科'
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },
})