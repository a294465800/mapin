// pages/helptext/helptext.js
const app = getApp()

Page({

  data: {
    nodes: `
    <h1 style="text-align: center;">帮助文章</h1>
    <p>这是第一段</p>
    <p>这是第二段</p>
    <img style="width: 150px;" src="http://d.5857.com/hh_170601/001.jpg" />
    `
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '帮助文章',
    })
  }

})