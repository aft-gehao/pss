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

    private String apply_name;
    private Date use_time;
    private double use_amount;
    private String use_unit;
    private String use_desc;
    private String procurement_name;
    private double procurement_amount;
    private String procurement_unit;
    private String doc_url;
    private String procurement_desc;
    private int enter_id;
    private String storage_name;
    private Date oper_time;
    private double storage_amount;
    private String storage_unit;

    public String getApply_name() {
        return apply_name;
    }

    public void setApply_name(String apply_name) {
        this.apply_name = apply_name;
    }

    public Date getUse_time() {
        return use_time;
    }

    public void setUse_time(Date use_time) {
        this.use_time = use_time;
    }

    public double getUse_amount() {
        return use_amount;
    }

    public void setUse_amount(double use_amount) {
        this.use_amount = use_amount;
    }

    public String getUse_unit() {
        return use_unit;
    }

    public void setUse_unit(String use_unit) {
        this.use_unit = use_unit;
    }

    public String getUse_desc() {
        return use_desc;
    }

    public void setUse_desc(String use_desc) {
        this.use_desc = use_desc;
    }

    public String getProcurement_name() {
        return procurement_name;
    }

    public void setProcurement_name(String procurement_name) {
        this.procurement_name = procurement_name;
    }

    public double getProcurement_amount() {
        return procurement_amount;
    }

    public void setProcurement_amount(double procurement_amount) {
        this.procurement_amount = procurement_amount;
    }

    public String getProcurement_unit() {
        return procurement_unit;
    }

    public void setProcurement_unit(String procurement_unit) {
        this.procurement_unit = procurement_unit;
    }

    public String getDoc_url() {
        return doc_url;
    }

    public void setDoc_url(String doc_url) {
        this.doc_url = doc_url;
    }

    public String getProcurement_desc() {
        return procurement_desc;
    }

    public void setProcurement_desc(String procurement_desc) {
        this.procurement_desc = procurement_desc;
    }

    public int getEnter_id() {
        return enter_id;
    }

    public void setEnter_id(int enter_id) {
        this.enter_id = enter_id;
    }

    public String getStorage_name() {
        return storage_name;
    }

    public void setStorage_name(String storage_name) {
        this.storage_name = storage_name;
    }

    public Date getOper_time() {
        return oper_time;
    }

    public void setOper_time(Date oper_time) {
        this.oper_time = oper_time;
    }

    public double getStorage_amount() {
        return storage_amount;
    }

    public void setStorage_amount(double storage_amount) {
        this.storage_amount = storage_amount;
    }

    public String getStorage_unit() {
        return storage_unit;
    }

    public void setStorage_unit(String storage_unit) {
        this.storage_unit = storage_unit;
    }
}
