
var setTimer
Page({
  data: {
    start_flag: false,  //计时的开始停止
    min: '25',
    second: "00",//显示的秒数
    hidetimeline: true,  //时间线的隐藏
    second1: 0,//真实的秒数
    target: "添加计时目标",
    YC: true,
    startHide: false,
  },
  onLoad() {
    var that = this
    wx.getSystemInfo({
      success: (res) => {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    })
  },
  //时间戳转化为可读时间方法
  time_change1: function (timestamp) {//时间戳转化成‘xx:xx’的可读形式
    var timem = 0;
    timem = parseInt(timestamp / 60);
    return (timem)
  },
  time_change2: function (timestamp) {//时间戳转化成‘xx:xx’的可读形式
    var times = 0;
    times = ((timestamp % 60 < 10) ? ('0' + timestamp % 60) : timestamp % 60);
    return (times)
  },
  time_change3: function (timestamp) {//时间戳转化成‘xx:xx’的可读形式
    var times1 = 0;
    times1 = timestamp % 60;
    return (times1)
  },
  chooseMin() {
    this.setData({
      hidetimeline: !this.data.hidetimeline
    })
    this.data.ms = 0    //用于判断所设时间是分钟还是秒钟，0表示分钟
  },
  chooseSecond() {
    this.setData({
      hidetimeline: !this.data.hidetimeline
    })
    this.data.ms = 1
  },

  cx(e) {   //获取点击时间线长线线返回时间
    console.log(this.data.ms)
    var index = e.currentTarget.dataset.index;
    var time = index * 5
    console.log("长线")
    console.log(time)
    if (this.data.ms == 0) {    //设置分钟
      this.setData({
        min: time
      })
    } else if (this.data.ms == 1) {   //设置秒钟
      if (time < 10) {
        this.setData({
          second: '0' + time
        })
        this.data.second1 = time
      } else {
        this.setData({
          second: time
        })
        this.data.second1 = time
      }
    }
  },
  dx(e) {    //获取点击时间线短线返回时间
    console.log(this.data.ms)
    var index = e.currentTarget.dataset.index;
    var index2 = e.currentTarget.dataset.index2;
    var time = index * 5
    var time = index * 5 + index2
    console.log("短线")
    if (this.data.ms == 0) {
      this.setData({
        min: time
      })
    } else if (this.data.ms == 1) {
      if (time < 10) {
        this.setData({
          second: '0' + time
        })
        this.data.second1 = time
      } else {
        this.setData({
          second: time
        })
        this.data.second1 = time
      }
    }
  },
  changeFlag: function () {
    this.setData({
      start_flag: !this.data.start_flag,//把flag置为相反
      hidetimeline: true//把时间线隐藏
    })
    if (this.data.start_flag == true) {
      this.data.timestamp = this.data.min * 60 + this.data.second1
      this.timer()
    }//如果flag为true 开始倒计时函数timer()
    else {//否则即为停止，清除全局变量的计时函数，实现时间的停止
      clearInterval(setTimer)
      this.setData({
        startHide: true,
      })
    }
  },
  //倒计时函数
  timer: function () {
    let promise = new Promise((resolve, reject) => {//ES6的语法，用就行，不需要看懂
      setTimer = setInterval(//时间循环函数
        () => {
          this.setData({//每隔一秒，时间戳-1，对应转化一次timestamp
            timestamp: this.data.timestamp - 1,
            min: this.time_change1(this.data.timestamp - 1),
            second: this.time_change2(this.data.timestamp - 1)
          })
          this.data.second1 = this.time_change3(this.data.timestamp - 1)
          console.log("timer" + this.data.timestamp)
          if (this.data.timestamp <= 0) {//如果时间为0，重置数据
            this.setData({
              timestamp: 1500,
              start_flag: false,
              min: '25',
              second: "00"
            })
            this.data.second1 = 0
            resolve(setTimer)
            this.vibrateLongTap()
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },


  vibrateLongTap: function () {
    // 使手机振动400ms
    wx.vibrateLong();
  },
  sixty() {
    if (this.data.ms == 0) {
      this.setData({
        min: 60
      })
    } else if (this.data.ms == 1) {
      this.setData({
        second: 60
      })
      this.data.second1 == 60
    }
  },
  target() {
    this.setData({
      YC: false
    })
  },
  // 点击遮罩层消失
  TC() {
    this.setData({
      YC: true
    })

  },
  getcontent(e) {
    this.data.content = e.detail.value
  },
  subcontent() {
    this.setData({
      target: this.data.content,
      YC: true
    })
  },
  continue() {
    this.data.timestamp = this.data.min * 60 + this.data.second1
    this.timer()
    this.setData({
      start_flag: true,
      startHide: false
    })
  },
  clear: function () {
    this.setData({
      timestamp: 1500,
      start_flag: false,
      min: '25',
      second: "00",
      startHide: false
    })
    this.data.second1 = 0
    clearInterval(setTimer);
  },
})