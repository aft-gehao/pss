$(function () {
    $("#add_role_sumbit").click(function () {
        add_role();
    })
    $("#add_role_back").click(function () {
        $.alle_dialog_close();
    })
})
function add_role()
{
    var role_name =$("#role_name").val();
    if(role_name==null || "" == role_name)
    {
        tip("请输入角色名称","#role_name");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/user/manager/add_role",
        data: {
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