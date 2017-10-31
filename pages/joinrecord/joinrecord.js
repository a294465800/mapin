// pages/joinrecord/joinrecord.js
const app = getApp()
Page({

  data: {

    statuText: ['已核销', '已成团'],
    showBox: false,
    email: '',

    //模拟数据
    lists: [
      {
        id: 1,
        name: '方先生',
        status: 1,
        tel: 14231321244,
        order: 1,
      },
      {
        id: 2,
        name: '刘先生',
        status: 0,
        tel: 13651521456,
        order: 2,
      },
      {
        id: 3,
        name: '陈先生',
        status: 0,
        tel: 14231321244,
        order: 4,
      },
      {
        id: 4,
        name: '孙先生',
        status: 1,
        tel: 18415311544,
        order: 5,
      }
    ]
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

  //导出
  exportList() {
    console.log(this.data.email)
  }
})