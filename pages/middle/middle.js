var uploadImage = require('../../utils/uploadFile.js');
var util = require('../../utils/util.js');
var utils = require('../../components/utils/utils');
var imageUtil = require('../../utils/imgscale.js');  //获取图片比例
const app = getApp()
Page({
  data: {
    alreadysend: false,
    tempurl: '',
    formcontent: "",
    imgList: [],
    src: "",
    chooseType: 3,
    secondData: "#选择话题#",
    topic: null,
    ifanonymous: false,
    controls: false //textarea 的隐藏
  },
  onLoad() {
    var that = this
    console.log('showTips')
    that.showTips()
    that.setData({
      username: app.globalData.username,
      avatar: app.globalData.avatar,
      gender: app.globalData.gender
    })
  },
  showTips: function (e) {

    let options = {
      msg: "长按图片删除",
      duration: 3000,
      type: "translucent",
    };
    utils.toast(options);
  },

  //获取输入框内容
  form_info: function (e) {
    let str = e.detail.value
    console.log(e.detail.value)
    var v = str.replace(/\s*/g, "")
    if (v.length != 0) { this.setData({ formcontent: e.detail.value }) }
  },

  //跳页选择话题
  select: function () {
    wx.navigateTo({
      url: '../middle-select/middle-select'
    })
  },

  //点击加号图片 选择图片或视频
  choose: function () {
    var that = this
    if (that.data.imgList.length == 0) {

      wx.showActionSheet({
        itemList: ["图片", "视频"],
        success(res) {
          if (res.tapIndex === 0) {
            console.log("图片")
            wx.chooseImage({
              count: 9,
              sizeType: ['original', 'compressed'],
              sourceType: ['album'],
              success: (res) => {
                console.log(res)
                that.setData({
                  imgList: res.tempFilePaths
                })
              }
            })
          }
          else if (res.tapIndex === 1) {
            console.log("视频")
            wx.chooseVideo({
              success: function (res) {
                that.setData({
                  src: res.tempFilePath,
                  originalScale: res.width / res.height
                })
              }
            })
          }
        }
      })
    }
    else {
      that.chooseImage()
    }
  },

  //点击选择图片
  chooseImage: function (e) {
    var that = this;
    if (that.data.src == '' && (that.data.imgList.length) < 9) {
      wx.chooseImage({
        count: 9 - (that.data.imgList.length),//动态改变可选择图片数量！！
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          console.log(res)
          if (that.data.imgList.length != 0) {
            that.setData({
              imgList: that.data.imgList.concat(res.tempFilePaths),
              len: that.data.imgList.length + 1
            })
          } else {
            that.setData({
              imgList: res.tempFilePaths
            })
          }
        }
      });
    }
  },

  //预览图片
  previewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.src
    });
  },

  //删除图片
  DelImg: function (e) {
    console.log(e)
    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    })
  },

  //视频选择
  chooseVideo: function () {
    var that = this
    if (this.data.imgList.length == 0 && this.data.src == '') {
      wx.chooseVideo({
        success: function (res) {
          that.setData({
            src: res.tempFilePath,
            originalScale: res.width / res.height
          })

        }
      })
    }
  },

  //视频的全屏模式
  screenChange(e) {
    let fullScreen = e.detail.fullScreen //值true为进入全屏，false为退出全屏
    if (!fullScreen) { //退出全屏
      this.setData({ controls: false })
    } else { //进入全屏
      this.setData({ controls: true })
    }
  },

  //视频删除
  DelVideo: function (e) {
    var _this = this;
    wx.showModal({
      title: '删除视频',
      content: '确认删除视频',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          _this.setData({
            src: '',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //匿名选择
  choose_anonymous: function (e) {
    var ifanonymous = this.data.ifanonymous;
    this.setData({
      ifanonymous: !ifanonymous
    })
  },

  //动态发送
  send: function (e) {
    var that = this;
    // 发送后禁用
    that.setData({
      alreadysend:true
    })
    //  图片/视频另外上传  
 

    var content = that.data.formcontent;
    console.log(content)
    var anonymous = that.data.ifanonymous;
    var topicId = this.data.topic;
    //表单内容上传
    var data = {
      topicId: topicId,
      content: content,
      isAnonymous: anonymous
    }
    util.request('/circle/new', 'POST', data, function (res) {
      console.log('request success', res)
      that.data.circleid = res.data.id
      if (that.data.imgList.length != 0) { that.uploadimg() }
      else if (that.data.src != '') { that.uploadvideo() }
      else { that.toIndex() }
    })

  },

  //图片上传aliyun
  uploadimg() {
    var imgList = this.data.imgList;
    var that = this;
    var nowTime = util.formatTime(new Date());
    for (var i = 0; i < imgList.length; i++) {
      wx.showLoading({
        title: '上传中' + (i + 1) + '/' + imgList.length,
        mask: true
      })
      wx.hideLoading();
      //上传图片
      //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
      //图片路径可自行修改
      uploadImage(imgList[i], 'cbb/' + nowTime + '/',
        function (result) {
          console.log("======上传成功======", result);
          that.data.findUser = result
          that.up_image()  //向服务端上传图片附件
        }, function (result) {
          console.log("======上传失败======", result);
        }
      )
    }
  },


  //上传图片附件
  up_image() {
    var that = this;
    var circleId = that.data.circleid;

    // 获取图片比例
    if (that.data.imgList.length == 1) {
      wx.getImageInfo({
        src: that.data.imgList[0],
        success: function (res) {
          console.log(res)
          // 图片比例宽比高
          var scale = res.height / res.width
          var data = {
            circleId: circleId,
            url: that.data.findUser,
            type: 'image',
            originalScale: scale
          }
          util.request('/circle/attachment', 'POST', data, function (res) {
            console.log(res)
          })
          that.toIndex()
        }
      })

    } else {
      var scale = 0

      var data = {
        circleId: circleId,
        url: that.data.findUser,
        type: 'image',
        originalScale: scale
      }
      util.request('/circle/attachment', 'POST', data, function (res) {
        console.log(res)
      })
      that.toIndex()
    }

  },

  //视频上传aliyun
  uploadvideo() {
    var that = this;
    var nowTime = util.formatTime(new Date());
    uploadImage(that.data.src, 'cbbvideo/' + nowTime + '/',
      function (result) {
        console.log("======上传成功视频地址为：", result);
        console.log("aa")

        wx.hideLoading();
        that.data.findUser = result;
        console.log(that.data.findUser)
        that.up_video()
      }, function (result) {
        console.log("======上传失败======", result);
        wx.hideLoading()
      }
    )
  },
  //视频附件上传
  up_video() {
    var circleId = this.data.circleid;
    var that = this;
    var data = {
      circleId: circleId,
      url: this.data.findUser,
      type: 'video',
      originalScale: that.data.originalScale
    }
    util.request('/circle/attachment', 'POST', data, function (res) {
      console.log(res)
      that.toIndex()
    })
  },
  // 发送动态并跳转页面
  toIndex(e) {
    wx.showToast({
      title: '发送成功',
      icon: 'success',
      duration: 2000
    })
    wx.reLaunch({
      url: '/pages/index/index?topicid=' + this.data.topic
    })
  },

  //若未选择话题 弹出提示框 跳转话题选择页
  tishi: function (e) {
    var _this = this;
    wx.showModal({
      content: '去选择一个话题吧',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.navigateTo({
            url: '../middle-select/middle-select',
          })
        }
      }
    })
  },

  nosend() {
    wx.showModal({
      content: '您还未输入任何内容哦',
      showCancel: false,
      success(res) {
      }
    })
  }
})