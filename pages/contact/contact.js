// pages/contact/contact.js
Page({

  data: {
    currentQr: -1,

    //二维码客服
    kefus: [
      {
        id: 1,
        name: 'SHINING1',
        qrcode: 'https://upload.wikimedia.org/wikipedia/commons/0/09/%28%E8%AE%A8%E8%AE%BA-2%29%E7%BB%B4%E5%9F%BA%E7%99%BE%E7%A7%91%E7%BE%A4%E4%BA%8C%E7%BB%B4%E7%A0%81.png'
      },
      {
        id: 2,
        name: 'JACK',
        qrcode: 'https://upload.wikimedia.org/wikipedia/commons/0/09/%28%E8%AE%A8%E8%AE%BA-2%29%E7%BB%B4%E5%9F%BA%E7%99%BE%E7%A7%91%E7%BE%A4%E4%BA%8C%E7%BB%B4%E7%A0%81.png'
      }
    ]
  },

  //打电话
  call() {
    wx.showLoading({
      title: '加载中',
    })
    wx.makePhoneCall({
      phoneNumber: '18142883149',
      fail(fail) {
        console.log(fail, 'fail')
      },
      success(fail) {
        console.log(fail, 'success')
      },
      complete() {
        console.log('complate')
        wx.hideLoading()
      }
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