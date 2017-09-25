package com.afanti.psi.inventory.dao;

import com.afanti.psi.inventory.vo.Product_material_out;
import com.afanti.psi.inventory.vo.Product_material_out_detail;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface ProductOutInventoryDao {

    List<Product_material_out> getInventoryOutPageList(Page<Product_material_out> pageInfo);
    int getInventoryOutPageCount(Page<Product_material_out> pageInfo);

    List<Product_material_out_detail> getOurInventoryList(Map<String,Object> params);

    void outInventorySubmit(Map<String, Object> params);

    void venditionOutinventory(Map<String,Object> params);
    int enter_id_select(Map<String,Object> params);

    Product_material_out_detail getInventoryDetail(Map<String, Object> parms);
    List<Product_material_out> out_inventory_FeedBackPreview(int out_type_billno);


    List<Product_material_out> getInventoryOutList(Map<String,Object> params);
    int getInventoryOutCount(Map<String,Object> params);

    List<Product_material_out> getInventoryOutList_history(Map<String,Object> params);
    int getInventoryOutCount_history(Map<String,Object> params);
}
