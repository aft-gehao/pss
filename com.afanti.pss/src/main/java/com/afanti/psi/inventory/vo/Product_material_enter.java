package com.afanti.psi.inventory.vo;

import java.util.Date;
import java.util.List;

/**
 * 产品入库表
 */
public class Product_material_enter {
    private int enter_id;
    private String enter_name;
    private int enter_type;
    private int oper_id;
    private Date oper_time;
    private String desc;
    private String name_ch;

    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
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

    private String name_en;
    private String sku;

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    private String cas;
   //private List<Product_material_enter_detail> enter_type_billno;
    private int enter_type_billno;
    private int enter_isdel;
    private String batch_no;//批次号
    private String p_pack;//规格
    private String p_unit;//单位
    private int amount;//入库量
    private String create_oper;//经手人
    private Date enter_date;//入库时间

    public Date getEnter_date() {
        return enter_date;
    }

    public void setEnter_date(Date enter_date) {
        this.enter_date = enter_date;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getEnter_id() {
        return enter_id;
    }

    public void setEnter_id(int enter_id) {
        this.enter_id = enter_id;
    }

    public String getEnter_name() {
        return enter_name;
    }

    public void setEnter_name(String enter_name) {
        this.enter_name = enter_name;
    }

    public int getEnter_type() {
        return enter_type;
    }

    public void setEnter_type(int enter_type) {
        this.enter_type = enter_type;
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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getEnter_isdel() {
        return enter_isdel;
    }

    public void setEnter_isdel(int enter_isdel) {
        this.enter_isdel = enter_isdel;
    }

    public int getEnter_type_billno() {
        return enter_type_billno;
    }

    public void setEnter_type_billno(int enter_type_billno) {
        this.enter_type_billno = enter_type_billno;
    }

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
    }

    public String getP_pack() {
        return p_pack;
    }

    public void setP_pack(String p_pack) {
        this.p_pack = p_pack;
    }

    public String getP_unit() {
        return p_unit;
    }

    public void setP_unit(String p_unit) {
        this.p_unit = p_unit;
    }

    public String getCreate_oper() {
        return create_oper;
    }

    public void setCreate_oper(String create_oper) {
        this.create_oper = create_oper;
    }
}
