package com.afanti.psi.login.vo;

import java.util.List;

/**
 * Created by Administrator on 2017/4/12 0012.
 */
public class MenuInfo {

    private int menu_id;

    private String menu_name;
    //add by gehao 菜单图标编码
    private String menu_icon;

    private int menu_status;

    private int menu_parent;

    private int menu_order;

    private String menu_url;

    private int menu_type;

    public int getMenu_id() {
        return menu_id;
    }

    public void setMenu_id(int menu_id) {
        this.menu_id = menu_id;
    }

    public String getMenu_name() {
        return menu_name;
    }

    public void setMenu_name(String menu_name) {
        this.menu_name = menu_name;
    }

    public int getMenu_status() {
        return menu_status;
    }

    public void setMenu_status(int menu_status) {
        this.menu_status = menu_status;
    }

    public int getMenu_parent() {
        return menu_parent;
    }

    public void setMenu_parent(int menu_parent) {
        this.menu_parent = menu_parent;
    }

    public int getMenu_order() {
        return menu_order;
    }

    public void setMenu_order(int menu_order) {
        this.menu_order = menu_order;
    }

    public String getMenu_url() {
        return menu_url;
    }

    public void setMenu_url(String menu_url) {
        this.menu_url = menu_url;
    }

    public int getMenu_type() {
        return menu_type;
    }

    public void setMenu_type(int menu_type) {
        this.menu_type = menu_type;
    }

    private List<MenuInfo> childMenus;

    public List<MenuInfo> getChildMenus() {
        return childMenus;
    }

    public void setChildMenus(List<MenuInfo> childMenus) {
        this.childMenus = childMenus;
    }

    public String getMenu_icon() {
        return menu_icon;
    }

    public void setMenu_icon(String menu_icon) {
        this.menu_icon = menu_icon;
    }
}
