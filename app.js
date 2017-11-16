//app.js
const _api = require('/utils/api.js')
App({

  globalData: {
    host: 'http://139.199.207.181/Web/',
    OpenID: wx.getStorageSync('OpenID') || '',
    userInfo: null,
  },
  //全局 api
  _api: _api.api,

  onLaunch() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = JSON.parse(userInfo)
    }
  },

  //获取登录权限
  getUserInfo(callback) {
    const that = this
    wx.showLoading({
      title: '登录中',
    })
    if (this.globalData.OpenID) {
      wx.getUserInfo({
        success: res => {
          this._api.getUserAPI(this.globalData.OpenID, res, callback)
        }
      })
      wx.hideLoading()
    } else {
      wx.login({
        success: (login) => {
          console.log(login)
          wx.hideLoading()
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              console.log(res)
              this._api.openIDApi(login, res, callback)
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
    }
  },

  //获取地址，微信地址
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

  //获取经纬度，微信地图
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