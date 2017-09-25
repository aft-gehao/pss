package com.afanti.psi.usermanager.dao;

import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface UserManagerDao {
    public Staff_info getStaffInfo(Map<String,Object> params);
    public List<Staff_info> getUserPageList(Page page);
    public int getUserPageCount(Page page);
    public void addUserInfo(Staff_info staffInfo);
    public void updUserInfo(Map<String,Object> params);
    public List<Staff_info> moblieSelect();
    public void addUserRole(Map<String,Object> params);
    public void delUserRole(Map<String,Object> params);
}
