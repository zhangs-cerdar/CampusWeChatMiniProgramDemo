const util = require("../../../utils/util")
Page({
  data: {
    reportList: [{ rid: 1, content: "政治敏感" }, { rid: 2, content: "违法" }, { rid: 3, content: "广告" }, { rid: 4, content: "病毒木马" }, { rid: 5, content: "侵犯未成年人权益" }, { rid: 6, content: "色情低俗" }, { rid: 7, content: "其他" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.circleid = options.circleid
  },
  choose(e){
    this.data.content = e.target.dataset.content
    let id = e.target.dataset.index+1
    this.setData({
      idx: id
    })
  },
  showmodal(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确认提交！！',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.submit();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },
  submit(){
    var data={
      circleId: this.data.circleid,
      typeId: this.data.idx
    }
    util.request('/circle/report', 'POST', data, function (res) {
      console.log(res)
      wx.reLaunch({
        url: '../index',
      })
    })
  }
})