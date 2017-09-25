package com.afanti.psi.research.vo;

import java.util.Date;

/**
 * Created by Administrator on 2017/8/18 0018.
 */
public class pss_research_doc {
    private int putu_id;
    private int research_id;
    private String putu_url;

    public int getPutu_id() {
        return putu_id;
    }

    public void setPutu_id(int putu_id) {
        this.putu_id = putu_id;
    }

    public int getResearch_id() {
        return research_id;
    }

    public void setResearch_id(int research_id) {
        this.research_id = research_id;
    }

    public String getPutu_url() {
        return putu_url;
    }

    public void setPutu_url(String putu_url) {
        this.putu_url = putu_url;
    }

    public String getPutu_name() {
        return putu_name;
    }

    public void setPutu_name(String putu_name) {
        this.putu_name = putu_name;
    }

    public Date getPutu_time() {
        return putu_time;
    }

    public void setPutu_time(Date putu_time) {
        this.putu_time = putu_time;
    }

    public int getPutu_staff() {
        return putu_staff;
    }

    public void setPutu_staff(int putu_staff) {
        this.putu_staff = putu_staff;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    private String putu_name;
    private Date putu_time;
    private int putu_staff;
    private int product_id;


}
