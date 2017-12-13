//app.js
const _api = require('/utils/api.js')
App({

  globalData: {
    // host: 'http://139.199.207.181/Web/',
    host: 'https://www.imagine-yipin.com/Web/',
    OpenID: wx.getStorageSync('OpenID') || '',
    userInfo: null,
    uuid: ''
  },
  //全局 api
  _api: _api.api,

  onLaunch() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = JSON.parse(userInfo)
    }

    function guid() {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    const uuid = guid()
    this.globalData.uuid = uuid
    wx.getSetting({
      success: setting => {
        if (setting.authSetting['scope.userInfo']) {
          this.getUserInfo(userInfo => {
            this.globalData.userInfo = userInfo || ''
          }, true)
        }
      }
    })
  },

  //获取登录权限
  getUserInfo(callback, state) {
    const that = this
    wx.showLoading({
      title: '登录中',
    })
    if (this.globalData.OpenID) {
      wx.getUserInfo({
        success: res => {
          this._api.getUserAPI(this.globalData.OpenID, res, callback, state)
        }
      })
      wx.hideLoading()
    } else {
      wx.login({
        success: (login) => {
          wx.hideLoading()
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
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
    wx.chooseAddress({
      success(res) {
        typeof callback === 'function' && callback(res)
      },
      fail(error) {
        if (flag) {
          return false
        }
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
    wx.chooseLocation({
      success(res) {
        typeof callback === 'function' && callback(res)
      },
      fail(error) {
        if (flag) {
          return false
        }
        wx.openSetting({
          success(res) {
            if (res.authSetting['scope.userLocation']) {
              that.getLocation(callback, true)
            }
          }
        })
      }
    })
  },

  //获取自身经纬度
  getSelfLocation(callback, flag, callbackerr) {
    const that = this
    if (flag) {
      return false
    }
    wx.getLocation({
      success(res) {
        typeof callback === 'function' && callback(res)
      },
      fail(error) {
        wx.openSetting({
          success(setting) {
            if (setting.authSetting['scope.userLocation']) {
              wx.getLocation({
                success: (res) => {
                  typeof callback === 'function' && callback(res)
                },
              })
            } else {
              typeof callbackerr === 'function' && callbackerr()
            }
          }
        })
      }
    })
  }

})