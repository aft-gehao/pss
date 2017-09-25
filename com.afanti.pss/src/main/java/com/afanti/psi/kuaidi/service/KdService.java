package com.afanti.psi.kuaidi.service;

import com.afanti.psi.kuaidi.vo.Order;

import java.util.Map;

/**
 * Created by Administrator on 2017/4/18 0018.
 */
public interface KdService {


      Order getOrderTracesByJson(Map<String, Object> params) throws Exception;

      Order getKdInfoByJson(String code,String num) throws Exception;
}
