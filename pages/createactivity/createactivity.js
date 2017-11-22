// pages/createactivity/createactivity.js
const app = getApp()
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const demo = new QQMapWX({
  key: 'EUNBZ-MIEKW-LPMR7-ODGYY-IKEIH-Y3B4O'
});
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
    rules: [
      '点击我要开团或单独开团，可以发起一个新的团。点击我要参与或未满团推荐的团即可参与好友或其他已发起的团。',
      '填写信息，并付款成功即参团或开团成功。',
      '如开团提示“活动太火爆，名额已满”，你可以选择参与页面推荐的未满团，或者联系商家增加商品数量。',
      '活动时间内人数达到所选参团人数，组团成功，活动结束仍未达参团人数则拼团失败。',
      '拼团失败的的订单，系统将在活动结束后3-5个工作日内原路退回至原支付的微信钱包。',
      '若人为因素刷单等恶意参与, 本机构有权解除团员参与资格。'
    ],

    tempImgs: [],

    num1: '',
    num2: '',
    num3: '',
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

  getNumberOne(e) {
    const num = Number(e.detail.value)
    if (num < 1) {
      wx.showToast({
        title: '人数不能为 0',
      })
      return false
    }
    if (num < this.data.num2 || !this.data.num2) {
      this.setData({
        num1: num
      })
    } else {
      wx.showToast({
        title: '人数应递增',
      })
    }
  },
  getNumberTwo(e) {
    const num = Number(e.detail.value)
    if (num < 1) {
      wx.showToast({
        title: '人数不能为 0',
      })
      return false
    }
    if (num > this.data.num1) {
      this.setData({
        num2: num
      })
    } else {
      wx.showToast({
        title: '人数应递增',
      })
    }
  },
  getNumberThree(e) {
    const num = Number(e.detail.value)
    if (num < 1) {
      wx.showToast({
        title: '人数不能为 0',
      })
      return false
    }
    if (num > this.data.num2) {
      this.setData({
        num3: num
      })
    } else {
      wx.showToast({
        title: '人数应递增',
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
      demo.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: (rs) => {
          console.log(rs)
          const cityData = rs.result.address_component
          this.setData({
            'submitForm.fig_latitude': res.latitude,
            'submitForm.fig_longitude': res.longitude,
            'submitForm.fig_region': cityData.province + cityData.city + cityData.district
          })
        },
      })
    })
  },

  //选择图片
  chooseImg() {
    const that = this
    const oldImgs = that.data.submitForm.fig_ImgPath
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.chooseImage({
      count: 9,
      sizeType: 'compressed',
      success(res) {
        app._api.uploadImg(res.tempFilePaths, 0, newimgs => {
          wx.hideLoading()
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
        complete: rs => {
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        }
      })
    })
  }
})