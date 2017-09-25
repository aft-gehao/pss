var space_id = "";
$(function () {
    space_id = $.alle_getUrlParam("space_id");
    $("#add_menu_sumbit").click(function () {
        add_menu_sumbit();
    })
    $("#menu_back").click(function () {
            parent.hideRightMenu();
            $.alle_dialog_close();
    })
})
function add_menu_sumbit()
{
    var space_name = $("#space_name").val();
    var desc = $("#desc").val();
    if(space_name==null || ""==space_name)
    {
        layer.msg("请输入仓位名称");
        return false;
    }
    if(desc==null || ""==desc)
    {
        layer.msg("请输入仓位描述");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/dicwarehouse/manager/warehouse_child_add",
        data: {
            space_id:space_id,
            space_name:space_name,
            desc: desc
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

