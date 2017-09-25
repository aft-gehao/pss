$(function () {
    doSearch(1);
    $("#role_query").click(function () {
        doSearch(1);
    })
    $("#role_add").click(function () {
        $.alle_dialog('/infomanager/usermanager/role_add.html', "新增角色", ["300px", "65%"]);
    })
})

function load_menu_info(role_id) {
    window.location.href = '/infomanager/usermanager/role_menu_info.html?role_id='+role_id;
}
function updRole(id) {
    $.alle_dialog('/infomanager/usermanager/role_modify.html?role_id='+id, "修改角色角色", ["300px", "65%"]);
}

function delRole(id) {
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/user/manager/del_role",
            data: {
                role_id: id
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    doSearch(1);
                }
            }
        });
    }, function () {
        layer.close(index);
    });
}
function doSearch(p) {
    var role_name = $("#role_name").val();
    $.ajax({
        type: 'POST',
        url: "/user/manager/role_list",
        data: {
            role_name: role_name,
            p: p
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                for (var i = 0; i < append.length; i++) {
                    value += '\
                    <tr >\
                        <td>' + append[i]["role_id"] + '</td>\
                        <td>' + append[i]["role_name"] + '</td>\
                        <td class="operation">\
                         <input   type="button" disabled="disabled"   id="role_mod"  data="'+append[i]["role_id"]+'" class="btn btn-link btn-xs" value="修改"/>\
                         <input  type="button" disabled="disabled"   id="role_del"  data="'+append[i]["role_id"]+'" class="btn btn-link btn-xs" value="删除"/>\
                         <input   type="button" disabled="disabled"   id="role_det"  data="'+append[i]["role_id"]+'" class="btn btn-link btn-xs" value="分配菜单"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                $("input[id*='role_mod']").each(function () {
                    $(this).click(function(){
                        window.location.href="javascript:updRole("+($(this).attr("data"))+")";
                    })
                });
                $("input[id*='role_del']").each(function () {
                    $(this).click(function(){
                        window.location.href="javascript:delRole("+($(this).attr("data"))+")";
                    })
                });
                $("input[id*='role_det']").each(function () {
                    $(this).click(function(){
                        window.location.href="javascript:load_menu_info("+($(this).attr("data"))+")";
                    })
                });
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

