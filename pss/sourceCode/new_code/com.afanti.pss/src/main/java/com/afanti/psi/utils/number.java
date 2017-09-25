package com.afanti.psi.utils;

import com.afanti.psi.commons.service.CommonsService;
import com.afanti.psi.commons.vo.Pss_util_dict;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * Created by Administrator on 2017/6/9 0009.
 */
public class number {

    @Autowired
    private CommonsService commonsService;
    /**
     * MethodName: getRandomInt
     * @Description: 获取N位整形随机数
     * @param d
     * @return String
     * @author gehao
     * @version:0.1
     * @date 2017-06-09 下午10:51:30
     */
    public static String getRandomInt(int d){
        String ranum = "";
        Random ra =new Random();
        for(int i=0;i<d;i++){
            ranum = ranum +String.valueOf(ra.nextInt(9));
        }
        return ranum;
    }

    /**
     * MethodName: getRandomInt
     * @Description: 获取N位整形随机数
     * @param d
     * @return String
     * @author gehao
     * @version:0.1
     * @date 2017-06-09 下午10:51:30
     */
    public static int getRandom(int r){
        Random ra =new Random();
        if(r==0){
            r=1;
        }
        return ra.nextInt(r);
    }
    /**
     * MethodName: getRandomInt
     * @Description: 获取N位整形随机数
     * @param d
     * @return String
     * @author gehao
     * @version:0.1
     * @date 2017-06-09 下午10:51:30
     */
    public static String refNumberDigits(double number,int digit) throws Exception {

        try {
            if(number==999999){
                return "" ;
            }
            // 声明小数格式化类变量
            String digits = "";
            for(int i=0;i<digit;i++){
                digits = digits +"0";
            }
            DecimalFormat    df   = new DecimalFormat("######0."+digits);
            String rString   = df.format(number);
            if(digit==0){
                rString = rString.substring(0, rString.lastIndexOf("."));
            }
            return  rString;
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * MethodName: getRandomInt
     * @Description: 获取N位整形随机数
     * @param d
     * @return String
     * @author gehao
     * @version:0.1
     * @date 2017-06-09 下午10:51:30
     */
    public static double refNumberDigitsDouble(double number,int digit) throws Exception {

        try {

            // 声明小数格式化类变量
            String digits = "";
            for(int i=0;i<digit;i++){
                digits = digits +"0";
            }
            DecimalFormat    df   = new DecimalFormat("######0."+digits);
            double r =  Double.parseDouble(df.format(number)) ;
            return r;
        } catch (Exception e) {
            throw e;
        }
    }
    public static String doubleTrans(double num){
        if(Math.round(num)-num==0){
            return String.valueOf((long)num);
        }
        return String.valueOf(num);
    }
}
