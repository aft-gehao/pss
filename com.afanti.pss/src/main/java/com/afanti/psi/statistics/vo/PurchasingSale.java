package com.afanti.psi.statistics.vo;

import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2017/6/19 0019.采购销售
 */
public class PurchasingSale {
    private String name_ch;
    private String name_en;
    private Date hourTime;
    private float amount;
    private String unit;
    private int mold;
    private String cas;
    private String sku;
    private int number;
    public String test;//月度采购量的字符串拼接
    public String test2;//月度采购金额的字符串拼接
    public String dayTime;

    public String getDayTime() {
        return dayTime;
    }

    public void setDayTime(String dayTime) {
        this.dayTime = dayTime;
    }

    public String getTest2() {
        return test2;
    }

    public void setTest2(String test2) {
        this.test2 = test2;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    private List<String> monthlyAmountData;
    private List<String> monthlyPriceData;

    public List<String> getMonthlyAmountData() {
        return monthlyAmountData;
    }

    public void setMonthlyAmountData(List<String> monthlyAmountData) {
        this.monthlyAmountData = monthlyAmountData;
    }

    public List<String> getMonthlyPriceData() {
        return monthlyPriceData;
    }

    public void setMonthlyPriceData(List<String> monthlyPriceData) {
        this.monthlyPriceData = monthlyPriceData;
    }

    private List sum;

    public List getSum() {
        return sum;
    }

    public void setSum(List sum) {
        this.sum = sum;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    private float unit_price;//单价

    public float getUnit_price() {
        return unit_price;
    }

    public void setUnit_price(float unit_price) {
        this.unit_price = unit_price;
    }

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

    public int getMold() {
        return mold;
    }

    public void setMold(int mold) {
        this.mold = mold;
    }

    public String getName_ch() {
        return name_ch;
    }

    public void setName_ch(String name_ch) {
        this.name_ch = name_ch;
    }

    public String getName_en() {
        return name_en;
    }

    public void setName_en(String name_en) {
        this.name_en = name_en;
    }

    public Date getHourTime() {
        return hourTime;
    }

    public void setHourTime(Date hourTime) {
        this.hourTime = hourTime;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }
}
