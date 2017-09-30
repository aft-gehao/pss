package com.afanti.psi.vendition.service.impl;

import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.dao.VenditionDao;
import com.afanti.psi.vendition.dao.VenditionReturnDao;
import com.afanti.psi.vendition.service.VenditionReturnService;
import com.afanti.psi.vendition.vo.Product_sale;
import com.afanti.psi.vendition.vo.Product_sale_detail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */

@Service
public class VenditionReturnServiceImpl implements VenditionReturnService {
    @Autowired
    private VenditionReturnDao venditionReturnDao;
    @Autowired
    private VenditionDao venditionDao;

    @Override
    public Page<Product_sale> getVenditionReturnPageList(Map<String, Object> params) {
        Page<Product_sale> pageInfo = new Page<Product_sale>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Product_sale> productSaleList = venditionReturnDao.getVenditionReturnPageList(pageInfo);
        pageInfo.setResults(productSaleList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public Map<String, Object> loadVenditionInventory(String sale_id) {
        //查询销售主表数据
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("sale_id", sale_id);
        Product_sale productSaleInfo = venditionDao.getProductSaleInfo(params);
        //查询销售产品列表
        List<Product_sale_detail> productSaleDetailList = venditionReturnDao.getVenditionReturnProductList(params);
        params = new HashMap<String, Object>();
        params.put("productSaleInfo", productSaleInfo);
        params.put("productSaleDetailList", productSaleDetailList);
        return params;
    }

    @Override
    public void venditionReturnSubmit(Map<String, Object> params) throws Exception {
        params.put("RESULT_MSG", "");
        String params_value = params.get("params_value").toString();
        String[] params_value_sp = params_value.split("_");
        for (String value : params_value_sp) {
            String[] args = value.split(",");
            params.put("P_BATCH_NO", args[0]);
            params.put("P_SALE_D_ID", args[1]);
            params.put("P_PRODUCT_ID", args[2]);
            params.put("P_AMOUNT", args[3]);
            params.put("P_UNIT", args[4]);
            if (args.length == 6) {
                params.put("P_REASON", args[5]);
            } else {
                params.put("P_REASON", "");
            }
            venditionReturnDao.venditionReturnSubmit(params);
        }
        if (!"A0000".equals(String.valueOf(params.get("RESULT_MSG")))) {
            throw new Exception("存储过程执行失败");
        }
    }
    public void return_submit(Map<String,Object> params) throws Exception
    {
        List<product_use> list=venditionReturnDao.selectUseForSale(params);
        venditionReturnDao.insert_return(params);
        Iterator iterator = list.iterator();
        while(iterator.hasNext()){
            product_use use = (product_use)iterator.next();
            params.put("batch_no",use.getUse_batch_no());
            params.put("unit",use.getUse_unit());
            params.put("product_id",use.getProduct_id());
            params.put("amount",use.getUse_amount());
            params.put("stock_status",5002);
            params.put("space_id",use.getSpace_id());
            venditionReturnDao.insert_return_details(params);
        }
        venditionReturnDao.status_up(params);
        venditionReturnDao.status_up_fordetails(params);
    }

}
