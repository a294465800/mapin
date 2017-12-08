// pages/recharge/recharge.js
const app = getApp()
Page({

  data: {

    currentMode: 1,
    currentIndex: 0,
    loading: true,
    discountCode: '',


    //收费模式
    modes: [
      {
        id: 1,
        title: '三天（试用）',
        price: 388,
        // remark: '每月388元'
      },
      {
        id: 2,
        title: '一个月',
        price: 0,
        // remark: '每月15 元，省1388元'
      },
      {
        id: 3,
        title: '六个月',
        price: 0,
        // remark: '（送一对一活动策划辅导）'
      },
      {
        id: 4,
        title: '一年',
        price: 0,
        // remark: '（送一对一活动策划辅导）'
      }
    ],
  },

  onLoad() {
    wx.showLoading({
      title: '加载中',
    })
    app._api.getRecharge(res => {
      wx.hideLoading()
      const data = res.data
      this.setData({
        'modes[0].price': data.money1,
        'modes[1].price': data.money2,
        'modes[2].price': data.money3,
        'modes[3].price': data.money4,
        loading: false
      })
    })
  },

  //选择模式
  chooseMode(e) {
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index
    this.setData({
      currentMode: id,
      currentIndex: index
    })
  },

  //协议
  goToProtocol() {
    wx.navigateTo({
      url: '/pages/helptext/helptext?id=4&title=蚁拼服务协议',
    })
  },

  //获取 input
  getCoupon(e) {
    const value = e.detail.value
    this.setData({
      discountCode: value
    })
  },

  //支付
  pay() {
    const data = this.data.modes[this.data.currentIndex]
    const userInfo = JSON.parse(wx.getStorageSync('userInfo'))
    const postData = {
      rec_Type: data.id,
      rec_Money: data.price,
      RecordIDShop: userInfo.RecordID,
      discountCode: this.data.discountCode
    }
    app._api.postRechargeID(postData, res => {
      app._api.postRechargePay({ RecordID: res.data.RecordID }, resPay => {
        const payData = resPay.data
        wx.requestPayment({
          timeStamp: payData.timeStamp,
          nonceStr: payData.nonceStr,
          package: payData.package,
          signType: payData.signType,
          paySign: payData.paySign,
          success: payok => {
            wx.showToast({
              title: '支付成功',
              complete: () => {
                wx.navigateBack()
              }
            })
          },
          fail: fail => {
            wx.showLoading({
              title: '已取消',
            })
          }
        })
      })
    })
  }

})