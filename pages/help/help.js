// pages/help/help.js
const app = getApp()
Page({
  data: {


    //模拟数据
    helps: [
      {
        id: 1,
        title: '如何开通创建权限'
      },
      {
        id: 2,
        title: '微信提现规则'
      },
      {
        id: 3,
        title: '如何提升活动效果'
      }
    ]
  },

  //帮助跳转
  goToHelp(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/helptext/helptext',
    })
  }

})