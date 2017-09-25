package com.afanti.psi.commons.service.impl;

import com.afanti.psi.commons.dao.CommonsDao;
import com.afanti.psi.commons.service.CommonsService;
import com.afanti.psi.commons.vo.*;
import com.afanti.psi.shinfo.vo.Linkman;
import com.afanti.psi.utils.JacksonOrgUtil;
import com.afanti.psi.commons.service.impl.QiNiuFileUploader;
import com.afanti.psi.utils.SpringPropertiesHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * Created by Administrator on 2017/4/18 0018.
 */
@Service
public class CommonsServiceImpl implements CommonsService {
    @Autowired
    private CommonsDao commonsDao;
    @Autowired
    private QiNiuFileUploader QiNiuFileUploader;


    @Override
    public List<AutoCompleteItem> getAutoCompleteList(Map<String, Object> params) {
        return commonsDao.getAutoCompleteList(params);
    }

    @Override
    public List<Pss_dict> getDict(Map<String, Object> params) {
        return commonsDao.getDict(params);
    }
    /*@Override
    // add by gehao  单位转换
    public Pss_util_dict getRatio(Map<String, Object> params) {
        return commonsDao.getRatio(params);
    }*/
    @Override
    public List<Linkman> getLinkmanList(Map<String, Object> params) {
        return commonsDao.getLinkmanList(params);
    }

   /* *
     * MethodName: uploadFileAllTypeNoWate
     * @Description: 上传文件至七牛服务器-主要用于上传所以类型的文件，从今以后，文件上传的逻辑是存两份：一份存自己的服务上，一份存七牛上
     * @param imgData
     * @param fileName
     * @throws Exception
     * @return Map<String,Object>
     * @author yangsy
     * @version:0.1
     * @date 2016-7-8 下午2:33:15*/

    public Map<String, Object> uploadFileAllTypeNoWate(String imgData,String fileName) throws Exception {
        String commonUrl = SpringPropertiesHolder.getContextProperty("qiniu.common").toString();
        Map<String, Object> map = new HashMap<String, Object>();
        String urlPath = "";
        String msg = "";
        int flag = -1;
        map.put("commonUrl", commonUrl);
        byte[] imgBytes = EncodeUtil.decodeBase64(imgData);

        InputStream inputStream = new ByteArrayInputStream(imgBytes);

        long size =  imgBytes.length; // 文件大小
        if(size>5024000){
            flag = -2;
            msg="文件过大，请选择2M以内的文件！";
            map.put("code", flag);
            map.put("msg", msg);
            map.put("url", urlPath);
            return map;
        }
       /* QiNiuFileUploader qiNiuFileUploader=new QiNiuFileUploader();*/
        // 获取文件名称
        // 上传七牛服务器
        QiNiuFileUploader.uploadNoWate(inputStream, size, fileName);
        inputStream.close();
        map.put("code", "1");
        map.put("msg", "上传成功");
        map.put("url", fileName);
        return map;
    }


}
