package com.afanti.psi.consumable.service;

import com.afanti.psi.consumable.vo.*;
import com.afanti.psi.kuaidi.vo.kudi_info;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
@Service
public interface ConsumableService {
    Page<consumable_use> getConsumablePage(Map<String, Object> params);
    Page<consumable_repair> getConsumableRepairPage(Map<String, Object> params);
    Page<consumable_purchase> getPurchasingPage(Map<String, Object> params);
    Page<consumable_use> getUsePage(Map<String, Object> params);
    Page<consumable_out_stock> getStockPage(Map<String, Object> params);
    Page<consumable_stock> getStockDetailPage(Map<String, Object> params);
    consumable_use useSelect(Map<String, Object> params);
    consumable_repair repairSelect(Map<String, Object> params);
    Page<consumable_material_info> getConsumableInfoPage(Map<String, Object> params);
    void useUpdate(Map<String, Object> params);
    void useStatusUpdate(Map<String, Object> params);
    void con_purchase_modify(Map<String, Object> params);
    void fahuo(Map<String, Object> params);
    kudi_info kd_info_select(Map<String, Object> params);
    void useDel(Map<String, Object> params);
    void kuaisu_pur(Map<String, Object> params);
     void consumable_add(Map<String, Object> params);
    void consumable_repair_add(Map<String, Object> params);
    void consumable_repair_del(Map<String, Object> params);
    void consumable_repair_upd(Map<String, Object> params);
    void check_repair(Map<String, Object> params);
    void fahuo_repair(Map<String, Object> params);
    void consumableInventory(Map<String, Object> params);
    void out_stock(Map<String, Object> params);
    void add_purchasing(Map<String, Object> params);
    void ConsumableAdd(Map<String, Object> params);
    void ConsumableUpd(Map<String, Object> params);
    Page<consumable_material_info> getConsumable(Map<String,Object> params);
    void consumableUpdate(Map<String, Object> params);
    List<consumable_material_info> warningSelect();
    void consumable_repair_cancel(Map<String, Object> params);
    void consumable_pur_cancel(Map<String, Object> params);

    List<Staff_info> staff_mobilephone(Map<String, Object> params);
    List<consumable_use> consumable_mobilephone(Map<String, Object> params);

    List<consumable_purchase> getPurchasingList(Map<String, Object> params);
    int getPurchasingCount(Map<String, Object> params);

    List<consumable_purchase> getPurchasingList_history(Map<String, Object> params);
    int getPurchasingCount_history(Map<String, Object> params);

    List<consumable_use> getUseList(Map<String, Object> params);
    int getUseCount(Map<String, Object> params);

    List<consumable_use> getUseList_history(Map<String, Object> params);
    int getUseCount_history(Map<String, Object> params);


    List<consumable_use> detail_consumables(Map<String, Object> params);
}
