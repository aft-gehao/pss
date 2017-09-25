package com.afanti.psi.product.vo;

import java.util.Date;

/**
 * 产品管理表
 */
public class Product_material_info {
    private int product_id;
    private String mol_formula;
    private String mol;
    private String smiles;
    private String name_ch;
    private String imgage;
    private String name_en;
    private String cas;
    private int create_oper;
    private Date create_time;
    private int modify_oper;
    private Date modify_time;
    private int status;
    private String create_oper_name;
    private String modify_oper_name;
    private int product_material_info;
    private int product_type;
    private String product_type_name;
    private Float price;
    private String unit;
    private String purity;
    private String mdl_number;
    private String purity_category;
    private String form;
    private String mol_weight;


    public String getWebsite_url() {
        return website_url;
    }

    public void setWebsite_url(String website_url) {
        this.website_url = website_url;
    }

    public String getMdl_number() {
        return mdl_number;
    }

    public void setMdl_number(String mdl_number) {
        this.mdl_number = mdl_number;
    }

    public String getPurity_category() {
        return purity_category;
    }

    public void setPurity_category(String purity_category) {
        this.purity_category = purity_category;
    }

    public String getForm() {
        return form;
    }

    public void setForm(String form) {
        this.form = form;
    }

    public String getHazard() {
        return hazard;
    }

    public void setHazard(String hazard) {
        this.hazard = hazard;
    }

    public String getPrecautionary() {
        return precautionary;
    }

    public void setPrecautionary(String precautionary) {
        this.precautionary = precautionary;
    }

    public String getGhs_code() {
        return ghs_code;
    }

    public void setGhs_code(String ghs_code) {
        this.ghs_code = ghs_code;
    }

    private String website_url;

    public float getWarning_amount() {
        return warning_amount;
    }

    public void setWarning_amount(float warning_amount) {
        this.warning_amount = warning_amount;
    }

    private float warning_amount;
    private String msds;
    private String hazard;
    private String precautionary;
    private String ghs_code;


    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    private String sku;

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getPurity() {
        return purity;
    }

    public void setPurity(String purity) {
        this.purity = purity;
    }

    public String getProduct_type_name() {
        return product_type_name;
    }

    public void setProduct_type_name(String product_type_name) {
        this.product_type_name = product_type_name;
    }

    public int getProduct_type() {
        return product_type;
    }

    public void setProduct_type(int product_type) {
        this.product_type = product_type;
    }

    public int getProduct_material_info() {
        return product_material_info;
    }

    public void setProduct_material_info(int product_material_info) {
        this.product_material_info = product_material_info;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public String getMol_weight() {
        return mol_weight;
    }

    public void setMol_weight(String mol_weight) {
        this.mol_weight = mol_weight;
    }

    public String getMol_formula() {
        return mol_formula;
    }

    public void setMol_formula(String mol_formula) {
        this.mol_formula = mol_formula;
    }

    public String getMol() {
        return mol;
    }

    public void setMol(String mol) {
        this.mol = mol;
    }

    public String getSmiles() {
        return smiles;
    }

    public void setSmiles(String smiles) {
        this.smiles = smiles;
    }

    public String getName_ch() {
        return name_ch;
    }

    public void setName_ch(String name_ch) {
        this.name_ch = name_ch;
    }

    public String getImgage() {
        return imgage;
    }

    public void setImgage(String imgage) {
        this.imgage = imgage;
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

    public int getCreate_oper() {
        return create_oper;
    }

    public void setCreate_oper(int create_oper) {
        this.create_oper = create_oper;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public int getModify_oper() {
        return modify_oper;
    }

    public void setModify_oper(int modify_oper) {
        this.modify_oper = modify_oper;
    }

    public Date getModify_time() {
        return modify_time;
    }

    public void setModify_time(Date modify_time) {
        this.modify_time = modify_time;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreate_oper_name() {
        return create_oper_name;
    }

    public void setCreate_oper_name(String create_oper_name) {
        this.create_oper_name = create_oper_name;
    }

    public String getModify_oper_name() {
        return modify_oper_name;
    }

    public void setModify_oper_name(String modify_oper_name) {
        this.modify_oper_name = modify_oper_name;
    }

    public String getMsds() {
        return msds;
    }

    public void setMsds(String msds) {
        this.msds = msds;
    }

    private int ct;

    public int getCt() {
        return ct;
    }

    public void setCt(int ct) {
        this.ct = ct;
    }

    private String rate;

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }
}
