var space_id = "";
var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onRightClick : OnRightClick,
        onClick: zTreeOnClick
    }
};
$(function () {
    space_id = $.alle_getUrlParam("space_id");
    //加载菜单
    load_child_warehouse();
    $("#back").click(function () {
        parent.doSearch(1);
        $.alle_dialog_close();
    })
    $("#addMenu").click(function () {
        addMenu();
    })
    $("#delMenu").click(function () {
        delMenu();
    })
    $("#updMenu").click(function () {
        updMenu();
    })
    $("#view").click(function () {
        show_detail()
    })
})


function load_child_warehouse()
{
    $.ajax({
        type: 'POST',
        url: "/dicwarehouse/manager/load_child_warehouse",
        data: {
            space_id: space_id
        },
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
// 在ztree上的右击事件
function OnRightClick(event, treeId, treeNode) {
    var treeObj = $.fn.zTree.getZTreeObj("roleTree");
    var nodes = treeObj.getSelectedNodes();
    if(nodes==null || ""==nodes)
    {
        layer.msg("请选择节点进行操作");
        return false;
    }
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        showRMenu("root", event.clientX, event.clientY,treeNode.id,treeNode.name);
    } else if (treeNode && !treeNode.noR) {
        showRMenu("node", event.clientX, event.clientY,treeNode.id,treeNode.name);
    }
}
//显示右键菜单
function showRMenu(type, x, y,id,title) {
    $("#rMenu").show();
    $("#rMenu").css({"top":y+"px", "left":x+"px", "visibility":"visible"}); //设置右键菜单的位置、可见
    $("#rMenu").attr("menuId",id);
    $("#rMenu").attr("title",title);
}
function zTreeOnClick(event, treeId, treeNode) {
    $("#rMenu").hide();
};

function addMenu()
{
    var space_id=$("#addMenu").parent("#rMenu").attr("menuId");
    var title=$("#addMenu").parent("#rMenu").attr("title");
    $.alle_dialog("/infomanager/whsemanager/warehouse_child_add.html?space_id="+space_id, title, ["300px", "90%"]);
}
function delMenu()
{
    var space_id=$("#delMenu").parent("#rMenu").attr("menuId");
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/dicwarehouse/manager/del_child_warehouse",
            data: {
                space_id: space_id
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    setTimeout(function () {
                        load_child_warehouse();
                        $("#rMenu").hide();
                    }, 1000);
                }
            }
        });
    }, function () {
        layer.close(index);
    });
}

function updMenu() {
    var space_id=$("#updMenu").parent("#rMenu").attr("menuId");
    var title=$("#updMenu").parent("#rMenu").attr("title");
        $.alle_dialog("/infomanager/whsemanager/warehouse_child_upd.html?space_id="+space_id, title, ["300px", "90%"]);
}
function hideRightMenu()
{
    $("#rMenu").hide();
}

function show_detail() {
    var space_id=$("#updMenu").parent("#rMenu").attr("menuId");
    var title=$("#updMenu").parent("#rMenu").attr("title");
    $.ajax({
        type: 'POST',
        url: "/dicwarehouse/manager/load_warehouse_info",
        data: {
            space_id: space_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var desc = data["append"]["desc"];
                $.alle_dialog_html("<span><br/>&nbsp;&nbsp;"+desc+"</span>",title+":详情");
            }else{
                layer.msg(data["message"]);
            }
        }
    });
}