package com.afanti.psi.statistics.service;

import com.afanti.psi.statistics.vo.PurchasingSale;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/29 0029.
 */
public interface StatisticsSalesService {
    public Page<PurchasingSale> sales_ChartPageList(Map<String,Object> params);
    public List showEnterDetailYear();
    public Page<PurchasingSale> sale_ChartAllCASPageList(Map<String,Object> params);
    public List<PurchasingSale> sale_Chart_MonthShowAll(Map<String,Object> params);
}
