// pages/help/help.js
const app = getApp()
Page({
  data: {


    //模拟数据
    helps: [
      {
        id: 1,
        title: '蚁拼商户微信提现规则'
      },
      {
        id: 2,
        title: '商家用户使用流程'
      },
      {
        id: 3,
        title: '个人用户使用流程'
      }
    ]
  },

  //帮助跳转
  goToHelp(e) {
    const id = e.currentTarget.dataset.id
    const title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/helptext/helptext?id=${id}&title=${title}`,
    })
  }

})