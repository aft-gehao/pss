
package com.afanti.psi.sms;

public abstract class WebConstant
{
  public static String SESSION_USER = "user";//用户实体在session中定义的常量
  public static String SESSION_MENUS = "menus";//用户菜单在session中定义的常量
  public static String REQUEST_PAGE_MENU = "page-menu";//
  public static String HEADER_ORIGIN_SYS = "aft-org-sys";
  public static String HEADER_USER_ID = "aft-user-id";
  public static String SESSION_LOGIN_ID = "login-id";
  public static String SESSION_SOURCE = "session-source";//通过广告方式从别的网站点击过来的请求
  public static String SESSION_UNIONID = "session-unionid";//微信端获取微信用户的unionid，主要用于微信号与探羊用户绑定
  public static String SESSION_CLIENT_IP = "client-ip";//客户端Ip
  
  public static String TARGET_URL = "target-url";//记录登录之前的url，用户登录成功之后返回之前的url
  public static String LOGIN_MODEL = "login-model";//登录类型
  
  
  public static final int TG=0;
  public static final int BTG=2;
}
