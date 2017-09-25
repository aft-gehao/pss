package com.afanti.psi.base;

import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.SessionData;
import org.apache.log4j.Logger;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

public class BaseController {
    private static Logger logger = Logger.getLogger(BaseController.class);
    public static String SUCCESS = "success";
    public static String SUCCESS_MSG = "提示:操作成功";
    public static String FAIL = "fail";
    public static String FAIL_MSG = "提示:操作失败";
    public HttpServletRequest getRequest() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes()).getRequest();
        return request;
    }

    public static HttpServletResponse getResponse() {
        return ((ServletWebRequest) RequestContextHolder.getRequestAttributes()).getResponse();
    }

    /**
     * 获取Session信息
     * @return
     */
    public SessionData getSessionData() {
        return (SessionData) this.getRequest().getSession().getAttribute(FunctionUtil.SESSION_KEY_PSS);
    }

    /**
     * 设置session信息
     * @param sessionData
     */
    public void setSessionData(SessionData sessionData) {
        this.getRequest().getSession().setAttribute(FunctionUtil.SESSION_KEY_PSS, sessionData);
    }

    /**
     * 获取int类型数据
     * @param name
     * @return
     */
    public Integer getParameterInteger(String name) {
        Integer object = 0;
        try {
            object = Integer.parseInt(this.getRequest().getParameter(name));
        } catch (Exception e) {
        }
        return object;
    }

    /**
     * 获取String类型数据
     * @param name
     * @return
     */
    public String getParameterString(String name) {
        String object = "";
        try {
            object = this.getRequest().getParameter(name);
        } catch (Exception e) {
            object = "";
        }
        if (object == null) {
            object = "";
        }
        return object.trim();
    }
}
