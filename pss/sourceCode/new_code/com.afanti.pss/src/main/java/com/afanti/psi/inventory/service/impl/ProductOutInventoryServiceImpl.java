package com.afanti.psi.inventory.service.impl;

import com.afanti.psi.commons.service.CommonsService;
import com.afanti.psi.commons.vo.Pss_dict;
import com.afanti.psi.inventory.dao.ProductOutInventoryDao;
import com.afanti.psi.inventory.service.ProductOutInventoryService;
import com.afanti.psi.inventory.vo.Product_material_out;
import com.afanti.psi.inventory.vo.Product_material_out_detail;
import com.afanti.psi.purchasing.dao.MaterialPurchaseDao;
import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class ProductOutInventoryServiceImpl implements ProductOutInventoryService {

    @Autowired
    private ProductOutInventoryDao productInOutventoryDao;
    @Autowired
    private MaterialPurchaseDao materialPurchaseDao;

    @Autowired
    private CommonsService commonsService;

    @Override
    public List<Pss_dict> getInventoryTypeList() {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("p_dict_id", FunctionUtil.INVENTORY_OUT_TYPE);
        return commonsService.getDict(params);
    }
    Logger logger=Logger.getLogger(ProductOutInventoryServiceImpl.class.getName());
    @Override
    public Page<Product_material_out> getInventoryOutPageList(Map<String, Object> params) {
        Page<Product_material_out> pageInfo = new Page<Product_material_out>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Product_material_out> purchaseInventoryInfoList = productInOutventoryDao.getInventoryOutPageList(pageInfo);
        pageInfo.setResults(purchaseInventoryInfoList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public Map<String, Object> loadOutInventory(String purchase_id) {
        //获取采购主表信息
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("purchase_id", purchase_id);
        Material_purchase materialPurchase = materialPurchaseDao.getMaterialPurchaseInfo(params);
        //获取产品信息
        List<Product_material_out_detail> outInventoryList = productInOutventoryDao.getOurInventoryList(params);
        params = new HashMap<String, Object>();
        params.put("materialPurchase", materialPurchase);
        params.put("outInventoryList", outInventoryList);
        return params;
    }

    @Override
    public void outInventorySubmit(Map<String, Object> params) throws Exception {
        params.put("RESULT_MSG", "");
        String params_value = params.get("params_value").toString();
        String[] params_value_sp = params_value.split("_");
        for(String value : params_value_sp) {
            String[]args = value.split(",");
            params.put("POUT_PURCHASE_ID", args[0]);
            params.put("POUT_PRODUCT_ID", args[1]);
            params.put("POUT_OUT_TYPE_BILLNO", args[2]);
            params.put("POUT_BATCH_NO", args[3]);
            params.put("POUT_UNIT", args[4]);
            params.put("POUT_OUT_SPACE_ID", args[5]);
            params.put("POUT_OUT_DESC",args[6]);
            params.put("POUT_AMOUNT", args[7]);
            productInOutventoryDao.outInventorySubmit(params);
        }
        if (!"A0000".equals(String.valueOf(params.get("RESULT_MSG")))) {
            throw new Exception("产品出库调用存储过程失败");
        }
    }

    @Override
    public String venditionOutinventory(Map<String, Object> params) {
        String params_value = params.get("params_value").toString();
        String[] params_value_sp = params_value.split("_");
        params.put("RESULT_MSG ", "");
        for (String value : params_value_sp) {
            String[] args = value.split(",");
            params.put("P_BATCH_NO", args[0]);
            params.put("P_AMOUNT", args[7]);
            params.put("P_UNIT", args[1]);
            params.put("P_PRODUCT_ID", args[2]);
            params.put("P_SALE_D_ID", args[3]);
            int enter_id=productInOutventoryDao.enter_id_select(params);
            params.put("P_ENTER_D_ID",enter_id);
            params.put("P_UNIT_PRICE", args[4]);
            params.put("P_SPACE_ID", args[5]);
            params.put("P_DESC", args[6]);
            params.put("P_SALE_ID", args[8]);
            productInOutventoryDao.venditionOutinventory(params);
        }
        return params.get("RESULT_MSG").toString();
    }


    @Override
    public Product_material_out_detail getInventoryDetail(Map<String, Object> parms) {
        return productInOutventoryDao.getInventoryDetail(parms);
    }

    @Override
    public List<Product_material_out> out_inventory_FeedBackPreview(int out_type_billno) {
       List<Product_material_out> list=productInOutventoryDao.out_inventory_FeedBackPreview(out_type_billno);
        return list;
    }

    public List<Product_material_out> getInventoryOutList(Map<String,Object> params){
        List<Product_material_out> list=productInOutventoryDao.getInventoryOutList(params);
        return list;
    }
    public int getInventoryOutCount(Map<String,Object> params){
        int count=productInOutventoryDao.getInventoryOutCount(params);
        return count;
    }

    public List<Product_material_out> getInventoryOutList_history(Map<String,Object> params){
        List<Product_material_out> list=productInOutventoryDao.getInventoryOutList_history(params);
        return list;
    }
    public int getInventoryOutCount_history(Map<String,Object> params){
        int count=productInOutventoryDao.getInventoryOutCount_history(params);
        return count;
    }
}
