package com.afanti.psi.statistics.service;

import com.afanti.psi.statistics.vo.PurchasingSale;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/19 0019.
 */
public interface StatisticsPurchasingService {
;
    public Page<PurchasingSale> purchasing_ChartPageList(Map<String,Object> params);

    /**
     * 查询所有cas
     * @param params
     * @return
     */
    public Page<PurchasingSale> purchasing_ChartAllCASPageList(Map<String,Object> params);
    /**
     * 查询所有年份
     * @return
     */
    public List  showEnterDetailYear();

    /**
     * 展示所有月份
     * @param params
     * @return
     */
    public List<PurchasingSale> purchasing_Chart_MonthShowAll(Map<String,Object> params);

}
