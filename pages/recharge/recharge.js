// pages/recharge/recharge.js
const app = getApp()
Page({

  data: {

    currentMode: 1,
    loading: true,


    //收费模式
    modes: [
      {
        id: 1,
        title: '三天（试用）',
        price: 388,
        // remark: '每月388元'
      },
      {
        id: 2,
        title: '一个月',
        price: 0,
        // remark: '每月15 元，省1388元'
      },
      {
        id: 3,
        title: '六个月',
        price: 0,
        // remark: '（送一对一活动策划辅导）'
      },
      {
        id: 4,
        title: '一年',
        price: 0,
        // remark: '（送一对一活动策划辅导）'
      }
    ],
  },

  onLoad() {
    wx.showLoading({
      title: '加载中',
    })
    app._api.getRecharge(res => {
      wx.hideLoading()
      const data = res.data
      this.setData({
        'modes[0].price': data.money1,
        'modes[1].price': data.money2,
        'modes[2].price': data.money3,
        'modes[3].price': data.money4,
        loading: false
      })
    })
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