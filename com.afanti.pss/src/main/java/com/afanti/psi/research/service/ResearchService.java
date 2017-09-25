package com.afanti.psi.research.service;
import com.afanti.psi.research.vo.product_research;
import com.afanti.psi.research.vo.pss_research_doc;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.vo.Product_sale_detail;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
@Service
public interface ResearchService {

    public Page<product_research> getResearchPage(Map<String,Object> params);
    public Page<product_research> researchProductPageList(Map<String,Object> params);
    public List<product_research> getResearchforbaobiao(Map<String,Object> params);
    public int research_add(Map<String,Object> params);
    public void research_in(Map<String,Object> params);
    public void putuAdd(Map<String,Object> params);
    public void researchDel(Map<String,Object> params);
    public List<Product_sale_detail> venditionSelect(Map<String,Object> params);
    public product_research researchSelect(Map<String,Object> params);
    public void researchStatusUp(Map<String,Object> params);

    void research_mod(Map<String, Object> params);
    /*public List<pss_research_doc> research_putu(Map<String, Object> params);*/
    //public void research_putu(Map<String,Object> params);
}
