// pages/index/login.js
const app = getApp()
const util = require("../../utils/util")
import { timeHandle } from '../../utils/timehandle';
const onfire = require("../../onfire.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 判断是否授权
  onLoad: function (options) {
    // 获取高度

    var that = this
    // 只有在用户已经授权后，才能在 onload 函数中获取到用户信息
    // 所以，下面通过 wx.getSetting 检查用户是否已经授权，
    // 如果没有授权，则停止执行
    // 如果已经授权，则继续执行success 
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {

          // 获取本地缓存中的数据
          wx.getStorage({
            key: 'userInfo',
            success: function (res) {
              console.log(res.data)
              // 数据储存在全局

              // app.globalData.username = res.data.nickName,
              // app.globalData.avatar = res.data.avatarUrl,
              // app.globalData.gender = res.data.gender,
              // app.globalData.province = res.data.province,
              // app.globalData.city = res.data.city
              that.setData({
                username: res.data.nickName,
                avatar: res.data.avatarUrl,
                gender: res.data.gender,
                province: res.data.province,
                city: res.data.city,
                isShow: true,

              })

            }

          })
          // 已经授权--调接口获取code
          that.Dologin()
        }
        else {
          that.setData({
            isShow: false,
          })
        }
      }
    })
  },
  // 授权时---将userInfo保存在本地缓存
  getUser(e) {
    var that = this
    console.log(e)
    wx.getUserInfo({
      success: (res) => {
        // 将userInfo保存在本地缓存
        wx.setStorage({
          key: "userInfo",
          data: res.userInfo,
          success: function (res) {
            console.log('setStorage');
          },
        })
        that.onLoad()
      }
    })
  },
  // 登录
  Dologin() {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('获取用户登录态成功' + res.code)
          that.setData({ code: res.code })
          that.DoopenId()
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }

      }
    })
  },
  // 获取openId
  DoopenId() {
    var that = this
    console.log(that.data.code)
    wx.request({
      url: `https://school-api.lidar360.live/auth/qqlogin`,
      data: {
        code: that.data.code,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded', },
      success(result) {
        console.log(result)
        console.log("获取openid")
        var userdata = result.data
        var openid = userdata.openid;
        that.setData({ openid: openid })
        // 将openid保存在本地缓存
        wx.setStorage({
          key: "openid",
          data: openid,
          success: function (res) {
            console.log('openid');
          },
        })

        that.Dotoken()
      },
    })
  },
  // 获取token
  Dotoken() {
    var that = this
    wx.request({
      url: `https://school-api.lidar360.live/auth/getToken`,
      method: "POST",
      data: {
        username: that.data.username,
        avatar: that.data.avatar,
        gender: that.data.gender,
        openId: that.data.openid,
        province: that.data.province,
        city: that.data.city
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(result) {
        console.log("获取token")
        console.log(result.data.data)
        // 数据储存在全局
        app.globalData.token = result.data.data;

        that.TZ()
      },
      fail(result) { console.log('失败') }
    })
  },

  TZ() {

    app.globalData.pp = true;
    setTimeout(function () {
      wx.switchTab({
        url: 'index',
      });
    }, 1000)
  }


})