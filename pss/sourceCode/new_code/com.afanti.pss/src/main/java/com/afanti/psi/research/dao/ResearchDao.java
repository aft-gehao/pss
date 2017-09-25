package com.afanti.psi.research.dao;

import com.afanti.psi.research.vo.product_research;
import com.afanti.psi.research.vo.pss_research_doc;
import com.afanti.psi.test.vo.TestVo;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.vo.Product_sale_detail;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
public interface ResearchDao {


    public List<product_research> getResearchPageList(Page page);
    public List<product_research> getResearchForExcel(Map<String, Object> params);
    public int getResearchPageCount(Page page);
    public int maxId( );
    public int maxIdIn( );
    public int maxIdEnter( );
    public int maxIdEnterDet( );
    public List<product_research> researchProductPageList(Page page);
    public int researchProductPageCount(Page page);
    public void research_add(product_research product_research);
    public void research_in(Map<String, Object> params);
    public List<Product_sale_detail> venditionSelect(Map<String,Object> params);
    public void putuAdd(Map<String, Object> params);
    public void venditionUpdate(Map<String, Object> params);
    public void venditionUpdateForSale(Map<String, Object> params);
    public void research_in_detail(Map<String, Object> params);
    public void researchStatusUp(Map<String, Object> params);
    public void researchDel(product_research product_research);
    public product_research researchSelect(product_research product_research);
    public int maxIdResearch(Map<String, Object> params);
    public int sale_id_select(Map<String, Object> params);
    //public List<pss_research_doc> research_putu(Map<String, Object> params);
    public void research_putu(Map<String, Object> params);

    void research_mod(Map<String, Object> params);
}
