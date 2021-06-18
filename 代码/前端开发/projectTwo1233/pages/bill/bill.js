const DB = wx.cloud.database().collection("shuju")
let price = ""
let delId = ""
let out = ""
let date = new Date()
let day = date.getDate()
let year = date.getFullYear()
let month = date.getMonth()+1
var startX, endX;
var moveFlag = true;// 判断执行滑动事件
var flag
let nowmonth,newyear
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectyear: false,
    selectmonth: false,
    selectday: false,
    newyear: 2021,
    newmonth:12,
    monthday:30,
    day: 1,
    datalist:{
      
    },
  lists:[
    {
      "exmonth":0,
     "expendin":0,
     "expendout":0,
    },
    // {
    //   "exmonth":1,
    //  "expendin":0,
    //  "expendout":0,
    // },
    // {
    //   "exmonth":2,
    //  "expendin":0,
    //  "expendout":0,
    // },
    // {
    //   "exmonth":3,
    //  "expendin":0,
    //  "expendout":0,
    // },
    // {
    //   "exmonth":4,
    //  "expendin":0,
    //  "expendout":0,
    // },{
    //   "exmonth":5,
    //  "expendin":0,
    //  "expendout":0,
    // },
    // {
    //   "exmonth":6,
    //  "expendin":0,
    //  "expendout":0,
    // },
    // {
    //   "exmonth":7,
    //  "expendin":0,
    //  "expendout":0,
    // },
    // {
    //   "exmonth":8,
    //  "expendin":0,
    //  "expendout":0,
    // },{
    //   "exmonth":9,
    //  "expendin":0,
    //  "expendout":0,
    // },
    // {
    //   "exmonth":10,
    //  "expendin":0,
    //  "expendout":0,
    // },
    // {
    //   "exmonth":11,
    //  "expendin":0,
    //  "expendout":0,
    // },
    // {
    //   "exmonth":12,
    //  "expendin":0,
    //  "expendout":0,
    // },
  ],
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
    let adate = new Date()
    let amonth = date.getMonth()+1 
    if(parseInt(name)==2021){
      this.setData({
        newmonth:amonth,
        newyear: parseInt(name),
        selectyear: false
      })
    }
    else{
      this.setData({
        newmonth:12,
        newyear: parseInt(name),
        selectyear: false
      })
    }
    // this.setData({
    //   year: parseInt(name),
    //   selectyear: false
    // });
    console.log(this.data.newyear);
    
    var myList = this.data.lists
      myList.splice(1,this.data.newmonth);
    this.setData({
      lists:myList
    })
    this.getData()
    for(month=1;month<= this.data.newmonth;month++){  
      console.log(month);
      this.getMonth(month);
    }
  },
  getData(){
    let that = this 
    console.log("这是"+this.data.newyear+"年的结余的计算")
    wx.cloud.database().collection("shuju").where({
      year:this.data.newyear
    }).get({
      success(res) {
        console.log("请求成功",res);
        that.setData({
          datalist: res.data,
          today: day,
          tyear: year,
          tmonth: month
        });
        nowmonth = month
        var sumIn = 0
        var sumOut = 0
        if(res.data.length==0){
          
          that.setData({
            in:0,
            out : 0,
            surplus : 0     
          })
          console.log("这是"+this.data.newyear+"年",this.data.in,this.data.out,this.data.surplus)
        }
          else{
        res.data.forEach(element => {
          console.log(element.price)
          if(element.price>0){
          sumIn = sumIn + parseInt(element.price)
          }
          if(element.price<0){
            sumOut = sumOut - parseInt(element.price)
          }
        });

        console.log(sumIn)
        console.log(sumOut)
        that.setData({
          in:sumIn,
          out : sumOut,
          surplus : sumIn-sumOut
        })
      }
      },
      fail(res) {
        console.log("请求失败",res)
      }
    })
  },
  getMonth( thismonth){
    let that = this 
    console.log("这个是"+this.data.newyear+"年"+thismonth+"月")
    wx.cloud.database().collection("shuju").where({
      year: this.data.newyear,
      month:thismonth
    }).get({
      success(res) {
        console.log("请求成功",res);
        that.setData({
          today: day,
          tyear: year,
          tmonth: month
        });
        // var flag =0
        var sumIn =0
        var sumOut =0
        
        let  exmonth = 'lists[' + thismonth +'].exmonth'
        let  expendin = 'lists[' + thismonth +'].expendin'
        let  expendout = 'lists[' + thismonth +'].expendout'
        if(res.data.length==0){
          that.setData({
            [exmonth]:thismonth,
            [expendin]:0,
            [expendout]:0
            
          })
          console.log("第四个flag="+flag)
          console.log(thismonth,0,0)
        }
        else{
        res.data.forEach(element => {
          console.log(element.price)
          if(element.price>0){
            flag = 1
          sumIn = sumIn + parseInt(element.price)
          console.log(sumIn)
          console.log("第一个flag="+flag)
          }
          
          if(element.price<0){
            flag = 1
            console.log("第二个flag="+flag)
            sumOut = sumOut - parseInt(element.price)
            console.log(sumOut)
          }
         if(flag==1 ){
           that.setData({
            [exmonth]:thismonth,
            [expendin]:sumIn,
            [expendout]:sumOut
          })
          console.log("第三个flag="+flag)
          
        }
        });
      }
      },
      fail(res) {
        console.log("请求失败",res)
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    let adate = new Date()
    let ayear = date.getFullYear()
    let amonth = date.getMonth()+1 
    if(year==2021){
      this.setData({
        newmonth:amonth,
      })
    }
    else{
      this.setData({
        newyear:ayear,
      })
    }
    this.getData();
    for(month=1;month<= amonth;month++){  
      console.log(month);
      this.getMonth(month);
    }
    console.log(this.data.lists)
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
    let adate = new Date()
    let ayear = date.getFullYear()
    let amonth = date.getMonth()+1 
    if(year==2021){
      this.setData({
        newmonth:amonth,
      })
    }
    else{
      this.setData({
        newyear:ayear,
      })
    }
    this.getData();
    for(month=1;month<= amonth;month++){  
      console.log(month);
      this.getMonth(month);
    }
    console.log(this.data.lists)
    console.log(2)
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