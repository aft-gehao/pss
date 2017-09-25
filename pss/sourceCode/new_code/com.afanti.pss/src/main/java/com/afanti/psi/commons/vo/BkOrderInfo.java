package com.afanti.psi.commons.vo;
import java.io.Serializable;
import java.util.Date;

/**
 * @ClassName: BkOrderInfo
 * @Description: bk_order_info表对应的java bean类:快递物流订单表
 * @author AFT · 杨书元
 * @version 1.0 2016-01-05
 */
public class BkOrderInfo {

    /**
     * @Fields bk_order_info.order_id :订单id自曾
     */
    private Integer orderId;
    /**
     * @Fields bk_order_info.logistic_code :订单编号
     */
    private String logisticCode;
    /**
     * @Fields bk_order_info.shipper_code :快递公司编码
     */
    private String shipperCode;
    /**
     * @Fields bk_order_info.order_status :物流状态1：已取件2：在途中3：签收
     */
    private Integer orderStatus;
    /**
     * @Fields bk_order_info.user_id :
     */
    private String userId;
    /**
     * @Fields bk_order_info.create_time :
     */
    private Date createTime;
    /**
     * @Fields bk_order_info.is_subscribe :是否订阅 0-是 1-否(标记是否向快递鸟发起订阅，与用户订阅不同)
     */
    private Integer isSubscribe;
    /**
     * @Fields bk_order_info.update_time :订单数据更新时间
     */
    private Date updateTime;
    private static final long serialVersionUID = 1L;
    private String logiCorpName;//快递公司名称
    private String statusName;//物流快递状态
    private Integer subscribeId;//订阅编码，用于标记是否订阅
    private String aliasName;

    /**
     * @return bk_order_info.order_id : 返回 订单id自曾
     */
    public Integer getOrderId() {
        return orderId;
    }
    /**
     * @param orderId of bk_order_info : 设置 订单id自曾
     */
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }
    /**
     * @return bk_order_info.logistic_code : 返回 订单编号
     */
    public String getLogisticCode() {
        return logisticCode;
    }
    /**
     * @param logisticCode of bk_order_info : 设置 订单编号
     */
    public void setLogisticCode(String logisticCode) {
        this.logisticCode = logisticCode == null ? null : logisticCode.trim();
    }
    /**
     * @return bk_order_info.shipper_code : 返回 快递公司编码
     */
    public String getShipperCode() {
        return shipperCode;
    }
    /**
     * @param shipperCode of bk_order_info : 设置 快递公司编码
     */
    public void setShipperCode(String shipperCode) {
        this.shipperCode = shipperCode == null ? null : shipperCode.trim();
    }
    /**
     * @return bk_order_info.order_status : 返回 物流状态1：已取件2：在途中3：签收
     */
    public Integer getOrderStatus() {
        return orderStatus;
    }
    /**
     * @param orderStatus of bk_order_info : 设置 物流状态1：已取件2：在途中3：签收
     */
    public void setOrderStatus(Integer orderStatus) {
        this.orderStatus = orderStatus;
    }
    /**
     * @return bk_order_info.user_id : 返回 
     */
    public String getUserId() {
        return userId;
    }
    /**
     * @param userId of bk_order_info : 设置 
     */
    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }
    /**
     * @return bk_order_info.create_time : 返回 
     */
    public Date getCreateTime() {
        return createTime;
    }
    /**
     * @param createTime of bk_order_info : 设置 
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
    /**
     * @return bk_order_info.is_subscribe : 返回 是否订阅 0-是 1-否(标记是否向快递鸟发起订阅，与用户订阅不同)
     */
    public Integer getIsSubscribe() {
        return isSubscribe;
    }
    /**
     * @param isSubscribe of bk_order_info : 设置 是否订阅 0-是 1-否(标记是否向快递鸟发起订阅，与用户订阅不同)
     */
    public void setIsSubscribe(Integer isSubscribe) {
        this.isSubscribe = isSubscribe;
    }
    /**
     * @return bk_order_info.update_time : 返回 订单数据更新时间
     */
    public Date getUpdateTime() {
        return updateTime;
    }
    /**
     * @param updateTime of bk_order_info : 设置 订单数据更新时间
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
	public String getLogiCorpName() {
		return logiCorpName;
	}
	public void setLogiCorpName(String logiCorpName) {
		this.logiCorpName = logiCorpName;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public Integer getSubscribeId() {
		return subscribeId;
	}
	public void setSubscribeId(Integer subscribeId) {
		this.subscribeId = subscribeId;
	}
	public String getAliasName() {
		return aliasName;
	}
	public void setAliasName(String aliasName) {
		this.aliasName = aliasName;
	}
}