package com.afanti.psi.utils;
import com.afanti.psi.login.vo.MenuInfo;
import com.afanti.psi.login.vo.UserRoleInfo;
import com.afanti.psi.usermanager.vo.Staff_info;

import java.util.List;
import java.util.Map;

public class SessionData {

    /**
     * 用户信息
     */
    private Staff_info staffInfo;
    /**
     * 权限
     */
    private List<String> permissions;

    /**
     * 菜单信息
     */
    private String menuStr;

    private List<MenuInfo> menuInfoList;

    public String getMenuStr() {
        return menuStr;
    }

    public void setMenuStr(String menuStr) {
        this.menuStr = menuStr;
    }

    public List<MenuInfo> getMenuInfoList() {
        return menuInfoList;
    }

    public void setMenuInfoList(List<MenuInfo> menuInfoList) {
        this.menuInfoList = menuInfoList;
    }

    /**
     * 存放当前用户列表
     */
    private List<UserRoleInfo> userRoleInfoList;

    public Staff_info getStaffInfo() {
        return staffInfo;
    }

    public void setStaffInfo(Staff_info staffInfo) {
        this.staffInfo = staffInfo;
    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<String> permissions) {
        this.permissions = permissions;
    }

    public List<UserRoleInfo> getUserRoleInfoList() {
        return userRoleInfoList;
    }

    public void setUserRoleInfoList(List<UserRoleInfo> userRoleInfoList) {
        this.userRoleInfoList = userRoleInfoList;
    }


}
