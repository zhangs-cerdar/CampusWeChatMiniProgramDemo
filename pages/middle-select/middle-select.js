// pages/middle-select/middle-select.js
Page({
  data: {

  },
  //返回上一页 ，将数据保存在上一页；
  onLoad() {
    console.log(" select onLoad")
  },
  onShow() {
    console.log("select onShow")
  },
  goToFirst1() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      secondData: '#开学季#',
      topic: 3
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
      secondData: '#表白墙#',
      topic: 4
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
      secondData: '#二手市场#',
      topic: 5
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
      secondData: '#考研狗#',
      topic: 6
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
      secondData: '#社团招新#',
      topic: 7
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
      secondData: '#学生会招新#',
      topic: 8
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
      secondData: '#毕业季#',
      topic: 9
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },

  goToFirst8() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    prevPage.setData({
      secondData: '#留学#',
      topic: 10
    })
    wx.navigateBack({
      //返回上一级
      delta: 1,
    })
  },
});
