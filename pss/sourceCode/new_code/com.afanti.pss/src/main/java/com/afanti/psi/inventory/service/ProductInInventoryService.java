package com.afanti.psi.inventory.service;

import com.afanti.psi.inventory.vo.Product_material_enter;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.inventory.vo.PurchaseInventoryInfo;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface ProductInInventoryService {
    public Page<PurchaseInventoryInfo> getProductInInventoryPageList(Map<String,Object> params);

    public Map<String,Object> loadPurchasingInventory(String purchase_id);

    public List<Product_material_enter_detail> getProductMaterialEnterDetail(Map<String,Object> params);

    public void purchasingInventorySave(Map<String,Object> params) throws Exception;


    public Map<String,Object>loadVenditionOutInfo(String sale_id) throws Exception;

    public void venditionInInventory(Map<String,Object> params) throws Exception;



    public List<Product_material_enter> purchasingInventoryTemplateFind(int enter_type_billno);

    public List<Product_material_enter> warning_select();

    public void inventory_check(Map<String,Object> params) throws Exception;


}
