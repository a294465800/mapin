const host = 'http://139.199.207.181/Web/'
const host_upload = 'http://139.199.207.181/'

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


  //获取 OpenID
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
        showCancel: false
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
      })
      .catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //创建活动提交
  postCreateActivity(data, callback) {
    _http.post(host + 'GroupCreateSave.aspx', data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      }).catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //图片上传
  uploadImg: function (imgs, n, cb, arr) {
    if (imgs[n]) {
      wx.uploadFile({
        url: host_upload + 'UploadFiles.aspx',
        filePath: imgs[n],
        name: 'fileImages',
        success: res => {
          const tmp = JSON.parse(res.data)
          arr.push(tmp.filePath)
          return this.uploadImg(imgs, n + 1, cb, arr)
        },
        fail: err => {
          this.errorFnc()
        }
      })
    } else {
      typeof cb === 'function' && cb(arr)
    }
  },

  //活动管理列表
  getActivityList(data, callback) {
    _http.get(`${host}GroupCreateGetAll.aspx`, data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      })
      .catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //活动管理列表编辑
  editActivity(data, callback) {
    _http.get(`${host}GroupCreateGet.aspx`, data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      })
      .catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //消费者获取所有活动
  getAllActivity(data, callback) {
    _http.get(`${host}GroupTeamGetAll.aspx`, data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      })
      .catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //消费者获取单个活动
  getActivity(data, callback) {
    _http.get(`${host}GroupTeamGet.aspx`, data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      })
      .catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //开团、参团
  joinActivity(data, callback) {
    _http.post(host + 'GroupTeamSave.aspx', data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      }).catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //活动成功的结果
  getActivityResult(data, callback) {
    _http.get(`${host}GroupTeamResult.aspx`, data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      })
      .catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //获取更多团信息
  getMoreGroups(data, callback) {
    _http.get(`${host}GroupTeamGetMore.aspx`, data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      })
      .catch(err => {
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },
}

module.exports = { api }