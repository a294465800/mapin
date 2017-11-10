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
    const ctx = wx.createCanvasContext('post')
    this.setData({
      hide: false
    })

    ctx.drawImage('https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/iphone6-ios9-delete-app-x.jpg', 0, 0, 640, 1138)
    ctx.drawImage('http://himg2.huanqiu.com/attachment2010/2012/0829/20120829035225927.jpg', 230, 269, 220, 220)
    ctx.setFillStyle('black')
    ctx.setFontSize(30)
    ctx.fillText('价格', 230, 669)
    ctx.setFillStyle('red')
    ctx.fillText('￥25', 300, 669)
    ctx.draw(true)
    setTimeout(() => {

      wx.canvasToTempFilePath({
        canvasId: 'post',
        success: res => {
          this.setData({
            hide: true
          })
          wx.previewImage({
            urls: [res.tempFilePath],
          })
        }
      })
    }, 300)
  }

})
