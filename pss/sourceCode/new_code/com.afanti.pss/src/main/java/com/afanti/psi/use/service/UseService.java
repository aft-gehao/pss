package com.afanti.psi.use.service;

import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
@Service
public interface UseService {
    Page<product_use> getUsePage(Map<String,Object> params);
    Page<product_use> usePurchasing(Map<String,Object> params);
    List<Staff_info> staffSelect();
    public void use_add(Map<String,Object> params);
    public void purchase_add(Map<String,Object> params);
    public void use_add_yanfa(Map<String,Object> params);
    public void use_del(Map<String,Object> params);
    public void useUpdate(Map<String,Object> params);
    public void useShenhe(Map<String,Object> params);
    public void use_mod(Map<String,Object> params);
    public void useOut(product_use product_use);
    public product_use useSelect(Map<String,Object> params);
    public Staff_info getStaffInfo(Map<String,Object> params);
    product_use Receive_Preview(int use_id);//领用详情预览
    public void addProduct_material_out(Map<String,Object> params);
    public int orderByOutID();
    public int orderByEnter_d_id(Map<String,Object> params);
    public void addProduct_material_out_detail(Map<String,Object> params);
    public void  user_purCancel(Map<String,Object> params);

    List<product_use> use_mobilephone(Map<String,Object> params);
    List<Staff_info> staff_mobilephone(Map<String,Object> params);
    List<product_use> select_product_useStatus(Map<String,Object> params);
    void update_status(Map<String,Object> params);
}
