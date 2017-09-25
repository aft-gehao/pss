package com.afanti.psi.utils;

import java.io.InputStream;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.afanti.psi.utils.AftException;
import com.afanti.psi.utils.FileUploader;
import com.afanti.psi.utils.SpringPropertiesHolder;
import com.qiniu.api.auth.AuthException;
import com.qiniu.api.auth.digest.Mac;
import com.qiniu.api.config.Config;
import com.qiniu.api.io.IoApi;
import com.qiniu.api.io.PutExtra;
import com.qiniu.api.io.PutRet;
import com.qiniu.api.net.EncodeUtils;
import com.qiniu.api.rs.PutPolicy;
import com.qiniu.api.rsf.ListItem;
import com.qiniu.api.rsf.ListPrefixRet;
import com.qiniu.api.rsf.RSFClient;
import com.qiniu.api.rsf.RSFEofException;

@Service
public class QiNiuFileUploader implements FileUploader {
    private static final Logger logger = LoggerFactory.getLogger(QiNiuFileUploader.class);
    
    private Mac mac;
    
    @Value("${qiniu.accessKey}")
    private String accessKey;
    @Value("${qiniu.secretKey}")
    private String secretKey;
    @Value("${qiniu.bucket}")
    private String bucket;
    @Value("${qiniu.common}")
    private String urlPrefix;
    @Value("${qiniu.watermark}")
    private String watermark;
	@Value("${qiniu.watermarkRule}")
    private String watermarkRule;
    @Value("${qiniu.pipeline}")
    private String pipeline;
    @Value("${qiniu.persistentNotifyUrl}")
    private String persistentNotifyUrl;
    private int curPipeLine = 0;

    /**
     * @MethodName:upload
     * @Description: 不带水印上传图片
     * @param file
     * @param length
     * @param path
     * @return
     * @throws Exception   
     * @author yangsy
     * @date 2015-10-27
     */
//    @Override
//    public String upload(InputStream file, long length, String path) throws Exception {
//        return upload(file, length, path, null);
//    }

    @Override
    public String upload(InputStream file, long length, String path) throws Exception {
        return upload(file, length, path, watermarkRule);
    }
    @Override
    public String uploadNoWate(InputStream file, long length, String path) throws Exception {
        return upload(file, length, path, null);
    }
    /**
     * MethodName: upload
     * @Description: 带水印上传图片
     * @param file
     * @param length
     * @param path
     * @param watermarkRule
     * @return
     * @throws Exception   
     * @return String  
     * @author yangsy
     * @version:0.1
     * @date 2015-10-27 下午1:55:13
     */
    public String upload(InputStream file, long length, String path, String watermarkRule) throws Exception {
        PutExtra extra = new PutExtra();
        PutRet ret = IoApi.Put(generateToken(path, watermarkRule), path, file, extra);
        logger.debug(ret.toString());
        if(!ret.ok())   throw new Exception(ret.toString());
        return ret.toString();
    }
    
    public String generateToken(String path, String watermarkRule) throws AuthException, JSONException {
        // 请确保该bucket已经存在
        PutPolicy putPolicy = new PutPolicy(bucket + ":" + path);
        if("2".equals(watermark) && StringUtils.isNotBlank(watermarkRule)) {
            putPolicy.persistentOps = watermarkRule + EncodeUtils.urlsafeEncode(bucket + ":" + path);
            putPolicy.persistentNotifyUrl = persistentNotifyUrl;
            putPolicy.persistentPipeline = getPipeLine();
        }
        String token = putPolicy.token(getMac());
        return token;
    }
    
    private Mac getMac() {
        if(null != mac) return mac;
        Config.ACCESS_KEY = accessKey;
        Config.SECRET_KEY = secretKey;
        mac = new Mac(Config.ACCESS_KEY, Config.SECRET_KEY);
        return mac;
    }
    
    private String getPipeLine() {
        String[] pipelines = pipeline.split(",");
        int len = pipelines.length;
        String p = "";
        if(curPipeLine >= len - 1) {
            p = pipelines[len - 1];
            curPipeLine = 0;
        } else {
            p = pipelines[curPipeLine++];
        }
        return p;
    }
    
    /**
     * 查询资源列表
    * @Title: list
    * @Description: 
    * @param spacePath 资源自定义空间
    * @return
     */
    public List<ListItem> list(String spacePath) {
        RSFClient client = new RSFClient(getMac());
        String marker = null;
        List<ListItem> all = new ArrayList<ListItem>();
        ListPrefixRet ret = null;
        while (true) {
            ret = client.listPrifix(bucket, spacePath, marker, 10);
            marker = ret.marker;
            all.addAll(ret.results);
            if (!ret.ok()) {
                // no more items or error occurs
                break;
            }
        }
        if (ret.exception.getClass() != RSFEofException.class) {
            throw new AftException("获取资源出错");
        }
        return all;
    }
    
    public String urlPrefix() {
        return urlPrefix;
    }
    
    public String saveUrl(String spaceKey, String suffix, Object... arguments) {
        String space = (String)SpringPropertiesHolder.getContextProperty(spaceKey);
        if(null != arguments) space = MessageFormat.format(space, arguments);
        return space + (StringUtils.isBlank(suffix) ? "" : suffix.trim());
    }
}
