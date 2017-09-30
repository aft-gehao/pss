package com.afanti.psi.vendition.dao;

import com.afanti.psi.use.vo.product_use;
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


    List<Product_sale> salePageList(Page<Product_sale> pageInfo);
    int salePageCount(Page<Product_sale> pageInfo);
    List<Product_sale> sale_returnPageList(Page<Product_sale> pageInfo);
    int sale_returnPageCount(Page<Product_sale> pageInfo);

    public List<product_use> selectUseForSale(Map<String, Object> params);
    public void insert_return(Map<String, Object> params);
    public void insert_return_details(Map<String, Object> params);
    public void status_up(Map<String, Object> params);
    public void status_up_fordetails(Map<String, Object> params);

}
