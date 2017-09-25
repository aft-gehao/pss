package com.afanti.psi.inventory.vo;

import java.util.Date;

/**
 * 产品出库表
 */
public class Product_material_out {
    private int oper_id;
    private Date oper_time;
    private int out_type_billno;
    private String out_name;
    private int out_type;
    private String out_type_str;
    private String cas;
    private String sku;
    private int r_purchase_id;
    private String purchase_name;
    private int stock_status;
    private String stock_status_name;
    private String staff_name;
    private int staff_id;
    private String staff_name_return;
    private int staff_id_return;
    private int purchase_id;
    private Date purchase_time;
    private Date return_time;
    private int supplier_id;
    private String supplier_name;
    private String  batch_no;//编号
    private Date out_date;//出库日期
    private int amount;//数量
    private String unit;//单位
    private String name_en;//单位

    public String getName_ch() {
        return name_ch;
    }

    public void setName_ch(String name_ch) {
        this.name_ch = name_ch;
    }

    private String name_ch;//单位
    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
    }



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

    public int getOper_id() {
        return oper_id;
    }

    public void setOper_id(int oper_id) {
        this.oper_id = oper_id;
    }

    public Date getOper_time() {
        return oper_time;
    }

    public void setOper_time(Date oper_time) {
        this.oper_time = oper_time;
    }

    public int getOut_type_billno() {
        return out_type_billno;
    }

    public void setOut_type_billno(int out_type_billno) {
        this.out_type_billno = out_type_billno;
    }

    public String getOut_name() {
        return out_name;
    }

    public void setOut_name(String out_name) {
        this.out_name = out_name;
    }

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
    }

    public Date getOut_date() {
        return out_date;
    }

    public void setOut_date(Date out_date) {
        this.out_date = out_date;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getOut_type_str() {
        return out_type_str;
    }

    public void setOut_type_str(String out_type_str) {
        this.out_type_str = out_type_str;
    }

    public int getOut_type() {
        return out_type;
    }

    public void setOut_type(int out_type) {
        this.out_type = out_type;
    }

    public int getR_purchase_id() {
        return r_purchase_id;
    }

    public void setR_purchase_id(int r_purchase_id) {
        this.r_purchase_id = r_purchase_id;
    }

    public String getPurchase_name() {
        return purchase_name;
    }

    public void setPurchase_name(String purchase_name) {
        this.purchase_name = purchase_name;
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

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    public String getStaff_name_return() {
        return staff_name_return;
    }

    public void setStaff_name_return(String staff_name_return) {
        this.staff_name_return = staff_name_return;
    }

    public int getStaff_id_return() {
        return staff_id_return;
    }

    public void setStaff_id_return(int staff_id_return) {
        this.staff_id_return = staff_id_return;
    }

    public int getPurchase_id() {
        return purchase_id;
    }

    public void setPurchase_id(int purchase_id) {
        this.purchase_id = purchase_id;
    }

    public Date getPurchase_time() {
        return purchase_time;
    }

    public void setPurchase_time(Date purchase_time) {
        this.purchase_time = purchase_time;
    }

    public Date getReturn_time() {
        return return_time;
    }

    public void setReturn_time(Date return_time) {
        this.return_time = return_time;
    }

    public int getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(int supplier_id) {
        this.supplier_id = supplier_id;
    }

    public String getSupplier_name() {
        return supplier_name;
    }

    public void setSupplier_name(String supplier_name) {
        this.supplier_name = supplier_name;
    }
}
