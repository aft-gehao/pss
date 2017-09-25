package com.afanti.psi.shinfo.vo;

import java.util.Date;

/**
 * 货票地址信息【客户信息外键表】
 */
public class Customer_delivery_address {
    private int address_id;
    private int customer_id;
    private int address_type;
    private String address;
    private String postcode;
    private String oper_name;
    private String oper_tel;
    private String type_name;
    private int modify_oper;
    private int status;
    private int create_oper;
    private Date create_time;
    private Date modify_time;

    public int getAddress_id() {
        return address_id;
    }

    public void setAddress_id(int address_id) {
        this.address_id = address_id;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public int getAddress_type() {
        return address_type;
    }

    public void setAddress_type(int address_type) {
        this.address_type = address_type;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getOper_name() {
        return oper_name;
    }

    public void setOper_name(String oper_name) {
        this.oper_name = oper_name;
    }

    public String getOper_tel() {
        return oper_tel;
    }

    public void setOper_tel(String oper_tel) {
        this.oper_tel = oper_tel;
    }

    public int getModify_oper() {
        return modify_oper;
    }

    public void setModify_oper(int modify_oper) {
        this.modify_oper = modify_oper;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getCreate_oper() {
        return create_oper;
    }

    public void setCreate_oper(int create_oper) {
        this.create_oper = create_oper;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public Date getModify_time() {
        return modify_time;
    }

    public void setModify_time(Date modify_time) {
        this.modify_time = modify_time;
    }

    public String getType_name() {
        return type_name;
    }

    public void setType_name(String type_name) {
        this.type_name = type_name;
    }
}
