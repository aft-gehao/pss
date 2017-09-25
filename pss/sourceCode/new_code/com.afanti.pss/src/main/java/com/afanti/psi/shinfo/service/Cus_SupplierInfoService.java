package com.afanti.psi.shinfo.service;

import com.afanti.psi.shinfo.vo.Cus_Supplier_info;
import com.afanti.psi.shinfo.vo.Customer_delivery_address;
import com.afanti.psi.shinfo.vo.Supplier_product_rel;
import com.afanti.psi.utils.Page;

import com.afanti.psi.shinfo.vo.Linkman;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface Cus_SupplierInfoService {
    Page<Cus_Supplier_info> shinfoSelect(Map<String, Object> params);
    Page<Cus_Supplier_info> cusinfoSelect(Map<String, Object> params);
    Page<Supplier_product_rel> shinfoProductSelect(Map<String, Object> params);
    public void shinfoAdd(Map<String,Object> params);
    public void addressAdd(Map<String,Object> params);
    public void cusinfoAdd(Map<String,Object> params);
    public void cusinfomodify(Map<String,Object> params);
    public int shinfoNameSelect(Map<String, Object> params);
    public List<Customer_delivery_address> getAddress(Map<String,Object> params);
    public int shinfoIdSelect();
    public Cus_Supplier_info shinfoDetailSelect(int cs_sup_id);
    public Customer_delivery_address addressSelect(Map<String,Object> params);
    public void addressModify(Map<String,Object> params);
    public void addressDelete(Map<String,Object> params);
    public void linkmanAdd(Map<String,Object> params);
    public void productAdd(Map<String,Object> params);
    public Linkman linkmanSelect(int s_linkman_id);
    public void linkmanUpdate(Map<String,Object> params);
    public void linkmanDelete(Map<String,Object> params);
    public void shinfoDelete(Map<String,Object> params);
    public void shinfoUpdata(Map<String,Object> params);
    public void shinfoProductUpData(Map<String,Object> params);
    public void shinfoProductDelete(Map<String,Object> params);
    public int productAddJiaoYan(Map<String,Object> params);
    public Supplier_product_rel productUpDataSelect(Map<String,Object> params);


}
