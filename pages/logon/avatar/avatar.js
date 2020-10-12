// pages/logon/avatar/avatar.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  
  
  // 跳转
  tiaozhuan: function () {

    wx.navigateBack({
      //返回上一级
      delta: 20,
    })
  }




 
})