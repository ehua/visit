//index.js
//获取应用实例
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    data:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  clickme:function(){
    var _this = this;
    wx.request({
      url: 'https://www.yhacg.com/quiet/list', //仅为示例，并非真实的接口地址
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
    qqmapsdk = new QQMapWX({
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
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
      }
    });

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
