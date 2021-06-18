let tdate = new Date()

var tmonth=tdate.getMonth()+1
var tday =tdate.getDate()
var tyear=tdate.getFullYear()
var startX, endX;
var moveFlag = true;// 判断执行滑动事件
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectyear: false,
    selectmonth: false,
    selectday: false,
    year: tyear,
    month: tmonth,
    monthday:30,
    day: tday,
    datalist: "",
    inmoney:0,
    outmoney:0
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
    tyear = this.data.year
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
    tmonth = this.data.tmonth
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
    tday = this.data.day
    console.log(this.data.day);
    this.getData();
    console.log(3)
  },
  getData(){
    let that = this
    wx.cloud.database().collection("shuju").where({
      month:this.data.month,
      year:this.data.year,
      day :this.data.day
    }).get({
      success(res) {
        console.log("请求成功",res);
        that.setData({
          datalist: res.data
        });
        var ins = 0
        var outs = 0
        that.data.datalist.forEach(item=>{
          if(item.price<0){
            outs=outs+parseInt(item.price)
          };
          if(item.price>0){
            ins=ins+parseInt(item.price)
          };
        })
        that.setData({
          inmoney:ins,
          outmoney:outs
        })
      },
      fail(res) {
        console.log("请求失败",res)
      }
    })
  },
  firstgetData(){
    let that = this
    wx.cloud.database().collection("shuju").where({
      month:tmonth ,
      year:tyear,
      day : tday
    }).get({
      success(res) {
        console.log("请求成功",res);
        that.setData({
          datalist: res.data
        });
        var ins = 0
        var outs = 0
        that.data.datalist.forEach(item=>{
          if(item.price<0){
            outs=outs+parseInt(item.price)
          };
          if(item.price>0){
            ins=ins+parseInt(item.price)
          };
        })
        that.setData({
          inmoney:ins,
          outmoney:outs
        })
      },
      fail(res) {
        console.log("请求失败",res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.firstgetData()
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

  },
  touchStart: function (e) {
    startX = e.touches[0].pageX; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        console.log(e.currentTarget.dataset.id);
        this.move2right();
        moveFlag = false;
      }
      if (startX - endX > 50) {
        console.log("move left");
        this.move2left();
        moveFlag = false;
      }
    }
  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件
    
  },
  move2left() {
    var that = this;
    
    that.setData({
      content: "move2left"
    });
  },
  move2right() {
    var that = this;
    that.setData({
      content: "move2right"
    });
  },
  delid(e){
    console.log(e.currentTarget.dataset.id);
    let that = this;
    wx.cloud.database().collection("shuju")
    .doc(e.currentTarget.dataset.id)
    .remove()
    .then(res=>{
      console.log("成功");
      wx.showToast({
        title: '删除成功',
        icon:'success',
        duration: 1500
       });
       that.getData();
    });

  }
})