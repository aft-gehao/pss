package com.afanti.psi.consumable.vo;

import java.util.Date;

/**
 * Created by gehao on 2017/07/14 0010.
 */
public class consumable_purchase {
    /*主键*/
    private int purchase_id;
    /*主键*/
    private int consumable_id;
    /*主键*/
    private int use_id;
    /*主键*/
    private int purchase_is_del;
    /*主键*/
    private int status;
    /*主键*/
    private int staff_id;

    public Date getCheck_time() {
        return check_time;
    }

    public void setCheck_time(Date check_time) {
        this.check_time = check_time;
    }

    /*主键*/
    private Date check_time;
    /*主键*/
    private int amount;

    public int getStock_amount() {
        return stock_amount;
    }

    public void setStock_amount(int stock_amount) {
        this.stock_amount = stock_amount;
    }

    /*主键*/
    private int stock_amount;

    public String getDict_name() {
        return dict_name;
    }

    public void setDict_name(String dict_name) {
        this.dict_name = dict_name;
    }

    /*主键*/
    private String dict_name;

    /*主键*/
    private String desc;

    public String getKd_code() {
        return kd_code;
    }

    public void setKd_code(String kd_code) {
        this.kd_code = kd_code;
    }

    public String getKd_num() {
        return kd_num;
    }

    public void setKd_num(String kd_num) {
        this.kd_num = kd_num;
    }

    /*主键*/
    private String kd_code;
    /*主键*/
    private String kd_num;


    /*主键*/
    private String use_unit;


    public String getPur_staff() {
        return pur_staff;
    }

    public void setPur_staff(String pur_staff) {
        this.pur_staff = pur_staff;
    }

    /*主键*/
    private String pur_staff;

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    /*主键*/
    private String staff_name;


    public String getConsumable_unit() {
        return consumable_unit;
    }

    public void setConsumable_unit(String consumable_unit) {
        this.consumable_unit = consumable_unit;
    }

    /*主键*/
    private String consumable_unit;

    public String getPack() {
        return pack;
    }

    public void setPack(String pack) {
        this.pack = pack;
    }

    /*主键*/
    private String pack;


    public String getConsumable_name() {
        return consumable_name;
    }

    public void setConsumable_name(String consumable_name) {
        this.consumable_name = consumable_name;
    }

    /*主键*/
    private String consumable_name;

    public String getCheck_name() {
        return check_name;
    }

    public void setCheck_name(String check_name) {
        this.check_name = check_name;
    }

    /*主键*/
    private String check_name;

    public float getPurchase_money() {
        return purchase_money;
    }

    public void setPurchase_money(float purchase_money) {
        this.purchase_money = purchase_money;
    }

    /*主键*/
    private float purchase_money;
    /*主键*/
    private Date purchase_time;

    public int getPurchase_is_del() {
        return purchase_is_del;
    }

    public void setPurchase_is_del(int purchase_is_del) {
        this.purchase_is_del = purchase_is_del;
    }

    public int getPurchase_id() {
        return purchase_id;
    }

    public void setPurchase_id(int purchase_id) {
        this.purchase_id = purchase_id;
    }

    public int getConsumable_id() {
        return consumable_id;
    }

    public void setConsumable_id(int consumable_id) {
        this.consumable_id = consumable_id;
    }

    public int getUse_id() {
        return use_id;
    }

    public void setUse_id(int use_id) {
        this.use_id = use_id;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Date getPurchase_time() {
        return purchase_time;
    }

    public void setPurchase_time(Date purchase_time) {
        this.purchase_time = purchase_time;
    }

    public String getUse_unit() {
        return use_unit;
    }

    public void setUse_unit(String use_unit) {
        this.use_unit = use_unit;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
