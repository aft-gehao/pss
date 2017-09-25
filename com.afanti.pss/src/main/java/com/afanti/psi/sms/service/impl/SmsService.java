package com.afanti.psi.sms.service.impl;

import com.afanti.psi.sms.AftException;
import com.afanti.psi.sms.JacksonUtil;
import com.afanti.psi.sms.SMSResponse;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.*;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.protocol.HttpContext;
import org.springframework.stereotype.Service;
import sun.misc.BASE64Encoder;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName: SmsService
 * @Description: 短信服务类
 * @author sunjl
 */
@SuppressWarnings({ "restriction", "deprecation" })
@Service("smsService")
public class SmsService {

    private static final int INTERNET_ERROR = 3;

    public SMSResponse send(String mobilePhone, String sendContent) throws Exception {
        SMSResponse responseBean = null;
        if(StringUtils.isNotBlank(mobilePhone)){
            DefaultHttpClient client = new DefaultHttpClient();
            client.addRequestInterceptor(new HttpRequestInterceptor() {
                @Override
                public void process(HttpRequest request, HttpContext context) throws HttpException, IOException {
                    //request.addHeader("Accept-Encoding", "gzip");
                    request.addHeader("Authorization", "Basic " + new BASE64Encoder().encode("api:d714ec19c9e8d259641d9546bffb06de".getBytes("utf-8")));
                }
            });
            client.getParams().setIntParameter(CoreConnectionPNames.CONNECTION_TIMEOUT, 30000);
            client.getParams().setIntParameter(CoreConnectionPNames.SO_TIMEOUT, 30000);
            HttpPost request = new HttpPost("http://sms-api.luosimao.com/v1/send.json");
            ByteArrayOutputStream bos = null;
            InputStream bis = null;
            byte[] buf = new byte[10240];
            String content = null;
            try {
                List<NameValuePair> params = new ArrayList<NameValuePair>();
                params.add(new BasicNameValuePair("mobile", mobilePhone));
                params.add(new BasicNameValuePair("message", sendContent));
                request.setEntity(new UrlEncodedFormEntity(params, "utf-8"));

                HttpResponse response = client.execute(request);
                if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                    bis = response.getEntity().getContent();
                    bos = new ByteArrayOutputStream();
                    int count;
                    while ((count = bis.read(buf)) != -1) {
                        bos.write(buf, 0, count);
                    }
                    bis.close();
                    content = bos.toString();
                    responseBean = JacksonUtil.fromJson(content, SMSResponse.class);
                } else {
                    throw new AftException(INTERNET_ERROR);
                }
                return responseBean;
            } finally {
                if (bis != null) {
                    try {
                        bis.close();// 最后要关闭BufferedReader
                    } catch (Exception e) {
                        
                    }
                }
            }
        }else{
        	responseBean = new SMSResponse();
        	return responseBean;
        }
    }
}
