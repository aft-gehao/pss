package com.afanti.psi.inventory.vo;

import java.util.Date;

/**
 * 产品实时库存表
 */
public class Product_material_stock {
    /**
     * 产品实时库存主键id
     * 20170414  add by gehao
     */
    private int stockId;

    public int getEnter_d_id() {
        return enter_d_id;
    }

    public void setEnter_d_id(int enter_d_id) {
        this.enter_d_id = enter_d_id;
    }

    /**
     * 产品实时库存主键id
     * 20170414  add by gehao
     */
    private int enter_d_id;
    /**
     * 产品编码
     * 20170414  add by gehao
     */
    private int productId;
    /**
     * 仓位编码
     * 20170414  add by gehao
     */
    private int spaceId;
    /**
     * 计量单位
     * 20170414  add by gehao
     */
    private String unit;
    /**
     * 计量单位
     * 20170414  add by gehao
     */
    private String sale_batch_no;
    private String putu;

    public String getSpace_name() {
        return space_name;
    }

    public void setSpace_name(String space_name) {
        this.space_name = space_name;
    }

    /**
     * 计量单位
     * 20170414  add by gehao
     */
    private String space_name;


    /**
     * 总库存量
     * 20170414  add by gehao
     */
    private int totalAmount;
    /**
     * 已用库存量
     * 20170414  add by gehao
     */
    private String usedAmount;
    /**
     * 可用库存量
     * 20170414  add by gehao
     */
    private int leftAmount;
    /**
     * 备注
     * 20170414  add by gehao
     */
    private String desc;
    /**
     * 最后一次修改时间
     * 20170414  add by gehao
     */
    private Date lastOperTime;
    /**
     * 最后一次修改人
     * 20170414  add by gehao
     */
    private int lastOperId;
    /**
     * 产品中文名
     * 20170414  add by gehao
     */
    private String nameCh;
    /**
     * 产品英文文名
     * 20170414  add by gehao
     */
    private String nameEn;
    /**
     * 产品cas
     * 20170414  add by gehao
     */
    private String cas;
    /**
     * 员工姓名
     * 20170416  add by gehao
     */
    private String staff_name;
    /**
     * 产品入库量
     * 20170416  add by gehao
     */
    private int amount;

    public float getAmountFloat() {
        return amountFloat;
    }

    public void setAmountFloat(float amountFloat) {
        this.amountFloat = amountFloat;
    }

    /**
     * 产品入库量
     * 20170416  add by gehao
     */
    private float  amount_leave;

    public float getAmount_out() {
        return amount_out;
    }

    public void setAmount_out(float amount_out) {
        this.amount_out = amount_out;
    }

    public float getAmount_leave() {
        return amount_leave;
    }

    public void setAmount_leave(float amount_leave) {
        this.amount_leave = amount_leave;
    }

    public float getA_out() {
        return a_out;
    }

    public void setA_out(float a_out) {
        this.a_out = a_out;
    }

    public float getA_in() {
        return a_in;
    }

    public void setA_in(float a_in) {
        this.a_in = a_in;
    }

    /**
     * 产品入库量
     * 20170416  add by gehao
     */
    private float  a_out;
    /**
     * 产品入库量
     * 20170416  add by gehao
     */
    private float  a_in;
    /**
     * 产品入库量
     * 20170416  add by gehao
     */
    private float  amount_out;
    /**
     * 产品入库量
     * 20170416  add by gehao
     */
    private String purity;
    private float amountFloat;
    /**
     * 产品变动类型
     * 20170416  add by gehao
     */
    private String m_type;
    /**
     * 产品入库时间
     * 20170416  add by gehao
     */
    private Date m_date;
    /**
     * 产品入库备注
     * 20170416  add by gehao
     */
    private String m_desc;
    /**
     * 产品入库时间string
     * 20170416  add by gehao
     */
    private String m_time;

    private int product_id;
    //
    private String purchase_name;
    private String batch_no;
    private String in_batch_no;
    private String in_amount;
    private Date in_date;
    private String in_staff_name;
    private String out_staff_name;
    private String play_type;
    private Date out_date;
    private int out_d_id;
    private String out_amount;
    private String in_desc;
    private String out_desc;
    private Date enter_date;
    private String product_name;
    private String enter_desc;
    private String sku;

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getEnter_desc() {
        return enter_desc;
    }

