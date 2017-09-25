package com.afanti.psi.utils;

import java.nio.charset.Charset;

/**
 * @ClassName: SysParam
 * @Description: 系统参数类
 * @author yangsy
 */
public abstract class SysParam {

    /**
     * @Fields CHARSET : 系统默认字符集
     */
    public static final String CHARSET = Charset.defaultCharset().name();
}
