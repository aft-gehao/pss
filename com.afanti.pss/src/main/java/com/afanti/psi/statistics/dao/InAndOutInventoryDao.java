package com.afanti.psi.statistics.dao;

import com.afanti.psi.statistics.vo.PurchasingSale;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/23 0023.
 */
public interface InAndOutInventoryDao {
    public List<PurchasingSale> getinAndOutInventory_List(Map<String,Object> params);
}
