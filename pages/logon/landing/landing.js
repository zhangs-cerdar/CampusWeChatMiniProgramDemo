const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId:'',
    studentIdmm:''

  },
  // 学号
  ddinput(e){
   
    this.setData({
      studentId: e.detail.value,
     
    })
    console.log('学号：'+ this.data.studentId);
    console.log( '教务密码：'+this.data.studentIdmm);
  },
  // 密码
  dinput(e) {

    this.setData({
     
      studentIdmm: e.detail.value
    })
    console.log('学号：' + this.data.studentId);
    console.log('教务密码：' + this.data.studentIdmm);
  },
   


// 登录
  authorLogin(e) {
    if (this.data.studentId == '' || this.data.studentIdmm == '') {
      wx.showToast({
        title: '请填写学号和密码',
        icon: 'none'
      })
    }
  
    else {
     
          setTimeout(function () {
          
            wx.navigateBack({
              delta: 1
            })
          }, 900)
      
    }

  },

})





