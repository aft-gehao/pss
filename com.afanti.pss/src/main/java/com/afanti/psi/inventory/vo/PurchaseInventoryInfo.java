package com.afanti.psi.inventory.vo;

import java.util.Date;

/**
 * Created by Administrator on 2017/4/27 0027.
 */
public class PurchaseInventoryInfo {
    private int purchase_id;
    private int supplier_id;
    private int stock_status;
    private String stock_status_name;
    private String purchase_name;
    private int all_total;
    private Date purchase_time;
    private String staff_name;

    public String getKd_num() {
        return kd_num;
    }

    public void setKd_num(String kd_num) {
        this.kd_num = kd_num;
    }

    public String getKd_code() {
        return kd_code;
    }

    public void setKd_code(String kd_code) {
        this.kd_code = kd_code;
    }

    private String kd_num;
    private String kd_code;

    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
    }

    private String name_en;

    public String getName_ch() {
        return name_ch;
    }

    public void setName_ch(String name_ch) {
        this.name_ch = name_ch;
    }

    private String name_ch;

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    private String unit;
    private String supplier_name;
    private int in_type;

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    private float amount;
    private String cas;
    private String sku;

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

    public int getIn_type() {
        return in_type;
    }

    public void setIn_type(int in_type) {
        this.in_type = in_type;
    }

    public int getPurchase_id() {
        return purchase_id;
    }

    public void setPurchase_id(int purchase_id) {
        this.purchase_id = purchase_id;
    }

    public int getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(int supplier_id) {
        this.supplier_id = supplier_id;
    }

    public int getStock_status() {
        return stock_status;
    }

    public void setStock_status(int stock_status) {
        this.stock_status = stock_status;
    }

    public String getStock_status_name() {
        return stock_status_name;
    }

    public void setStock_status_name(String stock_status_name) {
        this.stock_status_name = stock_status_name;
    }

    public String getPurchase_name() {
        return purchase_name;
    }

    public void setPurchase_name(String purchase_name) {
        this.purchase_name = purchase_name;
    }

    public int getAll_total() {
        return all_total;
    }

    public void setAll_total(int all_total) {
        this.all_total = all_total;
    }

    public Date getPurchase_time() {
        return purchase_time;
    }

    public void setPurchase_time(Date purchase_time) {
        this.purchase_time = purchase_time;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    public String getSupplier_name() {
        return supplier_name;
    }

    public void setSupplier_name(String supplier_name) {
        this.supplier_name = supplier_name;
    }
}
