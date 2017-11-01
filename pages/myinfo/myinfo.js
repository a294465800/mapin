// pages/myinfo/myinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexIndex: 0,
    sexText: ['保密', '男', '女'],

    //表单
    userForm: {
      user_latitude: '',
      user_longitude: '',
      user_Address: ''
    }
  },

  getLocation() {
    const that = this
    app.getLocation((res) => {
      console.log(res)
      that.setData({
        'userForm.user_latitude': res.latitude,
        'userForm.user_longitude': res.longitude,
        'userForm.user_Address': res.address,
      })
    })
  }
})