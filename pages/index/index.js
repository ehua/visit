//index.js
//获取应用实例
var order = ['red', 'yellow', 'blue', 'green', 'red']
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const app = getApp()
Page({
  data: {
    loading:false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    data:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  clickme:function(){
    this.setData({
      loading: !this.data.loading
    })
    // 实例化腾讯地图API核心类
    var demo = new QQMapWX({
      key: 'BXCBZ-FQH6W-VSWRG-O37PI-WIITF-KPF2J' // 必填
    });

    var _this = this;
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res);
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            _this.setData({
              address:res.result.address
            });
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    });

    var _this = this;
    wx.request({
      url: 'https://www.yhacg.com/quiet/list',
      data: {
        start: 0,
        limit: 10
      },
      method:'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({data:res.data.data})
        _this.setData({
          loading: !_this.data.loading
        })
      }
    })
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var _this = this;
    // 实例化腾讯地图API核心类
    var qqmapsdk = new QQMapWX({
      key: 'BXCBZ-FQH6W-VSWRG-O37PI-WIITF-KPF2J' // 必填
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type:'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(res);
      }
    });
    
    // wx.chooseLocation({
    //   success: function(res) {
    //     console.log(res);
    //   }
    // });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
