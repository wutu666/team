const DB = wx.cloud.database().collection("shuju")
let price = ""
let delId = ""
let out = ""
let date = new Date()
let day = date.getDate()
let year = date.getFullYear()
let month = date.getMonth()+1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datalist: "",
    today: "",
    tyear: "",
    out: ""
  },
  getData(){
    let that = this 
    wx.cloud.database().collection("shuju").get({
      success(res) {
        console.log("请求成功",res)
        that.setData({
          datalist: res.data,
          today: day,
          tyear: year,
          tmonth: month
        })
      },
      fail(res) {
        console.log("请求失败",res)
      }
    })
  },

  delDataId(event){
    delId = event.detail.value
  },

  delItem(event){
    DB.doc(delId).remove({
      success: console.log,
      fail: console.error
    })
  },

 onLoad: function () { 
  console.log('onLoad:'+app.globalData.domain) 
 } ,
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    console.log(2)
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
    this.getData();
    wx.stopPullDownRefresh()
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