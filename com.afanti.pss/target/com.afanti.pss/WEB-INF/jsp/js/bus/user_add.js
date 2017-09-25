$(function () {
    load_juese();
    $("#submit").click(function () {
        add_user();
    })
    $("#cancel").click(function () {
        window.location.href="/infomanager/usermanager/index.html";
    })
})
function load_juese()
{
    $.ajax({
        type: 'POST',
        url: "/user/manager/load_juese",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var html='<span class="col-sm-4 text-right form-control-static">选择角色<span class="text-danger" id="msg"></span>：</span>';
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                     html+='<span class="form-control-static" style="margin-right: 8px;"><label><input name="jueses" value="'+append[i]["role_id"]+'" type="checkbox"><i>✓</i>'+append[i]["role_name"]+'</label></span>';
                }
                $("#jueses_div").html(html)
            }else{
                layer.msg(data["message"]);
            }
        }
    });
}

function get_select_roles()
{
    var chk_value = [];
    $('input[name="jueses"]:checked').each(function () {
        chk_value.push($(this).val());
    });
    return chk_value;
}
function add_user()
{
    var role_id =get_select_roles();
    var staff_name =$("#staff_name").val();
    var user_name =$("#user_name").val();
    var mobilephone =$("#mobilephone").val();
    var next_password = $("#next_password").val();
    var email =$("#email").val();
    var address =$("#address").val();
    var password=$("#password").val();
    if(role_id==null || role_id.length == 0)
    {
        tip_msg("请选择角色。","#msg");
        return false;
    }
    if(staff_name == null || ""==staff_name)
    {
        tip_msg("请输入员工姓名。","#staff_name");
        return false;
    }
    if(mobilephone == null || ""==mobilephone)
    {
        tip_msg("请输入电话号码。","#mobilephone");
        return false;
    }else{
        if(!pat_phone.test(mobilephone))
        {
            tip_msg("手机格式输入错误。","#mobilephone");
            return false;
        }
    }
    if(email == null || ""==email)
    {
        tip_msg("请输入邮箱。","#email");
        return false;
    }else{
        if(!pat_email.test(email))
        {
            tip_msg("邮箱格式错误。","#email");
            return false;
        }
    }
    if(address == null || ""==address)
    {
        tip_msg("请输入家庭地址。","#address");
        return false;
    }
    if(user_name == null || ""==user_name)
    {
        tip_msg("请输入用户名。","#user_name");
        return false;
    }
    if(password == null || ""==password)
    {
        tip_msg("请输入密码。","#password");
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
    $.ajax({
        type: 'POST',
        url: "/user/manager/add_user_info",
        data: {
            role_ids: role_id.join(","),
            staff_name:staff_name,
            user_name:user_name,
            mobilephone:mobilephone,
            email:email,
            address:address,
            password:password
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href="/infomanager/usermanager/index.html";
                }, 1000);
            }
        }
    });
}