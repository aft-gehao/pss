package com.afanti.psi.commons.vo;

/**
 * Created by Administrator on 2017/4/18 0018.
 */
public class Pss_dict {
    private int dict_id;
    private String dict_name;
    private int p_dict_id;
    private int dict_status;

    public int getP_dict_id() {
        return p_dict_id;
    }

    public void setP_dict_id(int p_dict_id) {
        this.p_dict_id = p_dict_id;
    }

    public int getDict_status() {
        return dict_status;
    }

    public void setDict_status(int dict_status) {
        this.dict_status = dict_status;
    }

    public int getDict_id() {
        return dict_id;
    }

    public void setDict_id(int dict_id) {
        this.dict_id = dict_id;
    }

    public String getDict_name() {
        return dict_name;
    }

    public void setDict_name(String dict_name) {
        this.dict_name = dict_name;
    }
}
