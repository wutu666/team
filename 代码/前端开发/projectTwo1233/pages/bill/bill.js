// pages/bill/bill.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectyear: false,
    selectmonth: false,
    selectday: false,
    year: 2021,
    month: 1,
    monthday:30,
    day: 1
  },

  bindShowyear() {
      this.setData({
        selectyear:!this.data.selectyear,
        selectmonth:false,
        selectday:false
      })
  },
  mySelectyear(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      year: parseInt(name),
      selectyear: false
    });
    console.log(this.data.year);
  },
  bindShowmonth(){
    this.setData({
      selectyear:false,
      selectmonth:!this.data.selectmonth,
      selectday:false
    })
  },
  mySelectmonth(e) {
    var month=e.currentTarget.dataset.id;
    this.setData({
      month:parseInt(month),
      selectmonth: false
    });
    console.log(this.data.month);
    if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
      this.setData({
        monthday:31
      })
    };
    if(month==2){
      this.setData({
        monthday:28
      })
    }
    if(month==4||month==6||month==9||month==11){
      this.setData({
        monthday:30
      })
    };
  },
  bindShowday(){
    this.setData({
      selectyear:false,
      selectmonth:false,
      selectday:!this.data.selectday
    })
  },
  mySelectday(e) {
    var day=e.currentTarget.dataset.day;
    this.setData({
      day:parseInt(day),
      selectday: false
    });
    console.log(this.data.day);
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