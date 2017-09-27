package com.afanti.psi.use.vo;

import java.util.Date;

/**
 * Created by gehao on 2017/06/06 0010.
 */
public class product_use {
    /*主键*/
    private int use_id;
    /*产品id*/
    private int product_id;

    public int getPurchase_id() {
        return purchase_id;
    }

    public void setPurchase_id(int purchase_id) {
        this.purchase_id = purchase_id;
    }

    /*产品id*/
    private int purchase_id;
    /*使用量*/
    private double use_amount;

    public int getSpace_id() {
        return space_id;
    }

    public void setSpace_id(int space_id) {
        this.space_id = space_id;
    }

    /*仓位*/
    private int space_id;
    /*使用人id*/
    private int use_staff;
    /*是否禁用*/
    private int use_is_del;
    /*出库状态*/
    private int status;
    /*单位*/
    private String use_unit;

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

    /*单位*/
    private String kd_num;
    /*单位*/
    private String kd_code;
    /*单位*/
    private String check_desc;

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    /*单位*/
    private String cas;

    public String getPurity() {
        return purity;
    }

    public void setPurity(String purity) {
        this.purity = purity;
    }

    /*单位*/
    private String purity;

    public String getIdentifying_code() {
        return identifying_code;
    }

    public void setIdentifying_code(String identifying_code) {
        this.identifying_code = identifying_code;
    }

    /*领用验证码*/
    private String identifying_code;

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    /*姓名*/
    private String staff_name;
    public String getDict_name() {
        return dict_name;
    }

    public void setDict_name(String dict_name) {
        this.dict_name = dict_name;
    }

    /*单位*/
    private String dict_name;

    public String getCheck_name() {
        return check_name;
    }

    public void setCheck_name(String check_name) {
        this.check_name = check_name;
    }

    /*单位*/
    private String check_name;

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    /*单位*/
    private String space_name;

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    /*单位*/
    private String nameEn;

    public String getNameCh() {
        return nameCh;
    }

    public void setNameCh(String nameCh) {
        this.nameCh = nameCh;
    }

    /*单位*/
    private String nameCh;

    public int getCheck_staff() {
        return check_staff;
    }

    public void setCheck_staff(int check_staff) {
        this.check_staff = check_staff;
    }

    /*单位*/
    private int check_staff;

    /*单位*/
    private Date check_time;


    /*单位*/
    private String use_desc;

    /*使用时间*/
    private Date use_time;

    /*出库名称*/
    private String use_name;
    public Date getCheck_time() {
        return check_time;
    }

    public void setCheck_time(Date check_time) {
        this.check_time = check_time;
    }

    public String getUse_desc() {
        return use_desc;
    }

    public void setUse_desc(String use_desc) {
        this.use_desc = use_desc;
    }


    public Date getUse_time() {
        return use_time;
    }

    public void setUse_time(Date use_time) {
        this.use_time = use_time;
    }


    /*产品批次号*/
    private String use_batch_no;
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getUse_id() {
        return use_id;
    }

    public void setUse_id(int use_id) {
        this.use_id = use_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public double getUse_amount() {
        return use_amount;
    }

    public void setUse_amount(double use_amount) {
        this.use_amount = use_amount;
    }

    public int getUse_staff() {
        return use_staff;
    }

    public void setUse_staff(int use_staff) {
        this.use_staff = use_staff;
    }

    public int getUse_is_del() {
        return use_is_del;
    }

    public void setUse_is_del(int use_is_del) {
        this.use_is_del = use_is_del;
    }

    public String getUse_unit() {
        return use_unit;
    }

    public void setUse_unit(String use_unit) {
        this.use_unit = use_unit;
    }

    public String getUse_name() {
        return use_name;
    }

    public void setUse_name(String use_name) {
        this.use_name = use_name;
    }



    public String getUse_batch_no() {
        return use_batch_no;
    }

    public void setUse_batch_no(String use_batch_no) {
        this.use_batch_no = use_batch_no;
    }

    private String sku;

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getCheck_desc() {
        return check_desc;
    }

    public void setCheck_desc(String check_desc) {
        this.check_desc = check_desc;
    }

    private String name_ch;

    public String getName_ch() {
        return name_ch;
    }

    public void setName_ch(String name_ch) {
        this.name_ch = name_ch;
    }

    private int is_usedel;

    public int getIs_usedel() {
        return is_usedel;
    }

    public void setIs_usedel(int is_usedel) {
        this.is_usedel = is_usedel;
    }

    private int staff_id;

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    private int is_sale;
    private int sale_d_id;

    public int getIs_sale() {
        return is_sale;
    }

    public void setIs_sale(int is_sale) {
        this.is_sale = is_sale;
    }

    public int getSale_d_id() {
        return sale_d_id;
    }

    public void setSale_d_id(int sale_d_id) {
        this.sale_d_id = sale_d_id;
    }
}
