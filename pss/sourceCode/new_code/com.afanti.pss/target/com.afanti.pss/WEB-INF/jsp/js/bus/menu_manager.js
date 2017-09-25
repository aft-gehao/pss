var role_id = "";
var setting = {
    check: {
        enable: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onRightClick: OnRightClick,
        onClick: zTreeOnClick
    }
};
$(function () {
    role_id = $.alle_getUrlParam("role_id");
    //加载菜单
    loadRoleMenu();
    $("#upd_role_menu").click(function () {
        updRole()
    })
    $("#clear_role_back").click(function () {
        window.location.href = "/infomanager/usermanager/rolemanager.html";
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
})


function updRole() {
    var treeObj = $.fn.zTree.getZTreeObj("roleTree");
    var nodes = treeObj.getNodes();
    var selectNodes = treeObj.getCheckedNodes(true);
    var menu_ids = "";
    for (var i = 0; i < selectNodes.length; i++) {
        menu_ids += selectNodes[i].id + ",";
    }
    var menuids = menu_ids.substr(0, menu_ids.lastIndexOf(","));
    $.ajax({
        type: 'POST',
        url: "/user/manager/upd_role_menu",
        data: {
            role_id: role_id,
            menu_ids: menuids
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("修改成功")
            } else {
                layer.msg(data["message"])
            }
        }
    });

}

function loadRoleMenu() {
    $.ajax({
        type: 'POST',
        url: "/user/manager/load_role_menu",
        data: {
            role_id: role_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#rMenu").hide();
                var zNodes = "[" + data["append"] + "]";
                $.fn.zTree.init($("#roleTree"), setting, eval(zNodes));
            }
        }
    });
}
// 在ztree上的右击事件
function OnRightClick(event, treeId, treeNode) {
    var treeObj = $.fn.zTree.getZTreeObj("roleTree");
    var nodes = treeObj.getSelectedNodes();
    if (nodes == null || "" == nodes) {
        layer.msg("请选择节点进行操作");
        return false;
    }
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        showRMenu("root", event.clientX, event.clientY, treeNode.id, treeNode.name, treeNode.uri, treeNode.menu_type);
    } else if (treeNode && !treeNode.noR) {
        showRMenu("node", event.clientX, event.clientY, treeNode.id, treeNode.name, treeNode.uri, treeNode.menu_type);
    }
}
//显示右键菜单
function showRMenu(type, x, y, id, title, url, menu_type) {
    $("#rMenu").show();
    $("#rMenu").css({"top": y + "px", "left": x + "px", "visibility": "visible"}); //设置右键菜单的位置、可见
    $("#rMenu").attr("menuId", id);
    $("#rMenu").attr("title", title);
    $("#rMenu").attr("url", url);
    $("#rMenu").attr("menu_type", menu_type);
}
function zTreeOnClick(event, treeId, treeNode) {
    $("#rMenu").hide();
};

function addMenu() {
    var menuId = $("#addMenu").parent("#rMenu").attr("menuId");
    var title = $("#addMenu").parent("#rMenu").attr("title");
    var url = $("#addMenu").parent("#rMenu").attr("url");
    var menu_type = $("#addMenu").parent("#rMenu").attr("menu_type");
    if (menu_type == 1) {
        layer.msg("无法添加");
    } else {
        if (url == null || "" == url) {
            $.alle_dialog("/infomanager/usermanager/menu_add.html?menu_id=" + menuId + "", title, ["300px", "50%"]);
        } else {
            $.alle_dialog("/infomanager/usermanager/menu_button_add.html?menu_id=" + menuId + "", title + "：按钮权限添加", ["300px", "50%"]);
        }
    }
}
function delMenu() {
    var menuId = $("#delMenu").parent("#rMenu").attr("menuId");
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/user/manager/del_menu",
            data: {
                role_id: role_id,
                menu_id: menuId
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    setTimeout(function () {
                        loadRoleMenu();
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
    var menuId = $("#updMenu").parent("#rMenu").attr("menuId");
    var title = $("#updMenu").parent("#rMenu").attr("title");
    var url = $("#updMenu").parent("#rMenu").attr("url");
    $.alle_dialog("/infomanager/usermanager/menu_upd.html?menu_id=" + menuId + "&url=" + url, title, ["300px", "65%"]);
}
function hideRightMenu() {
    $("#rMenu").hide();
}