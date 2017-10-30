// pages/material/material.js
const app = getApp()
Page({

  data: {
    submitForm: {
      industry: ''
    },

    industries: [
      {
        id: 1,
        name: '行业一'
      },
      {
        id: 2,
        name: '行业二'
      },
      {
        id: 3,
        name: '行业三'
      }
    ],
    currentIndustry: 0,
    region: ['广东省', '广州市', '海珠区'],

    smsOk: false,
    smsText: '获取验证码'
  },

  //获取行业
  getIndustry(e) {
    console.log(e)
  },

  //获取城市
  bindRegionChange(e) {
    console.log(e)
    this.setData({
      region: e.detail.value
    })
  },

  // 手机号码
  phoneNumber(e) {
    console.log(e)
    const re = /^1\d{10}$/
    if (!re.test(e.detail.value)) {
      this.setData({
        smsOk: false
      })
    } else {
      this.setData({
        smsOk: true
      })
    }
  },

  //获取验证码
  getSms(e) {
    let time = 60
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
  },

  //打电话
  call() {
    wx.makePhoneCall({
      phoneNumber: '020-12454212',
    })
  },

  //提交
  submit(e) {
    console.log(e)
  }

})