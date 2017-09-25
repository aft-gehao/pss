package com.afanti.psi.vendition.vo;
import java.util.Date;

/**
 * 销售报价
 */
public class Material_quotation {
    private int quotation_id;
    private int product_id;
    private double amount;
    private String unit;
    private double price;
    private int custom;
    private Date create_time;
    private Date time;
    private int staff_id;
    private int lead_start;
    private int lead_end;
    private String purity;
    private int status;

    public int getQuotation_id() {
        return quotation_id;
    }

    public void setQuotation_id(int quotation_id) {
        this.quotation_id = quotation_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getCustom() {
        return custom;
    }

    public void setCustom(int custom) {
        this.custom = custom;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public int getStaff_id() {
        return staff_id;
    }

    public void setStaff_id(int staff_id) {
        this.staff_id = staff_id;
    }

    public int getLead_start() {
        return lead_start;
    }

    public void setLead_start(int lead_start) {
        this.lead_start = lead_start;
    }

    public int getLead_end() {
        return lead_end;
    }

    public void setLead_end(int lead_end) {
        this.lead_end = lead_end;
    }

    public String getPurity() {
        return purity;
    }

    public void setPurity(String purity) {
        this.purity = purity;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    private String cas;
    private String sku;
    private String name;
    private String name_en;

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String rate;

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
    }
}
