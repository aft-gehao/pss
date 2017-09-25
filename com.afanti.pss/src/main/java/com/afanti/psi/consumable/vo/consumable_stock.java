package com.afanti.psi.consumable.vo;

import java.util.Date;

/**
 * Created by gehao on 2017/06/06 0010.
 */
public class consumable_stock {
    /*主键*/
    private int stock_id;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    /*主键*/
    private int total;
    /*主键*/
    private int consumable_id;

    public int getPurchase_id() {
        return purchase_id;
    }

    public void setPurchase_id(int purchase_id) {
        this.purchase_id = purchase_id;
    }

    /*主键*/
    private int purchase_id;
    /*主键*/
    private int amount;

    public int getStock_id() {
        return stock_id;
    }

    public void setStock_id(int stock_id) {
        this.stock_id = stock_id;
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

    public int getSpace_id() {
        return space_id;
    }

    public void setSpace_id(int space_id) {
        this.space_id = space_id;
    }

    public int getEnter_staff() {
        return enter_staff;
    }

    public void setEnter_staff(int enter_staff) {
        this.enter_staff = enter_staff;
    }

    public int getEnter_is_del() {
        return enter_is_del;
    }

    public void setEnter_is_del(int enter_is_del) {
        this.enter_is_del = enter_is_del;
    }

    public Date getEnter_time() {
        return enter_time;
    }

    public void setEnter_time(Date enter_time) {
        this.enter_time = enter_time;
    }

    /*主键*/
    private int space_id;
    /*主键*/
    private int enter_staff;
    /*主键*/
    private int enter_is_del;
    /*主键*/
    private Date enter_time;

    /*主键*/
    private String consumable_name;

    public String getPack() {
        return pack;
    }

    public void setPack(String pack) {
        this.pack = pack;
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

    /*主键*/
    private String consumable_unit;

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    /*主键*/
    private String space_name;

    /*主键*/
    private String pack;









}
