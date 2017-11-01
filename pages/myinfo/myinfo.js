// pages/myinfo/myinfo.js
const app = getApp()
Page({

  data: {
    sexText: ['保密', '男', '女'],

    //加载判断
    loading: true,

    //用户信息表
    userForm: {
      user_Type: '',
      user_latitude: '',
      user_longitude: '',
      user_Address: '',
      user_Name: '',
      user_Sex: 0,
      user_Company: '',
      user_Post: ''
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
    } else {
      wx.getStorage({
        key: 'userInfo',
        success(res) {
          that.setData({
            userForm: JSON.parse(res.data),
            loading: false
          })
        },
      })
    }
  },

  //微信地图，选择地址
  getLocation() {
    const that = this
    app.getLocation((res) => {
      console.log(res)
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
  }

})