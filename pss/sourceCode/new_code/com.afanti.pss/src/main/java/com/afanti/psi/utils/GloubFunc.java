package com.afanti.psi.utils;

import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Random;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


/**
 * Copyright (c) 2014,Aft All rights reserved。 FileName：com.aft.solr.util.GloubFunc.java Description: 工具类 CreateDate: 2014-6-12
 * @author gej
 * @version 1.0
 */
public class GloubFunc {
    /**
     * @desc 获得对象
     * @param
     * @return 对象
     * @throws Exception
     */
    public static Object refObject(String objName) throws Exception {
        try {
            Object objBean = Class.forName(objName);
            return objBean;
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * 检测字符串是否不为空(null,"","null")
     * @param s
     * @return 不为空则返回true，否则返回false
     */
    public static boolean notEmpty(String s) {
        return s != null && !"".equals(s) && !"null".equals(s);
    }

    /**
     * 检测字符串是否为空(null,"","null")
     * @param s
     * @return 为空则返回true，不否则返回false
     */
    public static boolean isEmpty(String s) {
        return s == null || "".equals(s) || "null".equals(s);
    }

    /**
     * @desc 反射对象方法
     * @param 类对象
     * @param 方法名
     * @param 方法参数
     * @param 方法参数类型
     * @return 方法返回对象
     * @throws Exception
     */
    public static Object refMethod(Object obj, String methodName, Object parm, Class<?> arg) throws Exception {
        try {
            Method m = obj.getClass().getMethod(methodName, arg);
            Object reVal = (Object) m.invoke(obj, (String) parm);
            return reVal;
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * 字符串比较
     * @param value
     * @param equalValue
     * @return
     */
    public static boolean equalsValue(String value, String equalValue) {
        if (value != null && value.equals(equalValue)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 判断字符串是否为空
     * @param value
     * @return
     */
    public static boolean equalsNull(Object value) {
        if (value != null && !value.equals("") && !value.equals("null")) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 验证整形字符串
     * @param numStr
     * @return
     */
    public static boolean equalsNum(String numStr) {
        boolean flag = false;
        try {
            Long.parseLong(numStr);
            flag = true;
        } catch (Exception e) {
            flag = false;
        }
        return flag;
    }

    /**
     * 字符串参数检查
     * @param str
     * @return boolean，检查不通过返回true
     */
    public static boolean checkString(String str) {
        boolean flag = true;
        if (null == str || "".equals(str) || "null".equals(str)) {
            return flag;
        } else {
            flag = false;
        }
        return flag;
    }

    /**
     * 字符串null转换
     * @param str
     * @return 如果为null返回空，
     */
    public static String isNull(String str) {
        if (null == str) {
            return "";
        } else {
            return str.trim();
        }
    }

    /**
     * ************************************************************************ 是否为正数判断（非负数）
     * @param str
     * @return 正确返回true，错误返回false
     */
    public static boolean isNumber(String str) {
        if (str == null || str.equals("")) {
            return false;
        }

        Pattern pattern = Pattern.compile("^(-|\\+)?\\d+(\\.\\d+)?$");
        Matcher isNum = pattern.matcher(str);
        boolean flag = isNum.matches();
        return flag;
    }

    /**
     * ************************************************************************ 随机产生四位数字
     * @return string
     */
    public static String random(int n) {
        String sRand = "";

        Random random = new Random();
        for (int i = 0; i < n; i++) {
            String rand = String.valueOf(random.nextInt(10));
            sRand += rand;
        }
        return sRand;

    }

    /**
     * ************************************************************************ 是否为数字
     * @return string
     */
    public static boolean isNumeric(String str) {
        for (int i = str.length(); --i >= 0;) {
            int chr = str.charAt(i);
            if (chr < 48 || chr > 57)
                return false;
        }
        return true;

    }

    /**
     * 初始化数字
     * @param s 格式化对象
     * @param nDef 对象为null时的返回str
     * @return 结果字符串
     */
    public static long initLong(String s, long nDef) {
        if (s != null && !"".equals(s)) {
            return Long.parseLong(s);
        } else {
            return nDef;
        }
    }

    /**
     * 初始化数字
     * @param s 格式化对象
     * @param nDef 对象为null时的返回 nDef
     * @return 结果字符串
     */
    public static int initInt(String s, int nDef) {
        if (s != null && !"".equals(s)) {
            return Integer.parseInt(s);
        } else {
            return nDef;
        }
    }

    /**
     * @Title: initDouble
     * @Description:
     * @param s
     * @param nDef
     * @return
     */
    public static double initDouble(String s, int nDef) {
        if (s != null && !"".equals(s)) {
            return Double.parseDouble(s);
        } else {
            return nDef;
        }
    }

    /**
     * 初始化字符串
     * @param o 格式化对象
     * @param sDef 对象为null时的返回 sDef
     * @return 结果字符串
     */
    public static String initStr(Object o, String sDef) {
        if (o != null) {
            return o.toString();
        } else {
            return sDef;
        }
    }

    /**
     * 格式化字符串
     * @param o 格式化对象
     * @return 结果字符串 对象为null时的返回“”；
     */
    public static String initStr(Object o) {
        return initStr(o, "");
    }

    /**
     * @Title: strToDate
     * @Description:字符串转化为时间
     * @param time
     * @return
     */
    public static Date strToDate(String time) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        try {
            if (!"".equals(time) && time != null) {
                date = df.parse(time);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return date;
    }

    /**
     * @Title: strToDateByAlipay
     * @Description: 时间转日期
     * @param time
     * @return
     */
    public static Date strToDateByAlipay(String time) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        try {
            if (!"".equals(time) && time != null) {
                date = df.parse(time);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return date;
    }
    
    
    public static String date2StringByWx(Date time) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-ddHH:mm:ss");
        String date = "";
        try {
            if (time != null) {
                date = df.format(time);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }
    
    
    public static Date strToDateByWx(String time) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-ddHH:mm:ss");
        Date date = new Date();
        try {
            if (!"".equals(time) && time != null) {
                date = df.parse(time);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return date;
    }
    
    
    public static Date strToDateByWxDone(String time) {
        SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
        Date date = new Date();
        try {
            if (!"".equals(time) && time != null) {
                date = df.parse(time);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return date;
    }
    

    /**
     * @Title: dateToStr
     * @Description: 时间转化字符串
     * @param time
     * @return
     */
    public static String dateToStr(Date time) {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String date = "";
        try {
            if (time != null) {
                date = df.format(time);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }
    
    /**
     * 字节长度截取字符串
    * @Title: byteSubStr
    * @Description: 
    * @param targetString
    * @param byteIndex
    * @param charset
    * @param suffix 补位符
    * @return
    * @throws Exception
     */
    public static String byteSubStr(String targetString, int byteIndex, String charset, String suffix)
            throws Exception {
        charset = StringUtils.isNotBlank(charset) ? charset : "UTF-8";
        suffix = StringUtils.isNotBlank(suffix) ? suffix : "";
        if (targetString.getBytes(charset).length <= byteIndex) {
            return targetString;
        }
        String temp = targetString;
        for (int i = 0; i < targetString.length(); i++) {
            temp = temp.substring(0, temp.length() - 1);
            if ((temp + suffix).getBytes(charset).length <= byteIndex) {
                break;
            }
        }
        return temp + suffix;
    }

    /**
     * 是否AJAX请求
     * @Title: isAjaxRequest
     * @Description:
     * @param request
     * @return
     */
    public static boolean isAjaxRequest(HttpServletRequest request) {
        return "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
    }

    /**
     * 根据消息码获取消息内容
     * @Title: getResourceMessage
     * @Description:
     * @param msgCode
     * @return
     */
    public static String getResourceMessage(String msgCode) {
        return SpringContextHolder.getBeanByType(MessageService.class).getMessage(msgCode);
    }

    /**
     * spring获取当前request对象，前提是需要配置RequestContextListener
     * @Title: getCurrentRequest
     * @Description:
     * @return
     */
    public static HttpServletRequest getCurrentRequest() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (null == attrs)
            return null;
        return attrs.getRequest();
    }

    /**
     * 获取访问者ip地址
     * @Title: getIpAddr
     * @Description:
     * @param request
     * @return
     */
    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip.equals("0:0:0:0:0:0:0:1")?"127.0.0.1":ip;
    }

    /**
     * @param s
     * @return 从某段话中获得图片字符串列表
     */
    public static List<String> getImg(String s) {
        String regex;
        List<String> list = new ArrayList<String>();
        regex = "src=\"(.*?)\"";
        Pattern pa = Pattern.compile(regex, Pattern.DOTALL);
        Matcher ma = pa.matcher(s);
        while (ma.find()) {
            list.add(ma.group());
        }
        return list;
    }
    
    public static List<String> getImgs(String s) {
        if(StringUtils.isBlank(s)) return null;
        List<String> list = new ArrayList<String>();
        String regex = "<img(\\s+)src=\"(.*?)\"(.*?)>";
        Pattern pa = Pattern.compile(regex, Pattern.DOTALL + Pattern.CASE_INSENSITIVE);
        Matcher ma = pa.matcher(s);
        while (ma.find()) {
            list.add(ma.group(2));
        }
        return list;
    }
    
    /**
     * 返回第一个不是null（字符串不是空）的值，类似于js中的||
    * @Title: or
    * @Description: 都不满足时，返回最后一个值
    * @param objs
    * @return
     */
    public static Object or(Object... objs) {
        for (int i = 0, j = objs.length; i < j; i++) {
            Object obj = objs[i];
            boolean isNull = null == obj;
            if(obj instanceof String) isNull = StringUtils.isEmpty((String)obj);
            if(!isNull) return obj;
            if(i == j - 1) return obj;
        }
        return null;
    }

    /**
    * @Title: isFromApp
    * @Description: 
    * @param request
    * @return 
    */
    public static boolean isFromApp(HttpServletRequest request) {
        String userAgent = request.getHeader("user-agent");
        return null != userAgent && userAgent.startsWith("jll-app-");
    }
    
    /**
     * 格式化时间,Date->String
     * @param date
     * @param mode 时间模式,如yyyy.MM.dd HH:mm:ss
     * @return
     */
    public static String formatDate(Date date, String mode){
        return new SimpleDateFormat(mode).format(date);
    }
    
    /**
     * 解析时间,String->Date
     * @param date
     * @param mode
     * @return
     * @throws ParseException 
     * @throws Exception
     */
    public static Date parseDate(String date, String mode) throws ParseException {
        return new SimpleDateFormat(mode).parse(date);
    }
    
    /**
     * 当前时间
    * @Title: now
    * @Description: 
    * @return
     */
    public static Date now() {
        return Calendar.getInstance().getTime();
    }
    
    /**
     * 当前时间字符串
     * @param format 格式,如"2008-11-15"
     * @return
     */
    public static String now(String format) {
        return formatDate(now(), format);
    }
    
    /**
     * 测试专用
    * @Title: printHeaders
    * @Description: 
    * @param request
     */
    public static void printHeaders(HttpServletRequest request) {
        Enumeration<String> en = request.getHeaderNames();
        while (en.hasMoreElements()) {
            String header = (String) en.nextElement();
            System.err.println(header + ": " + request.getHeader(header));
        }
    }
}
