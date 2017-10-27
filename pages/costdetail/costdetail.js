// pages/costdetail/costdetail.js
const app = getApp()
Page({

  data: {
    //活动规则
    rules: [
      '点击参团即可开始参与活动',
      '点击报名后邀请小伙伴一起团购，越多越好',
      '奖品数量有限，先到先得',
      '团购成功后，前往商家出兑换'
    ],
  },

  //分享
  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来加入我的拼团',
      path: '/pages/index/index',
      success(res) {
        // 转发成功
      },
      fail(res) {
        // 转发失败
      }
    }
  }
})