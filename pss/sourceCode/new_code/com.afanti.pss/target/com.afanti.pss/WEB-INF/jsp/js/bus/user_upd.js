var staff_id = "";
$(function () {
    staff_id = $.alle_getUrlParam("staff_id");
    load_juese();
    $("#submit").click(function () {
        upd_user();
    })
    $("#cancel").click(function () {
        window.location.href = "/infomanager/usermanager/index.html";
    })
})
function load_juese() {
    $.ajax({
        type: 'POST',
        url: "/user/manager/load_juese",
        dataType: "json",
        sysnc: true,
        success: function (data) {
            if (data["result"] == "success") {
                var html = '<span id="juese_msg" class="col-sm-4 text-right form-control-static">选择角色<span class="text-danger" id="msg">(*必填)</span>：</span>';
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    html += '<span  class="form-control-static" style="margin-right: 8px;"><label><input name="jueses" value="' + append[i]["role_id"] + '" type="checkbox"><i>✓</i>' + append[i]["role_name"] + '</label></span>';
                }
                $("#jueses_div").html(html)
                load_user_info();
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}
function load_user_info() {
    $.ajax({
        type: 'POST',
        url: "/user/manager/load_user_info",
        data: {
            staff_id: staff_id
        },
        sysnc: true,
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#staff_id").val(data["append"]["staff_id"]);
                $("#staff_name").val(data["append"]["staff_name"]);
                $("#user_name").val(data["append"]["username"]);
                $("#password").val(data["append"]["password"]);
                $("#password_old").val(data["append"]["password"]);
                $("#mobilephone").val(data["append"]["mobilephone"]);
                $("#email").val(data["append"]["email"]);
                $("#address").val(data["append"]["address"]);
                $("#next_password").val(data["append"]["password"]);
                var role_name = data["append"]["role_id"];
                var jueses = document.getElementsByName("jueses");
                var roles = role_name.split(",");
                for (var i = 0; i < jueses.length; i++) {
                    for (var j = 0; j < roles.length; j++) {
                        if (jueses[i].value == roles[j]) {
                            jueses[i].checked = true;
                            break;
                        }
                    }
                }
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}
function get_select_roles() {
    var chk_value = [];
    $('input[name="jueses"]:checked').each(function () {
        chk_value.push($(this).val());
    });
    return chk_value;
}
function upd_user() {
    var role_id = get_select_roles();
    var staff_name = $("#staff_name").val();
    var user_name = $("#user_name").val();
    var mobilephone = $("#mobilephone").val();
    var email = $("#email").val();
    var address = $("#address").val();
    var password = $("#password").val();
    var password_old = $("#password_old").val();
    var next_password = $("#next_password").val();
    if (role_id == null || role_id.length == 0) {
        tip_msg("请选择角色。", "#juese_msg");
        return false;
    }
    if (staff_name == null || "" == staff_name) {
        tip_msg("请输入员工姓名。", "#staff_name");
        return false;
    }
    if (user_name == null || "" == user_name) {
        tip_msg("请输入用户名。", "#username");
        return false;
    }
    if (password == null || "" == password) {
        tip_msg("请输入密码。", "#password");
        return false;
    }
    if(next_password == null || ""==next_password)
    {
        tip_msg("请输入确认密码。","#next_password");
        return false;
    }else{
        if(password != next_password)
        {
            tip_msg("两次面输入不一致，请重新输入。","#next_password");
            return false;
        }
    }

    if (mobilephone == null || "" == mobilephone) {
        tip_msg("请输入电话号码。", "#mobilephone");
        return false;
    } else {
        if (!pat_phone.test(mobilephone)) {
            tip_msg("手机格式输入错误。", "#mobilephone");
            return false;
        }
    }
    if (email == null || "" == email) {
        tip_msg("请输入邮箱。", "#email");
        return false;
    } else {
        if (!pat_email.test(email)) {
            tip_msg("邮箱格式错误。", "#email");
            return false;
        }
    }
    if (address == null || "" == address) {
        tip_msg("请输入家庭地址。", "#address");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/user/manager/upd_user_info",
        data: {
            role_ids: role_id.join(","),
            staff_name: staff_name,
            username: user_name,
            mobilephone: mobilephone,
            email: email,
            address: address,
            password: password,
            password_old: password_old,
            staff_id: staff_id
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href = "/infomanager/usermanager/index.html";
                }, 1000);
            }
        }
    });
}