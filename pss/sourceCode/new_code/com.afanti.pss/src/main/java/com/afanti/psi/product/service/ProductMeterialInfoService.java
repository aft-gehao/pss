package com.afanti.psi.product.service;

import com.afanti.psi.consumable.vo.consumable_material_info;
import com.afanti.psi.consumable.vo.consumable_repair;
import com.afanti.psi.consumable.vo.consumable_use;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.inventory.vo.PurchaseInventoryInfo;
import com.afanti.psi.product.vo.Product_material_info;
import com.afanti.psi.research.vo.product_research;
import com.afanti.psi.shinfo.vo.Supplier_product_rel;
import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface ProductMeterialInfoService {
    public Page<Product_material_info> getProductPageList(Map<String,Object> params);

    public Page<Supplier_product_rel> getSupplierProductPageList(Map<String,Object> params);

    public List<Product_material_info> getProductList(Map<String,Object> params);
    public void productAdd(Map<String,Object> params);
    public void delProduct(Map<String,Object> params);
    public Product_material_info getProductInfo(Map<String,Object> params);
    public void updProductInfo(Map<String,Object> params);
    public String getProductImage(Map<String,Object> params);



    List<product_use> getProductMaterialList(Map<String,Object> params);
    int getProductMaterialCount(Map<String,Object> params);
    List<product_use> use_material(Map<String,Object> params);
    void add_Usematerial(Map<String,Object> params);
    List<product_use> MaterialHistoryList(Map<String,Object> params);
    int MaterialHistoryCount(Map<String,Object> params);
    void updProductMaterial(Map<String,Object> params);
    List<consumable_use> getProductSuppliesList(Map<String,Object> params);
    int getProductSuppliesCount(Map<String,Object> params);
    List<consumable_use> use_supplies(Map<String,Object> params);
    void add_Usesupplies(Map<String,Object> params);
    void updProductSupplies(Map<String,Object> params);
    List<consumable_use> SuppliesHistoryList(Map<String,Object> params);
    int SuppliesHistoryCount(Map<String,Object> params);
    List<product_research> getProductResearchList(Map<String,Object> params);
    int getProductResearchCount(Map<String,Object> params);
    List<product_research> use_res(Map<String,Object> params);
    void add_Useres(Map<String,Object> params);
    void updProductRes(Map<String,Object> params);
    List<product_research> ResearchHistoryList(Map<String,Object> params);
    int ResearchHistoryCount(Map<String,Object> params);
    public List<Staff_info> moblieSelect(Map<String,Object> params);
    List<Product_material_enter_detail> stockSelectCas(Map<String,Object> params);
    void apply_purchasing(Map<String,Object> params);
    List<Product_material_enter_detail> use_purchasing(Map<String,Object> params);
    void add_purchasing(Map<String,Object> params);
    List<consumable_material_info> suppliesSelectName(Map<String,Object> params);
    void add_supplies(Map<String,Object> params);
    void add_consumable_use(Map<String,Object> params);
    List<consumable_repair> suppliesRepairList(Map<String,Object> params);
    int suppliesRepairCount(Map<String,Object> params);
    void addRepairList(Map<String,Object> params);
    void updRepair(Map<String,Object> params);
    List<consumable_repair> selectRepairName(Map<String,Object> params);
    List<consumable_repair> selectRepairFanxiu(Map<String,Object> params);
    void addRepairFanxiu(Map<String,Object> params);
    void no_addRepairFanxiu(Map<String,Object> params);
    List<consumable_material_info> fanxiu_add_select(Map<String,Object> params);
    void addFanxiuRepair(Map<String,Object> params);
    void fanxiu_info_add(Map<String,Object> params);


    List<product_use> MaterialRequisitionAuditList(Map<String,Object> params);
    int MaterialRequisitionAuditCount(Map<String,Object> params);
    void ConfirmationAudit(Map<String,Object> params);
    product_use Receive_Preview(int use_id);
    List<Staff_info> staff_mobilephone(Map<String,Object> params);
    List<consumable_use> getConsumableList(Map<String,Object> params);
    int getConsumableCount(Map<String,Object> params);
    void useUpdate(Map<String,Object> params);
    List<consumable_use> consumable_mobilephone(Map<String, Object> params);
    List<product_research> getResearchList(Map<String, Object> params);
    int getResearchCount(Map<String, Object> params);
    void researchStatusUp(Map<String,Object> params);
    void researchDel(Map<String, Object> params);



    List<PurchaseInventoryInfo> warehouseMaterialList(Map<String, Object> params);
    int warehouseMaterialCount(Map<String, Object> params);


    List<PurchaseInventoryInfo> warehouseMaterialList_history(Map<String, Object> params);
    int warehouseMaterialCount_history(Map<String, Object> params);
}
