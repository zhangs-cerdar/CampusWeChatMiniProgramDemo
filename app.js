App({
  onLaunch: function () {
    console.log('onLaunch')
    var that = this
    // 只有在用户已经授权后，才能在 onload 函数中获取到用户信息
    // 所以，下面通过 wx.getSetting 检查用户是否已经授权，
    // 如果没有授权，则停止执行
    // 如果已经授权，则继续执行success 
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 获取本地缓存中的数据
    //       wx.getStorage({
    //         key: 'userInfo',
    //         success: function (res) {
    //           console.log(res.data)
    //           that.globalData.username = res.data.nickName,
    //             that.globalData.avatar = res.data.avatarUrl,
    //             that.globalData.gender = res.data.gender,
    //             that.globalData.province = res.data.province,
    //             that.globalData.city = res.data.city
    //         }
    //       })
    //       // 已经授权--调接口获取code
    //       that.Dologin()
    //     }
    //   }
    // })

  },

  // 登录
  Dologin() {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log('获取用户登录态成功' + res.code)
          that.globalData.code = res.code
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
    wx.request({
      url: `http://school-api.lidar360.live/auth/wxlogin`,
      data: {
        code: that.globalData.code,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded', },
      success(result) {
        console.log(result)
        console.log("获取openid")
        var userdata = result.data
        var openid = userdata.openid;
        that.globalData.openid = openid

        // 将openid保存在本地缓存
        wx.setStorage({
          key: "openid",
          data: userdata.openid,
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
      url: `http://school-api.lidar360.live/auth/getToken`,
      method: "POST",
      data: {
        username: that.globalData.username,
        avatar: that.globalData.avatar,
        gender: that.globalData.gender,
        openId: that.globalData.openid,
        province: that.globalData.province,
        city: that.globalData.city,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(result) {
        console.log("获取token")
        console.log(result.data.data)
        // 数据储存在全局
        that.globalData.token = result.data.data;

      },
      fail(result) { console.log('失败') }
    })
  },
  toPraise: function (e) {
    let that = this;
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = e.timeStamp;
      var lastTapTime = that.lastTapTime;
      // 更新最后一次点击时间
      that.lastTapTime = currentTime;
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      var aa = currentTime - lastTapTime
      if (currentTime - lastTapTime > 1000) {
        console.log(3)
        let circleList = this.data.circleList;
        let index1 = e.currentTarget.dataset.index1;
        let index2 = e.currentTarget.dataset.index2;
        let circle1 = circleList[index1];
        let circle2 = circle1[index2];
        let key1 = 'circleList[' + index1 + '][' + index2 + '].liked';
        let key2 = 'circleList[' + index1 + '][' + index2 + '].likeCount';
        that.setData({
          [key1]: true,
          [key2]: circle2.likeCount + 1
        })
        //点赞接口
        //  var data = { targetId: circle2.id }
        var url = '/circle/like?targetId=' + circle2.id
        util.request(url, 'POST', {}, function (res) {
          console.log(res)
        })
      }
    }
  },
  globalData: {
    userInfo: null,
    token: null,
    avatar: null,
    username: null,
    gender: null
  },
})
