// pages/helptext/helptext.js
const app = getApp()

Page({

  data: {
    nodes: {
      1: `
    <h1 style="font-size: 16px;margin-bottom: 10px;">蚁拼商户微信提现规则：</h1>
    <p style="text-indent:2em; font-size: 15px;line-height:1.5em;">点击个人中心的资金提现按钮就可以看到可提现的具体金额，确认后资金将在3个工作日自动打到所属微信钱包。因通过微信支付提现时需收取手续费及平台管理费统称技术服务费2.5%，蚁拼将在提现时扣除，记录在商家提现记录查看。</p>
    <p style="text-indent:2em;font-size: 15px;line-height:1.5em;">提现规则：单个商家，单笔单日限额2万；提现前微信账号需要开通钱包实名认证功能，否则无法提现到账。待定资金：活动客户已经支付，但未最终核算，如拼团失败等原因故显示为待定资金。</p>
    <p style="font-size:16px;font-weight: 600; margin:10px 0;">1.在个人中心找到“资金提现</p>
    <p style="font-size:16px;font-weight: 600;margin:10px 0;">2.在“资金提现”里，点击“申请提款”。</p>
    `,
      2: `
    <h1 style="font-size: 16px;margin-bottom: 10px;">商家用户使用流程：</h1>
    <p style="text-indent:2em; font-size: 15px;line-height:1.5em;">蚁拼小程序可以通过线下扫码、好友推荐、微信搜索等方式找到蚁拼。</p>
    <p style="text-indent:2em;font-size: 15px;line-height:1.5em;">我们用微信搜索方式为大家演示蚁拼操作流程：</p>
    <p style="font-size:16px;font-weight: 600; margin:10px 0;">1.微信小程序搜索“蚁拼”。</p>
    <p style="font-size:16px;font-weight: 600;margin:10px 0;">2.点击“蚁拼”小程序，进入“蚁拼”小程序界面。</p>
    <p style="font-size:16px;font-weight: 600;margin:10px 0;">3.“蚁拼”下方有三个栏目，点击活动中心，找到“制作活动”。</p>
    <p style="font-size:16px;font-weight: 600;margin:10px 0;">4.在表格资料，根据自己需求填写资料。</p>
    <p style="font-size:16px;font-weight: 600;margin:10px 0;">5.确认创建完成活动创建。</p>
    `,
      3: `
    <h1 style="font-size: 16px;margin-bottom: 10px;">个人用户使用流程：</h1>
    <p style="text-indent:2em; font-size: 15px;line-height:1.5em;">蚁拼小程序可以通过线下扫码、好友推荐、微信搜索等方式找到蚁拼。</p>
    <p style="text-indent:2em;font-size: 15px;line-height:1.5em;">我们用微信搜索方式为大家演示蚁拼操作流程：</p>
    <p style="font-size:16px;font-weight: 600; margin:10px 0;">1.微信小程序搜索“蚁拼”。</p>
    <p style="font-size:16px;font-weight: 600;margin:10px 0;">2.点击“蚁拼”小程序，进入“蚁拼”小程序界面。</p>
    <p style="font-size:16px;font-weight: 600;margin:10px 0;">3.“蚁拼”下方有三个栏目，点击活动中心，找到最新拼团列表中您想要参加的活动！</p>
    <p style="font-size:16px;font-weight: 600;margin:10px 0;">4.点击去拼团，参加活动！</p>
    `,
    },
    currentId: 1
  },

  onLoad(options) {
    const id = options.id
    const title = options.title
    this.setData({
      currentId: id
    })
    wx.setNavigationBarTitle({
      title: title,
    })
  }

})