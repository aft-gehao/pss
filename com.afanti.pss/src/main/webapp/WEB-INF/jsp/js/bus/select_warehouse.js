var i ="";
var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
    }
};
$(function () {
    load_warehouse();
    $("#back").click(function () {
        $.alle_dialog_close();
    })
    $("#selectSpace").click(function () {
        selectSpace();
    })
    i =$.alle_getUrlParam("i");
})
function load_warehouse()
{
    $.ajax({
        type: 'POST',
        url: "/inventory/productIn/load_warehouse",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#rMenu").hide();
                var zNodes ="["+data["append"]+"]";
                $.fn.zTree.init($("#roleTree"), setting, eval(zNodes));
            }
        }
    });
}

function selectSpace()
{
    var treeObj = $.fn.zTree.getZTreeObj("roleTree");
    var nodes = treeObj.getSelectedNodes();

    if(nodes==null || ""==nodes)
    {
        layer.msg("请选择节点进行操作");
        return false;
    }
    if(nodes[0].isParent)
    {
        layer.msg("请选择具体仓位")
        return false;
    }
    $('#space_id_'+i, window.parent.document).val(nodes[0].id);
   
    $('#space_name_'+i,window.parent.document).val(nodes[0].name);
    $.alle_dialog_close();
}