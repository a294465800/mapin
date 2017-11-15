// pages/activity/activity.js
const app = getApp()
Page({

  data: {
    loading: true,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://d.5857.com/hh_170601/001.jpg',
      'http://img.zcool.cn/community/03320dd554c75c700000158fce17209.jpg'
    ],

    currentSort: 1,
    page: 1,
    flag: false,
    close: false,

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
    lists: []
  },

  onLoad() {
    app._api.getAllActivity('', res => {
      this.setData({
        lists: res.data.TeamList,
        loading: false
      })
    })
  },

  //页面分享
  onShareAppMessage(res) {
    return {
      title: '拼团活动',
      path: '/paegs/shop/shop',
      success(res) {
        // 转发成功
      },
      fail(res) {
        // 转发失败
      }
    }
  },

  //购买
  goToBuy(e) {
    const RecordMainID = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/commodity/commodity?RecordMainId=' + RecordMainID,
    })
  },

  //排序
  sortFnc(e) {
    const id = e.currentTarget.dataset.id
    wx.showLoading({
      title: '加载中',
    })
    app._api.getAllActivity({ orderType: id }, res => {
      wx.hideLoading()
      this.setData({
        lists: res.data.TeamList,
        currentSort: id,
        page: 1,
        close: false,
      })
    })
  },

  //创建活动
  createActivity() {
    wx.navigateTo({
      url: '/pages/rules/rules',
    })
  },

  //触底刷新
  onReachBottom() {
    const flag = this.data.flag
    const close = this.data.close
    const page = this.data.page
    const currentSort = this.data.currentSort
    if (flag || close) {
      return false
    }
    this.setData({
      flag: true
    })
    wx.showLoading({
      title: '加载中',
    })
    app._api.getAllActivity({ orderType: currentSort, page: page + 1 }, res => {
      wx.hideLoading()
      if (res.data.TeamList.length) {
        this.setData({
          lists: [...this.data.lists, ...res.data.TeamList],
          page: page + 1,
          flag: false,
        })
      } else {
        this.setData({
          page: page + 1,
          flag: false,
          close: true
        })
      }
    })
  }


})