package com.afanti.psi.purchasing.service.impl;

import com.afanti.psi.purchasing.dao.MaterialPurchaseDao;
import com.afanti.psi.purchasing.dao.MaterialPurchaseReturnDao;
import com.afanti.psi.purchasing.service.MaterialPurchaseReturnService;
import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.purchasing.vo.Material_purchase_detail;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class MaterialPurchaseReturnServiceImpl implements MaterialPurchaseReturnService {
    @Autowired
    private MaterialPurchaseReturnDao materialPurchaseReturnDao;
    @Autowired
    private MaterialPurchaseDao materialPurchaseDao;

    @Override
    public Page<Material_purchase> getMaterialPurchaseReturnPageList(Map<String, Object> params) {
        Page<Material_purchase> pageInfo = new Page<Material_purchase>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Material_purchase> materialPurchaseList = materialPurchaseReturnDao.getMaterialPurchaseReturnPageList(pageInfo);
        pageInfo.setResults(materialPurchaseList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public Map<String, Object> loadInventoryReturnList(Map<String, Object> params) {
        Material_purchase materialPurchase = materialPurchaseDao.getMaterialPurchaseInfo(params);
        List<Material_purchase_detail> purchaseInventoryReturnList = materialPurchaseReturnDao.getPurchaseInventoryReturnList(params);
        params = new HashMap<String, Object>();
        params.put("materialPurchase", materialPurchase);
        params.put("purchaseInventoryReturnList", purchaseInventoryReturnList);
        return params;
    }

    @Override
    public void purchansingReturnSumbit(Map<String, Object> params) throws Exception {
        String params_value = params.get("params_value").toString();
        String[] params_value_sp = params_value.split("_");
        for (String value : params_value_sp) {
            String[] args = value.split(",");
            params.put("PR_PRODUCT_ID", args[1]);
            params.put("PR_PURCHASE_D_ID", args[2]);
            params.put("PR_BATCH_NO", args[3]);
            params.put("PR_AMOUNT", args[5]);
            params.put("PR_UNIT", args[4]);
            if (args.length == 7) {
                params.put("PR_REASON", args[6]);
            } else {
                params.put("PR_REASON", "");
            }
            params.put("PR_PURCHASE_ID", args[0]);
            params.put("PR_IS_RETURN_ALL", 0);
            params.put("RESULT_MESG", "");
            materialPurchaseReturnDao.purchansingReturnSumbit(params);
        }
        if (!"A0000".equals(String.valueOf(params.get("RESULT_MESG")))) {
            throw new Exception("存储过程执行失败");
        }
    }
    public List<Material_purchase> PurchaseReturn_detail(Map<String, Object> params){
        List<Material_purchase> list = materialPurchaseReturnDao.PurchaseReturn_detail(params);
        return list;
    }
}
