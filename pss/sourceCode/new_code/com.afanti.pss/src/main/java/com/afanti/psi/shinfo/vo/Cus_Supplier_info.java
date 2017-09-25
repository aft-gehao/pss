package com.afanti.psi.shinfo.vo;

import java.io.Serializable;
import java.util.Date;

/**
 * 供应商表
 */
public class Cus_Supplier_info implements Serializable {
    private static final long serialVersionUID = -1959528436584592183L;
    private int cs_sup_id;
    private int customer_id;
    private int supplier_id;
    private String name;
    private String short_name;
    private int type;
    private String address;
    private String tel;
    private String fax;
    private String email;
    private int credit_level;
    private String profile;
    private String invoice_title;
    private String country;
    private String city;
    private String vat_number;
    private int payment_terms;
    private int create_oper;
    private Date create_time;
    private int modify_oper;
    private Date modify_time;
    private int status;
    private String cust_no;
    private String s_type;
    private String s_level;

    public int getCs_sup_id() {
        return cs_sup_id;
    }

    public void setCs_sup_id(int cs_sup_id) {
        this.cs_sup_id = cs_sup_id;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public int getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(int supplier_id) {
        this.supplier_id = supplier_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
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

    public int getCredit_level() {
        return credit_level;
    }

    public void setCredit_level(int credit_level) {
        this.credit_level = credit_level;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getInvoice_title() {
        return invoice_title;
    }

    public void setInvoice_title(String invoice_title) {
        this.invoice_title = invoice_title;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getVat_number() {
        return vat_number;
    }

    public void setVat_number(String vat_number) {
        this.vat_number = vat_number;
    }

    public int getPayment_terms() {
        return payment_terms;
    }

    public void setPayment_terms(int payment_terms) {
        this.payment_terms = payment_terms;
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCust_no() {
        return cust_no;
    }

    public void setCust_no(String cust_no) {
        this.cust_no = cust_no;
    }

    public String getS_type() {
        return s_type;
    }

    public void setS_type(String s_type) {
        this.s_type = s_type;
    }

    public String getS_level() {
        return s_level;
    }

    public void setS_level(String s_level) {
        this.s_level = s_level;
    }

    public String getShort_name() {
        return short_name;
    }

    public void setShort_name(String short_name) {
        this.short_name = short_name;
    }

    private int ct;

    public int getCt() {
        return ct;
    }

    public void setCt(int ct) {
        this.ct = ct;
    }
}
