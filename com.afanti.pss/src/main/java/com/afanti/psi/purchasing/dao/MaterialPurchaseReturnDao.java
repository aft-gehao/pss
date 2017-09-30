package com.afanti.psi.purchasing.dao;

import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.purchasing.vo.Material_purchase_detail;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface MaterialPurchaseReturnDao {
    public List<Material_purchase> getMaterialPurchaseReturnPageList(Page<Material_purchase> pageInfo);
    public int getMaterialPurchaseReturnPageCount(Page<Material_purchase> pageInfo);
    List<Material_purchase_detail> getPurchaseInventoryReturnList(Map<String, Object> params);
    void purchansingReturnSumbit(Map<String, Object> params);

    List<Material_purchase> PurchaseReturn_detail(Map<String, Object> params);
}
