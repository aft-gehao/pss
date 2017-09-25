package com.afanti.psi.vendition.dao;

import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.vo.Product_sale;
import com.afanti.psi.vendition.vo.Product_sale_detail;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface VenditionReturnDao {
    List<Product_sale> getVenditionReturnPageList(Page<Product_sale> pageInfo);
    int getVenditionReturnPageCount(Page<Product_sale> pageInfo);
    List<Product_sale_detail> getVenditionReturnProductList(Map<String,Object> params);
    public void venditionReturnSubmit(Map<String, Object> params);
}
