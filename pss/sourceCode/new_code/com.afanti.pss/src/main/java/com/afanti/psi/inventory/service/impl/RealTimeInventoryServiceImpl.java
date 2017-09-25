package com.afanti.psi.inventory.service.impl;

import com.afanti.psi.inventory.dao.RealTimeInventoryDao;
import com.afanti.psi.inventory.service.RealTimeInventoryService;
import com.afanti.psi.inventory.vo.Product_material_stock;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class RealTimeInventoryServiceImpl implements RealTimeInventoryService {

    @Autowired
    private RealTimeInventoryDao realTimeInventoryDao;
    /**
     * 产品实时库存查询
     * Created by gehao on 2017/4/14 0013.
     */
    @Override
    public Page<Product_material_stock> stockSelect(Map<String, Object> params) {
        Page<Product_material_stock> pageInfo = new Page<Product_material_stock>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Product_material_stock> stockList = realTimeInventoryDao.stockSelectPageList(pageInfo);
        pageInfo.setResults(stockList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    /**
     * 产品库存详情查询
     * Created by gehao on 2017/4/16 0013.
     */
    @Override
    public Page<Product_material_stock> selectInventoryDetail(Map<String, Object> params) {
        Page<Product_material_stock> pageInfo = new Page<Product_material_stock>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Product_material_stock> detailList = realTimeInventoryDao.selectInventoryDetailPageList(pageInfo);
        pageInfo.setResults(detailList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    /**
     * 出入库报表
     * Created by gehao on 2017/4/14 0013.
     */
    Logger logger=Logger.getLogger(RealTimeInventoryService.class.getName());
    @Override
    public Page<Product_material_stock> baobiaoSelect(Map<String, Object> params) {
        Page<Product_material_stock> pageInfo = new Page<Product_material_stock>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Product_material_stock> List = realTimeInventoryDao.baobiaoSelectPageList(pageInfo);
/*
        if( params.get("unit").equals("g")){
            for(int i=0;i<List.size();i++) {
                if (List.get(i).getUnit().equals("mg")) {
                    float a_out = List.get(i).getA_out() * 0.1f;
                    List.get(i).setA_out(a_out);
                    float a_in = List.get(i).getA_in() * 0.1f;
                    List.get(i).setA_in(a_in);
                    float amount_leave = List.get(i).getAmount_leave() * 0.1f;
                    List.get(i).setAmount_leave(amount_leave);
                 }
                if (List.get(i).getUnit().equals("kg")) {
                    float a_out = List.get(i).getA_out() * 1000;
                    List.get(i).setA_out(a_out);
                    float a_in = List.get(i).getA_in() * 1000;
                    List.get(i).setA_in(a_in);
                    float amount_leave = List.get(i).getAmount_leave() * 1000;
                    List.get(i).setAmount_leave(amount_leave);
                }
                    List.get(i).setUnit("g");
             }

        }*/

        pageInfo.setResults(List);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    /**
     * 出入库报表
     * Created by gehao on 2017/4/14 0013.
     */
    @Override
    public List<Product_material_stock> baobiaoSelectforExcel(Map<String, Object> params) {


        List<Product_material_stock> List = realTimeInventoryDao.baobiaoSelectForExcel(params);

        return List;
    }
}