    public void setEnter_desc(String enter_desc) {
        this.enter_desc = enter_desc;
    }

    public String getBatch_no() {
        return batch_no;
    }

    public void setBatch_no(String batch_no) {
        this.batch_no = batch_no;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public Date getEnter_date() {
        return enter_date;
    }

    public void setEnter_date(Date enter_date) {
        this.enter_date = enter_date;
    }

    public String getIn_desc() {
        return in_desc;
    }

    public void setIn_desc(String in_desc) {
        this.in_desc = in_desc;
    }

    public String getOut_desc() {
        return out_desc;
    }

    public void setOut_desc(String out_desc) {
        this.out_desc = out_desc;
    }

    public String getPurchase_name() {
        return purchase_name;
    }

    public void setPurchase_name(String purchase_name) {
        this.purchase_name = purchase_name;
    }

    public String getIn_batch_no() {
        return in_batch_no;
    }

    public void setIn_batch_no(String in_batch_no) {
        this.in_batch_no = in_batch_no;
    }

    public String getIn_amount() {
        return in_amount;
    }

    public void setIn_amount(String in_amount) {
        this.in_amount = in_amount;
    }

    public Date getIn_date() {
        return in_date;
    }

    public void setIn_date(Date in_date) {
        this.in_date = in_date;
    }

    public String getIn_staff_name() {
        return in_staff_name;
    }

    public void setIn_staff_name(String in_staff_name) {
        this.in_staff_name = in_staff_name;
    }

    public String getOut_staff_name() {
        return out_staff_name;
    }

    public void setOut_staff_name(String out_staff_name) {
        this.out_staff_name = out_staff_name;
    }

    public String getPlay_type() {
        return play_type;
    }

    public void setPlay_type(String play_type) {
        this.play_type = play_type;
    }

    public Date getOut_date() {
        return out_date;
    }

    public void setOut_date(Date out_date) {
        this.out_date = out_date;
    }

    public int getOut_d_id() {
        return out_d_id;
    }

    public void setOut_d_id(int out_d_id) {
        this.out_d_id = out_d_id;
    }

    public String getOut_amount() {
        return out_amount;
    }

    public void setOut_amount(String out_amount) {
        this.out_amount = out_amount;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public int getLastOperId() {
        return lastOperId;
    }

    public void setLastOperId(int lastOperId) {
        this.lastOperId = lastOperId;
    }

    public Date getLastOperTime() {
        return lastOperTime;
    }

    public void setLastOperTime(Date lastOperTime) {
        this.lastOperTime = lastOperTime;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getLeftAmount() {
        return leftAmount;
    }

    public void setLeftAmount(int leftAmount) {
        this.leftAmount = leftAmount;
    }

    public String getUsedAmount() {
        return usedAmount;
    }

    public void setUsedAmount(String usedAmount) {
        this.usedAmount = usedAmount;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getSpaceId() {
        return spaceId;
    }

    public void setSpaceId(int spaceId) {
        this.spaceId = spaceId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getStockId() {
        return stockId;
    }

    public void setStockId(int stockId) {
        this.stockId = stockId;
    }

    public String getNameCh() {
        return nameCh;
    }

    public void setNameCh(String nameCh) {
        this.nameCh = nameCh;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getCas() {
        return cas;
    }

    public void setCas(String cas) {
        this.cas = cas;
    }

    public String getStaff_name() {
        return staff_name;
    }

    public void setStaff_name(String staff_name) {
        this.staff_name = staff_name;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }


    public String getM_type() {
        return m_type;
    }

    public void setM_type(String m_type) {
        this.m_type = m_type;
    }



    public String getM_desc() {
        return m_desc;
    }

    public void setM_desc(String m_desc) {
        this.m_desc = m_desc;
    }


    public Date getM_date() {
        return m_date;
    }

    public void setM_date(Date m_date) {
        this.m_date = m_date;
    }

    public String getM_time() {
        return m_time;
    }

    public void setM_time(String m_time) {
        this.m_time = m_time;
    }

    public String getSale_batch_no() {
        return sale_batch_no;
    }

    public void setSale_batch_no(String sale_batch_no) {
        this.sale_batch_no = sale_batch_no;
    }

    public String getPutu() {
        return putu;
    }

    public void setPutu(String putu) {
        this.putu = putu;
    }

    public String getPurity() {
        return purity;
    }

    public void setPurity(String purity) {
        this.purity = purity;
    }
}
