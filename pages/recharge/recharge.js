// pages/recharge/recharge.js
const app = getApp()
Page({

  data: {

    currentMode: 1,


    //收费模式
    modes: [
      {
        id: 1,
        title: '一个月',
        price: 388,
        remark: '每月388元'
      },
      {
        id: 2,
        title: '六个月',
        price: 948,
        remark: '每月15 元，省1388元'
      },
      {
        id: 3,
        title: '一年',
        price: 1388,
        remark: '（送一对一活动策划辅导）'
      },
      {
        id: 4,
        title: '两年',
        price: 2100,
        remark: '（送一对一活动策划辅导）'
      }
    ],
  },

  //选择模式
  chooseMode(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      currentMode: id
    })
  },

  //协议
  goToProtocol() {
    wx.navigateTo({
      url: '/pages/helptext/helptext?id=4&title=蚁拼服务协议',
    })
  }

})