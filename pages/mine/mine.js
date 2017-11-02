// pages/mine/mine.js
const app = getApp()
Page({

  data: {
    userInfo: null,

    //列表信息
    operations: [
      {
        id: 1,
        name: '消费记录',
        url: '/images/icon/activity.png',
        fnc: 'geToRecordControl'
      },
      {
        id: 2,
        name: '活动管理',
        url: '/images/icon/activity.png',
        fnc: 'geToActivityControl'
      },
      {
        id: 3,
        name: '资金提现',
        url: '/images/icon/money.png',
        fnc: 'geToMoneyControl'
      },
      {
        id: 4,
        name: '子账号',
        url: '/images/icon/sub.png',
        fnc: 'geToSubControl'
      },
      {
        id: 5,
        name: '联系我们',
        url: '/images/icon/contact.png',
        fnc: 'geToContactControl'
      },
      {
        id: 6,
        name: '帮助中心',
        url: '/images/icon/help.png',
        fnc: 'geToHelpControl'
      },
      {
        id: 7,
        name: '咨询客服',
        url: '/images/icon/kefu.png',
        fnc: ''
      }
    ]
  },

  onLoad() {
    const that = this
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: JSON.parse(res.data)
        })
      },
    })
  },

  onShow() {
    console.log(app.globalData.OpenID)
  },

  // 登录
  login() {
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo
      })
    })
  },

  //登录验证
  isLogin(callback) {
    if (this.userInfo) {
      typeof callback === 'function' && callback()
    }
    wx.showToast({
      title: '请先登录',
    })
    return false
  },

  //跳转充值
  goToChargeMode() {
    // this.isLogin(() => {
    //   wx.navigateTo({
    //     url: '/pages/recharge/recharge'
    //   })
    // })
    wx.navigateTo({
      url: '/pages/recharge/recharge'
    })
  },


  //子帐号跳转
  geToSubControl() {
    // this.isLogin(() => {
    //   wx.navigateTo({
    //     url: '/pages/subaccount/subaccount',
    //   })
    // })
    wx.navigateTo({
      url: '/pages/subaccount/subaccount',
    })
  },

  //帮助跳转
  geToHelpControl() {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },

  //联系跳转
  geToContactControl() {
    wx.navigateTo({
      url: '/pages/contact/contact',
    })
  },

  //资金提现
  geToMoneyControl() {
    // this.isLogin(() => {
    //   wx.navigateTo({
    //     url: '/pages/cash/cash',
    //   })
    // })
    wx.navigateTo({
      url: '/pages/cash/cash',
    })
  },

  //活动管理
  geToActivityControl() {
    // this.isLogin(() => {
    //   wx.navigateTo({
    //     url: '/pages/activityrecord/activityrecord',
    //   })
    // })
    wx.navigateTo({
      url: '/pages/activityrecord/activityrecord',
    })
  },

  //消费记录
  geToRecordControl() {
    // this.isLogin(() => {
    //   wx.navigateTo({
    //     url: '/pages/costrecord/costrecord',
    //   })
    // })
    wx.navigateTo({
      url: '/pages/costrecord/costrecord',
    })
  },

  //个人信息跳转
  goToMyInfo() {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    })
  }

})