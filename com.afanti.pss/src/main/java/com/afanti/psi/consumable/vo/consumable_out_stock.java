package com.afanti.psi.consumable.vo;

import javax.xml.crypto.Data;
import java.util.Date;

/**
 * Created by gehao on 2017/06/06 0010.
 */
public class consumable_out_stock {
    /*主键*/
    private int out_id;

    public int getUse_id() {
        return use_id;
    }

    public void setUse_id(int use_id) {
        this.use_id = use_id;
    }

    public int getOut_id() {
        return out_id;
    }

    public void setOut_id(int out_id) {
        this.out_id = out_id;
    }

    public int getOut_amount() {
        return out_amount;
    }

    public void setOut_amount(int out_amount) {
        this.out_amount = out_amount;
    }

    public int getOut_staff() {
        return out_staff;
    }

    public void setOut_staff(int out_staff) {
        this.out_staff = out_staff;
    }

    public Data getOut_time() {
        return out_time;
    }

    public void setOut_time(Data out_time) {
        this.out_time = out_time;
    }

    /*主键*/
    private int use_id;
    /*主键*/
    private int out_amount;
    /*主键*/
    private int out_staff;
    /*主键*/
    private Data out_time;








}
