// pages/createactivity/createactivity.js
const app = getApp()
Page({

  data: {
    submitForm: {
      startTime: '2017-10-21',
      endTime: '',
      sameAsShop: true,
      payAll: false,
    },

    tempImgs: []
  },

  //获取开始时间
  getStartTime(e) {
    const startTime = e.detail.value
    this.setData({
      'submitForm.startTime': startTime,
      'submitForm.endTime': startTime
    })
  },

  //获取结束时间
  getEndTime(e) {
    const endTime = e.detail.value
    this.setData({
      'submitForm.endTime': endTime
    })
  },

  //同店活动
  sameAsShop(e) {
    const sameAsShop = e.detail.value
    this.setData({
      'submitForm.sameAsShop': sameAsShop
    })
  },

  //全额支付
  payAll(e) {
    const payAll = e.detail.value
    this.setData({
      'submitForm.payAll': payAll
    })
  },

  //获取商家地址
  getShopAddress() {
    const that = this
    app.getAddress((res) => {
      that.setData({
        'submitForm.address': res.provinceName + res.cityName + res.countyName + res.detailInfo
      })
    })
  },

  //填写介绍
  goToTextarea() {
    // wx.navigateTo({
    //   url: '',
    // })
  },

  //选择图片
  chooseImg() {
    const that = this
    const oldImgs = that.data.tempImgs
    wx.chooseImage({
      count: 9,
      success(res) {
        let tmp = oldImgs.concat(res.tempFilePaths)
        if (tmp.length <= 9) {
          that.setData({
            tempImgs: tmp
          })
        } else {
          tmp.length = 9
          that.setData({
            tempImgs: tmp
          })
        }
      },
    })
  },

  //删除图片
  deleteImg(e) {
    const img = e.currentTarget.dataset.img
    let imgGroups = this.data.tempImgs
    const index = imgGroups.indexOf(img)
    imgGroups.splice(index, 1)
    this.setData({
      tempImgs: imgGroups
    })
  },

  //确认创建
  createSubmit(e) {
    const formObj = e.detail.value
    let subObj = Object.assign(this.data.submitForm, formObj)
    console.log(subObj)
  }
})