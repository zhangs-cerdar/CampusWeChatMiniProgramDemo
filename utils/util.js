 var app = getApp()
 const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var rootDocment = `https://school-api.lidar360.live`  //网址的公共部分
function request(url, method, data, cb) {
  
  console.log("header=="),
    wx.request({
      url: rootDocment + url,
      header: {
        'content-type': 'application/json', "Authorization": "Bearer " + app.globalData.token
      },
      data: data,
      method: method,
      success: function (res) {
        wx.hideLoading();
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
       
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })
}


module.exports = {
  formatTime: formatTime,
  request: request
}
