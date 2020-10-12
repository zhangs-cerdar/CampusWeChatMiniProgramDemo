// pages/logon/college/college.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  // 获取学院
  onLoad() {
    var that=this
    wx.request({
      url: 'http://school-api.lidar360.live/user/academy',
      data: {

      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success(result) {
        console.log('成功')
        console.log(result.data)
        var userdata = result.data
        let status = userdata.code;
        if (status === 200) {
          var academy = userdata.data;
          that.setData({
            academy: academy,
           
          })
        }
      },
      fail(result) { console.log('失败') }
    })

  },


  goToFirst(e) {
    var id = e.currentTarget.dataset.id;
    var content = e.currentTarget.dataset.content;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];//当前页
    var prevPage = pages[pages.length - 2];//上一页
    prevPage.setData({

    yuanxi:content , 
    id:id
    
    })

    console.log('id' + id + content)
    wx.navigateBack({
      //返回上一级
      delta: 1,
    })

  },


  // goToFirst2() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页
  //   prevPage.setData({
  //     yuanxi: '人文学院',
  //     s: 1
  //   })
  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },



  // goToFirst3() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '艺术与服装工程学院',
  //     s: 2
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },
  // goToFirst4() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '经济与管理学院',
  //     s: 3
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },
  // goToFirst5() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '生物与食品工程学院',
  //     s: 4
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },
  // goToFirst6() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '外国语学院',
  //     s: 5
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },
  // goToFirst7() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '数学与统计学院',
  //     s: 6
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },
  // goToFirst8() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '物理与电子工程学院',
  //     s: 7
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },
  // goToFirst9() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '机械工程学院',
  //     s: 8
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },
  // goToFirst10() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '汽车工程学院',
  //     s: 9
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },
  // goToFirst11() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '计算机科学与工程学院',
  //     s: 10
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },
  // goToFirst12() {
  //   var pages = getCurrentPages();
  //   var currPage = pages[pages.length - 1];//当前页
  //   var prevPage = pages[pages.length - 2];//上一页

  //   prevPage.setData({
  //     yuanxi: '化学与材料工程学院',
  //     s: 11
  //   })


  //   wx.navigateBack({
  //     //返回上一级
  //     delta: 1,
  //   })
  // },

})