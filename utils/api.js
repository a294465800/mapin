const host = 'http://139.199.207.181/Web/'

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
    wx.request({
      url: host + 'GetOpenID.aspx',
      data: {
        Code: login.code,
        iv: wxUserInfo.iv,
        encryptedData: wxUserInfo.encryptedData
      },
      success: res => {
        wx.setStorage({
          key: 'OpenID',
          data: res.data.OpenID,
        })
        this.getUserAPI(res.data.OpenID, wxUserInfo, (userInfo) => {
          typeof callback === 'function' && callback(userInfo)
        })
      },
      fail: error => {
        this.errorFnc()
      }
    })
  },

  //获取用户信息
  getUserAPI(OpenID, wxUserInfo, callback) {
    wx.request({
      url: host + 'UserGet.aspx',
      data: {
        OpenID
      },
      success: res => {
        if (res.data.toLowerCase() === 'failed') {
          wx.showToast({
            title: '请先注册',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/myinfo/myinfo?wxUserInfo=' + JSON.stringify(wxUserInfo.userInfo),
            })
          }, 300)
        } else {
          wx.setStorage({
            key: 'userInfo',
            data: res.data,
          })
          typeof callback === 'function' && callback(res.data)
        }
      },
      fail: error => {
        this.errorFnc()
      }
    })
  },

  //提交用户信息
  postUserAPI(data, callback) {
    wx.request({
      url: host + 'UserSave.aspx',
      method: 'POST',
      data: data,
      success: res => {
        if (res.data.toLowerCase() === 'failed') {
          this.errorFnc()
        } else {
          typeof callback === 'function' && callback(res)
        }
      },
      fail: error => {
        this.errorFnc()
      }
    })
  }
}

module.exports = { api }