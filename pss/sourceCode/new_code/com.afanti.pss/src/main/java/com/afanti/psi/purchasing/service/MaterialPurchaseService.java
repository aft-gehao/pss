package com.afanti.psi.purchasing.service;

import com.afanti.psi.consumable.vo.consumable_purchase;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.purchasing.vo.Material_purchase_detail;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface MaterialPurchaseService {
    public List<consumable_purchase> getConsumablePurchase(Map<String,Object> params);
    public Integer getConsumablePurchaseCount(Map<String,Object> params);
    public Integer getPurchaseCount(Map<String,Object> params);
    public List<Material_purchase_detail> getPurchase(Map<String,Object> params);
    public Page<Material_purchase> getMaterialPurchasePageList(Map<String,Object> params);
    public void purchaseingSave(Map<String,Object> params);
    public void addhetong(Map<String,Object> params);
    public void addmaterial(Map<String,Object> params);
    public Map<String,Object> loadPurchasingInfo(String purchase_id);
    public void purchaseingUpd(Map<String,Object> params);
    public void purchaseingDel(Map<String,Object> params);
    public void fahuo(Map<String,Object> params);
    public void add_pur_for_cg(Map<String,Object> params);
    public void pur_upd(Map<String,Object> params);
    Product_material_enter_detail select_enter_time(Map<String,Object> params);
    int selectProduct(Map<String,Object> params);
}
