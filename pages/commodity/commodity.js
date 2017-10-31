// pages/commodity/commodity.js
const app = getApp()

Page({

  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://d.5857.com/hh_170601/001.jpg',
      'http://img.zcool.cn/community/03320dd554c75c700000158fce17209.jpg'
    ],

    //头像循环
    avatarTmpArr: ['', '', ''],

    //模拟数据
    //开团类型
    groupTypes: [
      {
        id: 1,
        number: 3,
        price: 178
      },
      {
        id: 2,
        number: 5,
        price: 169
      },
      {
        id: 2,
        number: 8,
        price: 155
      }
    ],

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

    //商品详情
    commodityDetails: {
      title: '2017秋冬新版韩版女大衣 长款打底针织衫加厚 纯色半高领秋装质量保证 舒适面料 精细做工 柔软透气',
      imgs: ['http://img.ssfun.com/bdimg/50771504237321.png', 'http://img.ssfun.com/bdimg/68131504237319.png', 'http://img.ssfun.com/bdimg/68131504237319.png']
    },

    //活动规则
    rules: [
      '点击参团即可开始参与活动',
      '点击报名后邀请小伙伴一起团购，越多越好',
      '奖品数量有限，先到先得',
      '团购成功后，前往商家出兑换'
    ],

    currentType: 0,
  },

  onLoad() {

  },

  //当前开团类型
  changeGroupType(e) {
    const index = e.currentTarget.dataset.index
    const id = e.currentTarget.dataset.id
    if (index === this.data.currentType) {
      return false
    }
    this.setData({
      currentType: index
    })
  },

  //参团
  groupRightNow(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
  },

  //查看所有拼团
  goForAllGroups() { },

  preImg(e) {
    const current = e.currentTarget.dataset.img
    wx.previewImage({
      current,
      urls: this.data.imgUrls,
    })
  }
})