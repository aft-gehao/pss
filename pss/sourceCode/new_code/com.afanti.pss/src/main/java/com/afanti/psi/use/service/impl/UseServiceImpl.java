package com.afanti.psi.use.service.impl;

import com.afanti.psi.inventory.vo.Product_material_out;
import com.afanti.psi.inventory.vo.Product_material_out_detail;
import com.afanti.psi.use.dao.UseDao;
import com.afanti.psi.use.service.UseService;
import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
@Service
public class UseServiceImpl implements UseService {
    @Autowired
    private UseDao useDao;


    @Override
    public Page<product_use> getUsePage(Map<String,Object> params) {
        Page<product_use> pageInfo = new Page<product_use>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<product_use> useList = useDao.getUsePageList(pageInfo);
        pageInfo.setResults(useList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    @Override
    public void use_add(Map<String, Object> params) {
        //插入销售主表数据
        product_use product_use = new product_use();
        product_use.setUse_name(String.valueOf(params.get("use_name")));
        product_use.setUse_staff(Integer.valueOf(String.valueOf(params.get("staff_id"))));
        product_use.setUse_amount(Double.valueOf(String.valueOf(params.get("amount"))));
        product_use.setUse_unit(String.valueOf(params.get("unit")));
        product_use.setUse_batch_no(String.valueOf(params.get("batch_no")));
        product_use.setProduct_id(Integer.valueOf(String.valueOf(params.get("product_id"))));
        product_use.setIdentifying_code(String.valueOf(params.get("identifying_code")));
        product_use.setSpace_id(Integer.valueOf(String.valueOf(params.get("space_id"))));
        product_use.setPurity(String.valueOf(params.get("purity")));
        product_use.setUse_desc(String.valueOf(params.get("use_desc")));
        product_use.setUse_time(new Date());
        product_use.setUse_is_del(0);
        product_use.setStatus(8002);
        useDao.useAdd(product_use);
        useDao.purchasing_add_del(product_use);
        product_use.setUse_id(useDao.use_max());
        product_use.setPurchase_id(useDao.purchasing_max());
        useDao.purchasing_detail_add_del(product_use);
    }
    @Override
    public void use_del(Map<String, Object> params) {
        product_use product_use = new product_use();
        product_use.setUse_id(Integer.valueOf(String.valueOf(params.get("use_id"))));
        useDao.useDel(product_use);
    }
    @Override
    public product_use useSelect(Map<String, Object> params) {
        product_use product_use = new product_use();
        product_use.setUse_id(Integer.valueOf(String.valueOf(params.get("use_id"))));
        product_use=useDao.useSelect(product_use);
        return product_use;
    }
    @Override
    public void useOut(product_use product_use) {
        product_use.setStatus(8001);
        useDao.statusOut(product_use);
        useDao.useOut(product_use);
    }
    @Override
    public void use_mod(Map<String, Object> params) {
        product_use product_use = new product_use();
        product_use.setUse_id(Integer.valueOf(String.valueOf(params.get("use_id"))));
        product_use.setUse_amount(Integer.valueOf(String.valueOf(params.get("use_amount"))));
        product_use.setUse_name(String.valueOf(params.get("use_name")));
        useDao.useMod(product_use);
    }
    public Staff_info getStaffInfo(Map<String,Object> params){

        return (useDao.getStaffInfo(params));

    }

    @Override
    public product_use Receive_Preview(int use_id) {
        product_use p = useDao.Receive_Preview(use_id);
        return p;
    }

    @Override
    public void addProduct_material_out(Map<String, Object> params) {
        Product_material_out po=new Product_material_out();//入库
        po.setOut_name(String.valueOf(params.get("out_name")));
        po.setOut_type(Integer.valueOf(String.valueOf(params.get("out_type"))));
        po.setOper_time(new Date());
        po.setOper_id(Integer.valueOf(String.valueOf(params.get("oper_id"))));
        po.setOut_type_billno(Integer.valueOf(String.valueOf(params.get("out_type_billno"))));
        useDao.addProduct_material_out(po);
    }
    @Override
    public int orderByOutID() {
        int out_id=useDao.orderByOutID();
        return out_id;
    }

    @Override
    public int orderByEnter_d_id(Map<String,Object> params) {
       int enter_d_id = useDao.orderByEnter_d_id(params);
        return enter_d_id;
    }

    @Override
    public void addProduct_material_out_detail(Map<String,Object> params) {
        Product_material_out_detail pd=new Product_material_out_detail();
        pd.setOut_id(Integer.valueOf(String.valueOf(params.get("out_id"))));
        pd.setProduct_id(Integer.valueOf(String.valueOf(params.get("product_id"))));
        pd.setSpace_id(String.valueOf(params.get("space_id")));
        pd.setEnter_d_id(Integer.valueOf(String.valueOf(params.get("enter_d_id"))));
        pd.setAmount(Float.valueOf(String.valueOf(params.get("amount"))));
        pd.setUnit(String.valueOf(params.get("unit")));
        pd.setOut_type_d_billno(Integer.valueOf(String.valueOf(params.get("out_type_d_billno"))));
        pd.setBatch_no(String.valueOf(params.get("batch_no")));
        pd.setOut_date(new Date());
        pd.setStaff_id(Integer.valueOf(String.valueOf(params.get("staff_id"))));
        useDao.addProduct_material_out_detail(pd);
    }


    @Override
    public void use_add_yanfa(Map<String, Object> params) {
        //插入销售主表数据
        product_use product_use = new product_use();
        product_use.setUse_name(String.valueOf(params.get("use_name")));
        product_use.setUse_staff(Integer.valueOf(String.valueOf(params.get("staff_id"))));
        product_use.setUse_time(new Date());
        product_use.setUse_amount(Double.valueOf(String.valueOf(params.get("amount"))));
        product_use.setUse_unit(String.valueOf(params.get("unit")));
        if(String.valueOf(params.get("batch_no")).equals(""))
        {
            product_use.setUse_batch_no("0");
        }
        else {
            product_use.setUse_batch_no(String.valueOf(params.get("batch_no")));
        }
        product_use.setProduct_id(Integer.valueOf(String.valueOf(params.get("product_id"))));
        product_use.setSpace_id(Integer.valueOf(String.valueOf(params.get("space_id"))));
        product_use.setPurity(String.valueOf(params.get("purity")));
        product_use.setUse_desc(String.valueOf(params.get("use_desc")));
        product_use.setUse_is_del(0);
        product_use.setIs_sale(Integer.valueOf(String.valueOf(params.get("is_sale"))));
        product_use.setSale_d_id(Integer.valueOf(String.valueOf(params.get("sale_d_id"))));
        String space_id=String.valueOf(params.get("space_id"));
        if(space_id.equals("0")||space_id==""||space_id==null){
            product_use.setStatus(11004);
        }else {
            product_use.setStatus(8002);
        }
        useDao.useAdd_yanfa(product_use);
        useDao.purchasing_add_del(product_use);
        product_use.setUse_id(useDao.use_max());
        product_use.setPurchase_id(useDao.purchasing_max());
        useDao.purchasing_detail_add_del(product_use);
    }
    @Override
    public void useShenhe(Map<String,Object> params) {

        useDao.useShenhe(params);

    }
    @Override
    public Page<product_use> usePurchasing(Map<String,Object> params) {
        Page<product_use> pageInfo = new Page<product_use>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<product_use> useList = useDao.getPurchasingPageList(pageInfo);
        pageInfo.setResults(useList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    @Override
    public void purchase_add(Map<String,Object> params) {
   //往此采购数据里填写采购价格等信息
        useDao.purchase_detail_update(params);
        //修改申请量
        useDao.use_update(params);
        int count=useDao.supplier_select(params);
        if(count==0)
        {
            useDao.supplier_insert(params);
            int supplier_id=useDao.supplier_max();
            params.put("supplier_id",String.valueOf(supplier_id));

        }
        else{
             int supplier_id=useDao.supplier_id_select(params);
             params.put("supplier_id",String.valueOf(supplier_id));

        }
        if (useDao.sup_pro_sel(params)==0)
        {
            useDao.insert_sup_pro(params);
        }
        params.put("purchase_id",String.valueOf(useDao.purchase_id(params)));
        useDao.purchase_update(params);
        useDao.use_status_update(params);
    }
    @Override
    public void useUpdate(Map<String, Object> params) {

        useDao.useUpdate(params);
    }
    @Override
    public  void  user_purCancel(Map<String, Object> params){
        useDao.user_purCancel(params);
    }
    public List<product_use> use_mobilephone(Map<String,Object> params){
        List<product_use> list= useDao.use_mobilephone(params);
        return list;
    }
    public List<Staff_info> staff_mobilephone(Map<String,Object> params){
        List<Staff_info> list= useDao.staff_mobilephone(params);
        return list;
    }
    public List<Staff_info> staffSelect()
    {
        List<Staff_info> list=useDao.staffSelect();
        return list;
    }
    public List<product_use> select_product_useStatus(Map<String,Object> params){
        List<product_use> list=useDao.select_product_useStatus(params);
        return list;
    }
    public void update_status(Map<String,Object> params){
        useDao.update_status(params);
    }
}
