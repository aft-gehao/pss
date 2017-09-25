package com.afanti.psi.inventory.service;

import com.afanti.psi.commons.vo.Pss_dict;
import com.afanti.psi.inventory.vo.Product_material_out;
import com.afanti.psi.inventory.vo.Product_material_out_detail;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface ProductOutInventoryService {
    public List<Pss_dict> getInventoryTypeList();

    public Page<Product_material_out> getInventoryOutPageList(Map<String,Object> params);

    public Map<String,Object> loadOutInventory(String purchase_id);

    public void outInventorySubmit(Map<String,Object> params) throws Exception;

    public String venditionOutinventory(Map<String,Object> params) throws Exception;

    public Product_material_out_detail getInventoryDetail(Map<String,Object> parms);
    public List<Product_material_out> out_inventory_FeedBackPreview(int out_type_billno);

    List<Product_material_out> getInventoryOutList(Map<String,Object> params);
    int getInventoryOutCount(Map<String,Object> params);

    List<Product_material_out> getInventoryOutList_history(Map<String,Object> params);
    int getInventoryOutCount_history(Map<String,Object> params);
}
