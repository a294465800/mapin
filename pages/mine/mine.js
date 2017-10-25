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

  // 登录
  login() {
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo
      })
    })
  }

})