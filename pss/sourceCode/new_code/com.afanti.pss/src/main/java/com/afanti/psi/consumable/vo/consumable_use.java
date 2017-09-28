package com.afanti.psi.consumable.vo;

import java.util.Date;

/**
 * Created by gehao on 2017/06/06 0010.
 */
public class consumable_use {
    /*主键*/
    private int use_id;

    public int getStock_id() {
        return stock_id;
    }

    public void setStock_id(int stock_id) {
        this.stock_id = stock_id;
    }

    /*主键*/
    private int stock_id;
    /*耗材id*/
    private int consumable_id;

    public int getCheck_staff() {
        return check_staff;
    }

    public void setCheck_staff(int check_staff) {
        this.check_staff = check_staff;
    }

    public Date getCheck_time() {
        return check_time;
    }

    public void setCheck_time(Date check_time) {
        this.check_time = check_time;
    }

    /*耗材id*/
    private int check_staff;
    /*耗材id*/
    private Date check_time;
    /*数量*/
    private int amount;

    public int getOut_amount() {
        return out_amount;
    }

    public void setOut_amount(int out_amount) {
        this.out_amount = out_amount;
    }

    /*数量*/
    private int out_amount;
    /*申请人*/
    private int staff;
    /*状态*/
    private int status;
    /*仓位*/
    private int space_id;
    /*是否有效*/
    private int is_del;
    /*备注*/
    private String desc;
    /*备注*/
    private String kd_code;

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

    /*备注*/
    private String kd_num;

    public String getIdentifying_code() {
        return identifying_code;
    }

    public void setIdentifying_code(String identifying_code) {
        this.identifying_code = identifying_code;
    }

    /*备注*/
    private String identifying_code;

    public String getConsumable_unit() {
        return consumable_unit;
    }

    public void setConsumable_unit(String consumable_unit) {
        this.consumable_unit = consumable_unit;
    }

    /*申请时间*/
    private Date use_time;

    /*备注*/
    private String space_name;

    public int getIs_del() {
        return is_del;
    }

    public void setIs_del(int is_del) {
        this.is_del = is_del;
    }

    public String getUse_name() {
        return use_name;
    }

    public void setUse_name(String use_name) {
        this.use_name = use_name;
    }

    /*备注*/
    private String use_name;
    /*备注*/
    private String staff_name;

    /*备注*/
    private String consumable_name;
    /*备注*/
    private String dict_name;

    public String getCheck_name() {
        return check_name;
    }

    public void setCheck_name(String check_name) {
        this.check_name = check_name;
    }

    /*备注*/
    private String check_name;
    /*备注*/
    private String pack;

    /*耗材创建时间*/
    private Date create_time;
    /*耗材单位*/
    private String consumable_unit;


    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }


    public int getSpace_id() {
        return space_id;
    }

    public void setSpace_id(int space_id) {
        this.space_id = space_id;
    }

    public int getUse_id() {
        return use_id;
    }

    public void setUse_id(int use_id) {
        this.use_id = use_id;
    }

    public int getConsumable_id() {
        return consumable_id;
    }

    public void setConsumable_id(int consumable_id) {
        this.consumable_id = consumable_id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getStaff() {
        return staff;
    }

    public void setStaff(int staff) {
        this.staff = staff;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Date getUse_time() {
        return use_time;
    }

    public void setUse_time(Date use_time) {
        this.use_time = use_time;
    }


    public String getPack() {
        return pack;
    }

    public void setPack(String pack) {
        this.pack = pack;
    }

    public String getDict_name() {
        return dict_name;
    }

    public void setDict_name(String dict_name) {
        this.dict_name = dict_name;
    }

    public String getConsumable_name() {
        return consumable_name;
    }

    public void setConsumable_name(String consumable_name) {
        this.consumable_name = consumable_name;
    }

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }







}
