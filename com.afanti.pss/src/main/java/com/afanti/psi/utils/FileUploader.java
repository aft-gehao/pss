/**
 * 
 */
package com.afanti.psi.utils;

import java.io.InputStream;
import java.util.List;

/**
 * @author yangsy
 *
 */
public interface FileUploader {
    /**
     * 普通上传文件-带水印
     * @param file 文件流
     * @param length 长度
     * @param path 期望在空间上保存的路径
     * @return
     */
    public String upload(InputStream file, long length, String path) throws Exception;
    /**
     * 普通上传文件-无水印
     * @param file 文件流
     * @param length 长度
     * @param path 期望在空间上保存的路径
     * @return
     */
    public String uploadNoWate(InputStream file, long length, String path) throws Exception;
    
    /**
     * 获取服务器URL前缀
    * @Title: urlPrefix
    * @Description: 
    * @return
     */
    public String urlPrefix();
    
    /**
     * 获取需要保存的URL
    * @Title: saveUrl
    * @Description: 
    * @param spaceKey 自定义空间，即属性文件中key，如brand.logo
    * @param suffix 空间路径后的文件名，如 /brand/logo/xxxxxxx.jpg中的 xxxxxxx.jpg
    * @param arguments
    * @return
     */
    public String saveUrl(String spaceKey, String suffix, Object... arguments);
    
    /**
     * 获取自定义空间下的文件列表
    * @Title: list
    * @Description: 
    * @param spacePath 自定义空间真实路径，如brand/logo
    * @return
     */
    public List<?> list(String spacePath);
}
