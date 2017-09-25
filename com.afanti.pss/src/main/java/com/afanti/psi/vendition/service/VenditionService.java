package com.afanti.psi.vendition.service;

import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.product.vo.Product_material_info;
import com.afanti.psi.shinfo.vo.Cus_Supplier_info;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.vo.Material_quotation;
import com.afanti.psi.vendition.vo.Product_sale;
import com.afanti.psi.vendition.vo.Product_sale_detail;
import com.afanti.psi.vendition.vo.SelectProductInventory;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface VenditionService {

    public Page<Product_sale> getVenditionPageList(Map<String,Object> params);
    public Page<SelectProductInventory> getProductInventoryList(Map<String,Object> params);
    public void venditionSumbit(Map<String,Object> params);
    public Product_sale venditionSumbit_quoation(Map<String,Object> params);
    void venditionUpdSubmit(Map<String,Object> params);
    void vendition_updata(Map<String,Object> params);
    Map<String,Object> loadVenditionInfo(String sale_id);
    void delVendition(Map<String,Object> params);
    Product_sale_detail select_vendition(Map<String,Object> params);

    Page<Material_quotation> materialQuotationSelect(Map<String,Object> params);
    public void add_xunjia(Map<String, Object> params);
    public void sale_doc_add(Map<String, Object> params);
    List<Product_material_info> select_cas(Map<String,Object> params);
    List<Product_material_info> select_sku(Map<String,Object> params);
    int add_product(Product_material_info product_material_info);
    List<Cus_Supplier_info> select_customer(Map<String,Object> params);
    int add_customer(Cus_Supplier_info cus_supplier_info);
    List<Product_material_enter_detail> select_amount(Map<String,Object> params);
    void add_task(Map<String,Object> params);
    int select_hetong_no(Map<String,Object> params);
    int select_id_cas(Map<String,Object> params);
    int selec_id_cus(Map<String,Object> params);
}
