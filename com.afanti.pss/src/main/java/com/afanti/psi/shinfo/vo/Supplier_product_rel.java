package com.afanti.psi.shinfo.vo;

import java.util.Date;

/**
 * 供应商与产品关系表
 */
public class Supplier_product_rel {
    enum day{
        MONDAY, TUESDAY, WEDNESDAY,
        THURSDAY, FRIDAY, SATURDAY, SUNDAY
    }
    private Float price;
    private String unit;
    private String purity;
    private String cas;
    private String product_type_name;
    private int sp_id;
    private int product_id;
    private int supplier_id;
    private Float p_price;
    private String p_unit;
    private String p_pack;
    private String p_packs;
    private String p_purity;
    private int p_type;
    private int status;
    private int create_oper;
    private Date last_mod_time;
    private Date create_time;
    private String name_ch;
    private String name_en;

    public int getSp_id() {
        return sp_id;
    }

    public void setSp_id(int sp_id) {
        this.sp_id = sp_id;
    }

    public Float getP_price() {
        return p_price;
    }

    public void setP_price(Float p_price) {
        this.p_price = p_price;
    }

    public String getP_unit() {
        return p_unit;
    }

    public void setP_unit(String p_unit) {
        this.p_unit = p_unit;
    }

    public String getP_pack() {
        return p_pack;
    }

    public void setP_pack(String p_pack) {
        this.p_pack = p_pack;
    }

    public String getP_purity() {
        return p_purity;
    }

    public void setP_purity(String p_purity) {
        this.p_purity = p_purity;
    }

    public int getP_type() {
        return p_type;
    }

    public void setP_type(int p_type) {
        this.p_type = p_type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getCreate_oper() {
        return create_oper;
    }

    public void setCreate_oper(int create_oper) {
        this.create_oper = create_oper;
    }

    public Date getLast_mod_time() {
        return last_mod_time;
    }

    public void setLast_mod_time(Date last_mod_time) {
        this.last_mod_time = last_mod_time;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

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

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }


    public String getName_ch() {
        return name_ch;
    }

    public void setName_ch(String name_ch) {
        this.name_ch = name_ch;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
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

    public String getProduct_type_name() {
        return product_type_name;
    }

    public void setProduct_type_name(String product_type_name) {
        this.product_type_name = product_type_name;
    }

    public int getSupplier_id() {
        return supplier_id;
    }

    public void setSupplier_id(int supplier_id) {
        this.supplier_id = supplier_id;
    }

    public String getP_packs() {
        return p_packs;
    }

    public void setP_packs(String p_packs) {
        this.p_packs = p_packs;
    }
}
