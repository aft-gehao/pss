package com.afanti.psi.research.service.impl;

import com.afanti.psi.research.dao.ResearchDao;
import com.afanti.psi.research.service.ResearchService;
import com.afanti.psi.research.vo.product_research;
import com.afanti.psi.research.vo.pss_research_doc;
import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.vo.Product_sale_detail;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
@Service
public class ResearchServiceImpl implements ResearchService {
    @Autowired
    private ResearchDao researchDao;

    @Override
    public Page<product_research> getResearchPage(Map<String,Object> params) {
        Page<product_research> pageInfo = new Page<product_research>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<product_research> researchList = researchDao.getResearchPageList(pageInfo);
        pageInfo.setResults(researchList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    @Override
    public List<product_research> getResearchforbaobiao(Map<String,Object> params) {

        List<product_research> researchList = researchDao.getResearchForExcel(params);

        return researchList;
    }
    @Override
    public Page<product_research> researchProductPageList(Map<String,Object> params) {
        Page<product_research> pageInfo = new Page<product_research>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<product_research> researchList = researchDao.researchProductPageList(pageInfo);
        pageInfo.setResults(researchList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    @Override
    public int research_add(Map<String, Object> params) {
        DateTime dateTime = new DateTime();
        product_research product_research = new product_research();
        product_research.setProduct_id(Integer.valueOf(String.valueOf(params.get("product_id"))));
        product_research.setResearch_staff(Integer.valueOf(String.valueOf(params.get("staff_id"))));
        product_research.setResearch_time(new Date());
        int a=researchDao.maxId();
        product_research.setFace(String.valueOf(params.get("face")));
        product_research.setSale_batch_no(String.valueOf(params.get("sale_batch_no")));
        product_research.setAmount(Double.valueOf(String.valueOf(params.get("amount"))));
        product_research.setUnit(String.valueOf(params.get("unit")));
        product_research.setResearch_name(String.valueOf(params.get("research_name")));
        product_research.setHours(Integer.valueOf(String.valueOf(params.get("hours"))));
       /* product_research.setIs_waibao(Integer.valueOf(String.valueOf(params.get("is_waibao"))));
        product_research.setResearch_batch_no(FunctionUtil.YFI_BATCH_NO + dateTime.toString("yyyyMMdd")+a);*/
        //临时开发采购批次录入，一周后取消
        if(Integer.valueOf(String.valueOf(params.get("is_waibao")))==2)
        {
            product_research.setIs_waibao(1);
            product_research.setResearch_batch_no(FunctionUtil.CGI_BATCH_NO + dateTime.toString("yyyyMMdd")+a);
        }
        else{
            product_research.setIs_waibao(Integer.valueOf(String.valueOf(params.get("is_waibao"))));
            product_research.setResearch_batch_no(FunctionUtil.YFI_BATCH_NO + dateTime.toString("yyyyMMdd")+a);
        }
        product_research.setPurity(String.valueOf(params.get("purity")));
        product_research.setResearch_is_del(0);
        if(Integer.valueOf(String.valueOf(params.get("product_type")))==4002) {
            product_research.setStatus(11004);
        }
        else{
            product_research.setStatus(5002);
        }
        researchDao.research_add(product_research);
        return researchDao.maxIdResearch(params);
    }
    @Override
    public void researchDel(Map<String, Object> params) {
        product_research product_research = new product_research();
        product_research.setResearch_id(Integer.valueOf(String.valueOf(params.get("research_id"))));
        product_research.setResearch_is_del(1);
        researchDao.researchDel(product_research);
    }
    @Override
    public product_research researchSelect(Map<String, Object> params) {
        product_research product_research = new product_research();
        product_research.setResearch_id(Integer.valueOf(String.valueOf(params.get("research_id"))));
        product_research.setResearch_is_del(1);
        return  researchDao.researchSelect(product_research);
    }
    @Override
    public void research_in(Map<String, Object> params) {
        //生成采购单号
        int a=researchDao.maxIdIn();
        params.put("enter_type_billno", a);
        //插入入库主表
        researchDao.research_in(params);
        //获取主表id
        int enter_id=researchDao.maxIdEnter();
        //获取详情表单号
        int enter_type_d_billno=researchDao.maxIdEnterDet();
        params.put("enter_id", enter_id);
        params.put("enter_type_d_billno", enter_type_d_billno);
        params.put("status", 5001);
        //插入详情表
        researchDao.research_in_detail(params);
        researchDao.researchStatusUp(params);
    }

    public void researchStatusUp(Map<String, Object> params){
        researchDao.researchStatusUp(params);
    }

    @Override
    public void research_mod(Map<String, Object> params) {
        researchDao.research_mod(params);
    }

    @Override
    public void putuAdd(Map<String, Object> params) {
        researchDao.putuAdd(params);
    }

    @Override
    public List<Product_sale_detail> venditionSelect(Map<String, Object> params)
    {
        List<Product_sale_detail> list= researchDao.venditionSelect(params);
        if(list.size()>0) {
            float amount = 0;
            for (int i = 0; i < list.size(); i++) {
                //计算销售需求总量
                amount += list.get(i).getAmount();
                if (Integer.valueOf(String.valueOf(params.get("amount"))) >= amount) {
                    params.put("sale_d_id",list.get(i).getSale_d_id());
                    params.put("sale_id",researchDao.sale_id_select(params));
                    //从表更新
                    researchDao.venditionUpdate(params);
                        //主表更新
                    researchDao.venditionUpdateForSale(params);
                } else {
                    break;
                }
            }
        }
      /*  Iterator it =list.iterator();
        while(it.hasNext())
        {
            Product_sale_detail  sale=(Product_sale_detail)it.next();
        }*/
                return list;
    }
  /*  public List<pss_research_doc> research_putu(Map<String, Object> params){
        return researchDao.research_putu(params);
    }*/
    /*public void research_putu(Map<String, Object> params) {
        researchDao.research_putu(params);
    }*/
}
