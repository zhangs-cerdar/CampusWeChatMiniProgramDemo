// pages/logon/year/year.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goToFirst1() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      nianfen: '2020年'
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
      nianfen: '2019年'
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },
  goToFirst3() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      nianfen: '2018年'
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },
  goToFirst4() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      nianfen: '2017年'
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },
  goToFirst5() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      nianfen: '2016年'
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },
  goToFirst6() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      nianfen: '2015年'
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },
  goToFirst7() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      nianfen: '2014年'
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },
})