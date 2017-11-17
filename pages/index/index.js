//index.js
const app = getApp()
Page({
  data: {
    hide: true
  },
  onLoad() {

  },

  /*
  * 扫描二维码
  */
  scan() {
    wx.scanCode({
      success: res => {
        console.log(res)
      }
    })
  },

})
