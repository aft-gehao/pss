package com.afanti.psi.consumable.vo;

import java.util.Date;

/**
 * Created by gehao on 2017/07/14 0010.
 */
public class consumable_repair {
    /*主键*/
    private int repair_id;
    /*主键*/
    private int consumable_id;
    /*主键*/
    private int repair_staff;
    private Date repair_time;

    public int getRepair_id() {
        return repair_id;
    }

    public void setRepair_id(int repair_id) {
        this.repair_id = repair_id;
    }

    public int getConsumable_id() {
        return consumable_id;
    }

    public void setConsumable_id(int consumable_id) {
        this.consumable_id = consumable_id;
    }

    public int getRepair_staff() {
        return repair_staff;
    }

    public void setRepair_staff(int repair_staff) {
        this.repair_staff = repair_staff;
    }

    public Date getRepair_time() {
        return repair_time;
    }

    public void setRepair_time(Date repair_time) {
        this.repair_time = repair_time;
    }

    public int getRepair_amount() {
        return repair_amount;
    }

    public void setRepair_amount(int repair_amount) {
        this.repair_amount = repair_amount;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getRepair_is_del() {
        return repair_is_del;
    }

    public void setRepair_is_del(int repair_is_del) {
        this.repair_is_del = repair_is_del;
    }

    public String getRepair_desc() {
        return repair_desc;
    }

    public void setRepair_desc(String repair_desc) {
        this.repair_desc = repair_desc;
    }

    private int repair_amount;

    private int status;

    public int getChecking_repair() {
        return checking_repair;
    }

    public void setChecking_repair(int checking_repair) {
        this.checking_repair = checking_repair;
    }

    //已返修量
    private int checking_repair;

    public int getChecking_staff() {
        return checking_staff;
    }

    public void setChecking_staff(int checking_staff) {
        this.checking_staff = checking_staff;
    }

    public String getCheck_people() {
        return check_people;
    }

    public void setCheck_people(String check_people) {
        this.check_people = check_people;
    }

    private int checking_staff;
    private int repair_is_del;

    public String getPack() {
        return pack;
    }

    public void setPack(String pack) {
        this.pack = pack;
    }

    private String pack;

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

    private String kd_code;
    private String kd_num;
    private String repair_desc;
    private String check_people;
    private String staff_name;

    public String getDict_name() {
        return dict_name;
    }

    public void setDict_name(String dict_name) {
        this.dict_name = dict_name;
    }

    public String getConsumable_unit() {
        return consumable_unit;
    }

    public void setConsumable_unit(String consumable_unit) {
        this.consumable_unit = consumable_unit;
    }

    public String getConsumable_name() {
        return consumable_name;
    }

    public void setConsumable_name(String consumable_name) {
        this.consumable_name = consumable_name;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    private String dict_name;
    private String consumable_name;
    private String consumable_unit;


}
