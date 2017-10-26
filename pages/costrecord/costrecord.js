// pages/costrecord/costrecord.js
const app = getApp()
Page({

  data: {
    currentNav: 1,

    //导航
    navs: [
      {
        id: 1,
        name: '拼团成功'
      },
      {
        id: 2,
        name: '正在拼团'
      }
    ],

    //模拟数据
    successLists: [
      {
        id: 1,
        shop: '绿苑精品',
        url: 'http://www.duoweifushi.com/images/goods/shopfw/main/thumb/2017/06/28/thumbnail_5653406852ba49e0a5618fd3c4671e2b.jpg',
        title: '这是一件大衣',
        price: 68,
        time: '2017.10.21 - 2017.10.24'
      },
      {
        id: 2,
        shop: '绿苑精品',
        url: 'http://www.duoweifushi.com/images/goods/shopfw/main/thumb/2017/06/28/thumbnail_5653406852ba49e0a5618fd3c4671e2b.jpg',
        title: '这是一件大衣这是一件大衣',
        price: 168,
        time: '2017.10.23 - 2017.10.27'
      }
    ],
    ingLists: [
      {
        id: 1,
        shop: '绿苑精品',
        url: 'http://www.duoweifushi.com/images/goods/shopfw/main/thumb/2017/06/28/thumbnail_5653406852ba49e0a5618fd3c4671e2b.jpg',
        title: '这是一件大衣',
        price: 68,
        time: '2017.10.21 - 2017.10.24'
      },
      {
        id: 2,
        shop: '绿苑精品',
        url: 'http://www.duoweifushi.com/images/goods/shopfw/main/thumb/2017/06/28/thumbnail_5653406852ba49e0a5618fd3c4671e2b.jpg',
        title: '这是一件大衣这是一件大衣',
        price: 168,
        time: '2017.10.23 - 2017.10.27'
      }
    ]
  },

  switchNav(e) {
    const id = e.currentTarget.dataset.id
    if (id === this.data.currentNav) {
      return false
    }
    this.setData({
      currentNav: id
    })
  }

})