package com.afanti.psi.vendition.vo;

import java.util.Date;

/**
 * 产品销售【主表】
 */
public class Product_sale {

    private int sale_id;
    private int sale_d_id;
    private float all_total;
    private Date sale_time;
    private String sale_name;
    private String hetong_doc;
    private String staff_name;
    private String cus_name;
    private String status_str;
    private int staff_id;
    private String desc;
    private String cas;
    private String sku;
    private float amount;

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public int getUnit_price() {
        return unit_price;
    }

    public void setUnit_price(int unit_price) {
        this.unit_price = unit_price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getSale_batch_no() {
        return sale_batch_no;
    }

    public void setSale_batch_no(String sale_batch_no) {
        this.sale_batch_no = sale_batch_no;
    }

    private int unit_price;
    private String unit;
    private String sale_batch_no;
    private int customer_id;
    private int c_linkman_id;
    private int supplier_id;
    private int status;
    private int stock_status;
    private String supplier_name;
    private String c_linkeman_name;

    public int getStock_status() {
        return stock_status;
    }

    public void setStock_status(int stock_status) {
        this.stock_status = stock_status;
    }

    public String getSupplier_name() {
        return supplier_name;
    }

    public void setSupplier_name(String supplier_name) {
        this.supplier_name = supplier_name;
    }

    public String getC_linkeman_name() {
        return c_linkeman_name;
    }

    public void setC_linkeman_name(String c_linkeman_name) {
        this.c_linkeman_name = c_linkeman_name;
    }

    public String getStatus_str() {
        return status_str;
    }

    public void setStatus_str(String status_str) {
        this.status_str = status_str;
    }

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public int getC_linkman_id() {
        return c_linkman_id;
    }

    public void setC_linkman_id(int c_linkman_id) {
        this.c_linkman_id = c_linkman_id;
    }

    public int getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(int supplier_id) {
        this.supplier_id = supplier_id;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getSale_id() {
        return sale_id;
    }

    public void setSale_id(int sale_id) {
        this.sale_id = sale_id;
    }


    public float getAll_total() {
        return all_total;
    }

    public void setAll_total(float all_total) {
        this.all_total = all_total;
    }

    public Date getSale_time() {
        return sale_time;
    }

    public void setSale_time(Date sale_time) {
        this.sale_time = sale_time;
    }

    public String getSale_name() {
        return sale_name;
    }

    public void setSale_name(String sale_name) {
        this.sale_name = sale_name;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    public String getCus_name() {
        return cus_name;
    }

    public void setCus_name(String cus_name) {
        this.cus_name = cus_name;
    }

    private int sale_isdel;

    public int getSale_isdel() {
        return sale_isdel;
    }

    public void setSale_isdel(int sale_isdel) {
        this.sale_isdel = sale_isdel;
    }

    public int getSale_d_id() {
        return sale_d_id;
    }

    public void setSale_d_id(int sale_d_id) {
        this.sale_d_id = sale_d_id;
    }

    public String getHetong_doc() {
        return hetong_doc;
    }

    public void setHetong_doc(String hetong_doc) {
        this.hetong_doc = hetong_doc;
    }

    private String name;
    private String batch_no;

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
