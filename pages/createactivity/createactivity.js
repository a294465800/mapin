// pages/createactivity/createactivity.js
const app = getApp()
const date = new Date()
Page({

  data: {
    payAll: true,
    RecordMainID: '',
    submitForm: {
      // RecordID: '',
      fig_Name: '',
      fig_StartDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      fig_endDate: '',
      fig_Number1: '',
      fig_Price1: '',
      fig_Number2: '',
      fig_Price2: '',
      fig_Number3: '',
      fig_Price3: '',
      fig_Address: '',
      fig_latitude: '',
      fig_longitude: '',
      fig_Tel: '',
      // fig_Number: '',
      fig_IFSameAction: 'Y',
      fig_IFAllPay: 'Y',
      fig_prepay: '',
      fig_ImgPath: []
    },

    tempImgs: []
  },

  onLoad(options) {
    const RecordMainID = options.id
    if (RecordMainID) {
      app._api.editActivity({
        RecordMainID
      }, res => {
        this.setData({
          RecordMainID,
          submitForm: res.data
        })
      })
    }
  },

  //获取开始时间
  getStartTime(e) {
    const fig_StartDate = e.detail.value
    this.setData({
      'submitForm.fig_StartDate': fig_StartDate,
      'submitForm.fig_endDate': fig_StartDate
    })
  },

  //获取结束时间
  getEndTime(e) {
    const fig_endDate = e.detail.value
    this.setData({
      'submitForm.fig_endDate': fig_endDate
    })
  },

  //同店活动
  sameAsShop(e) {
    const fig_IFSameAction = e.detail.value
    this.setData({
      'submitForm.fig_IFSameAction': fig_IFSameAction ? 'Y' : 'N'
    })
  },

  //全额支付
  payAll(e) {
    const payAll = e.detail.value
    this.setData({
      payAll,
      'submitForm.fig_IFAllPay': payAll ? 'Y' : 'N'
    })
  },

  //获取商家地址
  getShopAddress() {
    const that = this
    app.getLocation((res) => {
      that.setData({
        'submitForm.fig_latitude': res.latitude,
        'submitForm.fig_longitude': res.longitude,
        'submitForm.fig_Address': res.address,
      })
    })
  },

  //选择图片
  chooseImg() {
    const that = this
    const oldImgs = that.data.submitForm.fig_ImgPath
    wx.chooseImage({
      count: 9,
      sizeType: 'compressed',
      success(res) {
        app._api.uploadImg(res.tempFilePaths, 0, newimgs => {
          // console.log(newimgs)
          // let tmp = oldImgs.concat(newimgs)
          if (newimgs.length <= 9) {
            that.setData({
              'submitForm.fig_ImgPath': newimgs
            })
          } else {
            newimgs.length = 9
            that.setData({
              'submitForm.fig_ImgPath': newimgs
            })
          }
        }, oldImgs)
      },
    })
  },

  //删除图片
  deleteImg(e) {
    const img = e.currentTarget.dataset.img
    let imgGroups = this.data.submitForm.fig_ImgPath
    const index = imgGroups.indexOf(img)
    imgGroups.splice(index, 1)
    this.setData({
      'submitForm.fig_ImgPath': imgGroups
    })
  },

  //确认创建
  createSubmit(e) {
    const formObj = e.detail.value
    let subObj = Object.assign(this.data.submitForm, formObj, { RecordIDShop: app.globalData.userInfo.RecordID })
    console.log(subObj)
    if (!this.data.RecordMainID) {
      for (let it in subObj) {
        if (it === 'fig_prepay' && subObj.fig_IFAllPay === 'Y') {
          continue
        } else {
          if (!subObj[it]) {
            wx.showModal({
              title: '提示',
              content: '信息不能为空',
              showCancel: false
            })
            return false
          }
        }
      }
    }
    app._api.postCreateActivity(subObj, (res) => {
      wx.showToast({
        title: '创建成功',
      })
    })
  }
})