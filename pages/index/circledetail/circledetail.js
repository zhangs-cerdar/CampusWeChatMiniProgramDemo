const app = getApp()
const util = require("../../../utils/util")
import { timeHandle } from '../../../utils/timehandle'
Page({
  data: {
    hidebottom:false,
    hiderealInput:true,
    replycommentid:0,
    tipheight:35,
    YC: true,//对话框是否隐藏,
    page:0,
    temcomments:[],
    comments:[],
    newComment:'',
    currentTab:0,
    v:[],
    loadMore:false
  },
  onLoad: function (options) { 
    if(options.data){
     var json = JSON.parse(options.data)
    console.log(json.curcircle)
     this.setData({curcircle: json.curcircle })     
     this.data.index1 = json.index1;
     this.data.index2 = json.index2
      console.log("aa")
      console.log( this.data.curcircle)
    }
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
    });
    //获取自己的头像及昵称
    this.data.myname =app.globalData.username
    this.setData({ myavatar: app.globalData.avatar })
    this.getcomments()
    this.getlikers() 
  },
  //获取评论
  getcomments(){
    var that = this;
    var page = that.data.page;
    var curcircle = this.data.curcircle
    var data = {
      circleId: curcircle.id ,
      currPage: this.data.page*10
      }
    util.request('/circle/comments', 'GET', data, function (res) {
      that.data.loadMore = true
      var temcomments = res.data
      console.log(res)
      if (temcomments.length != 0){
        that.setData({
          ["curcircle.comments[" + page + "]"]: temcomments
        })
      }
      console.log("getcomments" + that.data.curcircle)
    })
  },
  //获取动态
  // getcircle(){
  //   var that = this;
  //   var circleid =this.data.curcircle.id
  //   var data = {
  //     currPage: 0,
  //     circleId: circleid
  //   }
  //   util.request('/circle/list', 'GET', data, function (res) {
  //     console.log(res)
  //     var curcircle = res.data[0]
  //     that.setData({
  //       curcircle: curcircle,
  //       // tipcontent:"刷新本界面即可查看最新评论哦"
  //     })
  //   })
  //     console.log("getcircle"+that.data.curcircle)
      // var pages = getCurrentPages();
      // var currPage = pages[pages.length - 1];//当前页
      // var prevPage = pages[pages.length - 2];//上一页
      // let index = that.data.index;
      // prevPage.setData({
      //   [`circleList[${index}].liked`]: that.data.curcircle.liked,
      //   [`circleList[${index}].likeCount`]: that.data.curcircle.likeCount,
      //   [`circleList[${index}].collected`]: that.data.curcircle.collected,
      //   [`circleList[${index}].commentCount`]: that.data.curcircle.commentCount,
      //   [`circleList[${index}].comments`]: that.data.curcircle.comments
      // }else{
      //   that.setData({
      //   tipcontent:"该动态已经被删除，再浏览其它的吧"
      // })
      // }
  // },

//点赞   参数传递上一页
  toPraise: function (e) {
    console.log()
    let that = this;
    var  curcircle = this.data.curcircle
    var url = '/circle/like?targetId=' + curcircle.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res)
      that.setData({
        [`curcircle.liked`]: true,

      })
      that.getlikers()
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];//当前页
      var prevPage = pages[pages.length - 2];//上一页
      var index1 = that.data.index1;
      var index2 = that.data.index2;
      console.log(index1)
      console.log(index2)
      console.log(that.data.likeUsers.length)
      prevPage.setData({
        [`circleList[${index1}][${index2}].likeCount`]: that.data.likeUsers.length+1,
        [`circleList[${index1}][${index2}].liked`]: that.data.curcircle.liked
      });
    })
      
      
  },
  //取消点赞
  unPraise: function (e) {
    let that = this;
    var curcircle = this.data.curcircle
    var url = '/circle/unLike?targetId=' + curcircle.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res)
      that.setData({
        [`curcircle.liked`]: false,
      })
      that.getlikers()
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];//当前页
      var prevPage = pages[pages.length - 2];//上一页
      var index1 = that.data.index1;
      var index2 = that.data.index2;
      console.log(that.data.likeUsers.length)
      prevPage.setData({
        [`circleList[${index1}][${index2}].likeCount`]: that.data.likeUsers.length-1,
        [`circleList[${index1}][${index2}].liked`]: that.data.curcircle.liked
      });
      console.log(that.data.curcircle.likeUsers.length)
    })
       
   
  },
  // 收藏    参数传递上一页
  tocollect: function (e) {
    console.log("评论1" + this.data.curcircle)
    let that = this;
    var  curcircle = this.data.curcircle
    var url = '/circle/collect?targetId=' + curcircle.id
    util.request(url, 'POST', {}, function (res) {
      console.log(res)
      that.setData({ [`curcircle.collected`]: true });
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];//当前页
        var prevPage = pages[pages.length - 2];//上一页
        var index1 = that.data.index1;
        var index2= that.data.index2;   
        prevPage.setData({ [`circleList[${index1}][${index2}].collected`]: that.data.curcircle.collected //注意index的格式
        })
    })
   
  },
 unCollect(){
   console.log("评论1" + this.data.curcircle)

   let that = this;
   var curcircle = this.data.curcircle
   var url = '/circle/unCollect?targetId=' + curcircle.id
   util.request(url, 'POST', {}, function (res) {
     console.log(res)
     that.setData({ [`curcircle.collected`]:false});
   var pages = getCurrentPages();
   var currPage = pages[pages.length - 1];//当前页
   var prevPage = pages[pages.length - 2];//上一页
   var index1 = that.data.index1;
   var index2 = that.data.index2;
   prevPage.setData({
     [`circleList[${index1}][${index2}].collected`]: that.data.curcircle.collected //注意index的格式
    })
   })
 },
  //图片预览
  img_view: function (e) {
    var curcircle = this.data.curcircle;
    var arr = [];
    var src =e.currentTarget.dataset.url;//获取data-url
    for (var i = 0; i < curcircle.attachments.length; i++) {
      arr.push(curcircle.attachments[i].url)
    }
    wx.previewImage({
      current: src, 
      urls: arr 
    })
  },

 // 点击输入内容时，对话框弹出
  TC() {
    var YC = this.data.YC
    this.setData({ YC:!YC,
      holdercontent:"输入内容..."
    })
    this.data.replycommentId  = null
  },
   //点击评论内容返回当前元素在评论数组中的位置  并显示被隐藏的输入框
  replycomment: function (e) {  
    var YC = this.data.YC
    var curcircle = this.data.curcircle;
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    let tem = curcircle.comments[index1][index2];
    this.data.tem = tem;
    this.setData({
      holdercontent:"回复："+  tem.userName,
      YC:!YC,
      body: tem.userName ,
  
    })
    this.data.replycommentId = tem.id 
  },
