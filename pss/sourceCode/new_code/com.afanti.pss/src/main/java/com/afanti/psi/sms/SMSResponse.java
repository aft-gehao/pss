package com.afanti.psi.sms;

public class SMSResponse
{
  /**
   *-10	验证信息失败	检查api key是否和各种中心内的一致，调用传入是否正确
	-11	用户接口被禁用	滥发违规内容，验证码被刷等，请联系客服解除
	-20	短信余额不足	进入个人中心购买充值
	-30	短信内容为空	检查调用传入参数：message
	-31	短信内容存在敏感词	接口会同时返回  hit 属性提供敏感词说明，请修改短信内容，更换词语
	-32	短信内容缺少签名信息	短信内容末尾增加签名信息eg.【公司名称】
	-33	短信过长，超过300字（含签名）	调整短信内容或拆分为多条进行发送
	-34	签名不可用	在后台 短信->签名管理下进行添加签名
	-40	错误的手机号	检查手机号是否正确
	-41	号码在黑名单中	号码因频繁发送或其他原因暂停发送，请联系客服确认
	-42	验证码类短信发送频率过快	前台增加60秒获取限制
	-50	请求发送IP不在白名单内	查看触发短信IP白名单的设置
   */
  private String error;
  private String msg;

  public String getError()
  {
    return this.error;
  }

  public void setError(String error)
  {
    this.error = error;
  }

  public String getMsg()
  {
    return this.msg;
  }

  public void setMsg(String msg)
  {
    this.msg = msg;
  }
}