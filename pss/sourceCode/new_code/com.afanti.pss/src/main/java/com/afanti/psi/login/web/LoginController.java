package com.afanti.psi.login.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.login.service.LoginService;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.PassUtil;
import com.afanti.psi.utils.SessionData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lauya on 2015-10-11.
 */
@Controller
@RequestMapping(value = "/passport")
public class LoginController extends BaseController {
    @Autowired
    private LoginService loginService;

    /**
     * 跳转主页面
     */
    @RequestMapping(value = "/load_menus", method = RequestMethod.GET)
    @ResponseBody
    public JsonData load_menus() {
        JsonData jsonData = new JsonData();
        try {
            jsonData.setAppend(this.getSessionData().getMenuStr());
            jsonData.setAppend_ext(this.getSessionData().getStaffInfo().getStaff_name());
            jsonData.setAppend_ext2(this.getSessionData().getMenuInfoList());
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载菜单失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    /**
     * 登陆
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/login_submit", method = RequestMethod.POST)
    @ResponseBody
    public JsonData login_submit(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("username", this.getParameterString("username"));
            params.put("password", PassUtil.Jia(this.getParameterString("password")));
            SessionData sessionData = new SessionData();
            boolean isLogin = loginService.loginSumbit(params, sessionData);
            if (isLogin) {
                FunctionUtil.setSession_Data(request, sessionData, FunctionUtil.SESSION_KEY_PSS);
                jsonData.setTarget("/main/main.html");
                jsonData.setMessage("登陆成功！");
                jsonData.setResult(SUCCESS);
            } else {
                jsonData.setMessage("登陆失败：用户名或密码错误！");
                jsonData.setResult(FAIL);
            }
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/login_out", method = RequestMethod.POST)
    @ResponseBody
    public JsonData login_out() {
        JsonData jsonData = new JsonData();
        try {
            this.setSessionData(null);
            jsonData.setTarget("/login/login.html");
            jsonData.setMessage("退出成功！");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
}
