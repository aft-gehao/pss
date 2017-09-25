package com.afanti.psi.kuaidi.service.impl;


import com.afanti.psi.commons.vo.BkOrderInfo;
import com.afanti.psi.commons.vo.EncodeUtil;
import com.afanti.psi.kuaidi.vo.Order;
import com.afanti.psi.kuaidi.service.KdService;
import com.afanti.psi.kuaidi.vo.Traces;
import com.afanti.psi.utils.JacksonOrgUtil;
import net.sf.json.JSONObject;
import org.json.JSONArray;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/18 0018.
 */
@Service
public  class KdServiceImpl {
    //电商ID
    private static String EBusinessID="1255587";
    //电商加密私钥，快递鸟提供，注意保管，不要泄漏
    private static String AppKey="6715c73a-8875-40b6-bd3d-cddbd851284a";
    //请求url
    private static String ReqURL="http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx";
    /**
     * Json方式 查询订单物流轨迹
     * @throws Exception
     */
    public  String getOrderTracesByJson(String code) throws Exception{
        String requestData= "{\"LogisticCode\":\""+code+"\"}";
        Map<String, String> params = new HashMap<String, String>();
        params.put("RequestData", urlEncoder(requestData, "UTF-8"));
        params.put("EBusinessID", EBusinessID);
        params.put("RequestType", "2002");
        String dataSign=encrypt(requestData, AppKey, "UTF-8");
        params.put("DataSign", urlEncoder(dataSign, "UTF-8"));
        params.put("DataType", "2");
        String result=sendPost(ReqURL, params);
        //根据公司业务处理返回的信息......
        return result;
    }

    /**
     * Json方式 查询订单物流轨迹
     * @throws Exception
     */
    public  String getKdInfoByJson(String code,String num) throws Exception{
        String requestData= "{\"OrderCode\":\"\",\"ShipperCode\":\""+code+"\",\"LogisticCode\":\""+num+"\"}";
        Map<String, String> params = new HashMap<String, String>();
        params.put("RequestData", urlEncoder(requestData, "UTF-8"));
        params.put("EBusinessID", EBusinessID);
        params.put("RequestType", "1002");
        String dataSign=encrypt(requestData, AppKey, "UTF-8");
        params.put("DataSign", urlEncoder(dataSign, "UTF-8"));
        params.put("DataType", "2");
        String result=sendPost(ReqURL, params);
      /*  JSONObject json = JSONObject.fromObject(result);
        List<Traces> list=(List<Traces>)json.get("Traces");
        if(Integer.valueOf(String.valueOf(json.get("State")))==3)
        {
            for(int i=0;i<list.size();i++)
            {
                Object kd_num=list.get(i).getAcceptStation();
                String kd_code=code;
                String kd_data=String.valueOf(list.get(i).getAcceptTime());
                String kd_info=list.get(i).getAcceptStation();
            }
        }*/
        //根据公司业务处理返回的信息......
        return result;
    }

