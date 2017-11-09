// pages/commodity/commodity.js
const app = getApp()

Page({

  data: {
    imgUrls: [],
    loading: true,
    currentPrice: 0,

    //头像循环
    avatarTmpArr: ['', '', ''],
    typeIndex: 1,
    // currentType: 1,

    //模拟数据

    //正在拼团
    groupings: [
      {
        id: 1,
        avatars: ['http://img.171u.com/image/1605/1608552241288.jpeg', 'http://p2.wmpic.me/article/2015/04/15/1429062874_HiUlpSXT.jpeg'],
        left_people: 1,
        left_time: '23:11:05',
      },
      {
        id: 2,
        avatars: ['http://p2.wmpic.me/article/2015/04/15/1429062874_HiUlpSXT.jpeg'],
        left_people: 4,
        left_time: '16:44:23',
      }
    ],

    //活动规则
    rules: [
      '点击参团即可开始参与活动',
      '点击报名后邀请小伙伴一起团购，越多越好',
      '奖品数量有限，先到先得',
      '团购成功后，前往商家出兑换'
    ],

    commodity: null,

  },

  onLoad(options) {
    app._api.getActivity({ RecordMainId: options.RecordMainId }, res => {
      this.setData({
        commodity: res.data,
        loading: false,
        currentPrice: res.data.fig_Price3
      })
    })
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

  //参团
  // groupRightNow(e) {
  //   const id = e.currentTarget.dataset.id
  //   console.log(id)
  // },

  //查看所有拼团
  goForAllGroups() { },

  preImg(e) {
    const current = e.currentTarget.dataset.img
    wx.previewImage({
      current,
      urls: this.data.imgUrls,
    })
  },

  //参团
  joinActivity(e) {
    const type = e.currentTarget.dataset.type
    wx.showModal({
      title: '提示',
      content: '',
    })
    app._api.joinActivity(data, res => {

    })
  }
})