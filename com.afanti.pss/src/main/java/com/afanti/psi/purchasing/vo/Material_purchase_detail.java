package com.afanti.psi.purchasing.vo;

import java.util.Date;

/**
 * 采购明细表
 */
public class Material_purchase_detail {

    private int purchase_d_id;
    private int purchase_id;

    public int getUse_id() {
        return use_id;
    }

    public void setUse_id(int use_id) {
        this.use_id = use_id;
    }

    private int use_id;
    private int product_id;
    private float amount;

    public Date getCheck_time() {
        return check_time;
    }

    public void setCheck_time(Date check_time) {
        this.check_time = check_time;
    }

    private Date check_time;
    public float getUse_amount() {
        return use_amount;
    }

    public void setUse_amount(float use_amount) {
        this.use_amount = use_amount;
    }

    private float use_amount;
    private float amount_used;
    private String unit;
    private String use_unit;
    private String purity;
    private float unit_price;
    private int total;
    private String desc;
    private String dict_name;
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

    public String getName_ch() {
        return name_ch;
    }

    public void setName_ch(String name_ch) {
        this.name_ch = name_ch;
    }

    private String cas;
    private String sku;

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    private String staff_name;
    private String name_ch;
    private String product_name;
    private int product_type;
    private String product_type_name;
    private String product_name_en;
    private int space_id;
    private String space_name;
    private int in_count;
    private String enter_d_ids;
    private String batch_no;
    private float out_amount;
    private int r_purchase_d_id;
    private String reason;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
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

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
    }

    public String getEnter_d_ids() {
        return enter_d_ids;
    }

    public void setEnter_d_ids(String enter_d_ids) {
        this.enter_d_ids = enter_d_ids;
    }

    public int getIn_count() {
        return in_count;
    }

    public void setIn_count(int in_count) {
        this.in_count = in_count;
    }

    public int getSpace_id() {
        return space_id;
    }

    public void setSpace_id(int space_id) {
        this.space_id = space_id;
    }

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    public String getProduct_name_en() {
        return product_name_en;
    }

    public void setProduct_name_en(String product_name_en) {
        this.product_name_en = product_name_en;
    }

    public float getAmount_used() {
        return amount_used;
    }

    public void setAmount_used(float amount_used) {
        this.amount_used = amount_used;
    }

    public int getProduct_type() {
        return product_type;
    }

    public void setProduct_type(int product_type) {
        this.product_type = product_type;
    }

    public String getProduct_type_name() {
        return product_type_name;
    }

    public void setProduct_type_name(String product_type_name) {
        this.product_type_name = product_type_name;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public int getPurchase_d_id() {
        return purchase_d_id;
    }

    public void setPurchase_d_id(int purchase_d_id) {
        this.purchase_d_id = purchase_d_id;
    }

    public int getPurchase_id() {
        return purchase_id;
    }

    public void setPurchase_id(int purchase_id) {
        this.purchase_id = purchase_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
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

    public float getUnit_price() {
        return unit_price;
    }

    public void setUnit_price(float unit_price) {
        this.unit_price = unit_price;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getUse_unit() {
        return use_unit;
    }

    public void setUse_unit(String use_unit) {
        this.use_unit = use_unit;
    }

    public String getDict_name() {
        return dict_name;
    }

    public void setDict_name(String dict_name) {
        this.dict_name = dict_name;
    }
}
