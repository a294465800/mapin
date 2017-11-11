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
    lists: []
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

  //名单跳转
  getJoinRecord(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/joinrecord/joinrecord?id=' + id,
    })
  },

  //活动海报
  getPost() {
    console.log(1)
    const ctx = wx.createCanvasContext('post')

    console.log(2)
    wx.downloadFile({
      url: 'http://gb.cri.cn/mmsource/images/2015/12/24/nf151224012.jpg',
      success: res => {
        console.log('download', res)
        ctx.drawImage(res.tempFilePath, 0, 0, 375, 150)
        ctx.draw()

        setTimeout(() => {
          wx.canvasToTempFilePath({
            canvasId: 'post',
            success: (rs) => {
              console.log(rs)
              app._api.uploadImg([rs.tempFilePath], 0, res => {
                console.log(res)
                const path = 'http://139.199.207.181/' + res
                wx.previewImage({
                  urls: [path],
                })
              }, [])
            }
          })
        }, 300)
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})