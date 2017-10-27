// pages/activity/activity.js
const app = getApp()
Page({

  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://d.5857.com/hh_170601/001.jpg',
      'http://img.zcool.cn/community/03320dd554c75c700000158fce17209.jpg'
    ],

    currentSort: 1,

    //排序
    sorts: [
      {
        id: 1,
        name: '时间排序'
      }, {
        id: 2,
        name: '地理排序'
      }
    ],

    //模拟数据
    lists: [
      {
        id: 1,
        title: '这是一件大衣',
        sell: 1201,
        price: 200,
        old_price: 365,
        url: 'http://www.duoweifushi.com/images/goods/shopfw/main/thumb/2017/06/28/thumbnail_5653406852ba49e0a5618fd3c4671e2b.jpg',
        time_range: '2017.10.21 - 2017.10.24'
      },
      {
        id: 2,
        title: '这是一件大衣这是一件大衣',
        sell: 35,
        price: 68,
        old_price: 188,
        url: 'http://www.duoweifushi.com/images/goods/shopfw/main/thumb/2017/06/28/thumbnail_5653406852ba49e0a5618fd3c4671e2b.jpg',
        time_range: '2017.10.21 - 2017.10.24'
      }
    ]
  },

  //购买
  goToBuy() {
    wx.navigateTo({
      url: '/pages/commodity/commodity',
    })
  },

  //排序
  sortFnc(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      currentSort: id
    })
  },

  //创建活动
  createActivity() {
    wx.navigateTo({
      url: '/pages/rules/rules',
    })
  }


})