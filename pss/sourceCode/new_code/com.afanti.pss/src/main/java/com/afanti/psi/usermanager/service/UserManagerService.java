package com.afanti.psi.usermanager.service;

import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface UserManagerService {
    public Staff_info getStaffInfo(Map<String,Object> params);

    public Page<Staff_info> getUserPageList(Map<String,Object> params);

    public void addUserInfo(Map<String,Object> params);
    public void updUserInfo(Map<String,Object> params);

    public void delUser(Map<String,Object> params);

    public List<Staff_info> moblieSelect();

}
