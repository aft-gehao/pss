package com.afanti.psi.vendition.service;

import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.vo.Product_sale;

import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface VenditionReturnService {
    public Page<Product_sale> getVenditionReturnPageList(Map<String,Object> params);
    public Map<String,Object> loadVenditionInventory(String sale_id);
    public void venditionReturnSubmit(Map<String,Object> params) throws Exception;
    public void return_submit(Map<String,Object> params) throws Exception;
    Page<Product_sale> salePageList(Map<String,Object> params);
    Page<Product_sale> sale_returnPageList(Map<String,Object> params);
}
