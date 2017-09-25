package com.afanti.psi.commons.vo;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.lang3.StringEscapeUtils;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import com.afanti.psi.utils.SysParam;


/**
 * @ClassName: EncodeUtil
 * @Description: 封装各种格式的编码解码工具类.
 * @author yangsy
 */
public abstract class EncodeUtil {
	
	private static BASE64Decoder decoder = new BASE64Decoder();  
	private static BASE64Encoder encoder = new BASE64Encoder();  
    /** 
     * BASE64 编码 
     *  
     * @param s 
     * @return 
     */  
    public static String encodeBufferBase64(byte[] buff)  
    {  
        return buff == null?null:encoder.encodeBuffer(buff).trim();  
    }  
      
      
    /** 
     * BASE64解码 
     *  
     * @param s 
     * @return 
     */  
    public static byte[] decodeBufferBase64(String s)  
    {  
        try  
        {  
            return s == null ? null : decoder.decodeBuffer(s);  
        }  
        catch (IOException e)  
        {  
            e.printStackTrace();  
        }   
        return null;  
    }  
      
  
    /** 
     * base64编码 
     *  
     * @param bytes 
     *            字符数组 
     * @return 
     * @throws IOException 
     */  
    public static String encodeBASE64Bytes(byte[] bytes) throws IOException  
    {  
        return new BASE64Encoder().encode(bytes).replace("\n", "").replace("\r", "");  
    }  
  
    /** 
     * base64解码 
     *  
     * @param bytes 
     *            字符数组 
     * @return 
     * @throws IOException 
     */  
    public static String decodeBASE64Bytes(byte[] bytes) throws IOException  
    {  
        return new String(new BASE64Decoder().decodeBuffer(new String(bytes)));  
    }  

    /**
     * @Title: encodeHex
     * @Description: Hex16进制编码, byte[]->String.
     * @param input 字节输入
     * @return 编码后的字符串
     */
    public static String encodeHex(final byte[] input) {
        return Hex.encodeHexString(input);
    }

    /**
     * @Title: decodeHex
     * @Description: Hex解码, String->byte[].
     * @param input 字节输入
     * @return 解码输出字节
     */
    public static byte[] decodeHex(final String input) {
        try {
            return Hex.decodeHex(input.toCharArray());
        } catch (final DecoderException e) {
            throw new IllegalStateException("Hex Decoder exception", e);
        }
    }

    /**
     * @Title: encodeBase64
     * @Description: Base64编码, byte[]->String.
     * @param input 输入
     * @return 加密后的字符串
     */
    public static String encodeBase64(final byte[] input) {
        return Base64.encodeBase64String(input);
    }

    /**
     * @Title: decodeBase64
     * @Description: Base64解码, String->byte[].
     * @param input base64加密串
     * @return 解密输出
     */
    public static byte[] decodeBase64(final String input) {
        return Base64.decodeBase64(input);
    }

    /**
     * @Title: encodeUrlSafeBase64
     * @Description: Base64编码, URL安全(将Base64中的URL非法字符'+'和'/'转为'-'和'_', 见RFC3548).
     * @param input 输入
     * @return 加密后的字符串
     */
    public static String encodeUrlSafeBase64(final byte[] input) {
        return Base64.encodeBase64URLSafeString(input);
    }

    /**
     * @Title: escapeHtml
     * @Description: Html 转码.
     * @param html html
     * @return 转成html接受的编码
     */
    public static String escapeHtml(final String html) {
        return StringEscapeUtils.escapeHtml4(html);
    }

    /**
     * @Title: unescapeHtml
     * @Description: Html 解码.
     * @param htmlEscaped html编码字符串
     * @return 解码html编码字符串
     */
    public static String unescapeHtml(final String htmlEscaped) {
        return StringEscapeUtils.unescapeHtml4(htmlEscaped);
    }

    /**
     * @Title: escapeXml
     * @Description: Xml 转码.
     * @param xml xml
     * @return 转码后的字符串
     */
    public static String escapeXml(final String xml) {
        return StringEscapeUtils.escapeXml(xml);
    }

    /**
     * @Title: unescapeXml
     * @Description: Xml 解码.
     * @param xmlEscaped xml转码后的字符串
     * @return 解码后的xml字符串
     */
    public static String unescapeXml(final String xmlEscaped) {
        return StringEscapeUtils.unescapeXml(xmlEscaped);
    }

    /**
     * @Title: escapeCsv
     * @Description: Csv 转码.
     * @param csv csv字符串
     * @return 转码后的csv字符串
     */
    public static String escapeCsv(final String csv) {
        return StringEscapeUtils.escapeCsv(csv);
    }

    /**
     * @Title: unescapeCsv
     * @Description: Csv 解码.
     * @param csvEscaped csv转码后的字符串
     * @return csv字符串
     */
    public static String unescapeCsv(final String csvEscaped) {
        return StringEscapeUtils.unescapeCsv(csvEscaped);
    }

    /**
     * @Title: urlEncode
     * @Description: URL 编码, Encode默认为SysParam.CHARSET.
     * @param part url字符串
     * @return 编码后的rul字符串
     */
    public static String urlEncode(final String part) {
        try {
            return URLEncoder.encode(part, SysParam.CHARSET);
        } catch (final UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return part;
    }

    /**
     * @Title: urlDecode
     * @Description: URL 解码, Encode默认为SysParam.CHARSET.
     * @param part url编码的字符串
     * @return url字符串
     */
    public static String urlDecode(final String part) {
        try {
            return URLDecoder.decode(part, SysParam.CHARSET);
        } catch (final UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return part;
    }
}
