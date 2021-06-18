const DB = wx.cloud.database().collection("shuju")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chooseIncome:false,
    chooseExpenditure:true,
    messarr: [{
      color: '#56597a',
      imgid:'eat',
      num: 0,
      flownum: 0,
    },
    {
      color: '#6b79a7',
      imgid:'shop',
      num: 0,
      flownum: 0,
    },
    {
      color: '#8f90c3',
      imgid:'clock',
      num: 0,
      flownum: 0,
    },
    {
      color: '#c0c0ec',
      imgid:'hospital',
      num: 0,
      flownum: 0,
    }
    ,
    {
      color: '#535196',
      imgid:'edu',
      num: 0,
      flownum: 0,
    },{
    color: '#7257ad',
    imgid:'gift',
    num: 0,
    flownum: 0,
  },
  {
    color: '#8b57ad',
    imgid:'tv',
    num: 0,
    flownum: 0,
  },
  {
    color: '#bc9ed0',
    num: '0',
    imgid:'clear',
    flownum: 0,
  },
  {
    color: '#892c51',
    num: 0,
    imgid:'travel',
    flownum: 0,
  }
  ,{
    color: '#bd4977',
    imgid:'career',
    num: 0,
    flownum: 0,
  },
  {
    color: '#f087b1',
    imgid:'book',
    num: 0,
    flownum: 0,
  },
  {
    color: '#fbcfe0',
    num: 0,
    imgid:'out',
    flownum: 0,
  }],
  inarr:[
    {
      color: '#56597a', 
      imgid:'living',
      num: 0,
      flownum: 1,
    },
    {
      color: '#6b79a7', 
      imgid:'scholarship',
      num: 0,
      flownum: 0,
    },
    {
      color: '#8f90c3', 
      imgid:'salary',
      num: 0,
      flownum: 0,
    },
    {
      color: '#c0c0ec', 
      imgid:'job',
      num: 0,
      flownum: 0,
    },
    {
      color: '#535196', 
      imgid:'managemoney',
      num: 0,
      flownum: 0,
    },
    {
      color: '#7257ad', 
      imgid:'redpaper',
      num: 0,
      flownum: 0,
    },
    {
      color: '#8b57ad', 
      imgid:'in',
      num: 0,
      flownum: 0,
    }
  ],
  },
  
  Income:function(){
    wx.clearStorage(),
    this.setData({
      chooseIncome:true,
      chooseExpenditure:false,
    })
    this.onPullDownRefresh()
  },
  Expenditure:function(){
    wx.clearStorage(),
    this.setData({
      chooseIncome:false,
      chooseExpenditure:true,
    }),
    this.onPullDownRefresh()
  },
  printfchart1(){
    const ctx = wx.createCanvasContext('Canvas1');
    // 设置圆点 x  y   中心点
    let number = {
      x: 175,
      y: 175
    };
    // 获取数据 各类项的个数
    let term = this.data.messarr;
    let termarr = [];
    for (let t = 0; t < term.length; t++) {
      // flownum
      let thisterm = Number(term[t].flownum)
      let thiscolor = term[t].color
      termarr.push({
        data: thisterm,
        color: thiscolor
      })
    }
    console.log(termarr)
    // 设置总数
    let sign = 0;
    for (var s = 0; s < termarr.length; s++) {
      sign += termarr[s].data
    }
    //设置半径 
    let radius = 60;
    for (var i = 0; i < termarr.length; i++) {
      var start = 0;
      // 开始绘制
      ctx.beginPath()
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += termarr[j].data / sign * 2 * Math.PI
        }
      }
      var end = start + termarr[i].data / sign * 2 * Math.PI
      ctx.arc(number.x, number.y, radius, start, end);
      ctx.setLineWidth(1);
      ctx.lineTo(number.x, number.y);
      ctx.setStrokeStyle('#fff');
      ctx.setFillStyle(termarr[i].color);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }
    ctx.draw()
  },
  printfchart2(){
    const ctx = wx.createCanvasContext('Canvas2');
    // 设置圆点 x  y   中心点
    let number = {
      x: 175,
      y: 175
    };
    // 获取数据 各类项的个数
    let term = this.data.inarr;
    let termarr = [];
    for (let t = 0; t < term.length; t++) {
      // flownum
      let thisterm = Number(term[t].flownum)
      let thiscolor = term[t].color
      termarr.push({
        data: thisterm,
        color: thiscolor
      })
    }
    console.log(termarr)
    // 设置总数
    let sign = 0;
    for (var s = 0; s < termarr.length; s++) {
      sign += termarr[s].data
    }
    //设置半径 
    let radius = 60;
    for (var i = 0; i < termarr.length; i++) {
      var start = 0;
      // 开始绘制
      ctx.beginPath()
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += termarr[j].data / sign * 2 * Math.PI
        }
      }
      var end = start + termarr[i].data / sign * 2 * Math.PI
      ctx.arc(number.x, number.y, radius, start, end);
      ctx.setLineWidth(1);
      ctx.lineTo(number.x, number.y);
      ctx.setStrokeStyle('#fff');
      ctx.setFillStyle(termarr[i].color);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }
    ctx.draw()
  },
  getoutdata(i){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[i].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        var qingqiu='messarr['+i+'].flownum'
        that.setData({
          qingqiu:parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata0(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[0].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[0].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata1(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[1].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[1].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata2(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[2].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[2].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata3(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[3].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[3].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata4(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[4].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[4].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata5(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[5].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[5].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata6(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[6].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[6].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata7(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[7].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[7].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata8(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[8].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[8].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata9(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[9].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[9].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata10(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[10].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[10].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getoutdata11(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.messarr[11].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price<0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'messarr[11].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getindata0(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.inarr[0].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price>0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'inarr[0].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getindata1(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.inarr[1].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price>0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'inarr[1].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getindata2(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.inarr[2].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price>0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'inarr[2].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getindata3(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.inarr[3].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price>0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'inarr[3].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getindata4(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.inarr[4].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price>0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'inarr[4].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getindata5(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.inarr[5].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price>0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'inarr[5].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  getindata6(){
    let that = this
    var outsmoney=0
    DB.where({
      img:this.data.inarr[6].imgid
    })
    .get({
      success(res) {
        res.data.forEach(item=>{
          console.log(item.price)
          if(item.price>0){
            outsmoney=outsmoney-parseInt(item.price)
          }
        })
        console.log(outsmoney)
        console.log(11111111111111)
        that.setData({
          'inarr[6].flownum':parseInt(outsmoney)
        })
        console.log(11111111111111)
      },fail(res){

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onPullDownRefresh();
    // setTimeout(this.funcA, 1000)
  },
  funcA: function () { 
    this.onPullDownRefresh();
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
    this.getoutdata0();
    this.getoutdata1();
    this.getoutdata2();
    this.getoutdata3();
    this.getoutdata4();
    this.getoutdata5();
    this.getoutdata6();
    this.getoutdata7();
    this.getoutdata8();
    this.getoutdata9();
    this.getoutdata10();
    this.getoutdata11();
    this.getindata0();
    this.getindata1();
    this.getindata2();
    this.getindata3();
    this.getindata4();
    this.getindata5();
    this.getindata6();
    setTimeout(this.printfchart1, 1500)
    setTimeout(this.printfchart2, 1500)
    console.log("渲染")
    console.log(this.data.messarr);
    console.log(this.data.inarr)
    wx.stopPullDownRefresh();
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
})