package com.afanti.psi.shinfo.vo;

import java.util.Date;

/**
 * 供应商联系人表【供应商表外键】
 */
public class Linkman {

    private int linkman_id;
    private int supplier_id;
    private int customer_id;
    private String chinesename;
    private String englishname;
    private String ttitle;
    private String mobilephone;
    private String fixedphone;
    private String fax;
    private String email;
    private String address;
    private int is_owner;
    private int status;
    private int create_oper;
    private Date create_time;
    private int modify_oper;
    private Date modify_time;

    public int getLinkman_id() {
        return linkman_id;
    }

    public void setLinkman_id(int linkman_id) {
        this.linkman_id = linkman_id;
    }

    public int getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(int supplier_id) {
        this.supplier_id = supplier_id;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public String getChinesename() {
        return chinesename;
    }

    public void setChinesename(String chinesename) {
        this.chinesename = chinesename;
    }

    public String getEnglishname() {
        return englishname;
    }

    public void setEnglishname(String englishname) {
        this.englishname = englishname;
    }

    public String getTtitle() {
        return ttitle;
    }

    public void setTtitle(String ttitle) {
        this.ttitle = ttitle;
    }

    public String getMobilephone() {
        return mobilephone;
    }

    public void setMobilephone(String mobilephone) {
        this.mobilephone = mobilephone;
    }

    public String getFixedphone() {
        return fixedphone;
    }

    public void setFixedphone(String fixedphone) {
        this.fixedphone = fixedphone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getIs_owner() {
        return is_owner;
    }

    public void setIs_owner(int is_owner) {
        this.is_owner = is_owner;
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

    public int getModify_oper() {
        return modify_oper;
    }

    public void setModify_oper(int modify_oper) {
        this.modify_oper = modify_oper;
    }

    public Date getModify_time() {
        return modify_time;
    }

    public void setModify_time(Date modify_time) {
        this.modify_time = modify_time;
    }
}
