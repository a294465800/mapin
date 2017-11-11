// pages/myinfo/myinfo.js
const app = getApp()
Page({

  data: {
    sexText: ['保密', '男', '女'],

    //加载判断
    loading: true,
    smsOk: false,
    smsText: '获取验证码',

    //用户信息表
    userForm: {
      user_Type: '',
      user_latitude: '',
      user_longitude: '',
      user_Address: '',
      user_Name: '',
      user_Sex: 0,
      user_Company: '',
      user_Post: '',
      verifyNumber: ''
    }
  },
  onLoad(options) {
    const that = this
    //初次注册
    let userInfoStr = options.wxUserInfo || ''
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr)
      this.setData({
        'userForm.user_Name': userInfo.nickName,
        'userForm.user_Sex': userInfo.gender,
        'userForm.avatarUrl': userInfo.avatarUrl,
        loading: false
      })
      app.globalData.OpenID = wx.getStorageSync('OpenID')
    } else {
      app._api.getUserAPI(app.globalData.OpenID, null, (res) => {
        this.setData({
          userForm: res,
          loading: false
        })
        wx.setStorage({
          key: 'userInfo',
          data: JSON.stringify(res),
        })
      })
    }
  },
  // 手机号码
  phoneNumber(e) {
    const re = /^1\d{10}$/
    if (!re.test(e.detail.value)) {
      this.setData({
        smsOk: false,
        number: e.detail.value
      })
    } else {
      this.setData({
        smsOk: true,
        number: e.detail.value
      })
    }
  },

  //获取验证码
  getSms(e) {
    let time = 60
    app._api.postSms({ user_Tel: this.data.number }, res => {
      let timer = setInterval(() => {
        if (time <= 0) {
          clearInterval(timer)
          this.setData({
            smsText: '获取验证码',
            smsOk: true
          })
        } else {
          time--
          this.setData({
            smsText: time + '秒后重新获取',
            smsOk: false
          })
        }
      }, 1000)
    })
  },

  //微信地图，选择地址
  getLocation() {
    const that = this
    app.getLocation((res) => {
      that.setData({
        'userForm.user_latitude': res.latitude,
        'userForm.user_longitude': res.longitude,
        'userForm.user_Address': res.address,
      })
    })
  },

  //微信地址
  getAddress() {
    const that = this
    app.getAddress(res => {
      that.setData({
        'userForm.user_Address': res.provinceName + res.cityName + res.countyName + res.detailInfo,
      })
    })
  },

  //保存用户信息
  saveUserInfo(e) {
    const formData = e.detail.value
    let postForm = Object.assign(this.data.userForm, formData, { OpenID: app.globalData.OpenID })
    app._api.postUserAPI(postForm, (res) => {
      wx.showToast({
        title: '保存成功',
      })
      wx.setStorage({
        key: 'userInfo',
        data: JSON.stringify(postForm),
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/mine/mine',
        })
      }, 300)
    })
  },

  //打电话
  call(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },

})