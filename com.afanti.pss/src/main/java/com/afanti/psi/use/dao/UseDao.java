package com.afanti.psi.use.dao;

import com.afanti.psi.inventory.vo.Product_material_out;
import com.afanti.psi.inventory.vo.Product_material_out_detail;
import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
public interface UseDao {
    public List<product_use> getUsePageList(Page page);
    public List<product_use> getPurchasingPageList(Page page);
    public int getPurchasingPageCount(Page page);
    public int getUsePageCount(Page page);
    public int useAdd(product_use product_use);
    public int purchasing_max();
    public int use_max();
    public int supplier_max();
    public int purchase_id(Map<String,Object> params);
    public int supplier_id_select(Map<String,Object> params);
    public int supplier_select(Map<String,Object> params);
    public int sup_pro_sel(Map<String,Object> params);
    public int useAdd_yanfa(product_use product_use);
    public int purchasing_add_del(product_use product_use);
    public int purchasing_detail_add_del(product_use product_use);
    public void useDel(product_use product_use);
    public void useUpdate(Map<String,Object> params);
    public void useMod(product_use product_use);
    public void useOut(product_use product_use);
    public void statusOut(product_use product_use);
    public void useShenhe(Map<String,Object> params);
    public void supplier_insert(Map<String,Object> params);
    public void insert_sup_pro(Map<String,Object> params);
    public void use_status_update(Map<String,Object> params);
    public void purchase_detail_update(Map<String,Object> params);
    public void use_update(Map<String,Object> params);
    public void purchase_update(Map<String,Object> params);
    public product_use useSelect(product_use product_use);
    public Staff_info getStaffInfo(Map<String,Object> params);
    product_use Receive_Preview(int use_id);
    public void addProduct_material_out(Product_material_out product_material_out);
    public int orderByOutID();
    public int orderByEnter_d_id(Map<String,Object> params);
    public void addProduct_material_out_detail(Product_material_out_detail product_material_out_detail);
    public void  user_purCancel(Map<String,Object> params);


    List<product_use> use_mobilephone(Map<String,Object> params);
    List<Staff_info> staff_mobilephone(Map<String,Object> params);
    List<Staff_info> staffSelect();
    List<product_use> select_product_useStatus(Map<String,Object> params);
    void update_status(Map<String,Object> params);
}
