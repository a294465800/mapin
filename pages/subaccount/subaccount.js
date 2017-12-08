// pages/subaccount/subaccount.js
const qrcode = require('../../utils/qrindex.js')
const app = getApp()
Page({

  data: {
    userInfo: null
  },

  onLoad() {
    const userInfo = app.globalData.userInfo
    const str = JSON.stringify({ RecordID: userInfo.RecordID })
    qrcode.qrcode('qrcode', str, 550, 550)
    this.setData({
      userInfo
    })
  },

  scan() {
    wx.scanCode({
      success: res => {
        const data = JSON.parse(res.result)
        if (res.scanType === "QR_CODE") {
          const getData = {
            chkRecordMainID: this.data.userInfo.RecordID,
            chkRecordSubID: data.RecordID
          }
          app._api.getAuthorize(getData, res => {
            wx.showModal({
              title: '提示',
              content: '绑定成功！',
              showCancel: false
            })
          })
        }
      }
    })
  }

})