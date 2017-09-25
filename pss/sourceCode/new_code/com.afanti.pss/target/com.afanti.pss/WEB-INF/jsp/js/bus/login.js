var load_index_util, open_load = true;
var verifyCode
$(function () {
    $("#loginSumbit").click(function () {
        login_sumbit();
    })
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            login_sumbit();
        }
    })
     verifyCode = new GVerify("v_container");
})
function login_sumbit() {
    var username = $("#username").val();
    var password = $("#password").val();
    var code = $("#code").val();
    if (username == null || username == "") {
        layer.msg("请输入用户名");
        return false;
    }
    if (password == null || password == "") {
        layer.msg("请输入密码");
        return false;
    }
    // var code_input = $("#code_input").val();
    // if(code_input == null || code_input=="")
    // {
    //     layer.msg("请输入验证码");
    //     return false;
    // }else{
    //     var res = verifyCode.validate(code_input);
    //     if(!res)
    //     {
    //         layer.msg("验证码输入错误");
    //         return false
    //     }
    // }
    $.ajax({
        type: 'POST',
        url: "/passport/login_submit",
        data: {
            "username": username,
            "password": password
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href = data['target'];
                }, 500);
            }
        },
        beforeSend: function (XHR) {
                $.alle_loading_start();
        },
        complete: function (XHR, TS) {
                $.alle_loading_finish();
        }
    });
}

/**
 * 开始加载层
 */
$.alle_loading_start = function () {
    load_index_util = layer.load(2,{shade: 0.1});
}
/**
 * 结束加载层
 */
$.alle_loading_finish = function () {
    layer.close(load_index_util);
}