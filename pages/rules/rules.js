// pages/rules/rules.js
const app = getApp()
Page({

  data: {
  },

  //同意、创建
  agree() {
    if (app.globalData.userInfo.user_LimitDate) {
      wx.navigateTo({
        url: '/pages/createactivity/createactivity',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '会员已过期',
        showCancel: false
      })
    }
  }

})