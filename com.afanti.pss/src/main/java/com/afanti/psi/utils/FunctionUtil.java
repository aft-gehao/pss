package com.afanti.psi.utils;

import com.afanti.psi.usermanager.vo.Staff_info;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;

/**
 * Created by lauya on 2016-04-08.
 */

public class FunctionUtil {

    public static final String SESSION_KEY_PSS = "SESSION_KEY_PSS";
    private static Logger logger = Logger.getLogger(FunctionUtil.class);
    public static int PAGE_SIZE = 8;

    public static void pageInit(Page pageInfo) {
        int rsCount = pageInfo.getTotalRecord();
        logger.info(pageInfo.getTotalPage());
        logger.info(pageInfo.getPageSize());
        int beginIndex = pageInfo.getPageNo() % pageInfo.getPageSize() == 0 ? (pageInfo.getPageNo() / pageInfo.getPageSize()) * pageInfo.getPageSize() - pageInfo.getPageSize() + 1 : (pageInfo.getPageNo() / pageInfo.getPageSize()) * pageInfo.getPageSize() + 1;
        int endIndex = pageInfo.getTotalPage() % pageInfo.getPageSize() == 0 ? beginIndex + pageInfo.getPageSize() : (pageInfo.getTotalPage() / pageInfo.getPageSize()) * pageInfo.getPageSize() + pageInfo.getTotalPage() % pageInfo.getPageSize();
        if (pageInfo.getTotalPage() == pageInfo.getPageSize()) {
            endIndex = endIndex - 1;
        }
        pageInfo.setBeginIndex(beginIndex);
        pageInfo.setEndIndex(endIndex);
    }

    public static void setSession_Data(HttpServletRequest request, Object object, String key) {
        request.getSession().setAttribute(key, object);
    }
//    public static Staff_info getSessionData(HttpServletRequest request, String key){
//        Staff_info s=(Staff_info)request.getSession().getAttribute(key);
//        return s;
//    }
    //产品类型数据词典ID
    public static final String DIC_PRODUCT_TYPE_ID = "40";

    //入库类型
    public static final String DIC_SUPPLER_TYPE = "50";
    //已入库
    public static final String DIC_SUPPLIER_TYPE_YRK = "5001";
    //未入库
    public static final String DIC_SUPPLIER_TYPE_WRK = "5002";
    //部分入库
    public static final String DIC_SUPPLIER_TYPE_BFRK = "5003";
    //采购入库批次号
    public static final String CGI_BATCH_NO = "CGI";
    //销售出库批次号
    public static final String XSO_BATCH_NO = "XSO";
    //研发领用批次号
    public static final String YFO_BATCH_NO = "YFO";
    //自研发批次号
    public static final String YFI_BATCH_NO = "YFI";
    //盘点盈亏批次号
    public static final String PDO_BATCH_NO = "PDO";
    //报废批次号
    public static final String BFO_BATCH_NO = "BFO";
    //产品入库
    public static final String INVENTORY_IN_TYPE = "70";
    //出库类型
    public static final String INVENTORY_OUT_TYPE = "90";
    //出库类型：采购退货
    public static final String INVENTORY_OUT_TYPE_CGTH = "9001";
    public static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    //销售出库类型【未出库】
    public static final int PRODUCT_SALE_TYPE_NOOUT = 8002;
    //销售出库类型【已出库】
    public static final int PRODUCT_SALE_TYPE_OUT = 8001;
    //销售出库类型【部分出库】
    public static final int PRODUCT_SALE_TYPE_OUT_BF = 8003;

}
