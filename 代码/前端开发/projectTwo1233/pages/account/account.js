// pages/account/account.js
const DB = wx.cloud.database().collection("shuju")
let price = ""
let time = ""
let img = ""
let imgsrc = ""
var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  // 数据
  data: {
    date:"1",
    chooseIncome:true,
    chooseExpenditure:false,
    // 图片
    pic:[
      {src:"/images/eat.png",id:"eat",mytest:"吃喝"},
      {src:"/images/shop.png",id:"shop",mytest:"购物"},
      {src:"/images/clock.png",id:"clock",mytest:"话费"},
      {src:"/images/hospital.png",id:"hospital",mytest:"医疗"},
      {src:"/images/edu.png",id:"edu",mytest:"教育"},
      {src:"/images/gift.png",id:"gift",mytest:"礼物"},
      {src:"/images/edu.png",id:"tv",mytest:"电器"},
      {src:"/images/clear.png",id:"clear",mytest:"日用"},
      {src:"/images/travel.png",id:"travel",mytest:"旅游"},
      {src:"/images/career.png",id:"career",mytest:"服装"},
      {src:"/images/book.png",id:"book",mytest:"书籍"},
      {src:"/images/out.png",id:"out",mytest:"其它"}
    ],
    // 收入
    picincome:[
      {src:"/images/living.png",id:"living",mytest:"生活费"},
      {src:"/images/scholarship.png",id:"scholarship",mytest:"奖学金"},
      {src:"/images/salary.png",id:"salary",mytest:"工资"},
      {src:"/images/job.png",id:"job",mytest:"兼职"},
      {src:"/images/managemoney.png",id:"managemoney",mytest:"理财"},
      {src:"/images/redpaper.png",id:"redpaper",mytest:"红包"},
      {src:"/images/in.png",id:"in",mytest:"其它"}
    ],
    outchooseType:"eat",
    outchooseSrc:"/images/eat.png",
    outMoney:0,
    inchooseType:"life",
    inchooseSrc:"/images/living.png",
    inMoney:0,
    inputInmoney:0,
    inputOutmoney:0
  },
  Income:function(){
    wx.clearStorage(),
    this.setData({
      chooseIncome:true,
      chooseExpenditure:false
    })
  },
  Expenditure:function(){
    wx.clearStorage(),
    this.setData({
      chooseIncome:false,
      chooseExpenditure:true
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  // 获取图片
  tapPic:function(e){
    var mysrc = "/images/"+e.currentTarget.id+".png";
    this.setData({
      outchooseType : e.currentTarget.id,
      outchooseSrc : mysrc
    });
  },
  tapinPic:function(e){
    var mysrc = "/images/"+e.currentTarget.id+".png";
    this.setData({
      inchooseType : e.currentTarget.id,
      inchooseSrc : mysrc
    });
  },

  // 获取金额
  getInputValue1:function(e){
    this.setData({
      inputOutmoney:e.detail.value
    });
  },
  getInputValue2:function(e){
    this.setData({
      inputInmoney : e.detail.value
    });
  },


  // 点击添加 支出
  submitout:function(e){
    var inputOutmoney=this.data.inputOutmoney;
    console.log(inputOutmoney);
    console.log(this.data.outchooseType);
    // 获取时间
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    var TIME = year+'年'+month+'月'+day+'日'
    this.setData({
      date:TIME
    })
    console.log(this.data.date);
    wx.showLoading({
      title: '数据提交中......',
      mask:true
    }),
    DB.add({
      data: {
        price: -inputOutmoney,
        time: TIME,
        img: this.data.outchooseType,
        imgsrc: this.data.outchooseSrc
       },
       success(res) {
         console.log("添加成功",res);
         wx.hideLoading();
         wx.showToast({
          title: '添加成功',
          icon:'success',
          duration: 1250
         })
       },
       fail(res) {
         console.log("添加失败",res);
         wx.hideLoading();
          wx.showToast({
            title: '添加失败',
            icon:'error',
            duration: 1250
         })
       }
    })
  },

  // 点击添加 收入
  submitin:function(e){
    var inputInmoney=this.data.inputInmoney;
    console.log(this.data.inputInmoney);
    console.log(this.data.inchooseType);
    // 获取时间
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    var TIME = year+'年'+month+'月'+day+'日'
    this.setData({
      date:TIME
    })
    console.log(this.data.date);
    wx.showLoading({
      title: '数据提交中......',
      mask:true
    }),
    DB.add({
      data: {
        price: inputInmoney,
        time: TIME,
        img: this.data.inchooseType,
        imgsrc: this.data.inchooseSrc
       },
       success(res) {
         console.log("添加成功",res);
         wx.hideLoading();
         wx.showToast({
          title: '添加成功',
          icon:'success',
          duration: 1250
         })
       },
       fail(res) {
         console.log("添加失败",res)
         wx.hideLoading();
         wx.hideLoading();
         wx.showToast({
           title: '添加失败',
           icon:'error',
           duration: 1250
        })
       }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})