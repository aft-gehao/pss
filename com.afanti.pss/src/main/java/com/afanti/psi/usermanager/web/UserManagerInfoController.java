package com.afanti.psi.usermanager.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.usermanager.service.RoleInfoManagerService;
import com.afanti.psi.usermanager.service.UserManagerService;
import com.afanti.psi.usermanager.vo.Pss_Role;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 采购管理 》采购管理
 */
@Controller
@RequestMapping(value = "/user/manager")
public class UserManagerInfoController extends BaseController {

    @Autowired
    private RoleInfoManagerService roleInfoManagerService;

    @Autowired
    private UserManagerService userManagerService;

    @RequestMapping(value = "/load_juese", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_juese()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            List<Pss_Role> roleList = roleInfoManagerService.getPssRoleList(params);
            jsonData.setAppend(roleList);
            jsonData.setResult(this.SUCCESS);
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载角色失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/user_page_list", method = RequestMethod.POST)
    @ResponseBody
    public JsonData user_page_list()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("staff_name", getParameterString("staff_name"));
            params.put("role_id", getParameterString("juese_id"));
            params.put("p", getParameterString("p"));
            Page page = userManagerService.getUserPageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("查询用户分页异常");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/add_user_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_user_info()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("role_ids",this.getParameterString("role_ids"));
            params.put("staff_name",this.getParameterString("staff_name"));
            params.put("user_name",this.getParameterString("user_name"));
            params.put("mobilephone",this.getParameterString("mobilephone"));
            params.put("email",this.getParameterString("email"));
            params.put("address",this.getParameterString("address"));
            params.put("password",this.getParameterString("password"));
            userManagerService.addUserInfo(params);
            jsonData.setResult(this.SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/upd_user_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData upd_user_info()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("staff_id",this.getParameterString("staff_id"));
            params.put("role_ids",this.getParameterString("role_ids"));
            params.put("staff_name",this.getParameterString("staff_name"));
            params.put("username",this.getParameterString("username"));
            params.put("mobilephone",this.getParameterString("mobilephone"));
            params.put("email",this.getParameterString("email"));
            params.put("address",this.getParameterString("address"));
            params.put("password",this.getParameterString("password"));
            params.put("password_old",this.getParameterString("password_old"));
            userManagerService.updUserInfo(params);
            jsonData.setResult(this.SUCCESS);
            jsonData.setMessage("操作成功");
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/del_user", method = RequestMethod.POST)
    @ResponseBody
    public JsonData del_user()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("staff_id",this.getParameterString("staff_id"));
            params.put("status","1");
            userManagerService.delUser(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_user_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_user_info()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("staff_id",this.getParameterString("staff_id"));
            Staff_info staffInfo = userManagerService.getStaffInfo(params);
            jsonData.setResult(this.SUCCESS);
            jsonData.setAppend(staffInfo);
        }catch (Exception e)
        {
            jsonData.setResult(this.FAIL);
            jsonData.setResult("加载用户信息失败");
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

}
