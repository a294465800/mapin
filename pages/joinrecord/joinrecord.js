// pages/joinrecord/joinrecord.js
const app = getApp()
Page({

  data: {

    statuText: ['已核销', '已成团'],
    showBox: false,
    loading: true,
    email: '',
    RecordMainID: '',
    user_Tel: '',

    page: 1,
    flag: false,
    close: false,

    //模拟数据
    lists: []
  },

  onLoad(options) {
    const RecordMainID = options.id
    app._api.getJoinRecord({ RecordMainID }, res => {
      this.setData({
        lists: res.data.AttendOK,
        loading: false,
        RecordMainID: RecordMainID
      })
    })
  },

  //触底刷新
  getMore() {
    const flag = this.data.flag
    const page = this.data.page
    const close = this.data.close
    const RecordMainID = this.data.RecordMainID
    const user_Tel = this.data.user_Tel
    if (flag || close) {
      return false
    }
    this.setData({
      flag: true
    })
    app._api.getJoinRecord({ RecordMainID, user_Tel, page: page + 1 }, res => {
      if (res.data.length) {
        this.setData({
          lists: [...this.data.lists, ...res.data.AttendOK],
          flag: true,
          page: page + 1
        })
      } else {
        this.setData({
          flag: true,
          close: true,
          page: page + 1
        })
      }
    })
  },

  //查看详情
  getMore() {
    wx.navigateTo({
      url: '/pages/joinsinglerecord/joinsinglerecord',
    })
  },

  //隐藏弹出框
  hideBox() {
    this.setData({
      showBox: false
    })
  },

  //显示弹出框
  showBox() {
    this.setData({
      showBox: true
    })
  },

  //获取输入
  getInput(e) {
    const input = e.detail.value
    this.setData({
      email: input
    })
  },

  //电话查询
  search(e) {
    const user_Tel = e.detail.value.user_Tel
    const RecordMainID = this.data.RecordMainID
    app._api.getJoinRecord({ RecordMainID, user_Tel }, res => {
      this.setData({
        lists: res.data.AttendOK,
        loading: false,
        user_Tel
      })
    })
  },

  //导出
  exportList() {
    console.log(this.data.email)
  }
})