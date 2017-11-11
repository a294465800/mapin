//index.js
const app = getApp()
Page({
  data: {
    hide: true
  },
  onLoad() {

  },

  /*
  * 扫描二维码
  */
  scan() {
    wx.scanCode({
      success: res => {
        console.log(res)
      }
    })
  },

  //测试
  test() {
    wx.showLoading({
      title: '图片生成中',
    })
    const ctx = wx.createCanvasContext('post')
    this.setData({
      hide: false
    })

    ctx.drawImage('https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/iphone6-ios9-delete-app-x.jpg', 0, 0, 1080, 1748)
    ctx.drawImage('http://img.sc115.com/uploads1/sc/jpgs/1511/apic23847_sc115.com.jpg', 0, 580, 1080, 1168)
    ctx.drawImage('http://himg2.huanqiu.com/attachment2010/2012/0829/20120829035225927.jpg', 330, 800, 420, 420)
    ctx.setFillStyle('black')
    ctx.setFontSize(50)
    ctx.fillText('价格', 430, 1300)
    ctx.setFillStyle('red')
    ctx.fillText('￥25', 530, 1300)
    ctx.draw(true)
    setTimeout(() => {

      wx.canvasToTempFilePath({
        canvasId: 'post',
        success: res => {
          this.setData({
            hide: true
          })
          wx.hideLoading()
          wx.previewImage({
            urls: [res.tempFilePath],
          })
        }
      })
    }, 1000)
  }

})
