package com.afanti.psi.inventory.vo;

import java.util.Date;

/**
 * 产品出库明细表
 */
public class Product_material_out_detail {
    private int staff_id;
    private int enter_d_id;
    private int out_id;
    private int purchase_d_id;
    private int product_id;
    private float amount_used;
    private int enter_d_ids;
    private String batch_no;
    private  float amount;
    private float out_amount;
    private int r_purchase_d_id;
    private String reason;
    private String unit;
    private String purity;
    private String product_name;
    private String product_type;
    private String product_type_name;
    private String space_id;
    private String space_name;
    private int out_type_d_billno;
    private String out_desc;
    private int stock_status;
    private String stock_status_name;
    private String out_name;
    private String amount_str;
    private Date out_date;
    private String staff_name;
    private String name_en;

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    public int getEnter_d_id() {
        return enter_d_id;
    }

    public void setEnter_d_id(int enter_d_id) {
        this.enter_d_id = enter_d_id;
    }

    public int getOut_id() {
        return out_id;
    }

    public void setOut_id(int out_id) {
        this.out_id = out_id;
    }

    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    public String getOut_name() {
        return out_name;
    }

    public void setOut_name(String out_name) {
        this.out_name = out_name;
    }

    public String getAmount_str() {
        return amount_str;
    }

    public void setAmount_str(String amount_str) {
        this.amount_str = amount_str;
    }

    public Date getOut_date() {
        return out_date;
    }

    public void setOut_date(Date out_date) {
        this.out_date = out_date;
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

    public int getOut_type_d_billno() {
        return out_type_d_billno;
    }

    public void setOut_type_d_billno(int out_type_d_billno) {
        this.out_type_d_billno = out_type_d_billno;
    }

    public String getOut_desc() {
        return out_desc;
    }

    public void setOut_desc(String out_desc) {
        this.out_desc = out_desc;
    }

    public String getSpace_id() {
        return space_id;
    }

    public void setSpace_id(String space_id) {
        this.space_id = space_id;
    }

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    public int getPurchase_d_id() {
        return purchase_d_id;
    }

    public void setPurchase_d_id(int purchase_d_id) {
        this.purchase_d_id = purchase_d_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public float getAmount_used() {
        return amount_used;
    }

    public void setAmount_used(float amount_used) {
        this.amount_used = amount_used;
    }

    public int getEnter_d_ids() {
        return enter_d_ids;
    }

    public void setEnter_d_ids(int enter_d_ids) {
        this.enter_d_ids = enter_d_ids;
    }

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
    }


    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public float getOut_amount() {
        return out_amount;
    }

    public void setOut_amount(float out_amount) {
        this.out_amount = out_amount;
    }

    public int getR_purchase_d_id() {
        return r_purchase_d_id;
    }

    public void setR_purchase_d_id(int r_purchase_d_id) {
        this.r_purchase_d_id = r_purchase_d_id;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getPurity() {
        return purity;
    }

    public void setPurity(String purity) {
        this.purity = purity;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getProduct_type() {
        return product_type;
    }

    public void setProduct_type(String product_type) {
        this.product_type = product_type;
    }

    public String getProduct_type_name() {
        return product_type_name;
    }

    public void setProduct_type_name(String product_type_name) {
        this.product_type_name = product_type_name;
    }
}
