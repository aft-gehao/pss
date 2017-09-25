$(function () {

    doSearch(1);
    $("#con_query").click(function(){
        doSearch(1);
    })
        $("#con_add").click(function () {
            window.location.href = "/promanager/consumableRepair/add_use_yanfa.html";
        })

})
function doSearch(p) {

        var consumable_name = $("#consumable_name").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumableRepairPage",
        data: {
            consumable_name: consumable_name,
            p: p
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                var value = "";
                if (data["append"]== null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                for (var i = 0; i < append.length; i++) {
                    var html = "";
                    var html2 = "";
                    if (append[i]["status"] == 14001) {
                        html2 += '<span class="label label-success">未鉴定</span>';
                    } else if (append[i]["status"] == 14002) {
                        html2 += '<span class="label label-info" style="background-color: grey">鉴定报废</span>';
                    } else if (append[i]["status"] == 14003) {
                        html2 += '<span class="label label-danger">返修在途</span>';
                    }
                    else if (append[i]["status"] == 5001) {
                        html2 += '<span class="label label-danger" style="background-color: #5cb85c">已入库</span>';
                    }
                    else if (append[i]["status"] == 5002) {
                        html2 += '<span class="label label-danger">未入库</span>';
                    } else if (append[i]["status"] == 5003) {
                        html2 += '<span class="label label-danger" style="background-color: #5cb85c">部分入库</span>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if(append[i]["status"] == 14001)
                      {
                 value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_amount"]) + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["repair_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                       <td>' + $.alle_null2Str(append[i]["repair_desc"]) + '</td>\
                        <td class="operation">\
                        <input disabled="disabled" type="button" data="' + append[i]["repair_id"] + '"  id="con_rep_mod" class="btn btn-link btn-xs" value="修改"/>\
                        <input   disabled="disabled" type="button" data="' + append[i]["repair_id"] + '" id="con_rep_del" class="btn btn-link btn-xs" value="删除"/>\
                        <input  disabled="disabled" type="button" data="' + append[i]["repair_id"] + '" id="con_rep_det" class="btn btn-link btn-xs" value="详情"/>\
                        <a  id="a_delete_' + append[i]["repair_id"] + '"  href="#confirm-delete"   data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                  }
                    else{
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_amount"]) + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["repair_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                       <td>' + $.alle_null2Str(append[i]["repair_desc"]) + '</td>\
                        <td class="operation">\
                        <input  disabled="disabled" type="button" data="' + append[i]["repair_id"] + '" id="con_rep_det" class="btn btn-link btn-xs" value="详情"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                $("input[id*='con_rep_det']").each(function () {
                    $(this).click(function(){
                        $.alle_dialog('/promanager/consumableRepair/detail_use.html?repair_id='+$(this).attr("data"),'申请单详情', ["50%", "50%"])
                    })
                });
                $("input[id*='con_rep_mod']").each(function () {
                    $(this).click(function(){
                        $.alle_dialog('/promanager/consumableRepair/modify_use.html?repair_id='+$(this).attr("data"),'申请单修改', ["50%", "50%"])
                    })
                });
                $("input[id*='con_pro']").each(function () {
                    $(this).click(function(){
                        window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+$(this).attr("data");
                    })
                });
                $("input[id*='con_rep_del']").each(function () {
                    $(this).click(function(){
                        $("#del").val($(this).attr("data"));
                        $("#a_delete_"+$(this).attr("data")).click();
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

$("#shanchusubmit").click(function(){
       var repair_id=$("#del").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/repairDel",
        data: {
            repair_id: repair_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/promanager/consumableRepair/index.html";
                }, 1000);
            }
        }
    })
})

