// pages/commodity/commodity.js
const app = getApp()

Page({

  data: {
    imgUrls: [],
    loading: true,
    currentPrice: 0,
    currentGroup: 0,
    joinGroup: '',
    showDetail: false,
    showMoreGroup: false,

    //头像循环
    avatarTmpArr: ['', '', ''],
    typeIndex: 1,

    moreGroups: [],

    //活动规则
    rules: [
      '点击我要开团或单独开团，可以发起一个新的团。点击我要参与或未满团推荐的团即可参与好友或其他已发起的团。',
      '填写信息，并付款成功即参团或开团成功。',
      '如开团提示“活动太火爆，名额已满”，你可以选择参与页面推荐的未满团，或者联系商家增加商品数量。',
      '活动时间内人数达到所选参团人数，组团成功，活动结束仍未达参团人数则拼团失败。',
      '拼团失败的的订单，系统将在活动结束后3-5个工作日内原路退回至原支付的微信钱包。',
      '若人为因素刷单等恶意参与, 本机构有权解除团员参与资格。'
    ],

    commodity: null,
    fromShare: false,
    openFlag: false,
    shareInfo: null,
    RecordMainID: ''

  },

  onLoad(options) {
    const share = options.type
    if (share === undefined) {
    } else {
      this.setData({
        fromShare: true
      })
      app._api.getActivityResult({ RecordID: options.RecordID }, res => {
        this.setData({
          shareInfo: res.data,
        })
      })
    }
    app._api.addShareAndClick({ fig_type: 1, RecordMainID: options.RecordMainID }, rs => {
      app._api.getActivity({ RecordMainID: options.RecordMainID }, res => {
        this.setData({
          commodity: res.data,
          loading: false,
          currentPrice: res.data.fig_Price1,
          currentGroup: res.data.fig_Number1,
          RecordMainID: options.RecordMainID
        })
      })
    })
  },

  onShow() {
    if (this.data.commodity) {
      app._api.getActivity({ RecordMainID: this.data.RecordMainID }, res => {
        this.setData({
          commodity: res.data,
          currentPrice: res.data.fig_Price1,
          currentGroup: res.data.fig_Number1
        })
      })
    }
  },

  //页面分享
  onShareAppMessage(res) {
    const that = this
    return {
      title: this.data.commodity.fig_Name,
      path: '/pages/commodity/commodity?RecordMainID=' + this.data.commodity.RecordMainID,
      success(res) {
        // 转发成功
        app._api.addShareAndClick({ fig_type: 2, RecordMainID: that.data.commodity.RecordMainID })
      },
      fail(res) {
        // 转发失败
      }
    }
  },

  //当前开团类型
  changeGroupType(e) {
    const index = e.currentTarget.dataset.index
    const price = e.currentTarget.dataset.price
    const group = e.currentTarget.dataset.group_number
    if (index === this.data.typeIndex) {
      return false
    }
    this.setData({
      typeIndex: index,
      currentPrice: price,
      currentGroup: group,
      openFlag: true
    })
  },

  //查看更多拼团
  showMoreGroup() {
    const RecordMainID = this.data.commodity.RecordMainID
    app._api.getMoreGroups({ RecordMainID }, res => {
      this.setData({
        showMoreGroup: true,
        moreGroups: res.data.OnGroups
      })
    })
  },

  //隐藏更多拼团
  hideMoreGroup() {
    this.setData({
      showMoreGroup: false
    })
  },

  preImg(e) {
    const current = e.currentTarget.dataset.img
    wx.previewImage({
      current,
      urls: this.data.imgUrls,
    })
  },

  //参团信息显示
  showDetail() {
    this.setData({
      showDetail: true
    })
  },

  //参团信息隐藏
  hideDetail() {
    this.setData({
      showDetail: false
    })
  },

  //显示储存开团信息
  showSaveDetail(e) {
    const index = e.currentTarget.dataset.join_group
    const mode = e.currentTarget.dataset.mode
    let currentSubGroup = {}
    if (mode == '1') {
      currentSubGroup = this.data.commodity.OnGroups[index]
    } else if (mode == '2') {
      currentSubGroup = this.data.moreGroups[index]
    }
    this.setData({
      showDetail: true,
      joinGroup: index,
      currentSubGroup: currentSubGroup
    })
  },

  //参团
  joinActivity(e) {
    console.log(this.data.commodity)
    console.log(app.globalData.OpenID)
    const type = e.currentTarget.dataset.type
    let postData = {
      RecordIDShop: this.data.commodity.RecordIDShop,
      type: type,
      fight_Type: this.data.typeIndex,
      OpenID: app.globalData.OpenID,
      RecordMainID: this.data.commodity.RecordMainID
    }
    let text = ''
    if (type == '1') {
      text = `你即将创建${this.data.currentGroup}人团，价格为${this.data.currentPrice}元，团长优惠${this.data.commodity.fig_OuterMoney}元，确定付款吗？`
    }
    else if (type == '2') {
      const currentGroup = this.data.currentSubGroup
      postData.RecordSubID = currentGroup.RecordSubID
      text = `你即将参加${currentGroup.fig_AttendTypeNum}人团，价格为${currentGroup.price}元，确定付款吗？`
    }
    wx.showModal({
      title: '提示',
      content: text,
      success: ok => {
        if (ok.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          app._api.joinActivity(postData, res => {
            const RecordID = res.data.RecordID
            app._api.payRequest({ RecordID }, pay => {
              wx.hideLoading()
              wx.requestPayment({
                timeStamp: pay.timeStamp,
                nonceStr: pay.nonceStr,
                package: pay.package,
                signType: pay.signType,
                paySign: pay.paySign,
                success: success => {
                  wx.showToast({
                    title: '成功',
                    complete: () => {
                      wx.navigateTo({
                        url: '/pages/costdetail/costdetail?RecordID=' + RecordID,
                      })
                    }
                  })
                },
                fail: fail => {
                  wx.showToast({
                    title: '取消支付',
                  })
                },
                complete: com => {
                  wx.showToast({
                    title: '取消支付',
                  })
                }
              })
            })
          })
        } else {
          wx.showToast({
            title: '已取消',
          })
        }
      }
    })
  },

  //分享参团
  joinShareActivity(e) {
    console.log(this.data.shareInfo)
    console.log(app.globalData.OpenID)
    let postData = {
      RecordIDShop: this.data.shareInfo.RecordIDShop,
      type: 2,
      fight_Type: this.data.shareInfo.fight_Type,
      OpenID: app.globalData.OpenID,
      RecordMainID: this.data.shareInfo.RecordMainID,
      RecordSubID: this.data.shareInfo.RecordSubID
    }
    const text = `你即将参加${this.data.shareInfo.fig_TypeNum}人团，价格为${this.data.shareInfo.fig_Price}元，确定付款吗？`

    wx.showModal({
      title: '提示',
      content: text,
      success: ok => {
        if (ok.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          app._api.joinActivity(postData, res => {
            const RecordID = res.data.RecordID
            app._api.payRequest({ RecordID }, pay => {
              wx.hideLoading()
              wx.requestPayment({
                timeStamp: pay.timeStamp,
                nonceStr: pay.nonceStr,
                package: pay.package,
                signType: pay.signType,
                paySign: pay.paySign,
                success: success => {
                  wx.showToast({
                    title: '成功',
                    complete: () => {
                      wx.navigateTo({
                        url: '/pages/costdetail/costdetail?RecordID=' + RecordID,
                      })
                    }
                  })
                },
                fail: fail => {
                  wx.showToast({
                    title: '支付失败',
                  })
                },
                complete: com => {
                  wx.showToast({
                    title: '取消支付',
                  })
                }
              })
            })
          })
        } else {
          wx.showToast({
            title: '已取消',
          })
        }
      }
    })
  }
})