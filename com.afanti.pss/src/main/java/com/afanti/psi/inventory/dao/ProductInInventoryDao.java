package com.afanti.psi.inventory.dao;

import com.afanti.psi.inventory.vo.Product_material_enter;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.inventory.vo.PurchaseInventoryInfo;
import com.afanti.psi.purchasing.vo.Material_purchase_detail;
import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.vo.Product_sale_detail;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface ProductInInventoryDao {
    List<PurchaseInventoryInfo> getProductInInventoryPageList(Page<PurchaseInventoryInfo> pageInfo);
    int getProductInInventoryPageCount(Page<PurchaseInventoryInfo> pageInfo);

    public List<Material_purchase_detail> getPurchaseInventoryList(Map<String,Object> params);

    List<Product_material_enter_detail> getProductMaterialEnterDetail(Map<String, Object> params);

    void purchasingInventorySave(Map<String, Object> params);

    void venditionInInventory(Map<String,Object> params);

    List<Product_sale_detail> getVenditionProductList(Map<String,Object> params);
    public List<Product_material_enter> purchasingInventoryTemplateFind(int enter_type_billno);
    public List<Product_material_enter> warning_select();

    void inventory_check(Map<String,Object> params);

    public List<Staff_info> moblieSelect(Map<String, Object> params);
    public List<product_use> productSelect(Map<String, Object> params);
}
