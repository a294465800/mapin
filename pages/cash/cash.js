// pages/cash/cash.js
const app = getApp()
Page({

  data: {
    money: {}
  },

  onLoad() {
    const getData = {
      RecordIDShop: app.globalData.userInfo.RecordID
    }
    app._api.getMoney(getData, res => {
      this.setData({
        money: res.data
      })
    })
  },

  goToCashRecord() {
    wx.navigateTo({
      url: '/pages/cashrecord/cashrecord',
    })
  },

  goToRule(){
    wx.navigateTo({
      url: `/pages/helptext/helptext?id=1&title=蚁拼商户微信提现规则`,
    })
  }
})