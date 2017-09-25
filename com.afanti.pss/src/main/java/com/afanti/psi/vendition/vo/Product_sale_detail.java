package com.afanti.psi.vendition.vo;

/**
 * 产品销售明细
 */
public class Product_sale_detail {
    private String sale_way;
    private int sale_d_id;
    private int sale_id;
    private String batch_no;
    private int product_id;
    private float amount;
    private String unit;
    private String purity;
    private float unit_price;
    private float total;
    private String desc;

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

    private String cas;
    private String sku;
    private int sale_status;
    private String sale_status_name;
    private String name_en;
    public String getName_en() {
        return name_en;
    }
    public void setName_en(String name_en) {
        this.name_en = name_en;
    }

    public int getSale_status() {
        return sale_status;
    }

    public void setSale_status(int sale_status) {
        this.sale_status = sale_status;
    }

    public String getSale_status_name() {
        return sale_status_name;
    }

    public void setSale_status_name(String sale_status_name) {
        this.sale_status_name = sale_status_name;
    }

    private String product_name;
    private String name;
    private int product_type;
    private String product_type_name;
    private float amount_used;
    private int space_id;
    private String space_name;

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

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
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

    public float getAmount_used() {
        return amount_used;
    }

    public void setAmount_used(float amount_used) {
        this.amount_used = amount_used;
    }

    public int getSale_d_id() {
        return sale_d_id;
    }

    public void setSale_d_id(int sale_d_id) {
        this.sale_d_id = sale_d_id;
    }

    public int getSale_id() {
        return sale_id;
    }

    public void setSale_id(int sale_id) {
        this.sale_id = sale_id;
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

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSale_way() {
        return sale_way;
    }

    public void setSale_way(String sale_way) {
        this.sale_way = sale_way;
    }
}
