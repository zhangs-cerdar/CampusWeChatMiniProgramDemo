// pages/mine/G-Information/enrolmentDate/enrolmentDate.js
var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enrolmentDate: [{ content: '2020年' }, { content: '2019年' }, { content: '2018年' }, { content: '2017年' }, { content: '2016年' }, { content: '2015年' }, { content: '2014年' }, { content: '2013年' }, { content: '2012年' }, { content: '2011年' },]
  },

  goToFirst(e) {
   
    var content = e.currentTarget.dataset.content;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页

    let EE = 'getUser.enrolmentDate';
    prevPage.setData({
      [EE]: content,
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })

  },



})