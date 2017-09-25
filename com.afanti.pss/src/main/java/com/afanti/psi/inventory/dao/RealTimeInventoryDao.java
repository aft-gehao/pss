package com.afanti.psi.inventory.dao;

import com.afanti.psi.inventory.vo.Product_material_stock;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface RealTimeInventoryDao {
    List<Product_material_stock> stockSelectPageList(Page page);

    List<Product_material_stock> baobiaoSelectPageList(Page page);
    List<Product_material_stock> baobiaoSelectForExcel(Map<String, Object> params);
    Integer baobiaoSelectPageCount(Page page);

    Product_material_stock baobiaoSelect(Map<String, Object> params);
    /**
     * 产品库存详情
     * Created by gehao on 2017/4/16 0013.
     */
    List<Product_material_stock> selectInventoryDetailPageList(Page page);
    int selectInventoryDetailPageCount(Page page);
    int stockSelectPageCount(Page page);
}
