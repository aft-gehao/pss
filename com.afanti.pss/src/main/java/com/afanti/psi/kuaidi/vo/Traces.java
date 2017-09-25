/**  
 * @Title: KuaidiPara.java
 * @Package com.aft.entity.beans.common
 * @Description: TODO
 * @author yangsy
 * @date 2015-12-28
 */
package com.afanti.psi.kuaidi.vo;

/**
 * ClassName: Traces 
 * @Description: 快递鸟-接收推送消息订单轨迹实体
 * @author yangsy
 * @date 2015-12-28
 */
public class Traces {
	private String AcceptTime;//用户ID
	private String AcceptStation;//
	private String Remark;//
	private String isNew = "0";//1-最新记录，0-历史记录
	public String getAcceptTime() {
		return AcceptTime;
	}
	public void setAcceptTime(String acceptTime) {
		AcceptTime = acceptTime;
	}
	public String getAcceptStation() {
		return AcceptStation;
	}
	public void setAcceptStation(String acceptStation) {
		AcceptStation = acceptStation;
	}
	public String getRemark() {
		return Remark;
	}
	public void setRemark(String remark) {
		Remark = remark;
	}
	public String getIsNew() {
		return isNew;
	}
	public void setIsNew(String isNew) {
		this.isNew = isNew;
	}
}
