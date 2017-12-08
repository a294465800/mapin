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
        const data = res
        if(res.scanType === "QR_CODE"){
          console.log(JSON.parse(data.result))
        }
        console.log(res)
      }
    })
  },

})
