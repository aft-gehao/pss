package com.afanti.psi.purchasing.service.impl;

import com.afanti.psi.consumable.vo.consumable_purchase;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.product.vo.Product_material_info;
import com.afanti.psi.purchasing.dao.MaterialPurchaseDao;
import com.afanti.psi.purchasing.service.MaterialPurchaseService;
import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.purchasing.vo.Material_purchase_detail;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import com.alibaba.druid.sql.visitor.functions.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class MaterialPurchaseServiceImpl implements MaterialPurchaseService {
    @Autowired
    private MaterialPurchaseDao materialPurchaseDao;

    @Override
    public Page<Material_purchase> getMaterialPurchasePageList(Map<String, Object> params) {
        Page<Material_purchase> pageInfo = new Page<Material_purchase>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Material_purchase> materialPurchaseList = materialPurchaseDao.getMaterialPurchasePageList(pageInfo);
        pageInfo.setResults(materialPurchaseList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    @Override
    public void purchaseingSave(Map<String, Object> params) {
        //新增采购主表返回主键ID
        Material_purchase materialPurchase = new Material_purchase();
        materialPurchase.setPurchase_name(String.valueOf(params.get("purchase_name")));
        materialPurchase.setProduct_num(0);
        materialPurchase.setAll_total(Float.valueOf(String.valueOf(params.get("all_total"))));
        materialPurchase.setStaff_id(Integer.valueOf(params.get("staff_id").toString()));
        try {
            materialPurchase.setPurchase_time(FunctionUtil.simpleDateFormat.parse(params.get("purchase_time").toString()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        materialPurchase.setDesc(String.valueOf(params.get("desc")));
        materialPurchase.setSupplier_id(Integer.valueOf(params.get("supplier_id").toString()));
        materialPurchase.setS_linkman_id(Integer.valueOf(params.get("s_linkman_id").toString()));
        materialPurchase.setCustomer_id(Integer.valueOf(params.get("customer_id").toString()));
        materialPurchase.setStock_status(Integer.valueOf(FunctionUtil.DIC_SUPPLIER_TYPE_WRK));
        materialPurchase.setRequest_id(0);
        materialPurchase.setPurchase_isdel(0);
        materialPurchaseDao.addMaterialPurchase(materialPurchase);
        //新增采购明细表
        addMaterialPurchaseDetial(String.valueOf(materialPurchase.getPurchase_id()), String.valueOf(params.get("purchasing_detail_params")));
    }

    @Override
    public Map<String, Object> loadPurchasingInfo(String purchase_id) {
        //获取采购主表信息
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("purchase_id", purchase_id);
        Material_purchase materialPurchase = materialPurchaseDao.getMaterialPurchaseInfo(params);
        //获取产品信息
        List<Material_purchase_detail> materialPurchaseDetailList = materialPurchaseDao.getMaterialPurchaseDetailList(params);
        params = new HashMap<String, Object>();
        params.put("materialPurchase", materialPurchase);
        params.put("materialPurchaseDetailList", materialPurchaseDetailList);
        return params;
    }

    @Override
    public void purchaseingUpd(Map<String, Object> params) {
        //更新采购主表返回主键ID
        materialPurchaseDao.updMaterialPurchase(params);
        //刪除明細表
        materialPurchaseDao.updMaterialPurchaseDetail(params);
        //新增采购明细表
        addMaterialPurchaseDetial(String.valueOf(params.get("purchase_id")), String.valueOf(params.get("purchasing_detail_params")));
    }

    @Override
    public void purchaseingDel(Map<String, Object> params) {
        params.put("purchase_isdel", "1");
        materialPurchaseDao.updMaterialPurchase(params);
        //刪除明細表
        materialPurchaseDao.updMaterialPurchaseDetail(params);
    }
    private void addMaterialPurchaseDetial(String purchase_id, String purchasing_detail_params) {
        if (purchasing_detail_params != null && !"".equals(purchasing_detail_params)) {
            Map<String, Object> addParams = null;
            String[] purchasing_detail_sp = purchasing_detail_params.split("_");
            for (String params1 : purchasing_detail_sp) {
                addParams = new HashMap<String, Object>();
                String[] params2 = params1.split(",");
                addParams.put("purchase_id", purchase_id);
                addParams.put("product_id", params2[0]);
                addParams.put("amount", params2[1]);
                addParams.put("unit", params2[2]);
                addParams.put("purity", params2[3]);
                addParams.put("unit_price", params2[4]);
                addParams.put("total", "1");
                if(params2.length==6) {
                    addParams.put("desc", params2[5]);
                }else{
                    addParams.put("desc", "");
                }
                addParams.put("purchase_detail_isdel", "0");
                materialPurchaseDao.addMaterialPurchaseDetail(addParams);
            }
        }
    }

    @Override
    public List<Material_purchase_detail> getPurchase(Map<String, Object> params) {
        List<Material_purchase_detail> list = materialPurchaseDao.getPurchase(params);
        return  list;
    }

    @Override
    public List<consumable_purchase> getConsumablePurchase(Map<String, Object> params) {
        List<consumable_purchase> list = materialPurchaseDao.getConsumablePurchase(params);
        return  list;
    }
    @Override
    public Integer getConsumablePurchaseCount(Map<String, Object> params) {
        int count = materialPurchaseDao.getConsumablePurchaseCount(params);
        return  count;
    }
    @Override
    public Integer getPurchaseCount(Map<String, Object> params) {
        int count = materialPurchaseDao.getPurchaseCount(params);
        return  count;
    }
    public void fahuo(Map<String,Object> params){
        //更新use表
        materialPurchaseDao.fahuo(params);
        //更新采购detail表
        materialPurchaseDao.fahuo_pur_detaail(params);
        //更新采购主表
        materialPurchaseDao.fahuo_pur(params);
    }
    //采购经理快速创建原料采购订单
    public void add_pur_for_cg(Map<String,Object> params){
        params.put("create_time",new Date());
        if(Integer.valueOf(String.valueOf(params.get("product_id")))==0)
        {
                int product_id=materialPurchaseDao.insert_product(params);
                params.put("product_id",params.get("product_id"));
        }
        if(Integer.valueOf(String.valueOf(params.get("supplier_id")))==0)
        {
            int supplier_id=materialPurchaseDao.insert_supplier(params);
            params.put("supplier_id",params.get("supplier_id"));
        }
        materialPurchaseDao.use_add(params);
        params.put("use_id",params.get("use_id"));
        params.put("purchase_detail_isdel",0);
       materialPurchaseDao.addMaterialPurchaseForMap(params);
        params.put("purchase_id",params.get("purchase_id"));
        materialPurchaseDao.addMaterialPurchaseDetailForcg(params);
    }
    @Override
    public void pur_upd(Map<String, Object> params) {
        //更新采购主表返回主键ID
        if(materialPurchaseDao.getsupplierCount(params)!=null)
        {
            params.put("supplier_id",materialPurchaseDao.getsupplierCount(params).getCs_sup_id());
        }
        else{
            params.put("create_time",new Date());
            materialPurchaseDao.insert_supplier(params);
            params.put("supplier_id",params.get("cs_sup_id"));
        }
        params.put("purchase_isdel",0);
        //刪除明細表
        materialPurchaseDao.updMaterialPurchase(params);
        materialPurchaseDao.updPurchaseDetail(params);
    }
    @Override
    public Product_material_enter_detail select_enter_time(Map<String, Object> params) {
        //查询采购单入库时间
        return materialPurchaseDao.select_enter_time(params);
    }
    public   int selectProduct(Map<String,Object> params){

        Product_material_info info=materialPurchaseDao.select_product_id(params);
        if(info!=null)
        {
               return info.getProduct_id();
        }
        else{
            materialPurchaseDao.insert_product_foryanfa(params);
            return Integer.valueOf(String.valueOf(params.get("product_id")));
        }
    }
    public void addhetong(Map<String,Object> params){
        materialPurchaseDao.addhetong(params);
        materialPurchaseDao.uphetong(params);
    }
    public void addmaterial(Map<String,Object> params){
        materialPurchaseDao.addhetong(params);
        materialPurchaseDao.upmaterial(params);
    }
}
