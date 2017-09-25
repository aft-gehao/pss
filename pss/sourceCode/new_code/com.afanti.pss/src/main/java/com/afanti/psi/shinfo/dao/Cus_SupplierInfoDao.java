package com.afanti.psi.shinfo.dao;

import com.afanti.psi.shinfo.vo.Cus_Supplier_info;
import com.afanti.psi.shinfo.vo.Customer_delivery_address;
import com.afanti.psi.shinfo.vo.Linkman;
import com.afanti.psi.shinfo.vo.Supplier_product_rel;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface Cus_SupplierInfoDao {
    List<Customer_delivery_address> getAddress(Map<String, Object> params);
    Customer_delivery_address addressSelect(Map<String, Object> params);
    List<Cus_Supplier_info> shinfoSelectPageList(Page page);
    List<Cus_Supplier_info> cusinfoSelectPageList(Page page);
    public void addShInfo( Cus_Supplier_info supplierInfo);
    public void addressModify( Map<String, Object> params);
    public void addressDelete( Map<String, Object> params);
    public void addcusInfo( Cus_Supplier_info supplierInfo);
    public void addaddress( Customer_delivery_address address );
    public void modifycusInfo( Cus_Supplier_info supplierInfo);
    public void productAdd( Supplier_product_rel supplier_product_rel);
    public void updataShInfo( Cus_Supplier_info supplierInfo);
    public int shinfoSelectPageCount(Page page);
    public int cusinfoSelectPageCount(Page page);
    void test(Map<String, Object> params);
    public int shinfoNameSelect(Map<String, Object> params);
    public void shinfoProductUpData(Map<String, Object> params);
    public int shinfoIdSelect();
    public Cus_Supplier_info shinfoDetailSelect(int cs_sup_id);
    public void linkmanAdd( Linkman supplier_linkman);
    public void cuslinkmanAdd( Linkman supplier_linkman);
    public void linkmanUpdate( Linkman supplier_linkman);
    public void linkmanDelete( Linkman supplier_linkman);
    public void shinfoDelete(int cs_sup_id);
    public Linkman linkmanSelect(int s_linkman_id);
    List<Supplier_product_rel> shinfoProductSelectPageList(Page page);
    public int shinfoProductSelectPageCount(Page page);
    public int productAddJiaoYan(Supplier_product_rel supplier_product_rel);
    public Supplier_product_rel productUpDataSelect(Map<String,Object> params);
    public void shinfoProductDelete(Map<String, Object> params);
}
