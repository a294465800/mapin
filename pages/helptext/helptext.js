// pages/helptext/helptext.js
const app = getApp()

Page({

  data: {
    nodes: `
    <h1 style="font-size: 16px;margin-bottom: 10px;">蚁拼商户微信提现规则：</h1>
    <p style="text-indent:2em; font-size: 15px;line-height:1.5em;">点击个人中心的资金提现按钮就可以看到可提现的具体金额，确认后资金将在3个工作日自动打到所属微信钱包。因通过微信支付提现时需收取手续费及平台管理费统称技术服务费2.5%，蚁拼将在提现时扣除，记录在商家提现记录查看。</p>
    <p style="text-indent:2em;font-size: 15px;line-height:1.5em;">提现规则：单个商家，单笔单日限额2万；提现前微信账号需要开通钱包实名认证功能，否则无法提现到账。待定资金：活动客户已经支付，但未最终核算，如拼团失败等原因故显示为待定资金。</p>
    <p>1.在个人中心找到“资金提现</p>
    `
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '帮助文章',
    })
  }

})