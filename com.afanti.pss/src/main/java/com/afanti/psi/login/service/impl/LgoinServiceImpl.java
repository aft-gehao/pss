package com.afanti.psi.login.service.impl;

import com.afanti.psi.login.dao.LoginDao;
import com.afanti.psi.login.service.LoginService;
import com.afanti.psi.login.vo.MenuInfo;
import com.afanti.psi.login.vo.UserRoleInfo;
import com.afanti.psi.usermanager.dao.UserManagerDao;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.SessionData;
import com.sun.xml.internal.ws.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/12 0012.
 */
@Service
public class LgoinServiceImpl implements LoginService {
    @Autowired
    private LoginDao loginDao;

    @Autowired
    private UserManagerDao userManagerDao;

    /**
     * 加载当前用户菜单信息
     *
     * @param params
     * @return
     */
    public Map<String, Object> loadMenu(Map<String, Object> params) {
        //产品管理菜单
        Map<String, Object> resultMap = new HashMap<String, Object>();
        params.put("parent_id", "20");
        List<MenuInfo> productMenu = loginDao.loadMenu(params);
        params.put("parent_id", "21");
        List<MenuInfo> infoMenu = loginDao.loadMenu(params);
        resultMap.put("productMenu", productMenu);
        resultMap.put("infoMenu", infoMenu);
        //基本信息菜单
        return resultMap;
    }

    public List<MenuInfo> loadMenus(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        params.put("parent_id", "25");
        List<MenuInfo> rootMenu = loginDao.loadMenu(params);
        // 最后的结果
        List<MenuInfo> menuList = new ArrayList<MenuInfo>();
        // 先找到所有的一级菜单
        for (int i = 0; i < rootMenu.size(); i++) {
            // 一级菜单没有parentId
            if (rootMenu.get(i).getMenu_parent() == 25) {
                menuList.add(rootMenu.get(i));
            }
        }
        // 为一级菜单设置子菜单，getChild是递归调用的
        for (MenuInfo menu : menuList) {
            menu.setChildMenus(getChild(menu.getMenu_id(), rootMenu));
        }
        return menuList;
    }

    /**
     * 递归查找子菜单
     *
     * @param id       当前菜单id
     * @param rootMenu 要查找的列表
     * @return
     */
    private List<MenuInfo> getChild(int id, List<MenuInfo> rootMenu) {
        // 子菜单
        List<MenuInfo> childList = new ArrayList<MenuInfo>();
        for (MenuInfo menu : rootMenu) {
            // 遍历所有节点，将父菜单id与传过来的id比较
            if (menu.getMenu_parent() == id) {
                childList.add(menu);
            }
        }
        // 把子菜单的子菜单再循环一遍
        for (MenuInfo menu : childList) {// 没有url子菜单还有子菜单
            // 递归
            List<MenuInfo> menus = getChild(menu.getMenu_id(), rootMenu);
            menu.setChildMenus(menus);
        } // 递归退出条件
        if (childList.size() == 0) {
            return null;
        }
        return childList;
    }

    /**
     * 用户登陆
     *
     * @param params
     * @param sessionData
     * @return
     */
    public boolean loginSumbit(Map<String, Object> params, SessionData sessionData) {
        Staff_info staffInfo = userManagerDao.getStaffInfo(params);
        if (staffInfo != null) {
            if (sessionData == null) {
                sessionData = new SessionData();
            }
            //存放用户基本信息
            sessionData.setStaffInfo(staffInfo);
            //存放用户权限
            List<String> permissions = loginDao.getPermissions(staffInfo.getStaff_id());
            sessionData.setPermissions(permissions);
            //存放菜单信息
            params.put("user_id", staffInfo.getStaff_id());
            List<MenuInfo> menuInfoList = loadMenus(params);
            StringBuffer stringBuffer = new StringBuffer();
            for (MenuInfo menuInfo : menuInfoList) {
                int homePage = 0;
                List<MenuInfo> homeM1 = menuInfo.getChildMenus();
                if (homeM1 != null) {
                    if (homeM1.get(0) != null) {
                        List<MenuInfo> homeM2 = homeM1.get(0).getChildMenus();
                        if (homeM2 != null) {
                            homePage = homeM2.get(0).getMenu_id();
                        }
                    }
                }
                stringBuffer.append("{id:'" + menuInfo.getMenu_id() + "', homePage:'" + homePage + "',menu:[");
                if (menuInfo.getChildMenus() != null) {
                    for (MenuInfo menuInfo2 : menuInfo.getChildMenus()) {
                        stringBuffer.append("{text:'<span class=\"iconfont\">" +menuInfo2.getMenu_icon()+"</span>"+ menuInfo2.getMenu_name() + "',items:[");
                        for (MenuInfo menuInfo3 : menuInfo2.getChildMenus()) {
                            stringBuffer.append("{id:'" + menuInfo3.getMenu_id() + "',text:'" + menuInfo3.getMenu_name() + "',href:'" + menuInfo3.getMenu_url() + "'},");
                        }
                        stringBuffer.append("]},");
                    }
                }
                stringBuffer.append("]},");
            }
            sessionData.setMenuStr(stringBuffer.toString());
            sessionData.setMenuInfoList(menuInfoList);
            //存放角色信息
            List<UserRoleInfo> userRoleInfoList = getUserRoleInfoList(params);
            sessionData.setUserRoleInfoList(userRoleInfoList);
            return true;
        }
        return false;
    }


    /**
     * 查询用户角色列表
     *
     * @param params
     * @return
     */
    public List<UserRoleInfo> getUserRoleInfoList(Map<String, Object> params) {
        return loginDao.getUserRoleInfoList(params);
    }
}
