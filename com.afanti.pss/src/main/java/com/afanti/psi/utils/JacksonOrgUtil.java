package com.afanti.psi.utils;

import java.io.IOException;
import java.io.InputStream;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.codehaus.jackson.annotate.JsonAutoDetect.Visibility;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;
import com.afanti.psi.utils.BaseRuntimeException;
/**
 * @ClassName: JacksonUtil
 * @Description: Jackson的json操作工具类
 * @author yangsy
 */
public abstract class JacksonOrgUtil {
    /**
     * @Fields EMPTY_JSON : 空json串
     */
    public static final String EMPTY_JSON = "{}";

    /**
     * @Fields LOGGER : 日志操作类
     */
    @SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(JacksonOrgUtil.class);

    /**
     * @Fields MAPPER : 对象和json的映射器
     */
    private static final ObjectMapper MAPPER;

    static {
    	MAPPER = new ObjectMapper().setVisibility(JsonMethod.FIELD, Visibility.ANY);  
    	MAPPER.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false); 
    }

    /**
     * @Title: getMapper
     * @Description: 获取对象映射器
     * @return 对象映射器
     */
    public static ObjectMapper getMapper() {
        return MAPPER;
    }

    /**
     * @Title: fromJson
     * @Description: 将json输入流转换成对象
     * @param inputStream json的输入流
     * @param <T> 需要的对象类型
     * @param clazz 对象类
     * @return json输入流转换成的对象
     */
    public static <T> T fromJson(final InputStream inputStream, final Class<T> clazz) {
        return fromJson(inputStream, clazz, MAPPER);
    }

    /**
     * @Title: fromJson
     * @Description: 将json输入流转换成对象
     * @param inputStream json的输入流
     * @param <T> 需要的对象类型
     * @param clazz 对象类
     * @param objectMapper 自定义的对象映射器
     * @return json输入流转换成的对象
     */
    public static <T> T fromJson(final InputStream inputStream, final Class<T> clazz, final ObjectMapper objectMapper) {
        try {
            return objectMapper.readValue(inputStream, clazz);
        } catch (final IOException e) {
            throw new BaseRuntimeException(e);
        }
    }

    /**
     * @Title: fromJson
     * @Description: 将json字符串转换成对象
     * @param json json字符串
     * @param <T> 需要的对象类型
     * @param clazz 对象类
     * @return json转换成的对象
     */
    public static <T> T fromJson(final String json, final Class<T> clazz) {
        return fromJson(json, clazz, MAPPER);
    }

    /**
     * @Title: fromJson
     * @Description: 将json字符串转换成对象
     * @param json json字符串
     * @param <T> 需要的对象类型
     * @param clazz 对象类
     * @param objectMapper 自定义对象映射类
     * @return json转换成的对象
     */
    public static <T> T fromJson(final String json, final Class<T> clazz, final ObjectMapper objectMapper) {
        if (StringUtils.isEmpty(json)) {
            return null;
        }
        try {
            return objectMapper.readValue(json, clazz);
        } catch (final IOException e) {
            throw new BaseRuntimeException(e);
        }
    }

}
