// pages/activityrecord/activityrecord.js
const app = getApp()
Page({

  data: {
    currentActivity: null,
    loading: true,

    statusText: ['出售中', '已下线'],
    page: 1,
    close: false,

    //接口数据
    lists: [],
    currentPost: ''
  },

  onLoad() {
    app._api.getActivityList({
      RecordIDShop: app.globalData.userInfo.RecordID
    }, res => {
      this.setData({
        lists: res.data.ActionList,
        loading: false
      })
    })
  },

  //触底加载
  onReachBottom() {
    const page = this.data.page
    const close = this.data.close
    if (close) {
      return false
    }
    wx.showLoading({
      title: '加载中',
    })
    app._api.getActivityList({
      RecordIDShop: app.globalData.userInfo.RecordID,
      page: page + 1
    }, res => {
      wx.hideLoading()
      if (res.data.length) {
        this.setData({
          lists: [...this.data.lists, ...res.data.ActionList],
          page: page + 1,
          close: true
        })
      } else {
        this.setData({
          page: page + 1,
          close: true
        })
      }
    })
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

  //编辑
  goToEditActivity(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/createactivity/createactivity?id=' + id,
    })
  },

  //下线
  offlineActivity(e) {
    const dataset = e.currentTarget.dataset
    const index = dataset.index
    let state = dataset.state
    let text = '下线'
    let DealType = 1
    if(state === 'N'){
      text = '上线'
      DealType = 3
      state = 'Y'
    } else {
      state = 'N'
    }
    const getData = {
      RecordMainID: dataset.id,
      DealType
    }
    wx.showModal({
      title: '提示',
      content: `确认${text}该活动吗？`,
      success: ok => {
        if (ok.confirm) {
          app._api.handleActivity(getData, res => {
            this.setData({
              [`lists[${index}]fig_IFOnline`]: state
            })
          })
        }
      }
    })
  },

  //删除
  deleteActivity(e) {
    const dataset = e.currentTarget.dataset
    const index = dataset.index
    let lists = this.data.lists
    const getData = {
      RecordMainID: dataset.id,
      DealType: 2
    }
    wx.showModal({
      title: '提示',
      content: '确认删除该活动吗？',
      success: ok => {
        if (ok.confirm) {
          app._api.handleActivity(getData, res => {
            lists.splice(index, 1)
            this.setData({
              lists: lists
            })
          })
        }
      }
    })
  },

  //名单跳转
  getJoinRecord(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/joinrecord/joinrecord?id=' + id,
    })
  },

  //活动海报
  getPost(e) {
    wx.showLoading({
      title: '海报生成中',
    })
    const RecordMainID = e.currentTarget.dataset.recordmainid
    app._api.getShopPost({ RecordMainID }, res => {
      this.setData({
        currentPost: res.data.PoserUrl
      })
      wx.hideLoading()
      wx.previewImage({
        urls: [res.data.PoserUrl],
      })
    })
  },

  //立即创建
  creatActivity() {
    wx.navigateTo({
      url: '/pages/rules/rules',
    })
  }
})