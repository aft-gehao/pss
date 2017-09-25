package com.afanti.psi.usermanager.service.impl;

import com.afanti.psi.usermanager.dao.UserManagerDao;
import com.afanti.psi.usermanager.service.UserManagerService;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import com.afanti.psi.utils.PassUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class UserManagerServiceImpl implements UserManagerService {
    @Autowired
    private UserManagerDao userManagerDao;

    @Override
    public Staff_info getStaffInfo(Map<String, Object> params) {
        return userManagerDao.getStaffInfo(params);
    }

    @Override
    public Page<Staff_info> getUserPageList(Map<String, Object> params) {
        Page<Staff_info> pageInfo = new Page<Staff_info>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Staff_info> staffInfoList = userManagerDao.getUserPageList(pageInfo);
        pageInfo.setResults(staffInfoList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public void addUserInfo(Map<String, Object> params) {
        //添加用户
        Staff_info staffInfo = new Staff_info();
        staffInfo.setStaff_name(String.valueOf(params.get("staff_name")));
        staffInfo.setUsername(String.valueOf(params.get("user_name")));
        staffInfo.setMobilephone(String.valueOf(params.get("mobilephone")));
        staffInfo.setEmail(String.valueOf(params.get("email")));
        staffInfo.setAddress(String.valueOf(params.get("address")));
        staffInfo.setStatus(0);
        staffInfo.setPassword(PassUtil.Jia(String.valueOf(params.get("password"))));
        userManagerDao.addUserInfo(staffInfo);
        //添加用户角色关联关系
        Map<String,Object> userRoleMap = new HashMap<String, Object>();
        String role_ids = String.valueOf(params.get("role_ids"));
        if(role_ids!=null && !"".equals(role_ids))
        {
            String[]roleids = role_ids.split(",");
            for(String roleid :roleids) {
                userRoleMap.put("role_user_staffinfoid", staffInfo.getStaff_id());
                userRoleMap.put("role_user_roleid", roleid);
                userRoleMap.put("role_user_status", "0");
                userManagerDao.addUserRole(userRoleMap);
            }
        }
    }

    @Override
    public void updUserInfo(Map<String, Object> params) {
        //如果设置新密码需要重新加密
        if(!String.valueOf(params.get("password_old")).equals(String.valueOf(params.get("password"))))
        {
            params.put("password",PassUtil.Jia(String.valueOf(params.get("password"))));
        }
        userManagerDao.updUserInfo(params);
        //删除用户关联关系表
        userManagerDao.delUserRole(params);
        //添加用户角色关联关系
        Map<String,Object> userRoleMap = new HashMap<String, Object>();
        String role_ids = String.valueOf(params.get("role_ids"));
        if(role_ids!=null && !"".equals(role_ids))
        {
            String[]roleids = role_ids.split(",");
            for(String roleid :roleids) {
                userRoleMap.put("role_user_staffinfoid", params.get("staff_id"));
                userRoleMap.put("role_user_roleid", roleid);
                userRoleMap.put("role_user_status", "0");
                userManagerDao.addUserRole(userRoleMap);
            }
        }
    }
    @Override
    public void delUser(Map<String, Object> params) {
        userManagerDao.updUserInfo(params);
    }

    @Override
    public List<Staff_info> moblieSelect() {
       List<Staff_info> list=userManagerDao.moblieSelect();
        return list;
    }
}

