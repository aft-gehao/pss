package com.afanti.psi.usermanager.service.impl;

import com.afanti.psi.test.vo.TestVo;
import com.afanti.psi.usermanager.dao.RoleInfoManagerDao;
import com.afanti.psi.usermanager.service.RoleInfoManagerService;
import com.afanti.psi.usermanager.vo.Pss_Menu;
import com.afanti.psi.usermanager.vo.Pss_Role;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class RoleInfoManagerServiceImpl implements RoleInfoManagerService {
    @Autowired
    private RoleInfoManagerDao roleInfoManagerDao;

    @Override
    public List<Pss_Role> getPssRoleList(Map<String, Object> params) {
        return roleInfoManagerDao.getPssRoleList(params);
    }

    @Override
    public Page<Pss_Role> getPssRolePageList(Map<String, Object> params) {
        Page<Pss_Role> pageInfo = new Page<Pss_Role>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Pss_Role> pssRoleList = roleInfoManagerDao.getPssRolePageList(pageInfo);
        pageInfo.setResults(pssRoleList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public void addRole(Map<String, Object> params) {
        roleInfoManagerDao.addRole(params);
    }

    @Override
    public void delRole(Map<String, Object> params) {
        roleInfoManagerDao.delRole(params);
    }

    @Override
    public void updRole(Map<String, Object> params) {
        roleInfoManagerDao.updRole(params);
    }
    @Override
    public int roleSelect(Map<String, Object> params) {
        int flag=roleInfoManagerDao.roleSelect(params);
        return flag;
    }

    @Override
    public Pss_Role getRoleInfo(Map<String, Object> params) {
        return roleInfoManagerDao.getRoleInfo(params);
    }

    @Override
    public String loadRoleMenu(Map<String, Object> params) {
        StringBuffer stringBuffer = new StringBuffer();
        List<Pss_Menu> pssMenuList = roleInfoManagerDao.getMenuList(params);
        List<Pss_Menu> selectMenu = roleInfoManagerDao.getRoleMenuids(params);
        for (Pss_Menu pssMenu : pssMenuList) {
            stringBuffer.append("{ id:" + pssMenu.getMenu_id() + ", pId:" + pssMenu.getMenu_parent() + ",menu_type:" + pssMenu.getMenu_type() + ",open:true,name:\"" + pssMenu.getMenu_name() + "\",uri:\"" + pssMenu.getMenu_url() + "\"");
            for (Pss_Menu selectMenuInfo : selectMenu) {
                if (pssMenu.getMenu_id() == selectMenuInfo.getMenu_id()) {
                    stringBuffer.append(",checked:true,open:true");
                }
            }
            stringBuffer.append(" },");
        }
        return stringBuffer.toString();
    }

    @Override
    public void updRoleMenu(Map<String, Object> params) {
        //删除当前角色所有菜单
        params.put("type", 1);
        roleInfoManagerDao.delRoleMenusByRoleId(params);
        //插入新分配的菜单
        String menud_ids = String.valueOf(params.get("menu_ids"));
        if (menud_ids != null && !"".equals(menud_ids) && menud_ids.indexOf(",") != -1) {
            String[] menu_idsp = menud_ids.split(",");
            Map<String, Object> updParams = new HashMap<String, Object>();
            for (String menudId : menu_idsp) {
                updParams.put("role_menu_menuid", menudId);
                updParams.put("role_menu_roleid", String.valueOf(params.get("role_id")));
                updParams.put("role_menu_status", "0");
                roleInfoManagerDao.addRoleMenu(updParams);
            }
        }
    }

    @Override
    public void addMenu(Map<String, Object> params) {
        String role_id = String.valueOf(params.get("role_id"));
        String menu_type = String.valueOf(params.get("menu_type"));
        String menu_parent = String.valueOf(params.get("menu_parent"));
        String menu_name = String.valueOf(params.get("menu_name"));
        String menu_url = String.valueOf(params.get("menu_url"));
        //新增菜单
        Pss_Menu pssMenu = new Pss_Menu();
        pssMenu.setMenu_name(menu_name);
        pssMenu.setMenu_parent(Integer.valueOf(menu_parent));
        pssMenu.setMenu_status(0);
        pssMenu.setMenu_order(100);
        pssMenu.setMenu_url(menu_url);
        if (menu_type != null && !"".equals(menu_type) && !"null".equals(menu_type)) {
            pssMenu.setMenu_type(1);
        } else {
            pssMenu.setMenu_type(0);
        }
        roleInfoManagerDao.addMenuInfo(pssMenu);
        //新增菜单角色关联关系
        if (role_id != null && !"".equals(role_id) && !"null".equals(role_id)) {
            params = new HashMap<String, Object>();
            params.put("role_menu_roleid", role_id);
            params.put("role_menu_menuid", pssMenu.getMenu_id());
            params.put("role_menu_status", 0);
            roleInfoManagerDao.addRoleMenu(params);
        }
    }

    @Override
    public void delMenu(Map<String, Object> params) {
        String menu_id = String.valueOf(params.get("menu_id"));
        String role_id = String.valueOf(params.get("role_id"));
        //查询当前菜单和所有子菜单
        params = new HashMap<String, Object>();
        params.put("menu_parent", menu_id);
        String menuIds = roleInfoManagerDao.getMenuByParent(params);
        //删除当前菜单和子菜单
        params = new HashMap<String, Object>();
        params.put("menu_ids", menuIds);
        roleInfoManagerDao.delMenu(params);
        params = new HashMap<String, Object>();
        params.put("menu_ids", menuIds);
        params.put("role_id", role_id);
        params.put("type", 2);
        //删除角色菜单关联关系表
        roleInfoManagerDao.delRoleMenusByRoleId(params);
    }

    @Override
    public boolean checkPssMenu(Map<String, Object> params) {
        Pss_Menu pssMenu = roleInfoManagerDao.checkPssMenu(params);
        if ((pssMenu != null && pssMenu.getMenu_url() != null && !"".equals(pssMenu.getMenu_url())) || pssMenu == null) {
            return true;
        }
        return false;
    }

    @Override
    public Pss_Menu getMenuInfo(Map<String, Object> params) {
        return roleInfoManagerDao.getMenuInfo(params);
    }

    @Override
    public void updMenuSave(Map<String, Object> params) {
        roleInfoManagerDao.updMenuSave(params);
    }

}
