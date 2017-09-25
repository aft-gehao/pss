$(function () {
    $("#add_whsemanager_sumbit").click(function () {
        add_whsemanager_sumbit();
    })
    $("#back_whsemanager").click(function () {
        $.alle_dialog_close();
    })
})
function add_whsemanager_sumbit()
{
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
        url: "/dicwarehouse/manager/add_whsemanager",
        data: {
            space_name: space_name,
            desc:desc
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