// pages/joinrecord/joinrecord.js
const app = getApp()
Page({

  data: {

    statuText: ['已核销','已成团'],

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
})