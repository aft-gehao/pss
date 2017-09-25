package com.afanti.psi.vendition.dao;

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
public interface VenditionDao {
   List<Product_sale> getVenditionPageList(Page<Product_sale> pageInfo);
   int getVenditionPageCount(Page<Product_sale> pageInfo);
   List<SelectProductInventory> getProductInventoryPageList( Page<SelectProductInventory> pageInfo);
   int getProductInventoryPageCount( Page<SelectProductInventory> pageInfo);
   int addProductSale(Product_sale productSale);
   int addProductSale_quoation(Product_sale productSale);
   void updProductSal(Map<String,Object> params);
   void quoationStatusUpdate(Map<String,Object> params);
   void delProductSalDetail(Map<String,Object> params);
   void sale_doc_add(Map<String,Object> params);
   void addProductSaleDetail(Map<String,Object> params);
   void addProductSaleDetailForQuoation(Map<String,Object> params);
   Product_sale getProductSaleInfo(Map<String,Object> params);
   List<Product_sale_detail> getProductSaleDetialList(Map<String,Object> params);



   List<Material_quotation> materialQuotationSelectPageList(Page<Material_quotation> pageInfo);
   int materialQuotationSelectPageCount(Page<Material_quotation> pageInfo);
   void add_xunjia(Map<String,Object> params);
   int select_count_cas(Map<String,Object> params);
   List<Product_material_enter_detail> kucun_select(int product_id);
   Product_material_enter_detail kucun_info_select(Map<String,Object> params);
   List<Integer> select_id_cas(Map<String,Object> params);
   List<Integer> select_id_cus(Map<String,Object> params);
   int select_count_cus(Map<String,Object> params);
   List<Product_material_info> select_cas(Map<String,Object> params);
   List<Product_material_info> select_sku(Map<String,Object> params);
   int add_product(Product_material_info product_material_info);
   List<Cus_Supplier_info> select_customer(Map<String,Object> params);
   int add_customer(Cus_Supplier_info cus_supplier_info);
   List<Product_material_enter_detail> select_amount(Map<String,Object> params);
   void add_task(Map<String,Object> params);
   int select_hetong_no(Map<String,Object> params);
   void insert_product(Map<String,Object> params);
   void insert_cus(Map<String,Object> params);
   void vendition_updata(Map<String,Object> params);
   Product_sale_detail select_vendition(Map<String,Object> params);
}
