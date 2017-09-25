package com.afanti.psi.login.dao;
import com.afanti.psi.login.vo.MenuInfo;
import com.afanti.psi.login.vo.UserRoleInfo;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/12 0012.
 */
public interface LoginDao {
    List<MenuInfo> loadMenu(Map<String,Object> params);
    List<UserRoleInfo> getUserRoleInfoList(Map<String,Object> params);
    public List<String> getPermissions(int staff_id);
}
