// pages/activity/activity.js
const app = getApp()
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const demo = new QQMapWX({
  key: 'EUNBZ-MIEKW-LPMR7-ODGYY-IKEIH-Y3B4O'
});
Page({

  data: {
    loading: true,
    imgUrls: [
      'http://139.199.207.181/images/11.jpg',
      'http://139.199.207.181/images/22.jpg',
      'http://139.199.207.181/images/33.jpg'
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
      title: '蚂蚁拼团',
      path: '/pages/shop/shop',
      success(res) {
        // 转发成功
      },
      fail(res) {
        // 转发失败
      }
    }
  },

  //示例
  goToInstance() {
    wx.navigateTo({
      url: '/pages/instance/instance',
    })
  },

  //购买
  goToBuy(e) {
    const RecordMainID = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/commodity/commodity?RecordMainID=' + RecordMainID,
    })
  },

  //排序
  sortFnc(e) {
    const id = e.currentTarget.dataset.id
    let getData = {
      orderType: id
    }
    wx.showLoading({
      title: '加载中',
    })

    if (id === 2) {
      app.getSelfLocation(res => {
        demo.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: (rs) => {
            const cityData = rs.result.address_component
            getData.fig_Latitude = res.latitude
            getData.fig_Longitude = res.longitude
            getData.fig_region = cityData.province + cityData.city + cityData.district
            getData.TmpUserID = app.globalData.uuid
            app._api.getAllActivity(getData, res => {
              wx.hideLoading()
              this.setData({
                lists: res.data.TeamList,
                currentSort: id,
                page: 1,
                close: false
              })
            })
          },
        })
      }, false, () => {
        wx.showToast({
          title: '获取失败'
        })
        this.setData({
          lists: [],
          currentSort: id,
          page: 1,
          close: false
        })
      })
    } else {
      app._api.getAllActivity(getData, res => {
        wx.hideLoading()
        this.setData({
          lists: res.data.TeamList,
          currentSort: id,
          page: 1,
          close: false
        })
      })
    }
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