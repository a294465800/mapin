// pages/activityrecord/activityrecord.js
const app = getApp()
Page({

  data: {
    currentActivity: null,

    statusText: ['出售中', '已下线'],

    //模拟数据
    lists: [
      {
        id: 1,
        activity_id: 1231232,
        title: '这是一件大衣',
        sell: 1201,
        price: 200,
        old_price: 365,
        url: 'http://www.duoweifushi.com/images/goods/shopfw/main/thumb/2017/06/28/thumbnail_5653406852ba49e0a5618fd3c4671e2b.jpg',
        time_range: '2017.10.21 - 2017.10.24',
        status: 0,
      },
      {
        id: 2,
        activity_id: 1224231,
        title: '这是一件大衣这是一件大衣这是一件大衣这是一件大衣',
        sell: 35,
        price: 68,
        old_price: 188,
        url: 'http://www.duoweifushi.com/images/goods/shopfw/main/thumb/2017/06/28/thumbnail_5653406852ba49e0a5618fd3c4671e2b.jpg',
        time_range: '2017.10.21 - 2017.10.24',
        status: 1,
      }
    ]
  },


  //查看活动
  goToCheck(e) {
    const index = e.currentTarget.dataset.index
    const currentActivity = this.data.currentActivity
    if (index === currentActivity) {
      this.setData({
        currentActivity: null
      })
    } else {
      this.setData({
        currentActivity: index
      })
    }
  },

  //名单跳转
  getJoinRecord(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/joinrecord/joinrecord',
    })
  }
})