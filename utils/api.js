const host = 'http://139.199.207.181/Web/'

//请求 promise 封装
const _http = {
  get: function (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'GET',
        success: res => {
          const status = typeof res.data
          if (status === 'string') {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(res)
        }
      })
    })
  },
  post: function (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          const status = typeof res.data
          if (status === 'string') {
            reject(res)
          } else {
            resolve(res)
          }
        },
        fail: err => {
          reject(res)
        }
      })
    })
  }
}

let api = {

  //出错提示
  errorFnc() {
    wx.showModal({
      title: '提示',
      content: '服务器出错啦',
    })
  },


  //登录接口
  openIDApi: function (login, wxUserInfo, callback) {
    _http.get(host + 'GetOpenID.aspx', {
      Code: login.code,
      iv: wxUserInfo.iv,
      encryptedData: wxUserInfo.encryptedData
    }).then(res => {
      wx.setStorage({
        key: 'OpenID',
        data: res.data.OpenID,
      })
      this.getUserAPI(res.data.OpenID, wxUserInfo, (userInfo) => {
        typeof callback === 'function' && callback(userInfo)
      })
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: err.data,
      })
    })
  },

  //获取用户信息
  getUserAPI(OpenID, wxUserInfo, callback) {
    _http.get(host + 'UserGet.aspx', {
      OpenID
    }).then(res => {
      wx.setStorage({
        key: 'userInfo',
        data: res.data,
      })
      typeof callback === 'function' && callback(res.data)
    }).catch(err => {
      wx.showToast({
        title: '请先注册',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/myinfo/myinfo?wxUserInfo=' + JSON.stringify(wxUserInfo.userInfo),
        })
      }, 300)
    })
  },

  //提交用户信息
  postUserAPI(data, callback) {
    _http.post(host + 'UserSave.aspx', data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      }).catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
        })
      })
    // wx.request({
    //   url: host + 'UserSave.aspx',
    //   method: 'POST',
    //   data: data,
    //   success: res => {
    //     if (res.data.toLowerCase() === 'failed') {
    //       this.errorFnc()
    //     } else {
    //       typeof callback === 'function' && callback(res)
    //     }
    //   },
    //   fail: error => {
    //     this.errorFnc()
    //   }
    // })
  }
}

module.exports = { api }