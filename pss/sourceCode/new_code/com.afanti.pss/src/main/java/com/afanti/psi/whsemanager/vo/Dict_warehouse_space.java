package com.afanti.psi.whsemanager.vo;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public class Dict_warehouse_space {

    private int space_id;
    private int f_space_id;
    private String space_name;
    private String desc;
    private int status;

    public int getSpace_id() {
        return space_id;
    }

    public void setSpace_id(int space_id) {
        this.space_id = space_id;
    }

    public int getF_space_id() {
        return f_space_id;
    }

    public void setF_space_id(int f_space_id) {
        this.f_space_id = f_space_id;
    }

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
