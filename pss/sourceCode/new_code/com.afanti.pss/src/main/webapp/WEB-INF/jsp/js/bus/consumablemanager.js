/**
 * Created by 11714 on 2017/7/10.
 */
/**耗材管理*/

$(function(){

    doSearch(1);

    /*添加方法*/
    $("#con_add").click(function(){
        con_add();
    })

    /*修改*/
    $("#con_upd").click(function(){
        consumable_update();

    })

    /*查询*/
    $("#pro_query").click(function () {
        doSearch(1);
    })
})


//查询列表
function doSearch(p){
    var consumable_name=$("#consumable_name").val();//获取耗材名
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumableInfoPage",
        data: {
            consumable_name: consumable_name,
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
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                       <td>' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                       <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["create_time"]) + '</td>\
                          <td>' + append[i]["staff_name"] + '</td>\
                         <td class="operation">\
                         <input   type="button" disabled="disabled" data-toggle="modal" data-target="#myModal-3" onclick="consumable_upd('+append[i]["consumable_id"]+')"  id="pro_mod" class="btn btn-link btn-xs" value="修改"/>\
                         <input  type="button" disabled="disabled" onclick="consumable_del('+append[i]["consumable_id"]+')"   id="pro_del"   data="'+append[i]["product_id"]+'" class="btn btn-link btn-xs" value="删除"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

//添加耗材
function con_add(){
    var consumable_name =$("#consumablename").val();
    var pack =$("#pack").val();
    var consumable_unit =$("#consumable_unit").val();
    var warning_amount =$("#warning_amount").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumableAdd",
        data: {
            warning_amount:warning_amount,
            consumable_name: consumable_name,
            pack:pack,
            consumable_unit:consumable_unit
        },
        dataType: "json",
        success: function (data) {
            layer.msg("添加成功");
            if (data["result"] == "success") {
                $("#consumablename").val("");
                $("#pack").val("");
                $("#consumable_unit").val("");
                doSearch(1);

            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

//删除方法
function consumable_del(consumable_id) {
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/consumable/manager/consumable_del",
            data: {
                consumable_id: consumable_id
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

/*修改耗材方法_回显*/
function consumable_upd(consumable_id) {
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumable_upd",
        data: {
            consumable_id: consumable_id

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
                $("#updconsumablename").val(append[0]["consumable_name"]);
                $("#updconsumable_unit").val(append[0]["consumable_unit"]);
                $("#updpack").val(append[0]["pack"]);
                $("#updconsumable_id").val(append[0]["consumable_id"]);
                $("#warning_amount_mod").val(append[0]["warning_amount"]);
                if($("#warning_amount_mod").val()==0)
                {
                    $("#warning_amount_mod").val("");
                }
            }else {
                layer.msg(data["message"]);
            }
        }
    });
}

/*修改耗材方法_改*/
function consumable_update() {
    var consumable_id =$("#updconsumable_id").val();
    var warning_amount =$("#warning_amount_mod").val();
    var consumable_name =$("#updconsumablename").val();
    var pack =$("#updpack").val();
    var consumable_unit =$("#updconsumable_unit").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumableUpdate",
        data: {
            consumable_id: consumable_id,
            consumable_name: consumable_name,
            warning_amount:warning_amount,
            pack:pack,
            consumable_unit:consumable_unit
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    doSearch(1);
                }, 1000);
            }else {
                layer.msg(data["message"]);
            }
        }
    });
}