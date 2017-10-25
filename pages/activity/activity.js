// pages/activity/activity.js
const app = getApp()
Page({

  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://d.5857.com/hh_170601/001.jpg',
      'http://img.zcool.cn/community/03320dd554c75c700000158fce17209.jpg'
    ],

    //模拟数据
    lists: [
      {
        id: 1,
        title: '这是一件大衣',
        sell: 1201,
        price: 200,
        old_price: 365,
        url: 'http://img.ltn.com.tw/Upload/style/page/2016/05/13/160513-3464-4-OV84b.jpg',
        time_range: '2017.10.21 - 2017.10.24'
      },
      {
        id: 2,
        title: '这是一件大衣这是一件大衣',
        sell: 35,
        price: 68,
        old_price: 188,
        url: 'http://img.ltn.com.tw/Upload/style/page/2016/05/13/160513-3464-4-OV84b.jpg',
        time_range: '2017.10.21 - 2017.10.24'
      }
    ]
  },

  //购买
  goToBuy() {

  }


})