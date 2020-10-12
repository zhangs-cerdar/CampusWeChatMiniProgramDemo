// pages/mine/G-Information/G-Information.js
const app = getApp()
var uploadImage = require('../../../utils/uploadFile.js');
var util = require('../../../utils/util.js');

Page({

  data: {
    //性别//
    array: ['女', '男'],

  },
  //获取输入框内容
  form_info: function (e) {
    let str = e.detail.value
    console.log(e.detail.value)
    var v = str.replace(/\s*/g, "")
    if (v.length != 0) { this.setData({ formcontent: e.detail.value }) }
  },
  // 请求服务器更新用户信息
  makeRequest() {
    // 判断昵称是否为空
    var that = this
    let str = that.data.getUser.username 
    var v = str.replace(/\s*/g, "")
    if (v.length == 0) { console.log('不能为空')
    wx.showToast({
      title: '昵称不能为空',
      icon:'none'
    })
     }
   
    if (v.length != 0) {
   
    var data = {
      openId: that.data.openid,
      username: that.data.getUser.username,//昵称（必须）
      avatar: that.data.getUser.avatar,//头像（必须）
      gender: that.data.getUser.gender,//性别
      academy: that.data.getUser.academy,//院系
      academyId: that.data.getUser.academyId,//id 
      major: that.data.getUser.major,//专业
      dob: that.data.dob,//生日
      dobLabel: that.data.getUser.dobLabel,
      province: that.data.getUser.province,//省份
      city: that.data.getUser.city,//市
      area: that.data.getUser.area,//区
      education: that.data.getUser.education,//学历
      enrolmentDate: that.data.getUser.enrolmentDate,//入学年份 
    }
    util.request('/user/update', 'POST', data, function (res) {
      console.log('成功');
      console.log(res);
      app.globalData.token = res.data
      app.globalData.username = that.data.getUser.username,
        app.globalData.avatar = that.data.getUser.avatar,
        app.globalData.gender = that.data.getUser.gender,
        wx.navigateBack({
          detail: 1
        })
     })
   }
  },

  // wx.request获得用户信息
  onLoad() {

    var that = this
    //  获取用户
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        that.setData({
          openid: res.data
        })
      }
    })
    var data = {
    }
    // 向数据库请求信息
    util.request('/user/getUser', 'GET', data, function (res) {
      console.log(res)
      var data = res.data
      that.setData({ getUser: data })
    })

  },
  // 
  onHide() {


  },




  //选择照片
  changeAvatar: function (e) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var nowTime = util.formatTime(new Date());

        //支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
            function (result) {
              console.log("======上传成功图片地址为：", result);
              //  头像
              let avatar = 'getUser.avatar';
              that.setData({
                [avatar]: result,
              })

              wx.hideLoading();
            }, function (result) {
              console.log("======上传失败======", result);
              wx.hideLoading()
            }
          )
        }
      }
    })
  },
  // 昵称
  ddinput(e) {
    var username2 = e.detail.value
    let username = 'getUser.username';
    this.setData({ [username]: username2 })
  },
  //性别
  tiaozhuan3: function (e) {
    var gender2 = e.detail.value
    let gender = 'getUser.gender';
    this.setData({ [gender]: gender2 })
    console.log('性别' + gender);
  },
  //院系
  tiaozhuan7: function (e) {
    let major = 'getUser.major'
    this.setData({ [major]: null })
    wx.navigateTo({
      url: 'academy/academy'
    })
  },

  // 专业
  tiaozhuan8: function (e) {

    console.log('学院' + this.data.getUser.academyId)
    if (this.data.getUser.academyId == null) {
      wx.showToast({
        title: '请先选择学院',
        icon: 'none'
      })
    }

    if (this.data.getUser.academyId != null) {
      var id = this.data.getUser.academyId
      wx.navigateTo({
        url: 'major/major?id=' + id,
      })
    }


  },

  //生日
  tiaozhuan4: function (e) {
    var that = this
    var dob = e.detail.value
    let dobLabel = 'getUser.dobLabel'
    that.setData({
      [dobLabel]: dob,
      dob: dob,
    })

  },
  // 家乡
  tiaozhuan5: function (e) {

    var P2 = e.detail.value[0]
    let province = 'getUser.province'
    var C2 = e.detail.value[1]
    let city = 'getUser.city'
    var A2 = e.detail.value[2]
    let area = 'getUser.area'
    console.log(P2 + C2 + A2)

    this.setData({
      [province]: P2,
      [city]: C2,
      [area]: A2,
    })

  },
  // let major = 'getUser.major'
  //   this.setData({ [major]: null })
  //   wx.navigateTo({
  //   url: 'academy/academy'
  // })
  // 学历
  tiaozhuan9: function () {
    wx.navigateTo({
      url: 'education/education'
    })
  },
  //入学年份
  tiaozhuan10: function () {
    wx.navigateTo({
      url: 'enrolmentDate/enrolmentDate'
    })
  },



})
