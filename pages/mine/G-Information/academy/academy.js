// pages/mine/G-Information/academy/academy.js
var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取学院
  onLoad() {
    var that = this
    var data= { }
    util.request('/user/academy', 'GET', data, function (res) {
      console.log('成功')
      console.log(res.data)
      let status = res.code;
      if (status === 200) {
        var academy = res.data;
        that.setData({
          academy: academy,
        })
      }
    })
  },


  goToFirst(e) {
    // 当前选择的学院对应的id
    var id = e.currentTarget.dataset.id;
    // 当前选择的学院
    var content = e.currentTarget.dataset.content;

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页
    let GG = 'getUser.academyId'
    let EE = 'getUser.academy';
    prevPage.setData({
      [EE]: content,
      [GG]: id,
    })


    wx.navigateBack({
      //返回上一级
      delta: 1,
    })

  },
 
})