// pages/mine/G-Information/major/major.js
var util = require('../../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取专业
  onLoad(options) {
    // 接受上页的id
    var that = this
    var id = options.id
    console.log('用户id' + id)
    that.setData({
      id: options.id
    })
    var data= {
      parentId: id
    }
    util.request('/user/major', 'GET', data, function (res) {
      console.log('成功')
      console.log(res.data)
      let status = res.code;
      if (status === 200) {
        var major = res.data;
        that.setData({
          major: major,

        })
      }
    })
  },
  goToFirst(e) {

    var content2 = e.currentTarget.dataset.content;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页
    let major = 'getUser.major';
    prevPage.setData({
      [major]: content2,
    })
  wx.navigateBack({
      //返回上一级
      delta: 1,
    })

  },
  


 
})