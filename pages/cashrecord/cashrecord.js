// pages/cashrecord/cashrecord.js
const app = getApp()
Page({

  data: {

    //提示文字
    tipsText: {
      0: '未到账',
      1: '已到帐'
    },
    //提示 class 
    tipsClass: {
      0: 'record-item-no',
      1: 'record-item-ok'
    },

    //模拟数据
    records: [
      {
        id: 1,
        title: '提现',
        status: 1,
        money: 233,
        time: '2017-10-21 23:11'
      },
      {
        id: 2,
        title: '提现',
        status: 0,
        money: 215,
        time: '2017-10-23 15:31'
      },
      {
        id: 1,
        title: '提现',
        status: 1,
        money: 100,
        time: '2017-10-26 17:22'
      }
    ]
  },

  onLoad(){
  }

})