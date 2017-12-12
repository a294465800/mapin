// pages/contact/contact.js
Page({

  data: {
    currentQr: -1,

    //二维码客服
    kefus: [
      {
        id: 1,
        name: 'huangkk2211',
        qrcode: 'http://139.199.207.181/images/qr.jpg'
      },
    ]
  },

  //打电话
  call() {
    wx.showLoading({
      title: '加载中',
    })
    wx.makePhoneCall({
      phoneNumber: '18142883149',
    })
  },

  //定位
  locate() {
    wx.showLoading({
      title: '加载中',
    })
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        wx.hideLoading()
        let latitude = res.latitude
        let longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28,
          address: '上海市徐汇区漕宝路120号内40号楼'
        })
      }
    })
  },

  //展示客服
  showQr(e) {
    const index = e.currentTarget.dataset.index
    const currentIndex = this.data.currentQr
    if (index === currentIndex) {
      this.setData({
        currentQr: -1
      })
    } else {
      this.setData({
        currentQr: index
      })
    }
  },

  //图片预览
  preImg(e) {
    const img = e.currentTarget.dataset.img
    wx.previewImage({
      urls: [img],
    })
  }
})