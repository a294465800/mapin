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

  },

  onLoad(options) {
    app._api.getActivity({ RecordMainId: options.RecordMainId }, res => {
      this.setData({
        commodity: res.data,
        loading: false,
        currentPrice: res.data.fig_Price1,
        currentGroup: res.data.fig_Number1
      })
    })
  },

  //页面分享
  onShareAppMessage(res) {
    return {
      title: this.data.commodity.fig_Name,
      path: '/pages/commodity/commodity?RecordMainId=' + this.data.commodity.RecordMainID,
      success(res) {
        // 转发成功
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
    // const id = e.currentTarget.dataset.id
    if (index === this.data.typeIndex) {
      return false
    }
    this.setData({
      typeIndex: index,
      currentPrice: price,
      currentGroup: group
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
    this.setData({
      showDetail: true,
      joinGroup: index,
      currentMode: mode
    })
  },

  //参团
  joinActivity(e) {
    console.log(e)
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
      const currentGroup = this.data.commodity.OnGroups[this.data.joinGroup]
      postData.RecordSubID = currentGroup.RecordSubID
      text = `你即将参加${this.data.currentGroup}人团，价格为${this.data.currentPrice}元，确定付款吗？`
    }
    wx.showModal({
      title: '提示',
      content: text,
      success: ok => {
        if (ok.confirm) {
          app._api.joinActivity(postData, res => {
            const RecordID = res.data.RecordID
            wx.showToast({
              title: '成功',
              complete: () => {
                wx.navigateTo({
                  url: '/pages/costdetail/costdetail?RecordID=' + RecordID,
                })
              }
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