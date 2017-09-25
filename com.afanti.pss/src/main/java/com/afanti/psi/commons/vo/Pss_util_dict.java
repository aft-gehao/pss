package com.afanti.psi.commons.vo;

/**
 * Created by Administrator on 2017/4/18 0018.
 */
public class Pss_util_dict {
    private int unit_id;

    public int getUnit_id() {
        return unit_id;
    }

    public void setUnit_id(int unit_id) {
        this.unit_id = unit_id;
    }



    public String getOld_unit() {
        return old_unit;
    }

    public void setOld_unit(String old_unit) {
        this.old_unit = old_unit;
    }

    public int getRatio() {
        return ratio;
    }

    public void setRatio(int ratio) {
        this.ratio = ratio;
    }

    public float getNew_amount() {
        return new_amount;
    }

    public void setNew_amount(float new_amount) {
        this.new_amount = new_amount;
    }

    private String old_unit;

    public String getNew_unit() {
        return new_unit;
    }

    public void setNew_unit(String new_unit) {
        this.new_unit = new_unit;
    }

    private String new_unit;
    private int ratio;
    private float new_amount;
}
