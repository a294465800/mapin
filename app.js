//app.js
let _api = require('/utils/api.js')
App({

  globalData: {
    host: 'http://139.199.207.181/Web/'
  },

  //登录api
  loginApi(login, userInfo) {
    // _api.loginAPI()
    wx.request({
      url: this.globalData.host + 'GetOpenID.aspx',
      data: {
        Code: login.code,
        iv: userInfo.iv,
        encryptedData: userInfo.encryptedData
      },
      success: res => {
        console.log(res)
      }
    })

  },

  //获取登录权限
  getUserInfo(callback) {
    const that = this
    wx.showLoading({
      title: '登录中',
    })
    wx.login({
      success: (login) => {
        wx.hideLoading()
        wx.getUserInfo({
          withCredentials: true,
          success: res => {
            this.loginApi(login, res)
            typeof callback === 'function' && callback(res.userInfo)
          },
          fail: (error) => {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.userInfo']) {
                  that.getUserInfo(callback)
                }
              }
            })
          }
        })
      }
    })
  },

  //获取地址
  getAddress(callback, flag) {
    const that = this
    if (flag) {
      return false
    }
    wx.chooseAddress({
      success(res) {
        typeof callback === 'function' && callback(res)
      },
      fail(error) {
        wx.openSetting({
          success(res) {
            if (res.authSetting['scope.address']) {
              that.getAddress(callback, true)
            }
          }
        })
      }
    })
  },

  //获取经纬度
  getLocation(callback, flag) {
    const that = this
    if (flag) {
      return false
    }
    wx.chooseLocation({
      success(res) {
        typeof callback === 'function' && callback(res)
      },
      fail(error) {
        wx.openSetting({
          success(res) {
            if (res.authSetting['scope.userLocation']) {
              that.getLocation(callback, true)
            }
          }
        })
      }
    })
  }

})