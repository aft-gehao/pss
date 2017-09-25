package com.afanti.psi.statistics.dao;



import com.afanti.psi.statistics.vo.PurchasingSale;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/19 0019.//采购销售
 */
public interface StatisticsPurchasingDao {
    /**
     * 采购报表展示
     * @return
     */
    public List<PurchasingSale> purchasing_ChartPageList(Page<PurchasingSale> page);
    /**
     * 总数量
     */
    public int purchasing_ChartPageCount(Page<PurchasingSale> page);



    /**
     * 查询所有的cas
     * @return
     */
    public List<PurchasingSale> purchasing_ChartAllCASPageList(Page page);

    /**
     * 分页
     * @param params
     * @return
     */
    public Page<PurchasingSale> purchasing_ChartAllCASPageCount(Map<String,Object> params);

    /**
     * 合集展示年度采购报表
     * @param page
     * @return
     */
    public List<PurchasingSale> sumShowPageList(Map<String,Object> page);

    /**
     * 月度采购报表
     * @param page
     * @return
     */
    public List<PurchasingSale> purchasing_Chart_MonthShowAll(Map<String,Object> page);

    /**
     * 下拉列表查询最小年份
     * @return
     */
    public int selEnterDetailYear();

}
