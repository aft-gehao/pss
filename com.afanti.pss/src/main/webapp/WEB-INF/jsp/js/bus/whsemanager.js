$(function () {
    doSearch(1);
    $("#whse_query").click(function () {
        doSearch(1);
    })
    $("#whse_add").click(function () {
        $.alle_dialog('/infomanager/whsemanager/whsemanager_add.html', "新增仓库", ["400px", "60%"]);
    })
})
function doSearch(p) {
    var space_name = $("#space_name").val();
    $.ajax({
        type: 'POST',
        url: "/dicwarehouse/manager/warehouse_list_page",
        data: {
            space_name: space_name,
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
                        <td>' + append[i]["space_name"] + '</td>\
                        <td class="operation">\
                        <input   type="button"  disabled="disabled"   id="whse_info"  data="'+append[i]["space_id"]+'" class="btn btn-link btn-xs" value="仓位描述"/>\
                         <input   type="button" disabled="disabled"   id="whse_mod"  data="'+append[i]["space_id"]+'" class="btn btn-link btn-xs" value="修改"/>\
                         <input  type="button" disabled="disabled"   id="whse_del"  data="'+append[i]["space_id"]+'" class="btn btn-link btn-xs" value="删除"/>\
                         <input   type="button" disabled="disabled"   id="whse_det"  data="'+append[i]["space_id"]+'" class="btn btn-link btn-xs" value="查看仓位"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                $("input[id*='whse_info']").each(function () {
                    $(this).click(function(){
                        window.location.href="javascript:load_warehouse_info("+($(this).attr("data"))+")";
                    })
                });
                $("input[id*='whse_mod']").each(function () {
                    $(this).click(function(){
                        window.location.href="javascript:to_warehouse_upd("+($(this).attr("data"))+")";
                    })
                });
                $("input[id*='whse_det']").each(function () {
                    $(this).click(function(){
                        window.location.href="javascript:to_child_warehouse("+($(this).attr("data"))+")";
                    })
                });
                $("input[id*='whse_del']").each(function () {
                    $(this).click(function(){
                        window.location.href="javascript:del_warehouse("+($(this).attr("data"))+")";
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
function load_warehouse_info(space_id) {
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
                $.alle_dialog_html("<span><br/>&nbsp;&nbsp;"+desc+"</span>","仓库详情");
            }else{
                layer.msg(data["message"]);
            }
        }
    });
}

function to_warehouse_upd(space_id)
{
    $.alle_dialog('/infomanager/whsemanager/whsemanager_upd.html?space_id='+space_id, "修改仓库", ["400px", "70%"]);
}

function del_warehouse(space_id)
{
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/dicwarehouse/manager/del_warehouse",
            data: {
                space_id: space_id
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    setTimeout(function () {
                        doSearch(1);
                    }, 1000);
                }
            }
        });
    }, function () {
        layer.close(index);
    });
}

function to_child_warehouse(space_id) {
    $.alle_dialog('/infomanager/whsemanager/to_child_warehouse.html?space_id='+space_id, "查看仓位", ["350px", "80%"]);
}
