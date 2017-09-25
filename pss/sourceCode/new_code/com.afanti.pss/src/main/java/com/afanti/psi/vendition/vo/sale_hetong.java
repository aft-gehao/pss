package com.afanti.psi.vendition.vo;


import com.afanti.psi.htmltopdf.pdf.AbstractDocumentVo;

import java.io.Serializable;

/**
 * 产品销售【主表】
 */
public class sale_hetong extends AbstractDocumentVo implements Serializable {
    private static final long serialVersionUID = 1L;
    private String company;
    private String shuihao;
    private String bank;

    public String getBank_number() {
        return bank_number;
    }

    public void setBank_number(String bank_number) {
        this.bank_number = bank_number;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getShuihao() {
        return shuihao;
    }

    public void setShuihao(String shuihao) {
        this.shuihao = shuihao;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getCompany_people() {
        return company_people;
    }

    public void setCompany_people(String company_people) {
        this.company_people = company_people;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    private String bank_number;
    private String company_people;
    private String telephone;

     private String customer;
     private String img_path;
     private String hetong_no;
     private String hetong_time;
     private String name_en;
    private int sale_d_id;
     private String cas;
     private float amount;

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getHetong_no() {
        return hetong_no;
    }

    public void setHetong_no(String hetong_no) {
        this.hetong_no = hetong_no;
    }
    public String findPrimaryKey() {
        return this.hetong_no;
    }
    public String getHetong_time() {
        return hetong_time;
    }

    public void setHetong_time(String hetong_time) {
        this.hetong_time = hetong_time;
    }

    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
    }

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getZhil_biaozhun() {
        return zhil_biaozhun;
    }

    public void setZhil_biaozhun(String zhil_biaozhun) {
        this.zhil_biaozhun = zhil_biaozhun;
    }

    public String getJiaohuo_time() {
        return jiaohuo_time;
    }

    public void setJiaohuo_time(String jiaohuo_time) {
        this.jiaohuo_time = jiaohuo_time;
    }

    public String getJiaohuo_address() {
        return jiaohuo_address;
    }

    public void setJiaohuo_address(String jiaohuo_address) {
        this.jiaohuo_address = jiaohuo_address;
    }

    public String getMoney_daxie() {
        return money_daxie;
    }

    public void setMoney_daxie(String money_daxie) {
        this.money_daxie = money_daxie;
    }

    private String unit;
     private int money;
     private String desc;
     private String zhil_biaozhun;
     private String jiaohuo_time;
     private String jiaohuo_address;
    private String money_daxie;

    public String getImg_path() {
        return img_path;
    }

    public void setImg_path(String img_path) {
        this.img_path = img_path;
    }

    public int getSale_d_id() {
        return sale_d_id;
    }

    public void setSale_d_id(int sale_d_id) {
        this.sale_d_id = sale_d_id;
    }
}