//获取输入内容
  getcontent: function (e) { 
    console.log(e)
    this.setData({newComment : e.detail.value});
    let str = e.detail.value
    this.data.v= str.replace(/\s*/g, "")//去除内容中的空格用于判断 输入内容是否为空
  },
  submit(){
     var that = this;
     if (this.data.v.length == 0) {    //这是输入内容为空的情况跳出弹窗
      console.log("输入内容为空")
      wx.showModal({
        title: '提示',
        content: "输入评论不能为空哦",
        showCancel: false,
        success(res) {
        }
      })
    } else {
      console.log("输入内容不为空")
      that.up_comment()
    }
  },
   
  // 提交评论到服务器
  up_comment() {
    console.log("cc")
    console.log(this.data.curcircle)
    let that = this;
    var curcircle = this.data.curcircle
    var newComment = this.data.newComment;
    var replycommentId = this.data.replycommentId ;
    var url ="/circle/comment";
    console.log("评论")
    console.log(curcircle)
    var data = {
      circleId: curcircle.id,
      content: newComment,
      replyCommentId: replycommentId 
    }
    util.request(url, 'POST',data, function (res) {
      console.log(res)
      that.setData({
        newComment:'',
        YC:true,
        [`curcircle.commentCount`]: curcircle.commentCount + 1
      })
      that.getcomments()
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];//当前页
      var prevPage = pages[pages.length - 2];//上一页
      var index1 = that.data.index1;
      var index2 = that.data.index2;
      prevPage.setData({
        [`circleList[${index1}][${index2}].commentCount`]: curcircle.commentCount ,
      });
    })
  },
 follow(){
   let curcircle = this.data.curcircle;
   console.log(curcircle.userId)
   var that = this;
   var url = "/user/follow?followId=" + curcircle.userId
   util.request(url, 'POST', {}, function (res) {
     console.log(res)
     that.setData({
       [`curcircle.followed`]: true
     }) 
   })
 },
  unFollow(){
    let curcircle = this.data.curcircle;
    console.log(curcircle.userId)
    var that = this;
    var url = '/user/unFollow?followId='+ curcircle.userId
    util.request(url, 'POST', {}, function (res) {
      console.log(res)
      that.setData({
        [`curcircle.followed`]:false
      })
    })
  },
 ToPersonaldetail(e){
  let that = this;
    var  curcircle = this.data.curcircle;
    if( curcircle.anonymous == false){
      if(curcircle.myself){
        wx.navigateTo({
          url:'/pages/mine/A-post/A-post'
        })
      }else{
        wx.navigateTo({
          url: '/pages/His-page/His-page?userId=' + curcircle.userId 
        })
      }
    }
  },
  onPullDownRefresh(){
    this.getcomments()
  },
  // 滑动切换
  swiperTab: function (e) {
    this.setData({
       currentTab: e.detail.current,
    })
    if (this.data.currentTab = 0) { this.getcomments() }
    else { this.getlikers() 
    }
    this.data.loadMore = false
  },
  //   点击切换
  swichNav: function (e) {
    var cur = e.target.dataset.aa;
    this.setData({
      currentTab: cur
    })
    if (this.data.currentTab == 0) { 
      console.log("评论")
      this.getcomments()}
    else {
      console.log("dianzan")
       this.getlikers() 
     }
    this.data.loadMore = false
  },
  getlikers(){
    var curcircle = this.data.curcircle
    var that = this;
    var data = {
      currPage: 0,
      circleId: curcircle.id
    }
    util.request('/circle/list', 'GET', data, function (res) {
      console.log(res)
      var likeUsers = res.data[0].likeUsers
      that.setData({
        likeUsers: likeUsers,
      })
    })
  },
 InterToPersonaldetail(e){
    console.log(userId)
    var userId = e.currentTarget.dataset.userid
    var myself = e.currentTarget.dataset.myself
    console.log(myself)
   if (myself) {
     wx.navigateTo({
       url: '/pages/mine/A-post/A-post'
     })
   } else {
     wx.navigateTo({
       url: '/pages/His-page/His-page?userId=' +userId
     })
   }
  },

  loadMore(){
    console.log("loadMore")
    console.log(this.data.loadMore)
    if (this.data.loadMore)
      console.log("获取更多评论")
    this.data.page = this.data.page + 1;
    this.data.loadMore = false
    this.getcomments()    
  }
})