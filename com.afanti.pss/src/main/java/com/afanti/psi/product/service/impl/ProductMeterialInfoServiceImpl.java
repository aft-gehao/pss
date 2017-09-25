package com.afanti.psi.product.service.impl;

import com.afanti.psi.consumable.vo.consumable_material_info;
import com.afanti.psi.consumable.vo.consumable_repair;
import com.afanti.psi.consumable.vo.consumable_use;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.inventory.vo.PurchaseInventoryInfo;
import com.afanti.psi.product.dao.ProductMeterialInfoDao;
import com.afanti.psi.product.service.ProductMeterialInfoService;
import com.afanti.psi.product.vo.Product_material_info;
import com.afanti.psi.research.vo.product_research;
import com.afanti.psi.shinfo.vo.Supplier_product_rel;
import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class ProductMeterialInfoServiceImpl implements ProductMeterialInfoService {

    @Autowired
    private ProductMeterialInfoDao productMeterialInfoDao;
    @Override
    public Page<Product_material_info> getProductPageList(Map<String, Object> params) {
        Page<Product_material_info> pageInfo = new Page<Product_material_info>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Product_material_info> productMaterialInfoList = productMeterialInfoDao.getProductPageList(pageInfo);
        pageInfo.setResults(productMaterialInfoList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public Page<Supplier_product_rel> getSupplierProductPageList(Map<String, Object> params) {
        Page<Supplier_product_rel> pageInfo = new Page<Supplier_product_rel>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Supplier_product_rel> productMaterialInfoList = productMeterialInfoDao.getSupplierProductPageList(pageInfo);
        pageInfo.setResults(productMaterialInfoList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public List<Product_material_info> getProductList(Map<String, Object> params) {
        return productMeterialInfoDao.getProductList(params);
    }

    @Override
    public void productAdd(Map<String, Object> params) {
       /* Product_material_info productMaterialInfo = new Product_material_info();
        productMaterialInfo.setName_ch(String.valueOf(params.get("name_ch")));
        productMaterialInfo.setName_en(String.valueOf(params.get("name_en")));
        productMaterialInfo.setMol_weight(String.valueOf(params.get("mol_weight")));
        productMaterialInfo.setMol_formula(String.valueOf(params.get("mol_formula")));
        productMaterialInfo.setMol(String.valueOf(params.get("mol")));
        productMaterialInfo.setSmiles(String.valueOf(params.get("smiles")));
        productMaterialInfo.setCas(String.valueOf(params.get("cas")));
        productMaterialInfo.setImgage(String.valueOf(params.get("imgage")));
        productMaterialInfo.setCreate_oper(Integer.valueOf(String.valueOf(params.get("create_oper"))));
        productMaterialInfo.setModify_oper(Integer.valueOf(String.valueOf(params.get("modify_oper"))));
        productMaterialInfo.setCreate_time(new Date());
        productMaterialInfo.setModify_time(new Date());
        productMaterialInfo.setMdl_number(String.valueOf(params.get("mdl_number")));
        productMaterialInfo.setPurity(String.valueOf(params.get("purity")));
        productMaterialInfo.setForm(String.valueOf(params.get("form")));
        productMaterialInfo.setWebsite_url(String.valueOf(params.get("website_url")));
        productMaterialInfo.setMsds(String.valueOf(params.get("msds")));
        productMaterialInfo.setHazard(String.valueOf(params.get("hazard")));
        productMaterialInfo.setPrecautionary(String.valueOf(params.get("precautionary")));
        productMaterialInfo.setGhs_code(String.valueOf(params.get("ghs_code")));
        productMaterialInfo.setSku(String.valueOf(params.get("sku")));
        productMaterialInfo.setStatus(0);
        productMaterialInfo.setMol_weight(String.valueOf(params.get("mol_weight")));
        if((String.valueOf(params.get("warning_amount"))!=""))
        {
            productMaterialInfo.setWarning_amount(Float.parseFloat((String.valueOf(params.get("warning_amount")))));
        }
        productMaterialInfo.setPurity_category(String.valueOf(params.get("purity_category")));
//        productMaterialInfo.setProduct_type(Integer.valueOf(String.valueOf(params.get("product_type"))));*/
        params.put("status",0);
        if(String.valueOf(params.get("sku"))!="")
        {
            params.put("product_type",4002);
        }
        else
        {
            params.put("product_type",4001);
        }
        params.put("create_time",new Date());
        params.put("modify_time",new Date());
        productMeterialInfoDao.addProductInfo(params);
    }

    @Override
    public void delProduct(Map<String, Object> params) {
        productMeterialInfoDao.delProduct(params);
    }

    @Override
    public Product_material_info getProductInfo(Map<String, Object> params) {
        return productMeterialInfoDao.getProductInfo(params);
    }

    @Override
    public void updProductInfo(Map<String, Object> params) {
        productMeterialInfoDao.updProductInfo(params);
    }

    @Override
    public String getProductImage(Map<String, Object> params) {
        return productMeterialInfoDao.getProductImage(params);
    }





    public List<product_use> getProductMaterialList(Map<String, Object> params){
        List<product_use> list = productMeterialInfoDao.getProductMaterialList(params);
        return list;
    }
    public int getProductMaterialCount(Map<String,Object> params){
        int count=productMeterialInfoDao.getProductMaterialCount(params);
        return count;
    }
    public List<product_use> use_material(Map<String,Object> params){
        List<product_use> list=productMeterialInfoDao.use_material(params);
        return list;
    }
    public void add_Usematerial(Map<String,Object> params){
        productMeterialInfoDao.add_Usematerial(params);
    }
    public List<product_use> MaterialHistoryList(Map<String, Object> params){
        List<product_use> list = productMeterialInfoDao.MaterialHistoryList(params);
        return list;
    }
    public int MaterialHistoryCount(Map<String,Object> params){
        int count=productMeterialInfoDao.MaterialHistoryCount(params);
        return count;
    }
    public void updProductMaterial(Map<String,Object> params){
        productMeterialInfoDao.updProductMaterial(params);
    }
    public List<consumable_use> getProductSuppliesList(Map<String, Object> params){
        List<consumable_use> list = productMeterialInfoDao.getProductSuppliesList(params);
        return list;
    }
    public int getProductSuppliesCount(Map<String,Object> params){
        int count=productMeterialInfoDao.getProductSuppliesCount(params);
        return count;
    }
    public List<consumable_use> use_supplies(Map<String,Object> params){
        List<consumable_use> list=productMeterialInfoDao.use_supplies(params);
        return list;
    }
    public void add_Usesupplies(Map<String,Object> params){
        productMeterialInfoDao.add_Usesupplies(params);
    }
    public void updProductSupplies(Map<String,Object> params){
        productMeterialInfoDao.updProductSupplies(params);
    }
    public List<consumable_use> SuppliesHistoryList(Map<String, Object> params){
        List<consumable_use> list = productMeterialInfoDao.SuppliesHistoryList(params);
        return list;
    }
    public int SuppliesHistoryCount(Map<String,Object> params){
        int count=productMeterialInfoDao.SuppliesHistoryCount(params);
        return count;
    }
    public List<product_research> getProductResearchList(Map<String,Object> params){
        List<product_research> list=productMeterialInfoDao.getProductResearchList(params);
        return  list;
    }
    public int getProductResearchCount(Map<String,Object> params){
        int count=productMeterialInfoDao.getProductResearchCount(params);
        return count;
    }
    ;public List<product_research> use_res(Map<String,Object> params){
        List<product_research> list=productMeterialInfoDao.use_res(params);
        return list;
    }
    public void add_Useres(Map<String,Object> params){
        productMeterialInfoDao.add_Useres(params);
    }
    public void updProductRes(Map<String,Object> params){
        productMeterialInfoDao.updProductRes(params);
    }
    public List<product_research> ResearchHistoryList(Map<String,Object> params){
        List<product_research> list=productMeterialInfoDao.ResearchHistoryList(params);
        return  list;
    }
    public int ResearchHistoryCount(Map<String,Object> params){
        int count=productMeterialInfoDao.ResearchHistoryCount(params);
        return count;
    }
    public List<Staff_info> moblieSelect(Map<String,Object> params) {
        List<Staff_info> list=productMeterialInfoDao.moblieSelect(params);
        return list;
    }
    public List<Product_material_enter_detail> stockSelectCas(Map<String,Object> params){
        List<Product_material_enter_detail> list=productMeterialInfoDao.stockSelectCas(params);
        return list;
    }
    public void apply_purchasing(Map<String,Object> params){
        productMeterialInfoDao.apply_purchasing(params);
    }
    public List<Product_material_enter_detail> use_purchasing(Map<String,Object> params){
        List<Product_material_enter_detail> list= productMeterialInfoDao.use_purchasing(params);
        return list;
    }
    public void add_purchasing(Map<String,Object> params){
        productMeterialInfoDao.add_purchasing(params);
    }
    public List<consumable_material_info> suppliesSelectName(Map<String,Object> params){
        List<consumable_material_info> list=productMeterialInfoDao.suppliesSelectName(params);
        return  list;
    }
    public void add_supplies(Map<String,Object> params){
        productMeterialInfoDao.add_supplies(params);
    }
    public void add_consumable_use(Map<String,Object> params){
        productMeterialInfoDao.add_consumable_use(params);
    }
    public List<consumable_repair> suppliesRepairList(Map<String,Object> params){
        List<consumable_repair> list=productMeterialInfoDao.suppliesRepairList(params);
        return list;
    }
    public int suppliesRepairCount(Map<String,Object> params){
        int count=productMeterialInfoDao.suppliesRepairCount(params);
        return count;
    }
    public void addRepairList(Map<String,Object> params){
        productMeterialInfoDao.addRepairList(params);
    }
    public void updRepair(Map<String,Object> params){
        params.put("is_usedel",1);
        productMeterialInfoDao.updRepair(params);
    }
    public List<consumable_repair> selectRepairName(Map<String,Object> params){
        List<consumable_repair> list = productMeterialInfoDao.selectRepairName(params);
        return list;
    }
    public List<consumable_repair> selectRepairFanxiu(Map<String,Object> params){
        List<consumable_repair> list = productMeterialInfoDao.selectRepairFanxiu(params);
        return list;
    }
    public void addRepairFanxiu(Map<String,Object> params){
        productMeterialInfoDao.addRepairFanxiu(params);
    }
    public void no_addRepairFanxiu(Map<String,Object> params){
        productMeterialInfoDao.no_addRepairFanxiu(params);
    }
public List<consumable_material_info> fanxiu_add_select(Map<String,Object> params){
    List<consumable_material_info> list=productMeterialInfoDao.fanxiu_add_select(params);
    return list;
}
    public void addFanxiuRepair(Map<String,Object> params){
        productMeterialInfoDao.addFanxiuRepair(params);
    }
    public void fanxiu_info_add(Map<String,Object> params){
        productMeterialInfoDao.fanxiu_info_add(params);
    }




    public List<product_use> MaterialRequisitionAuditList(Map<String,Object> params){
        List<product_use> list=productMeterialInfoDao.MaterialRequisitionAuditList(params);
        return list;
    }
    public int MaterialRequisitionAuditCount(Map<String,Object> params){
        int count=productMeterialInfoDao.MaterialRequisitionAuditCount(params);
        return count;
    }
    public void ConfirmationAudit(Map<String,Object> params){
        productMeterialInfoDao.ConfirmationAudit(params);
    }
    public product_use Receive_Preview(int use_id) {
        product_use p = productMeterialInfoDao.Receive_Preview(use_id);
        return p;
    }
    public List<Staff_info> staff_mobilephone(Map<String,Object> params){
        List<Staff_info> list=productMeterialInfoDao.staff_mobilephone(params);
        return list;
    }
    public List<consumable_use> getConsumableList(Map<String,Object> params){
        List<consumable_use> list = productMeterialInfoDao.getConsumableList(params);
        return list;
    }
    public int getConsumableCount(Map<String,Object> params){
        int count=productMeterialInfoDao.getConsumableCount(params);
        return count;
    }
    public void useUpdate(Map<String,Object> params){
        productMeterialInfoDao.useUpdate(params);
    }
    public List<consumable_use> consumable_mobilephone(Map<String, Object> params){
        List<consumable_use> list = productMeterialInfoDao.consumable_mobilephone(params);
        return list;
    }
    public List<product_research> getResearchList(Map<String, Object> params){
        List<product_research> list=productMeterialInfoDao.getResearchList(params);
        return list;
    }
    public int getResearchCount(Map<String, Object> params){
        int count=productMeterialInfoDao.getResearchCount(params);
        return count;
    }
    public void researchStatusUp(Map<String,Object> params){
        productMeterialInfoDao.researchStatusUp(params);
    }
    public void researchDel(Map<String, Object> params) {
        product_research product_research = new product_research();
        product_research.setResearch_id(Integer.valueOf(String.valueOf(params.get("research_id"))));
        product_research.setResearch_is_del(1);
        productMeterialInfoDao.researchDel(product_research);
    }




    public List<PurchaseInventoryInfo> warehouseMaterialList(Map<String, Object> params){
        List<PurchaseInventoryInfo> list=productMeterialInfoDao.warehouseMaterialList(params);
        return list;
    }
    public int warehouseMaterialCount(Map<String, Object> params){
        int count=productMeterialInfoDao.warehouseMaterialCount(params);
        return count;
    }

    public List<PurchaseInventoryInfo> warehouseMaterialList_history(Map<String, Object> params){
        List<PurchaseInventoryInfo> list=productMeterialInfoDao.warehouseMaterialList_history(params);
        return list;
    }
    public int warehouseMaterialCount_history(Map<String, Object> params){
        int count=productMeterialInfoDao.warehouseMaterialCount_history(params);
        return count;
    }
}
