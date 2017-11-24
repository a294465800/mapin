// pages/joinsinglerecord/joinsinglerecord.js
const app = getApp()
Page({

  data: {
    info: {}
  },
  onLoad(options) {
    console.log(options)
    const getData = {
      Order: options.order,
      RecordID: options.id
    }
    app._api.getJoinDetail(getData, res => {
      this.setData({
        info: res.data
      })
    })
  },

})