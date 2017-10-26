// pages/subaccount/subaccount.js
const qrcode = require('../../utils/qrindex.js')
Page({

  data: {

  },

  onLoad() {
    qrcode.qrcode('qrcode', 'https://www.baidu.com', 550, 550)
  },

  scan() {
    wx.scanCode({

    })
  }

})