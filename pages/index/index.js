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
    console.log(app.globalData)
    wx.scanCode({
      success: res => {
        const data = res
        if (res.scanType === "QR_CODE") {
          app._api.postConfirmQRCode({ RecordID: res.result, RecordIDChecker: app.globalData.userInfo.RecordID }, res => {
            wx.showToast({
              title: '核销成功',
            })
          })

        }
      }
    })
  },

})
