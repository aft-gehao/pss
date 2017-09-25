package com.afanti.psi.login.service;

import com.afanti.psi.login.vo.MenuInfo;
import com.afanti.psi.utils.SessionData;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/12 0012.
 */
public interface LoginService {
   Map<String,Object> loadMenu(Map<String,Object> params);
   List<MenuInfo> loadMenus(Map<String,Object> params);
   boolean loginSumbit(Map<String,Object> params, SessionData sessionData);
}
