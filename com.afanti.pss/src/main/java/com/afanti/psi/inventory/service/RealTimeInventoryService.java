package com.afanti.psi.inventory.service;

import com.afanti.psi.inventory.vo.Product_material_stock;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface RealTimeInventoryService {
    Page<Product_material_stock> stockSelect(Map<String, Object> params);
    Page<Product_material_stock> baobiaoSelect(Map<String, Object> params);
    List<Product_material_stock> baobiaoSelectforExcel(Map<String, Object> params);
    Page<Product_material_stock> selectInventoryDetail(Map<String, Object> params);


}
