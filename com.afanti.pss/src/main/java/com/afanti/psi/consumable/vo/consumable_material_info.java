package com.afanti.psi.consumable.vo;

import org.joda.time.DateTime;

/**
 * Created by gehao on 2017/06/06 0010.
 */
public class consumable_material_info {
    /*主键*/
    private int consumable_id;

    public int getWarning_amount() {
        return warning_amount;
    }

    public void setWarning_amount(int warning_amount) {
        this.warning_amount = warning_amount;
    }

    /*主键*/
    private int warning_amount;

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    /*主键*/
    private int amount;
    /*名称*/
    private String consumable_name;

    public String getPack() {
        return pack;
    }

    public void setPack(String pack) {
        this.pack = pack;
    }

    /*名称*/
    private String pack;
    /*名称*/
    private String consumable_unit;
    /*主键*/
    private int staff_id;
    /*主键*/
    private DateTime create_time;
    /*主键*/
    private int status;

    /**上传人*/
    private String staff_name;

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    public String getConsumable_unit() {
        return consumable_unit;
    }

    public void setConsumable_unit(String consumable_unit) {
        this.consumable_unit = consumable_unit;
    }

    public int getConsumable_id() {
        return consumable_id;
    }

    public void setConsumable_id(int consumable_id) {
        this.consumable_id = consumable_id;
    }

    public String getConsumable_name() {
        return consumable_name;
    }

    public void setConsumable_name(String consumable_name) {
        this.consumable_name = consumable_name;
    }

    public DateTime getCreate_time() {
        return create_time;
    }

    public void setCreate_time(DateTime create_time) {
        this.create_time = create_time;
    }

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    private String space_name;
    private int purchase_id;

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    private int space_id;

    public int getPurchase_id() {
        return purchase_id;
    }

    public void setPurchase_id(int purchase_id) {
        this.purchase_id = purchase_id;
    }

    public int getSpace_id() {
        return space_id;
    }

    public void setSpace_id(int space_id) {
        this.space_id = space_id;
    }
}
