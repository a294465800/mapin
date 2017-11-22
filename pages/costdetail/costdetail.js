// pages/costdetail/costdetail.js
const app = getApp()
Page({

  data: {
    loading: true,
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
    RecordID: '',
  },

  onLoad(options) {
    const RecordID = options.RecordID
    app._api.getActivityResult({ RecordID }, res => {
      this.setData({
        commodity: res.data,
        RecordID,
        loading: false
      })
    })
  },

  //分享
  onShareAppMessage(res) {
    const that = this
    return {
      title: '快来加入我的拼团',
      path: `/pages/commodity/commodity?type=share&RecordID=${this.data.RecordID}&RecordMainID=${this.data.commodity.RecordMainID}`,
      success(res) {
        app._api.addShareAndClick({ fig_type: 2, RecordMainID: that.data.commodity.RecordMainID }, res => {
          console.log(222)
        })
      },
      fail(res) {
        // 转发失败
      }
    }
  },

  //获取海报
  getPost() {
    wx.showLoading({
      title: '海报生成中',
    })
    const RecordSubID = this.data.commodity.RecordSubID
    app._api.getOrderPost({ RecordSubID }, res => {
      wx.hideLoading()
      wx.previewImage({
        urls: [res.data.PoserUrl],
      })
    })
  }
})