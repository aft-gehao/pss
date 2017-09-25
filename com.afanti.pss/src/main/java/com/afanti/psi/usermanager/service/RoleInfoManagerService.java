package com.afanti.psi.usermanager.service;

import com.afanti.psi.usermanager.vo.Pss_Menu;
import com.afanti.psi.usermanager.vo.Pss_Role;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface RoleInfoManagerService {
    public List<Pss_Role> getPssRoleList(Map<String,Object> params);
    public Page<Pss_Role> getPssRolePageList(Map<String,Object> params);
    public void addRole(Map<String,Object> params);
    public void delRole(Map<String,Object> params);
    public int roleSelect(Map<String,Object> params);
    public void updRole(Map<String,Object> params);
    public Pss_Role getRoleInfo(Map<String,Object> params);
    public String loadRoleMenu(Map<String,Object> params);
    public void updRoleMenu(Map<String,Object> params);
    public void addMenu(Map<String,Object> params);
    public void delMenu(Map<String,Object> params);
    public boolean checkPssMenu(Map<String,Object> params);
    public Pss_Menu getMenuInfo(Map<String,Object> params);
    public void updMenuSave(Map<String,Object> params);
}
