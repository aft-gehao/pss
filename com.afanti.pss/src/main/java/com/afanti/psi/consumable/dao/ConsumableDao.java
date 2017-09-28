package com.afanti.psi.consumable.dao;

import com.afanti.psi.consumable.vo.*;
import com.afanti.psi.kuaidi.vo.kudi_info;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
public interface ConsumableDao {
    public List<consumable_use> getConsumablePageList(Page page);
    public List<consumable_repair> getConsumableRepairPageList(Page page);
    public List<consumable_purchase> getPurchasingPageList(Page page);
    public int getConsumablePurchasePageCount(Page page);
    public List<consumable_purchase> getConsumablePurchasePageList(Page page);
    public List<consumable_use> getUseforconPageList(Page page);
    public List<consumable_out_stock> getStockPageList(Page page);
    public List<consumable_stock> getStockDetailPageList(Page page);
    public int getConsumableRepairPageCount(Page page);
    public int getStockDetailPageCount(Page page);
    public int getConsumablePageCount(Page page);
    public int getUseforconPageCount(Page page);
    public int getPurchasingPageCount(Page page);
    public int getStockPageCount(Page page);
    public consumable_use useSelect(Map<String, Object> params);
    void useUpdate(Map<String, Object> params);
    void insert_out_stock(Map<String, Object> params);
    void consumable_repair_add(Map<String, Object> params);
    void consumable_repair_del(Map<String, Object> params);
    void consumable_repair_upd(Map<String, Object> params);
    void update_stock_amount(Map<String, Object> params);
    void useStatusUpdate(Map<String, Object> params);
    void repairStatusUpdate(Map<String, Object> params);
    void useDel(Map<String, Object> params);
    public List<consumable_material_info> getConsumableInfoPageList(Page page);
    public int getConsumableInfoPageCount(Page page);
    public void consumable_add(Map<String, Object> params);
    public int getUseId(Map<String, Object> params);
    public void consumableAdd(Map<String,Object> params);
    public void upd_consumable(Map<String,Object> params);
    public List<consumable_material_info> getConsumable(Map<String,Object> params);
    public void update_consumable(Map<String,Object> params);
    public void add_purchasing(Map<String,Object> params);
    public void con_purchase_modify(Map<String,Object> params);
    public void check_repair(Map<String,Object> params);
    public void fahuo_repair(Map<String,Object> params);
    public void con_purchase_modify_del(Map<String,Object> params);
    public void fahuo(Map<String,Object> params);
    public void pur_fahuo(Map<String,Object> params);
    public int consumable_name_select(Map<String,Object> params);
    public int consumable_id_select(Map<String,Object> params);
    public int getConsumableUseId(Map<String,Object> params);
    public int getConsumableId(Map<String,Object> params);
    public void useStatusUpdateForPurchase(Map<String,Object> params);
    public void purchaseStatusUpdate(Map<String,Object> params);
    public void consumableInventory(Map<String,Object> params);
    List<consumable_material_info> warningSelect();
    consumable_repair repairSelect(Map<String,Object> para);
    public void consumable_repair_cl(Map<String,Object> params);
    public void consumable_pur_cancel(Map<String,Object> params);
    kudi_info kd_info_select(Map<String, Object> params);
    public List<Staff_info> staff_mobilephone(Map<String, Object> params);
    public List<consumable_use> consumable_mobilephone(Map<String, Object> params);

    List<consumable_purchase> getPurchasingList(Map<String, Object> params);
    int getPurchasingCount(Map<String, Object> params);

    List<consumable_purchase> getPurchasingList_history(Map<String, Object> params);
    int getPurchasingCount_history(Map<String, Object> params);

    List<consumable_use> getUseList(Map<String, Object> params);
    int getUseCount(Map<String, Object> params);

    List<consumable_use> getUseList_history(Map<String, Object> params);
    int getUseCount_history(Map<String, Object> params);
}
