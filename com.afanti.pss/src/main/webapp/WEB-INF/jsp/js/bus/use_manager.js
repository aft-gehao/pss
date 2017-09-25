$(function () {

    doSearch(1);
    $("#check_query").click(function(){
        doSearch(1);
    })

})
function doSearch(p) {
    var cas = $("#cas").val();
    var status = $("#status").val();
    var start_time;
    var end_time;
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/usePage",
        data: {
            p: p,
            cas:cas,
            status:status,
            start_time:end_time,
            end_time:end_time
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
                    }
                    else if (append[i]["status"] == 5004) {
                        html2 += '<span class="label label-danger">未发货</span>';
                    } else if (append[i]["status"] == 11001) {
                        html2 += '<span class="label label-danger" style="border-color: #5cb85c">审核通过</span>';
                    } else if (append[i]["status"] == 11002) {
                        html2 += '<span class="label label-danger">审核不通过</span>';
                    }else if (append[i]["status"] == 11003) {
                        html2 += '<span class="label label-danger">暂不审核</span>';
                    }
                    else if (append[i]["status"] == 11004) {
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
                         <td>' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                          <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + append[i]["use_amount"] + '' + append[i]["use_unit"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <a title="处理" onclick="chuli(this)" datass="'+append[i]["use_batch_no"]+'"  data="' + append[i]["use_id"] + '"   class="btn btn-success btn-sm" data-toggle="modal" data-target="#Handle">处理</a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                    else {
                        value += '\
                    <tr >\
                       <td>' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                          <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + append[i]["use_amount"] + '' + append[i]["use_unit"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <input disabled="disabled" type="button" data="' + append[i]["use_id"] + '" id="use_det" class="btn btn-link " value=""/>\
                        <a href="#" data-href="delete.php?id=23" onclick=""  onclick="del(this)" data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                $("input[class*='btn btn-link btn-xs']").each(function () {
                    $(this).click(function(){
                        var use_id=$(this).attr("data");
                        var use_batch_no=$(this).attr("datass");
                        var datac=$(this).attr("datac");
                        if($(this).attr("datas")=="11001") {
                            if (use_batch_no == "0") {
                                var status = $(this).attr("datas");
                            }
                            else {
                                var status = 8002;
                            }
                        }
                        else{
                            var status = $(this).attr("datas");

                        }
                        $.ajax({
                            type: 'POST',
                            url: "/product_use/manage/useShenhe",
                            data: {
                                datac:datac,
                                status:status,
                                use_id:use_id
                            },
                            dataType: "json",
                            success: function (data) {
                                layer.msg(data["message"]);
                                if (data["result"] == "success") {
                                    setTimeout(function () {
                                        window.location.href="/promanager/researchAndUse/use_shenhe.html";
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


function chuli(e){
    $(".yijian").attr("use_id",$(e).attr("data"));
    $(".yijian").attr("use_batch_no",$(e).attr("datass"));
}
$(".yijian").click(function(){
    $("#status_yijian").val($(this).attr("yijian"));
    $("#use_id").val($(this).attr("use_id"));
})
$("#sure").click(function(){
    var use_id=$("#use_id").val();
    var status=$("#status_yijian").val();
    var desc=$("#desc").val();
    if(status ==null ||status ==""){
        layer.msg("请选择意见");
        return ;
    }
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/useShenhe",
        data: {
            desc:desc,
            status:status,
            use_id:use_id
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href="/promanager/researchAndUse/use_shenhe.html";
                }, 1000);
            }
        }
    })
})