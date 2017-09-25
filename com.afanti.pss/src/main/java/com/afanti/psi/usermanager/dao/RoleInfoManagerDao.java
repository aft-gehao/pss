package com.afanti.psi.usermanager.dao;

import com.afanti.psi.usermanager.vo.Pss_Menu;
import com.afanti.psi.usermanager.vo.Pss_Role;
import com.afanti.psi.utils.Page;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface RoleInfoManagerDao {
    public List<Pss_Role> getPssRoleList(Map<String,Object> params);
    List<Pss_Role> getPssRolePageList(Page page);
    int getPssRolePageCount(Page page);
    public void addRole(Map<String,Object> params);
    public void delRole(Map<String, Object> params);
    public void updRole(Map<String, Object> params);
    public int roleSelect(Map<String,Object> params);
    public Pss_Role getRoleInfo(Map<String,Object> params);
    public List<Pss_Menu> getMenuList(Map<String,Object> params);
    public List<Pss_Menu>  getRoleMenuids(Map<String,Object> params);
    public void delRoleMenusByRoleId(Map<String,Object> params);
    public void addRoleMenu(Map<String,Object> params);
    public Pss_Menu checkPssMenu(Map<String,Object> params);
    public void addMenuInfo(Pss_Menu pssMenu);
    public String getMenuByParent(Map<String,Object> params);
    public void delMenu(Map<String,Object> params);
    public Pss_Menu getMenuInfo(Map<String, Object> params);
    public void updMenuSave(Map<String, Object> params);
}
