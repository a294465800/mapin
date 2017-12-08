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
      4: `
    <h1 style="font-size: 16px;margin-bottom: 10px;text-align:center">蚁拼商户服务协议</h1>
    <div style="line-height: 30px">
    <p style="font-size:15px;font-weight:700;">1.总则</p>
    <p style="font-size:15px;text-indent:2em;">1.1 蚁拼的所有权和运营权归广州享象科技有限公司所有。</p>
    <p style="font-size:15px;text-indent:2em;">1.2 使用蚁拼服务视为用户，使用时自动形成协议关系，受本协议的约束。</p>
    <p style="font-size:15px;text-indent:2em;">1.3 用户须同意在蚁拼的指定公众号（ID：Yipin_17P）上发布的相关协议、规则及公告。</p>
    <p style="font-size:15px;text-indent:2em;">1.4 本协议则可由蚁拼随时更新，用户如对更新后条款不认可应及时停止使用服务，蚁拼不承担通知义务，蚁拼的公告、声明或其它类似内容是本协议的一部分。</p>
    <div style="height:10px;"></div>
    <p style="font-size:15px;font-weight:700;">2.服务费用</p>
    <p style="font-size:15px;text-indent:2em;">2.1 使用本服务前，需先开通服务并支付服务费，且不同的服务期限服务费不同。</p>
    <p style="font-size:15px;text-indent:2em;">2.2 蚁拼为虚拟产品服务，用户一但使用本服务支付服务费，蚁拼不因本协议的中止、终止或用户单方面退出使用而退还服务费。即一但开通服务概不退款。</p>
    <p style="font-size:15px;text-indent:2em;">2.3 本协议服务期根据您支付软件服务费时所选择的服务期决定，订购服务期均从用户订购成功之日起开始计算。</p>
    <p style="font-size:15px;text-indent:2em;">2.4 如用户需要，蚁拼将开具项目为“软件服务费”的增值税普通发票。用户需向蚁拼提供如下信息：开票名称、纳税人识别号、地址、电话、开户行和付款单号。并发邮件到1103581630@qq.com，并附上营业执照电子档。</p>
    <p style="font-size:15px;text-indent:2em;">2.5 蚁拼有权对服务费用进行调整，具体的收费方案以用户使用本服务时所列之收费公示价格或其他局面协议为准；若在收费调整后用户继续使用本服务的，表示用户已完全知晓并接受蚁拼调整后的收费方案，也将遵循调整后的收费方案支付费用；若用户不同意调整后的收费方案，应停止使用本服务。</p>
    <p style="font-size:15px;text-indent:2em;"> 2.6 除上述服务费用外，用户同意结算货款时按照第三方支付网关的规定直接扣除相关手续费用，详见《商户帐户里的资金如何提现》说明。如第三方支付网关或银行提高或降低手续费用的，蚁拼亦有权提高或降低手续费用，但应提前以公告形式进行通知。</p>
    <p style="font-size:15px;text-indent:2em;"> 2.7 蚁拼商户活动的资金付款至微信支付平台，并由蚁拼统一管理，该款项会根据结算规则自动结算至蚁拼商家可现金额，商户申请提现。</p>
    <p style="font-size:15px;text-indent:2em;">（1）退款：拼团不成功将在活动结束后次日自动退款到付款帐户。</p>
    <p style="font-size:15px;text-indent:2em;">（2）可提金额：拼团成功后三天可提，提前核销立即可以提现。</p>
    <div style="height:10px;"></div>
    <p style="font-size:15px;font-weight:700;">3.用户帐号</p>
    <p style="font-size:15px;text-indent:2em;">3.1 用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知蚁拼。因黑客行为或用户的保管疏忽导致帐号非法使用，蚁拼不承担任何责任。</p>
    <div style="height:10px;"></div>
    <p style="font-size:15px;font-weight:700;">4.使用规则</p>
    <p style="font-size:15px;text-indent:2em;">4.1 遵守中华人民共和国相关法律法规，包括但不限于《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。</p>
    <p style="font-size:15px;text-indent:2em;">4.2 用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在蚁拼任何页面发布、转载、传送含有被有关机构认定为有害内容之一的信息，否则蚁拼有权自行处理并不通知用户。</p>
    <p style="font-size:15px;text-indent:2em;">4.3 用户承诺对其发表或者上传于蚁拼的所有信息（即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等）均享有完整的知识产权，或者已经得到相关权利的合法授权；如用户违反本条规定造成蚁拼被第三人索赔的，用户应全额补偿蚁拼一切费用（包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用）。</p>
    <p style="font-size:15px;text-indent:2em;">4.4 当第三方认为用户发表或者上传了蚁拼的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向蚁拼发送权利通知书时，用户同意蚁拼可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，蚁拼将不会自动恢复上述删除的信息。</p>
    <p style="font-size:15px;text-indent:2em;">（1）不得任何非法目的而使用网络服务系统；</p>
    <p style="font-size:15px;text-indent:2em;">（2）遵守所有与网络服务有关的网络协议、规定和程序；</p>
    <p style="font-size:15px;text-indent:2em;">（3）不得利用蚁拼进行任何可能对互联网的正常运转造成不利影响的行为；</p>
    <p style="font-size:15px;text-indent:2em;">（4）不得利用蚁拼进行任何不得蚁拼的行为；</p>
    <p style="font-size:15px;text-indent:2em;">4.5 如用户在使用网络服务时违反上述任何规定，蚁拼有权要求用户改正或直接采取一切必要的措施（包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利）以减轻用户不当行为而造成的影响。</p>
    <div style="height:10px;"></div>
    <p style="font-size:15px;font-weight:700;">5.隐私保护</p>
    <p style="font-size:15px;text-indent:2em;">5.1蚁拼不对外公开或向第三方提供用户的注册资料及用户在使用网络服务时存储在蚁拼的非公开内容，但下列情况除外：</p>
    <p style="font-size:15px;text-indent:2em;">（1）事先获得用户的明确授权；</p>
    <p style="font-size:15px;text-indent:2em;">（2）根据有关的法律法规要求；</p>
    <p style="font-size:15px;text-indent:2em;">（3）按照相关政府主管部门的要求；</p>
    <p style="font-size:15px;text-indent:2em;">5.2 蚁拼可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与蚁拼同等的保护用户隐私的责任，则蚁拼有权将用户的注册资料等提供给该第三方。</p>
    <p style="font-size:15px;text-indent:2em;">5.3 在不透露单个用户隐私资料的前提下，蚁拼有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
    <div style="height:10px;"></div>
    <p style="font-size:15px;font-weight:700;">6.版权声明</p>
    <p style="font-size:15px;text-indent:2em;">6.1 蚁拼的文字、图片、音频、视频等版权均归广州享象科技有限公司享有或作者共同享有，未经蚁拼许可，不得任意转载。</p>
    <p style="font-size:15px;text-indent:2em;">6.2 蚁拼特有的标识、版面设计、编排方式等版权均属广州享象科技有限公司享有，未经蚁拼许可，不得任意复制或转载。</p>
    <p style="font-size:15px;text-indent:2em;">6.3 使用蚁拼的任何内容均注明“来源于蚁拼”及署上作者姓名，按法律规定需要支付稿酬的，应当通知蚁拼及作者及支付稿酬，并独立承担一切法律责任。</p>
    <p style="font-size:15px;text-indent:2em;">6.4 蚁拼享有所有作品用于其它用途的优先权，包括但不限于网站、电子杂志、平面出版等，但在使用前会通知作者，并按同行业的标准支付稿酬。</p>
    <p style="font-size:15px;text-indent:2em;">6.4 蚁拼享有所有作品用于其它用途的优先权，包括但不限于网站、电子杂志、平面出版等，但在使用前会通知作者，并按同行业的标准支付稿酬。</p>
    <p style="font-size:15px;text-indent:2em;">6.5 蚁拼所有内容仅代表作者自己的立场和观点，与蚁拼无关，由作者本人承担一切法律责任。</p>
    <p style="font-size:15px;text-indent:2em;">6.6 恶意转载蚁拼内容的，蚁拼保留将其诉诸法律的权利。</p>
    <div style="height:10px;"></div>
    <p style="font-size:15px;font-weight:700;">7.免责声明</p>
    <p style="font-size:15px;text-indent:2em;">7.1 用户明确同意其使用蚁拼网络服务所存在的风险及一切后果将完全由用户本人承担，蚁拼对此不承担任何责任。</p>
    <p style="font-size:15px;text-indent:2em;">7.2 蚁拼无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。</p>
    <p style="font-size:15px;text-indent:2em;">7.3 蚁拼不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由蚁拼实际控制的任何网页上的内容，蚁拼不承担任何责任。</p>
    <p style="font-size:15px;text-indent:2em;">7.4 对于因不可抗力或蚁拼不能控制的原因造成的网络服务中断或其它缺陷，蚁拼不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
    <p style="font-size:15px;text-indent:2em;">7.5 对于站向用户提供的下列产品或者服务质量缺陷本身及其引发的任何损失，蚁拼无需要承担任何责任。</p>
    <p style="font-size:15px;text-indent:2em;">7.6 因用户活动（或页面链接）被多人恶意举报（或分享频次超过微信的限制）导致无法在朋友圈传播的，本平台不承担任何责任，本平台只为用户申请解封提供帮助。</p>
    <p style="font-size:15px;text-indent:2em;">7.7 因用户做的活动或者发布的内容不符合腾信政策，导致公众帐号被腾信封杀的，本平台不承担任何责任。</p>
    <div style="height:10px;"></div>
    <p style="font-size:15px;font-weight:700;">8.其他规定</p>
    <p style="font-size:15px;text-indent:2em;">8.1 本协议自您在订购本服务时勾选同意本协议内容点确认订购且成功订购之日为本协议生效之日，且该点击确认行为与您加盖公章或签字的行为具有相同法律效力。</p>
    <p style="font-size:15px;text-indent:2em;">8.2 双方约定，一旦由本协议产生争议，广东省广州市增城区人民法院为管辖法院。</p>
    <p style="font-size:15px;text-indent:2em;"> 8.3 本协议最终解释权及修订权归蚁拼所有。</p>
    <p style="font-size:15px;text-indent:2em;"> 8.3 本协议最终解释权及修订权归蚁拼所有。</p>
    <p style="font-size:15px;margin-top:10px;font-weight:700;">本协议自2017年12月3日起执行。</p>
    </div>
    `
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