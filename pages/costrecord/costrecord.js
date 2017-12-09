// pages/costrecord/costrecord.js
const app = getApp()
Page({

  data: {
    currentNav: 1,
    loading: true,

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

    stateText: {
      N: '正在拼团',
      Y: '拼团成功'
    },

    stateImg: {
      N: '/images/icon/ing.png',
      Y: '/images/icon/ok.png'
    },


    lists: [],
  },

  onLoad() {
    const OpenID = wx.getStorageSync('OpenID')
    app._api.getCostRecords({ OpenID }, res => {
      console.log(res)
      this.setData({
        lists: res.data.ConsumeList,
        loading: false
      })
    })
  },

  //切换导航
  // switchNav(e) {
  //   const id = e.currentTarget.dataset.id
  //   if (id === this.data.currentNav) {
  //     return false
  //   }
  //   this.setData({
  //     currentNav: id
  //   })
  // },

  //查看订单
  checkCostDetail(e) {
    const RecordID = e.currentTarget.dataset.recordid
    wx.navigateTo({
      url: '/pages/costdetail/costdetail?RecordID=' + RecordID,
    })
  },

  //获取核销码
  getCodeImg(e) {
    wx.showLoading({
      title: '核销码生成中',
    })
    const RecordID = e.currentTarget.dataset.recordid
    app._api.getConfirmQRCode({ RecordID }, res => {
      console.log(res)
      this.setData({
        currentPost: res.data.PoserUrl
      })
      wx.hideLoading()
      wx.previewImage({
        urls: [res.data.PoserUrl],
      })
    })
  }

})