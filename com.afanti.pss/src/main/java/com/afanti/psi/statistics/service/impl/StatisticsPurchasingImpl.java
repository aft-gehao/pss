package com.afanti.psi.statistics.service.impl;

import com.afanti.psi.statistics.dao.StatisticsPurchasingDao;
import com.afanti.psi.statistics.service.StatisticsPurchasingService;
import com.afanti.psi.statistics.vo.PurchasingSale;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/29 0029.
 */
@Service
public class StatisticsPurchasingImpl implements StatisticsPurchasingService {

    @Autowired
    private StatisticsPurchasingDao statisticsPurchasingDao;


    @Override
    public Page<PurchasingSale> purchasing_ChartPageList(Map<String,Object> params){
        Page<PurchasingSale> pageInfo = new Page<PurchasingSale>(FunctionUtil.PAGE_SIZE);
        try {
            pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));//每页
            pageInfo.setParams(params);
            List<PurchasingSale> list =statisticsPurchasingDao.purchasing_ChartPageList(pageInfo);
            pageInfo.setResults(list);
            FunctionUtil.pageInit(pageInfo);
        } catch (NumberFormatException e) {
            e.printStackTrace();
        }
        return pageInfo;
    }



    @Override
    public Page<PurchasingSale> purchasing_ChartAllCASPageList(Map<String, Object> params) {
        Page<PurchasingSale> pageInfo = new Page<PurchasingSale>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));//每页
        pageInfo.setParams(params);
        List<PurchasingSale> list =statisticsPurchasingDao.purchasing_ChartAllCASPageList(pageInfo);//cas
        for(int i=0;i<list.size();i++){
            Map  map=new HashMap();
            map.put("cas",list.get(i).getCas());
            List<PurchasingSale> list2 =statisticsPurchasingDao.sumShowPageList(map);
            for(int j=0;j<list2.size();j++){
                list.get(i).setSum(list2);
                list.get(i).setCas(list2.get(j).getCas());
            }
        }
        pageInfo.setResults(list);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public List showEnterDetailYear() {
        List list=new ArrayList();
        int a =statisticsPurchasingDao.selEnterDetailYear();
        DateTime dateTime=new DateTime();
        int  date=Integer.parseInt(dateTime.toString("yyyy"));
        for(int i=a;i<=date;i++){
            list.add(i);
        }
        return list;
    }

    @Override
    public List<PurchasingSale> purchasing_Chart_MonthShowAll(Map<String, Object> params) {
        PurchasingSale p=new PurchasingSale();
        List<PurchasingSale> list =statisticsPurchasingDao.purchasing_Chart_MonthShowAll(params);
        for(int i=0;i<list.size();i++){
            String test=list.get(i).getTest();
            String test2=list.get(i).getTest2();
            List<String> list2 = new ArrayList<String>();
            List<String> list3 = new ArrayList<String>();
            String[] newstr = test.split("#");
            String[] newstr2 = test2.split("#");
            int a=newstr.length-1;
            for(int j =0;j<=a;j++){
                list2.add(newstr[j]);
                list3.add(newstr2[j]);
            }
            list.get(i).setMonthlyAmountData(list2);
            list.get(i).setMonthlyPriceData(list3);
        }
        return list;
    }


}
