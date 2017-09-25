package com.afanti.psi.purchasing.vo;

import java.util.Date;

/**
 *采购信息 化学原料采购表（采购信息主表）
 */
public class Material_purchase {

    private int purchase_id;
    private int purchase_d_id;
    private String purchase_name;
    private int product_num;
    private float all_total;
    private int staff_id;
    private int use_id;
    private Date purchase_time;
    private String desc;
    private int supplier_id;
    private int s_linkman_id;
    private int customer_id;
    private int request_id;
    private int stock_status;
    private int purchase_isdel;
    private String staff_name;
    private String kd_code ;
    private String kd_num ;
    private String supplier_name;
    private String linkman_name;
    private String purchase_type;
    private String cas;
    private Float unit_price;

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Float getUnit_price() {
        return unit_price;
    }

    public void setUnit_price(Float unit_price) {
        this.unit_price = unit_price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    private Float amount;
    private String unit;

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName_ch() {
        return name_ch;
    }

    public void setName_ch(String name_ch) {
        this.name_ch = name_ch;
    }

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    private String sku;
    private String name_ch;
    private int mdp_count;
    private int mdp_sum_count;

    public int getMdp_count() {
        return mdp_count;
    }

    public void setMdp_count(int mdp_count) {
        this.mdp_count = mdp_count;
    }

    public int getMdp_sum_count() {
        return mdp_sum_count;
    }

    public void setMdp_sum_count(int mdp_sum_count) {
        this.mdp_sum_count = mdp_sum_count;
    }

    public String getPurchase_type() {
        return purchase_type;
    }

    public void setPurchase_type(String purchase_type) {
        this.purchase_type = purchase_type;
    }

    public String getLinkman_name() {
        return linkman_name;
    }

    public void setLinkman_name(String linkman_name) {
        this.linkman_name = linkman_name;
    }

    public String getSupplier_name() {
        return supplier_name;
    }

    public void setSupplier_name(String supplier_name) {
        this.supplier_name = supplier_name;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    public int getPurchase_isdel() {
        return purchase_isdel;
    }

    public void setPurchase_isdel(int purchase_isdel) {
        this.purchase_isdel = purchase_isdel;
    }

    public int getPurchase_id() {
        return purchase_id;
    }

    public void setPurchase_id(int purchase_id) {
        this.purchase_id = purchase_id;
    }

    public String getPurchase_name() {
        return purchase_name;
    }

    public void setPurchase_name(String purchase_name) {
        this.purchase_name = purchase_name;
    }

    public int getProduct_num() {
        return product_num;
    }

    public void setProduct_num(int product_num) {
        this.product_num = product_num;
    }

    public float getAll_total() {
        return all_total;
    }

    public void setAll_total(float all_total) {
        this.all_total = all_total;
    }

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    public Date getPurchase_time() {
        return purchase_time;
    }

    public void setPurchase_time(Date purchase_time) {
        this.purchase_time = purchase_time;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(int supplier_id) {
        this.supplier_id = supplier_id;
    }

    public int getS_linkman_id() {
        return s_linkman_id;
    }

    public void setS_linkman_id(int s_linkman_id) {
        this.s_linkman_id = s_linkman_id;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public int getRequest_id() {
        return request_id;
    }

    public void setRequest_id(int request_id) {
        this.request_id = request_id;
    }

    public int getStock_status() {
        return stock_status;
    }

    public void setStock_status(int stock_status) {
        this.stock_status = stock_status;
    }

    public int getUse_id() {
        return use_id;
    }

    public void setUse_id(int use_id) {
        this.use_id = use_id;
    }

    public String getKd_code() {
        return kd_code;
    }

    public void setKd_code(String kd_code) {
        this.kd_code = kd_code;
    }

    public String getKd_num() {
        return kd_num;
    }

    public void setKd_num(String kd_num) {
        this.kd_num = kd_num;
    }

    public int getPurchase_d_id() {
        return purchase_d_id;
    }

    public void setPurchase_d_id(int purchase_d_id) {
        this.purchase_d_id = purchase_d_id;
    }
}
