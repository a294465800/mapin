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
        url: '/images/icon/cost.png',
        fnc: 'geToRecordControl'
      },
      {
        id: 2,
        name: '活动管理',
        url: '/images/icon/activity.png',
        fnc: 'geToActivityControl'
      },
      {
        id: 8,
        name: '创建活动',
        url: '/images/icon/created.png',
        fnc: 'goToCreate'
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
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  onShow() {
    const OpenID = wx.getStorageSync('OpenID')
    app._api.getPureUserInfo({ OpenID }, res => {
      this.setData({
        userInfo: res.data
      })
      wx.setStorageSync('userInfo', JSON.stringify(res.data))
      app.globalData.userInfo = res.data
    })
  },

  // 登录
  login() {
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo
      })
      app.globalData.userInfo = userInfo
    })
  },

  //登录验证
  isLogin() {
    if (this.data.userInfo) {
      return true
    }
    wx.showToast({
      title: '请先登录',
    })
    return false
  },

  //跳转充值
  goToChargeMode() {
    if (this.isLogin()) {
      wx.navigateTo({
        url: '/pages/recharge/recharge'
      })
    }
  },

  goToCreate() {
    if (this.isLogin()) {
      if (this.data.userInfo.user_Type === "B") {
        wx.navigateTo({
          url: '/pages/rules/rules',
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请先充值成为会员',
          showCancel: false
        })
      }
    }
  },

  //子帐号跳转
  geToSubControl() {
    if (this.isLogin()) {
      wx.navigateTo({
        url: '/pages/subaccount/subaccount',
      })
    }
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
    if (this.isLogin()) {
      wx.navigateTo({
        url: '/pages/cash/cash',
      })
    }
  },

  //活动管理
  geToActivityControl() {
    if (this.isLogin()) {
      if (this.data.userInfo.user_Type === "B") {
        wx.navigateTo({
          url: '/pages/activityrecord/activityrecord',
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请先充值成为会员',
          showCancel: false
        })
      }
    }
  },

  //消费记录
  geToRecordControl() {
    if (this.isLogin()) {
      wx.navigateTo({
        url: '/pages/costrecord/costrecord',
      })
    }
  },

  //个人信息跳转
  goToMyInfo() {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    })
  }

})