package com.afanti.psi.research.vo;

import java.util.Date;

/**
 * Created by gehao on 2017/06/07 0010.
 */
public class product_research {

    //主键id
    private int research_id;

    //主键id
    private int hours;
    //研发人员
    private int research_staff;
    //产品id
    private int product_id;

    public String getSale_batch_no() {
        return sale_batch_no;
    }

    public void setSale_batch_no(String sale_batch_no) {
        this.sale_batch_no = sale_batch_no;
    }

    //产品id
    private String sale_batch_no;

    public String getPutu_url() {
        return putu_url;
    }

    public void setPutu_url(String putu_url) {
        this.putu_url = putu_url;
    }

    //产品id
    private String putu_url;

    public String getFace() {
        return face;
    }

    public void setFace(String face) {
        this.face = face;
    }

    //产品id
    private String face;
    //数量
    private Double amount;
    //入库状态
    private int status;
    //是否禁用
    private int research_is_del;

    public int getIs_waibao() {
        return is_waibao;
    }

    public void setIs_waibao(int is_waibao) {
        this.is_waibao = is_waibao;
    }

    //是否禁用
    private int is_waibao;

    public int getProduct_type() {
        return product_type;
    }

    public void setProduct_type(int product_type) {
        this.product_type = product_type;
    }

    //是否禁用
    private int product_type;
    //研发单名
    private String research_name;


    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    //研发单名
    private String sku;

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    //研发单名
    private String space_name;

    public String getPurity() {
        return purity;
    }

    public void setPurity(String purity) {
        this.purity = purity;
    }

    //研发单名
    private String purity;

    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
    }
    //产品英文名
    private String name_en;
    //单位
    private String unit;
    //批次号
    private String research_batch_no;

    public String getDict_name() {
        return dict_name;
    }

    public void setDict_name(String dict_name) {
        this.dict_name = dict_name;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    //状态
    private String dict_name;

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }
    //状态
    private String cas;
    //用户名
    private String staff_name;
    //研发时间
    private Date research_time;
    private String name_ch;

    public String getName_ch() {
        return name_ch;
    }

    public void setName_ch(String name_ch) {
        this.name_ch = name_ch;
    }

    public int getResearch_id() {
        return research_id;
    }

    public void setResearch_id(int research_id) {
        this.research_id = research_id;
    }

    public int getResearch_staff() {
        return research_staff;
    }

    public void setResearch_staff(int research_staff) {
        this.research_staff = research_staff;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getResearch_is_del() {
        return research_is_del;
    }

    public void setResearch_is_del(int research_is_del) {
        this.research_is_del = research_is_del;
    }

    public String getResearch_name() {
        return research_name;
    }

    public void setResearch_name(String research_name) {
        this.research_name = research_name;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getResearch_batch_no() {
        return research_batch_no;
    }

    public void setResearch_batch_no(String research_batch_no) {
        this.research_batch_no = research_batch_no;
    }

    public Date getResearch_time() {
        return research_time;
    }

    public void setResearch_time(Date research_time) {
        this.research_time = research_time;
    }


    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }


    private int is_dy;

    public int getIs_dy() {
        return is_dy;
    }

    public void setIs_dy(int is_dy) {
        this.is_dy = is_dy;
    }

}
