package com.afanti.psi.vendition.vo;

/**
 * Created by Administrator on 2017/5/4 0004.
 */
public class SelectProductInventory {
    private int enter_d_id;
    private int enter_id;
    private float amount;
    private String purity;
    private String unit;
    private String batch_no;
    private int product_id;
    private String product_name;
    private int product_type_id;
    private String product_type;
    private String cas;

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getSale_batch_no() {
        return sale_batch_no;
    }

    public void setSale_batch_no(String sale_batch_no) {
        this.sale_batch_no = sale_batch_no;
    }

    public String getFace() {
        return face;
    }

    public void setFace(String face) {
        this.face = face;
    }

    private String sku;
    private String sale_batch_no;
    private String face;
    private int space_id;
    private String space_name;
    private String name_en;

    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
    }

    public String getPurity() {
        return purity;
    }

    public void setPurity(String purity) {
        this.purity = purity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
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

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
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

    public int getProduct_type_id() {
        return product_type_id;
    }

    public void setProduct_type_id(int product_type_id) {
        this.product_type_id = product_type_id;
    }

    public String getProduct_type() {
        return product_type;
    }

    public void setProduct_type(String product_type) {
        this.product_type = product_type;
    }

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
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

}
