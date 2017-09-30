package com.afanti.psi.purchasing.service;

import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface MaterialPurchaseReturnService {
    public Page<Material_purchase> getMaterialPurchaseReturnPageList(Map<String,Object> params);
    public Map<String,Object>loadInventoryReturnList(Map<String,Object> params);
    public void purchansingReturnSumbit(Map<String,Object> params) throws Exception;

    List<Material_purchase> PurchaseReturn_detail(Map<String, Object> params);

}
