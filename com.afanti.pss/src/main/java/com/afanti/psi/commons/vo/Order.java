/**  
 * @Title: KuaidiPara.java
 * @Package com.aft.entity.beans.common
 * @Description: TODO
 * @author yangsy
 * @date 2015-12-28
 */
package com.afanti.psi.commons.vo;

import java.util.List;

/**
 * ClassName: Data 
 * @Description: 快递鸟-接收推送订单实体
 * @author yangsy
 * @date 2015-12-28
 */
public class Order {
	private String EBusinessID;//用户ID
	private String OrderCode;//
	private String ShipperCode;//快递公司编码
	private String LogisticCode;//	物流运单号
	private String Success;//	成功与否：true，false
	private String Reason;//	失败原因
	private String State;//物流状态1：已取件2：在途中3：签收

	
	public String getEBusinessID() {
		return EBusinessID;
	}
	public void setEBusinessID(String eBusinessID) {
		EBusinessID = eBusinessID;
	}
	public String getOrderCode() {
		return OrderCode;
	}
	public void setOrderCode(String orderCode) {
		OrderCode = orderCode;
	}
	public String getShipperCode() {
		return ShipperCode;
	}
	public void setShipperCode(String shipperCode) {
		ShipperCode = shipperCode;
	}
	public String getLogisticCode() {
		return LogisticCode;
	}
	public void setLogisticCode(String logisticCode) {
		LogisticCode = logisticCode;
	}
	public String getSuccess() {
		return Success;
	}
	public void setSuccess(String success) {
		Success = success;
	}
	public String getReason() {
		return Reason;
	}
	public void setReason(String reason) {
		Reason = reason;
	}
	public String getState() {
		return State;
	}
	public void setState(String state) {
		State = state;
	}
	
}
