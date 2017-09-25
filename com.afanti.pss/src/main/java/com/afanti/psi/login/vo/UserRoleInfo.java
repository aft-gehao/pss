package com.afanti.psi.login.vo;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public class UserRoleInfo {
    private int role_id;
    private String role_name;
    private int role_status;
    private int role_user_staffinfoid;
    public int getRole_id() {
        return role_id;
    }

    public void setRole_id(int role_id) {
        this.role_id = role_id;
    }

    public String getRole_name() {
        return role_name;
    }

    public void setRole_name(String role_name) {
        this.role_name = role_name;
    }

    public int getRole_status() {
        return role_status;
    }

    public void setRole_status(int role_status) {
        this.role_status = role_status;
    }

    public int getRole_user_staffinfoid() {
        return role_user_staffinfoid;
    }

    public void setRole_user_staffinfoid(int role_user_staffinfoid) {
        this.role_user_staffinfoid = role_user_staffinfoid;
    }
}