    /**
     * 向指定 URL 发送POST方法的请求
     * @param url 发送请求的 URL
     * @param params 请求的参数集合
     * @return 远程资源的响应结果
     */
    private static String sendPost(String url, Map<String, String> params) {
        OutputStreamWriter out = null;
        BufferedReader in = null;
        StringBuilder result = new StringBuilder();
        try {
            URL realUrl = new URL(url);
            HttpURLConnection conn =(HttpURLConnection) realUrl.openConnection();
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // POST方法
            conn.setRequestMethod("POST");
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            conn.connect();
            // 获取URLConnection对象对应的输出流
            out = new OutputStreamWriter(conn.getOutputStream(), "UTF-8");
            // 发送请求参数
            if (params != null) {
                StringBuilder param = new StringBuilder();
                for (Map.Entry<String, String> entry : params.entrySet()) {
                    if(param.length()>0){
                        param.append("&");
                    }
                    param.append(entry.getKey());
                    param.append("=");
                    param.append(entry.getValue());
                    System.out.println(entry.getKey()+":"+entry.getValue());
                }
                System.out.println("param:"+param.toString());
                out.write(param.toString());
            }
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(
                    new InputStreamReader(conn.getInputStream(), "UTF-8"));
            String line;
            while ((line = in.readLine()) != null) {
                result.append(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        //使用finally块来关闭输出流、输入流
        finally{
            try{
                if(out!=null){
                    out.close();
                }
                if(in!=null){
                    in.close();
                }
            }
            catch(IOException ex){
                ex.printStackTrace();
            }
        }
        return result.toString();
    }
    /**
     * 电商Sign签名生成
     * @param content 内容
     * @param keyValue Appkey
     * @param charset 编码方式
     * @throws UnsupportedEncodingException ,Exception
     * @return DataSign签名
     */
    private static String encrypt (String content, String keyValue, String charset) throws UnsupportedEncodingException, Exception
    {
        if (keyValue != null)
        {
            return base64(MD5(content + keyValue, charset), charset);
        }
        return base64(MD5(content, charset), charset);
    }
    /**
     * base64编码
     * @param str 内容
     * @param charset 编码方式
     * @throws UnsupportedEncodingException
     */
    private static String base64(String str, String charset) throws UnsupportedEncodingException{
        String encoded = EncodeUtil.encodeBase64(str.getBytes(charset));
        return encoded;
    }


    //json转java对象
    public static Order ObjectFromJson(String json){
        Order order = null;
        order = JacksonOrgUtil.fromJson(json, Order.class);
        return order;
    }
   /* public static void main(String[] args){
        BkOrderInfo info = new BkOrderInfo();
        info.setShipperCode("YTO");
        info.setLogisticCode("100526997704");
        //	String cString = "{\"EBusinessID\":\"1255587\",\"Count\":\"9\",\"PushTime\":\"2015/12/21 14:23:19\",\"Data\":[{\"EBusinessID\":\"1255587\",\"OrderCode\":\"\",\"ShipperCode\":\"ZJS\",\"LogisticCode\":\"0885518631\",\"Success\":true,\"Reason\":\"\",\"State\":\"2\",\"Traces\":[{\"AcceptTime\":\"2015-12-18 19:28:54\",\"AcceptStation\":\"北京_东城营业所_三间房营业厅  已取件，离开 [北京_东城营业所_三间房营业厅] 发往 [北京运转中心]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-18 20:29:19\",\"AcceptStation\":\"北京运转中心  到达 [北京运转中心]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-18 23:09:33\",\"AcceptStation\":\"北京运转中心  离开 [北京运转中心] 发往 [北京_东城营业所_新天地营业厅]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 08:12:08\",\"AcceptStation\":\"北京_东城营业所_新天地营业厅  到达 [北京_东城营业所_新天地营业厅]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 08:53:38\",\"AcceptStation\":\"北京_东城营业所_新天地营业厅  离开 [北京_东城营业所_新天地营业厅] 派送中，递送员[张天彪]，电话[18730535357]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 08:22:55\",\"AcceptStation\":\"北京_东城营业所_新天地营业厅  离开 [北京_东城营业所_新天地营业厅] 派送中，递送员[张天彪]，电话[18730535357]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-21 08:18:50\",\"AcceptStation\":\"北京_东城营业所_新天地营业厅  离开 [北京_东城营业所_新天地营业厅] 派送中，递送员[张天彪]，电话[18730535357]\",\"Remark\":\"\"}],\"CallBack\":\"\"},{\"EBusinessID\":\"1255587\",\"OrderCode\":\"\",\"ShipperCode\":\"EMS\",\"LogisticCode\":\"5016462221805\",\"Success\":true,\"Reason\":\"\",\"State\":\"2\",\"Traces\":[{\"AcceptTime\":\"2015-12-18 11:21:00\",\"AcceptStation\":\"河北省邮政速递物流有限公司霸州市营业部已收件，（揽投员姓名：揽收二组;联系电话：7231357） 廊坊市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 06:20:00\",\"AcceptStation\":\"离开当前城市 发往北京市（经转）\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 10:31:00\",\"AcceptStation\":\"到达北京黄村转运站处理中心（经转） 北京市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 03:42:00\",\"AcceptStation\":\"离开北京市 发往郑州市（经转） 北京市\",\"Remark\":\"\"}],\"CallBack\":\"\"},{\"EBusinessID\":\"1255587\",\"OrderCode\":\"\",\"ShipperCode\":\"ZJS\",\"LogisticCode\":\"0885518185\",\"Success\":true,\"Reason\":\"\",\"State\":\"2\",\"Traces\":[{\"AcceptTime\":\"2015-12-16 19:08:29\",\"AcceptStation\":\"已取件，离开 [北京_东城营业所] 发往 [北京运转中心]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-16 20:14:54\",\"AcceptStation\":\"到达 [北京运转中心]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-17 02:24:16\",\"AcceptStation\":\"离开 [北京运转中心] 发往 [虎门运转中心]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-18 21:45:39\",\"AcceptStation\":\"到达 [虎门运转中心]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-18 22:13:05\",\"AcceptStation\":\"离开 [虎门运转中心] 发往 [深圳_深圳运转中心]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 04:21:28\",\"AcceptStation\":\"到达 [深圳_深圳运转中心]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 04:45:12\",\"AcceptStation\":\"离开 [深圳_深圳运转中心] 发往 [深圳_龙岗区营业所_坪山营业厅]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 08:49:34\",\"AcceptStation\":\"到达 [深圳_龙岗区营业所_坪山营业厅]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 10:35:20\",\"AcceptStation\":\"离开 [深圳_龙岗区营业所_坪山营业厅] 派送中，递送员[刘海鑫]，电话[13688804787]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 22:17:18\",\"AcceptStation\":\"到达 [深圳_龙岗区营业所_坪山营业厅]\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-21 10:06:56\",\"AcceptStation\":\"离开 [深圳_龙岗区营业所_坪山营业厅] 派送中，递送员[刘海鑫]，电话[13688804787]\",\"Remark\":\"\"}],\"CallBack\":\"\"},{\"EBusinessID\":\"1255587\",\"OrderCode\":\"\",\"ShipperCode\":\"EMS\",\"LogisticCode\":\"9610006629598\",\"Success\":true,\"Reason\":\"\",\"State\":\"2\",\"Traces\":[{\"AcceptTime\":\"2015-12-19 10:34:43\",\"AcceptStation\":\"[河北省中国邮政集团公司河北省兴隆县函件广告局06730002]已经收寄 中国邮政集团公司河北省兴隆县函件广告局\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 12:29:00\",\"AcceptStation\":\"离开[中国邮政集团公司河北省兴隆县函件广告局06730002]，下一站是[承德市],总包[8035],邮路[兴隆-承德(承)] 中国邮政集团公司河北省兴隆县函件广告局\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 15:32:00\",\"AcceptStation\":\"到达[承德市06700000],总包[8035] 承德市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 07:20:03\",\"AcceptStation\":\"离开[承德市06700000]，下一站是[北京东站],总包[8035],邮路[承德-北京(京2)] 承德市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 13:22:00\",\"AcceptStation\":\"到达[北京市10000000],总包[8035] 北京市\",\"Remark\":\"\"}],\"CallBack\":\"\"},{\"EBusinessID\":\"1255587\",\"OrderCode\":\"\",\"ShipperCode\":\"EMS\",\"LogisticCode\":\"5016462232305\",\"Success\":true,\"Reason\":\"\",\"State\":\"2\",\"Traces\":[{\"AcceptTime\":\"2015-12-17 18:37:27\",\"AcceptStation\":\"任丘市邮政速递公司已收件，（揽投员姓名：柴永慧;联系电话：13833981810） 沧州市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 19:01:00\",\"AcceptStation\":\"已离开收寄点，发往廊坊市 沧州市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 19:02:00\",\"AcceptStation\":\"到达廊坊市处理中心（经转） 廊坊市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 19:12:00\",\"AcceptStation\":\"离开当前城市 发往北京市（经转）\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 22:38:00\",\"AcceptStation\":\"到达北京黄村转运站处理中心（经转） 北京市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 14:30:00\",\"AcceptStation\":\"离开北京市 发往南京市（经转） 北京市\",\"Remark\":\"\"}],\"CallBack\":\"\"},{\"EBusinessID\":\"1255587\",\"OrderCode\":\"\",\"ShipperCode\":\"EMS\",\"LogisticCode\":\"5016462230605\",\"Success\":true,\"Reason\":\"\",\"State\":\"2\",\"Traces\":[{\"AcceptTime\":\"2015-12-18 11:21:00\",\"AcceptStation\":\"河北省邮政速递物流有限公司霸州市营业部已收件，（揽投员姓名：揽收二组;联系电话：7231357） 廊坊市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 01:36:00\",\"AcceptStation\":\"离开当前城市 发往北京市（经转）\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 05:02:00\",\"AcceptStation\":\"到达北京黄村转运站处理中心（经转） 北京市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 20:12:00\",\"AcceptStation\":\"离开北京市 发往武汉市（经转） 北京市\",\"Remark\":\"\"}],\"CallBack\":\"\"},{\"EBusinessID\":\"1255587\",\"OrderCode\":\"\",\"ShipperCode\":\"EMS\",\"LogisticCode\":\"5016462230605\",\"Success\":true,\"Reason\":\"\",\"State\":\"2\",\"Traces\":[{\"AcceptTime\":\"2015-12-18 11:21:00\",\"AcceptStation\":\"河北省邮政速递物流有限公司霸州市营业部已收件，（揽投员姓名：揽收二组;联系电话：7231357） 廊坊市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 01:36:00\",\"AcceptStation\":\"离开当前城市 发往北京市（经转）\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 05:02:00\",\"AcceptStation\":\"到达北京黄村转运站处理中心（经转） 北京市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 20:12:00\",\"AcceptStation\":\"离开北京市 发往武汉市（经转） 北京市\",\"Remark\":\"\"}],\"CallBack\":\"\"},{\"EBusinessID\":\"1255587\",\"OrderCode\":\"\",\"ShipperCode\":\"EMS\",\"LogisticCode\":\"9610006629609\",\"Success\":false,\"Reason\":\"\",\"State\":\"2\",\"Traces\":[],\"CallBack\":\"\"},{\"EBusinessID\":\"1255587\",\"OrderCode\":\"\",\"ShipperCode\":\"EMS\",\"LogisticCode\":\"9610006629601\",\"Success\":true,\"Reason\":\"\",\"State\":\"2\",\"Traces\":[{\"AcceptTime\":\"2015-12-19 11:18:44\",\"AcceptStation\":\"[河北省中国邮政集团公司河北省兴隆县函件广告局06730002]已经收寄 中国邮政集团公司河北省兴隆县函件广告局\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 12:29:00\",\"AcceptStation\":\"离开[中国邮政集团公司河北省兴隆县函件广告局06730002]，下一站是[承德市],总包[8056],邮路[兴隆-承德(承)] 中国邮政集团公司河北省兴隆县函件广告局\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-19 15:32:00\",\"AcceptStation\":\"到达[承德市06700000],总包[8056] 承德市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 07:20:03\",\"AcceptStation\":\"离开[承德市06700000]，下一站是[北京东站],总包[8056],邮路[承德-北京(京2)] 承德市\",\"Remark\":\"\"},{\"AcceptTime\":\"2015-12-20 13:22:00\",\"AcceptStation\":\"到达[北京市10000000],总包[8056] 北京市\",\"Remark\":\"\"}],\"CallBack\":\"\"}]}";
        Order order = null;
        try {
            order =getOrderTracesByJson(info);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println(order);
    }*/
    /**
     * MD5加密
     * @param str 内容
     * @param charset 编码方式
     * @throws Exception
     */
    private static String MD5(String str, String charset) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        md.update(str.getBytes(charset));
        byte[] result = md.digest();
        StringBuffer sb = new StringBuffer(32);
        for (int i = 0; i < result.length; i++) {
            int val = result[i] & 0xff;
            if (val <= 0xf) {
                sb.append("0");
            }
            sb.append(Integer.toHexString(val));
        }
        return sb.toString().toLowerCase();
    }
    private static String urlEncoder(String str, String charset) throws UnsupportedEncodingException{
        String result = URLEncoder.encode(str, charset);
        return result;
    }



}
