// pages/mine/G-Information/education/education.js
var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  xueli:[{content:'本科'},{content:'专科'}]
  },
  goToFirst(e) {
    // 当前选择的学院对应的id
    var id = e.currentTarget.dataset.id;
    // 当前选择的学院
    var content = e.currentTarget.dataset.content;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页
   
    let EE = 'getUser.education';
    prevPage.setData({
      [EE]: content,
     })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })

  },
  
})