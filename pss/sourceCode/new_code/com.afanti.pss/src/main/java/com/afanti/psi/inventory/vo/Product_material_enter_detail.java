package com.afanti.psi.inventory.vo;

import java.util.Date;

/**
 * 产品入库详情表
 */
public class Product_material_enter_detail {
    private int enter_d_id;
    private int enter_id;
    private int product_id;
    private String product_name;
    private String sale_batch_no;
    private String product_name_en;
    private int space_id;
    private float amount;
    private String unit;
    private String purity;
    private int enter_type_d_billno;
    private String batch_no;
    private float left_amount;
    private int staff_id;
    private String staff_name;
    private Date enter_date;
    private String enter_desc;


    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public float getLeft_amount() {
        return left_amount;
    }

    public void setLeft_amount(float left_amount) {
        this.left_amount = left_amount;
    }

    public int getEnter_d_id() {
        return enter_d_id;
    }

    public void setEnter_d_id(int enter_d_id) {
        this.enter_d_id = enter_d_id;
    }

    public int getEnter_id() {
        return enter_id;
    }

    public void setEnter_id(int enter_id) {
        this.enter_id = enter_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getProduct_name_en() {
        return product_name_en;
    }

    public void setProduct_name_en(String product_name_en) {
        this.product_name_en = product_name_en;
    }

    public int getSpace_id() {
        return space_id;
    }

    public void setSpace_id(int space_id) {
        this.space_id = space_id;
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

    public int getEnter_type_d_billno() {
        return enter_type_d_billno;
    }

    public void setEnter_type_d_billno(int enter_type_d_billno) {
        this.enter_type_d_billno = enter_type_d_billno;
    }



    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    public Date getEnter_date() {
        return enter_date;
    }

    public void setEnter_date(Date enter_date) {
        this.enter_date = enter_date;
    }

    public String getEnter_desc() {
        return enter_desc;
    }

    public void setEnter_desc(String enter_desc) {
        this.enter_desc = enter_desc;
    }

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
    }

    private float su;

    public float getSu() {
        return su;
    }

    public void setSu(float su) {
        this.su = su;
    }

    private String cas;

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    private String space_name;

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    public String getSale_batch_no() {
        return sale_batch_no;
    }

    public void setSale_batch_no(String sale_batch_no) {
        this.sale_batch_no = sale_batch_no;
    }
}
