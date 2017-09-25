package com.afanti.psi.statistics.dao;

import com.afanti.psi.statistics.vo.PurchasingSale;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/29 0029.
 */
public interface StatisticsSalesDao {

    /**
     * 销售报表展示
     * @return
     */
    public List<PurchasingSale> sales_ChartPageList(Page page);

    /**
     * 总数量
     */
    public int sales_ChartPageCount(Page page);




    public int selEnterDetailYear();
    public List<PurchasingSale> sale_ChartAllCASPageList(Page page);
    public int sale_ChartAllCASPageCount(Page page);
    public List<PurchasingSale> sumShowPageList(Map<String,Object> page);
    public List<PurchasingSale> sale_Chart_MonthShowAll(Map<String,Object> page);
}
