/**
 * @Title: StringUtil.java
 * @Package com.starmagic.sysframe.utils
 * @Description: 字符串操作工具类
 * @author yangsy
 * @version V1.0
 */
package com.afanti.psi.utils;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;

import com.afanti.psi.utils.BaseRuntimeException;
import com.afanti.psi.utils.Symbol;
import com.afanti.psi.utils.SysParam;


/**
 * @ClassName: StringUtil
 * @Description: 字符串操作工具类
 * @author yangsy
 */
public abstract class StringUtil extends StringUtils {
    /**
     * @Title: fillChar
     * @Description: 字符串右边用指定字符补齐
     * @param targetStr 需要补齐的字符串
     * @param strLength 字符串需要的长度
     * @param fillchar 用来补齐的字符，可以是空格
     * @return String 返回补齐后的字符串
     */
    public static String fillChar(final String targetStr, final int strLength, final char fillchar) {
        String dealedStr = "";
        int curLength = 0;
        int cutLength = 0;
        final StringBuffer newString = new StringBuffer();
        if (targetStr != null) {
            try {
                curLength = targetStr.getBytes(SysParam.CHARSET).length;
            } catch (final UnsupportedEncodingException e) {
                throw new BaseRuntimeException(e);
            }
            if (curLength > strLength) {
                dealedStr = targetStr.substring(0, strLength);
            }
        }
        try {
            cutLength = strLength - dealedStr.getBytes(SysParam.CHARSET).length;
        } catch (final UnsupportedEncodingException e) {
            throw new BaseRuntimeException(e);
        }

        for (int i = 0; i < cutLength; i = i + 1) {
            newString.append(fillchar);
        }
        return dealedStr + newString;
    }

    /**
     * @Title: stringsToMapList
     * @Description: 将字符串数组转换成指定key的Map的List
     * @param strs 字符串数组
     * @param mapKey 字符串在map中的key名称
     * @return List<Object> 返回类型
     */
    public static List<Object> strs2MapList(final String[] strs, final String mapKey) {
        final List<Object> list = new ArrayList<Object>();
        for (final String record : strs) {
            list.add(new LinkedHashMap<String, Object>().put(mapKey, record));
        }
        return list;
    }

    /**
     * @Title: unCamelize
     * @Description: 还原到大写下划线，将标识采用Camel标记法. 首字母小写,后面每个单词大写字母开头
     * @param src 原字符串
     * @return 还原到大写加下划线的字符串
     */
    public static String unCamelize(final String src) {
        String the = new String(src);
        for (char i = 'A'; i < 'Z'; ++i) {
            the = the.replaceAll(String.valueOf(i), Symbol.UNDERLINE + String.valueOf(i));
        }

        return the.toUpperCase();
    }

    /**
     * @Title: camelize
     * @Description: 将标识采用Camel标记法. 首字母小写,后面每个单词大写字母开头
     * @param source 原字符串
     * @return 首字母小写,后面每个单词大写字母开头的字符串
     */
    public static String camelize(final String source) {

        String the = new String(source);
        the = the.toLowerCase();

        final StringBuffer result = new StringBuffer();

        final String[] theArray = the.split(Symbol.UNDERLINE);
        result.append(theArray[0]);

        for (int i = 1; i < theArray.length; i++) {
            result.append(Character.toUpperCase(theArray[i].charAt(0)) + theArray[i].substring(1));
        }

        return result.toString();
    }

    /**
     * @Title: findLeftMatchKey
     * @Description: 从集合中发现是否有path的左边匹配的key
     * @param keySet 左边的key集合
     * @param path 需要匹配的path
     * @return 返回长度为2的list，第一个为左边匹配的path，第二个为剩下的path
     */
    public static List<String> findLeftMatchKey(final Set<String> keySet, final String path) {
        String checkPath = path;
        int i = checkPath.lastIndexOf(Symbol.FORWARD_SLASH);
        boolean needReplace = false;
        while (i > 0) {
            checkPath = checkPath.substring(0, i);
            if (keySet.contains(checkPath)) {
                needReplace = true;
                break;
            }
            i = checkPath.lastIndexOf(Symbol.FORWARD_SLASH);
        }
        final List<String> apartStr = new ArrayList<String>();
        if (needReplace) {
            apartStr.add(checkPath);
            apartStr.add(path.substring(i));
        }
        return apartStr;
    }
    /**
     * 初始化字符串
     * 
     * @param o
     *            格式化对象
     * @param sDef
     *            对象为null时的返回 sDef
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
     * MethodName: removeKongge
     * @Description: 去重所有空格
     * @param str
     * @return String  
     * @author yangsy
     * @version:0.1
     * @date 2016-3-3 下午10:06:29
     */
    public static String removeKongge(String str){
    	String st = "";
    	if(str!=null){
    		st = str.trim().replaceAll(" ", "");
    	}
    	return st;
    }
}
