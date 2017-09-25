package com.afanti.psi.usermanager.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.usermanager.service.RoleInfoManagerService;
import com.afanti.psi.usermanager.vo.Pss_Menu;
import com.afanti.psi.usermanager.vo.Pss_Role;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 员工管理 》【角色菜单管理】列表
 */
@Controller
@RequestMapping(value = "/user/manager")
public class RoleMenuInfoManagerController extends BaseController {

    @Autowired
    private RoleInfoManagerService roleInfoManagerService;
    @RequestMapping(value = "/role_list", method = RequestMethod.POST)
    @ResponseBody
    public JsonData roleList(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("role_name", getParameterString("role_name"));
            params.put("p", getParameterString("p"));
            Page page = roleInfoManagerService.getPssRolePageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/add_role", method = RequestMethod.POST)
    @ResponseBody
    public JsonData addRole()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("role_name",getParameterString("role_name"));
            params.put("role_status","0");
            roleInfoManagerService.addRole(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/del_role", method = RequestMethod.POST)
    @ResponseBody
    public JsonData delRole()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("role_id",getParameterString("role_id"));
            int flag=roleInfoManagerService.roleSelect(params);
           if(flag!=0){
               jsonData.setMessage("此角色下存在用户，不能删除");
           }
            else {
               roleInfoManagerService.delRole(params);
               jsonData.setMessage("操作成功");
               jsonData.setResult(SUCCESS);
           }
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/load_role_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData loadRoleInfo()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("role_id",getParameterString("role_id"));
            Pss_Role pssRoleInfo = roleInfoManagerService.getRoleInfo(params);
            jsonData.setAppend(pssRoleInfo);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/upd_role", method = RequestMethod.POST)
    @ResponseBody
    public JsonData upd_role()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("role_id",getParameterString("role_id"));
            params.put("role_name",getParameterString("role_name"));
            roleInfoManagerService.updRole(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/load_role_menu", method = RequestMethod.POST)
    @ResponseBody
    public JsonData loadRoleMenu()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //记载系统所有菜单
            params.put("role_id",getParameterString("role_id"));
            String append = roleInfoManagerService.loadRoleMenu(params);
            jsonData.setAppend(append);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载菜单失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/upd_role_menu", method = RequestMethod.POST)
    @ResponseBody
    public JsonData upd_role_menu()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("role_id",getParameterString("role_id"));
            params.put("menu_ids",getParameterString("menu_ids"));
            roleInfoManagerService.updRoleMenu(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("更新菜单失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/add_menu", method = RequestMethod.POST)
    @ResponseBody
    public JsonData addMenu()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("role_id",getParameterString("role_id"));
            params.put("menu_parent",getParameterString("menu_parent"));
            params.put("menu_name",getParameterString("menu_name"));
            params.put("menu_url",getParameterString("menu_url"));
            params.put("menu_type",this.getParameterString("menu_type"));
            roleInfoManagerService.addMenu(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/del_menu", method = RequestMethod.POST)
    @ResponseBody
    public JsonData delMenu()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("role_id",this.getParameterString("role_id"));
            params.put("menu_id",this.getParameterString("menu_id"));
            roleInfoManagerService.delMenu(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/load_menu_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData loadMenuInfo()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("menu_id",this.getParameterString("menu_id"));
            Pss_Menu pssMenu = roleInfoManagerService.getMenuInfo(params);
            jsonData.setAppend(pssMenu);
            jsonData.setResult(SUCCESS);
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载菜单数据失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/upd_menu_save", method = RequestMethod.POST)
    @ResponseBody
    public JsonData upd_menu_save()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("menu_id",this.getParameterString("menu_id"));
            params.put("menu_name",this.getParameterString("menu_name"));
            params.put("menu_url",this.getParameterString("menu_url"));
            roleInfoManagerService.updMenuSave(params);
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
    @RequestMapping(value = "/check_menu_url", method = RequestMethod.POST)
    @ResponseBody
    public JsonData checkMenuUrl()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("menu_parent",this.getParameterString("menu_parent"));
            boolean  isFlag = roleInfoManagerService.checkPssMenu(params);
            jsonData.setAppend(isFlag);
            jsonData.setResult(SUCCESS);
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("校验方法出错");
            e.printStackTrace();
        }
        return jsonData;
    }
}
