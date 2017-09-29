package com.afanti.psi.purchasing.dao;

import com.afanti.psi.consumable.vo.consumable_purchase;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.product.vo.Product_material_info;
import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.purchasing.vo.Material_purchase_detail;
import com.afanti.psi.shinfo.vo.Cus_Supplier_info;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface MaterialPurchaseDao {
    public Integer getPurchaseCount(Map<String,Object> params);
    public Integer insert_product(Map<String,Object> params);
    public Integer insert_product_foryanfa(Map<String,Object> params);
    public Integer insert_supplier(Map<String,Object> params);
    public Integer use_add(Map<String,Object> params);
    public Integer getConsumablePurchaseCount(Map<String,Object> params);
    public List<consumable_purchase> getConsumablePurchase(Map<String,Object> params);
    public List<Material_purchase_detail> getPurchase(Map<String,Object> params);
    public List<Material_purchase> getMaterialPurchasePageList(Page<Material_purchase> pageInfo);
    public int getMaterialPurchasePageCount(Page<Material_purchase> pageInfo);
    public Cus_Supplier_info getsupplierCount(Map<String,Object> params);
    public void addMaterialPurchase(Material_purchase materialPurchase);
    public void updMaterialPurchase(Map<String,Object> params);
    public void updMaterialPurchaseforls(Map<String,Object> params);
    public void updPurchaseDetail(Map<String,Object> params);
    public Product_material_info select_product_id(Map<String,Object> params);
    public void fahuo(Map<String,Object> params);
    public void fahuo_pur_detaail(Map<String,Object> params);
    public void fahuo_pur(Map<String,Object> params);
    public void addMaterialPurchaseDetail(Map<String,Object> params);
    public void addMaterialPurchaseDetailForcg(Map<String,Object> params);
    public void addhetong(Map<String,Object> params);
    public void uphetong(Map<String,Object> params);
    public Integer addMaterialPurchaseForMap(Map<String,Object> params);
    public void updMaterialPurchaseDetail(Map<String,Object> params);
    public Material_purchase getMaterialPurchaseInfo(Map<String,Object> params);
    public List<Material_purchase_detail> getMaterialPurchaseDetailList(Map<String,Object> params);
    public void addmaterial(Map<String,Object> params);
    public void upmaterial(Map<String,Object> params);
    Product_material_enter_detail select_enter_time(Map<String,Object> params);

}
