// pages/rules/rules.js
const app = getApp()
Page({

  data: {
  },

  //同意、创建
  agree() {
    wx.navigateTo({
      url: '/pages/createactivity/createactivity',
    })
  }

})