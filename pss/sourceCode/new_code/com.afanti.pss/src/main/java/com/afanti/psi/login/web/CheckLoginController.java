package com.afanti.psi.login.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.utils.JsonData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 客户管理 》客户管理列表
 */
@Controller
@RequestMapping(value = "/commons/")
public class CheckLoginController extends BaseController {
    @RequestMapping(value = "/check_login", method = RequestMethod.POST)
    @ResponseBody
    public JsonData check_log()
    {
        JsonData jsonData = new JsonData();
        try {
            if(this.getSessionData()==null)
            {
                jsonData.setTarget("/login/login.html");
                jsonData.setResult(SUCCESS);
            }
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
}
