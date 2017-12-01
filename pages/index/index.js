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

  pay() {
    app._api.payTest(res => {
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        success: ok => {
          console.log(ok)
        },
        fail: a => {
          console.log(a)
        },
        complete: c => {
          console.log(c)
        }
      })
    })
  }

})
