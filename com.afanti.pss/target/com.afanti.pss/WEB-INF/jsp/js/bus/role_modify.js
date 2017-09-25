$(function () {
    load_role_info();
    $("#upd_role_sumbit").click(function () {
        upd_role();
    })
    $("#upd_role_back").click(function () {
        $.alle_dialog_close();
    })
})

function load_role_info()
{
    var role_id = $.alle_getUrlParam("role_id");
    $.ajax({
        type: 'POST',
        url: "/user/manager/load_role_info",
        data: {
            "role_id": role_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#role_name").val(data["append"]["role_name"])
                $("#role_id").val(data["append"]["role_id"]);
            }else {
                layer.msg(data["message"]);
            }
        }
    });
}
function upd_role()
{
    var role_name =$("#role_name").val();
    var role_id =$("#role_id").val();
    if(role_name==null || "" == role_name)
    {
        tip("请输入角色名称","#role_name");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/user/manager/upd_role",
        data: {
            "role_id":role_id,
            "role_name": role_name
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    parent.doSearch(1);
                    $.alle_dialog_close();
                }, 1000);
            }
        }
    });
}