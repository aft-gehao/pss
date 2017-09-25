var space_id = "";
$(function () {
    space_id = $.alle_getUrlParam("space_id");
    $("#upd_menu_sumbit").click(function () {
        upd_whsemanager_sumbit();
    })
    $("#menu_back").click(function () {
            parent.hideRightMenu();
            $.alle_dialog_close();
    })
    load_warehouse_info();
})


function upd_whsemanager_sumbit() {
    var space_name =$("#space_name").val();
    var desc =$("#desc").val();
    if(space_name == null || ""==space_name)
    {
        tip_msg("请输入仓位名称。","#space_name");
        return false;
    }
    if(desc == null || ""==desc)
    {
        tip_msg("请输入仓位描述。","#desc");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/dicwarehouse/manager/upd_whsemanager",
        data: {
            space_id:space_id,
            space_name: space_name,
            desc:desc
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    parent.load_child_warehouse();
                    $.alle_dialog_close();
                }, 1000);
            }
        }
    });
}
function load_warehouse_info()
{
    $.ajax({
        type: 'POST',
        url: "/dicwarehouse/manager/load_warehouse_info",
        data: {
            space_id: space_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#space_name").val(data["append"]["space_name"]);
                $("#desc").val(data["append"]["desc"]);
            }else{
                layer.msg(data["message"]);
            }
        }
    });
}
