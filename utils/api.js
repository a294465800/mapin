// const host = 'http://139.199.207.181/Web/'
// const host_upload = 'http://139.199.207.181/'
const host_upload = 'https://www.imagine-yipin.com/'
const host = 'https://www.imagine-yipin.com/Web/'
let timer = null

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
  getUserAPI(OpenID, wxUserInfo, callback, state) {
    _http.get(host + 'UserGet.aspx', {
      OpenID
    }).then(res => {
      if (res.data.ErrMsg) {
        if (state) {
          typeof callback === 'function' && callback()
          return false
        }
        wx.showToast({
          title: '请先注册',
        })
        timer = setTimeout(() => {
          wx.navigateTo({
            url: '/pages/myinfo/myinfo',
          })
          clearTimeout(timer)
        }, 300)
        return false
      }
      wx.setStorage({
        key: 'userInfo',
        data: JSON.stringify(res.data),
      })
      typeof callback === 'function' && callback(res.data)
    }).catch(err => {
      wx.showModal({
        title: '提示',
        content: err.data,
        showCancel: false
      })
    })
  },

  //获取验证码
  postSms(data, callback) {
    _http.post(host + 'UserSMS.aspx', data)
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
      wx.hideLoading()
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

  //处理商家活动
  handleActivity(data, callback) {
    _http.get(`${host}GroupDeal.aspx`, data)
      .then(res => {
        if (res.data.ErrMsg) {
          wx.showModal({
            title: '提示',
            content: res.data.ErrMsg,
            showCancel: false
          })
        } else {
          typeof callback === 'function' && callback(res)
        }
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
        wx.hideLoading()
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

  //获取报名记录
  getJoinRecord(data, callback) {
    _http.get(`${host}GroupAtendOK.aspx`, data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      })
      .catch(err => {
        console.log(1)
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //获取名单详情
  getJoinDetail(data, callback) {
    _http.get(`${host}GroupAtendOKDetail.aspx`, data)
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

  //消费记录
  getCostRecords(data, callback) {
    _http.get(`${host}GroupConsumeList`, data)
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

  //获取商家海报
  getShopPost(data, callback) {
    _http.get(`${host}CreatePosterShop.aspx`, data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      })
      .catch(err => {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //获取团长海报
  getOrderPost(data, callback) {
    _http.get(`${host}CreatePosterGroup.aspx`, data)
      .then(res => {
        typeof callback === 'function' && callback(res)
      })
      .catch(err => {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: err.data,
          showCancel: false
        })
      })
  },

  //点击、分享
  addShareAndClick(data, callback) {
    _http.get(`${host}GroupClickShare.aspx`, data)
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

  //支付测试
  // payTest(callback) {
  //   _http.get(`${host_upload}Pay/PayPre.aspx`)
  //     .then(res => {
  //       typeof callback === 'function' && callback(res)
  //     })
  //     .catch(err => {
  //       wx.showModal({
  //         title: '提示',
  //         content: err.data,
  //         showCancel: false
  //       })
  //     })
  // }

}

module.exports = { api }