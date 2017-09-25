$(function () {

    doSearch(1);
    $("#check_query").click(function(){
        doSearch(1);
    })

})
function doSearch(p) {
    var consumable_name = $("#consumable_name").val();
    var status = $("#status").val();

    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumablePage",
        data: {
            p: p,
            consumable_name:consumable_name,
            status:status
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
                    if (append[i]["status"] == 5001) {
                        html2 += '<span class="label label-success" style="border-color: #5cb85c">已入库</span>';
                    } else if (append[i]["status"] == 5003) {
                        html2 += '<span class="label label-info" style="border-color: #5cb85c">部分入库</span>';
                    } else if (append[i]["status"] == 5002) {
                        html2 += '<span class="label label-danger">未入库</span>';
                    }  else if (append[i]["status"] == 11001) {
                        html2 += '<span class="label label-danger" style="border-color: #5cb85c">审核通过</span>';
                    } else if (append[i]["status"] == 11002) {
                        html2 += '<span class="label label-danger">审核不通过</span>';
                    }else if (append[i]["status"] == 11003) {
                        html2 += '<span class="label label-danger">暂不审核</span>';
                    }else if (append[i]["status"] == 11004) {
                        html2 += '<span class="label label-danger" style="border-color: blue">待审核</span>';
                    }else  if (append[i]["status"] == 8001) {
                        html2 += '<span class="label label-success" style="border-color: #5cb85c">已出库</span>';
                    } else if (append[i]["status"] == 8003) {
                        html2 += '<span class="label label-info" style="border-color: #5cb85c">部分出库</span>';
                    } else if (append[i]["status"] == 8002) {
                        html2 += '<span class="label label-danger">未出库</span>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if (append[i]["status"] == '11004'||append[i]["status"] == '11003') {
                        value += '\
                    <tr >\
                        <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"])+ '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td class="operation">\
                        <input type="hidden"id="batch_no" value="'+append[i]["use_batch_no"]+'">\
                        <input type="button" disabled="disabled"  pack="'+append[i]["pack"]+'" dataccc="'+append[i]["amount"]+'" datacc="'+append[i]["consumable_unit"]+'" datac="'+append[i]["consumable_name"]+'" data="' + append[i]["use_id"] + '" datas="11001" id="con_tg" class="btn btn-success btn-sm" value="同意"/>\
                        <input  type="button" disabled="disabled"   data="' + append[i]["use_id"] + '" datas="11002" id="con_btg" class="btn btn-fail btn-sm" value="不同意"/>\
                        <input type="button" disabled="disabled"  data="' + append[i]["use_id"] + '" datas="11003" id="con_dd" class="btn btn-fail btn-sm" value="暂不订购"/>\
                        <a id="a_delete_'+append[i]["use_id"]+'"  href="#confirm-delete"   data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                    else {
                        value += '\
                    <tr >\
                        <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"])+ '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td class="operation">\
                        <input disabled="disabled" type="button" data="' + append[i]["use_id"] + '" id="con_det" class="btn btn-link " value=""/>\
                        <a href="#" data-href="delete.php?id=23" onclick=""  onclick="del(this)" data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                $("input[class*='btn btn-success btn-sm']").each(function () {
                    $(this).click(function(){
                        var use_id=$(this).attr("data");
                        var status = $(this).attr("datas");
                        var con_name=$(this).attr("datac");
                        var amount=$(this).attr("dataccc");
                        var unit=$(this).attr("datacc");
                        var pack=$(this).attr("pack");
                        $.ajax({
                            type: 'POST',
                            url: "/consumable/manager/useModify",
                            data: {
                                con_name:con_name,
                                status:status,
                                use_id:use_id,
                                amount:amount,
                                unit:unit,
                                pack:pack
                            },
                            dataType: "json",
                            success: function (data) {
                                layer.msg(data["message"]);
                                if (data["result"] == "success") {
                                    setTimeout(function () {
                                        window.location.href="/promanager/consumable/use_shenhe.html";
                                    }, 1000);
                                }
                            }
                        })
                    })
                });
                $("input[class*='btn btn-fail btn-sm']").each(function () {
                    $(this).click(function(){
                        var use_id=$(this).attr("data");
                        var status = $(this).attr("datas");
                        var con_name=$(this).attr("datac");
                        $.ajax({
                            type: 'POST',
                            url: "/consumable/manager/useModify",
                            data: {
                                con_name:con_name,
                                status:status,
                                use_id:use_id
                            },
                            dataType: "json",
                            success: function (data) {
                                layer.msg(data["message"]);
                                if (data["result"] == "success") {
                                    setTimeout(function () {
                                        window.location.href="/promanager/consumable/use_shenhe.html";
                                    }, 1000);
                                }
                            }
                        })
                    })
                });
                $("input[id*='use_del']").each(function () {
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

    var use_id=$("#del").val();

    $.ajax({
        type: 'POST',
        url: "/product_use/manage/useDel",
        data: {
            use_id: use_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/promanager/researchAndUse/index.html";
                }, 1000);
            }
        }
    })


})

