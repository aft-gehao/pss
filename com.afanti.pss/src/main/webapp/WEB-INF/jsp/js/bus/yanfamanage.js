$(function () {
    $.alle_section_date("start_time", "end_time");
    doSearch(1);
    $("#add_yanfa").click(function(){
        window.location.href="/promanager/researchAndUse/add_research.html";
    })
    $("#yanfa_query").click(function(){
        doSearch(1);
    })

})
function doSearch(p) {
    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();
    var cas = $("#cas").val();
    var sku = $("#sku").val();
    $.ajax({
        type: 'POST',
        url: "/research/manage/researchPage",
        data: {

            sku: sku,
            cas:cas,
            start_time: start_time,
            end_time:end_time,
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
                    if (append[i]["status"] == 5001) {
                        html2 += '<span class="label label-success" style="background-color: #5cb85c">已入库</span>';
                    } else if (append[i]["status"] == 5003) {
                        html2 += '<span class="label label-info" style="background-color: #5cb85c">部分入库</span>';
                    } else if (append[i]["status"] == 5002) {
                        html2 += '<span class="label label-danger">未入库</span>';
                    }else if (append[i]["status"] == 11004) {
                        html2 += '<span class="label label-danger" style="background-color: blue;">待审核</span>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if (append[i]["status"] == '5002'|| append[i]["status"]=="11004") {
                        value += '\
                    <tr >\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + append[i]["sku"] + '</td>\
                        <td>' + append[i]["name_ch"] + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["research_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td class="operation">\
                        <input disabled="disabled" type="button" data="' + append[i]["research_id"] + '"  datas="' + append[i]["product_id"] + '" id="yanfa_mod" class="btn btn-link btn-xs" value="修改"/>\
                        <input disabled="disabled"  type="button" data="' + append[i]["research_id"] + '" id="yanfa_del" class="btn btn-link btn-xs" value="删除"/>\
                        <input disabled="disabled" type="button" data="' + append[i]["research_id"] + '" id="yanfa_det" class="btn btn-link btn-xs" value="详情"/>\
                        <a  id="a_delete_'+append[i]["research_id"]+'"  href="#confirm-delete"   data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                    else {
                        value += '\
                    <tr >\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + append[i]["sku"] + '</td>\
                        <td>' + append[i]["name_ch"] + '</td>\
                         <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["research_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td class="operation">\
                        <input disabled="disabled" type="button" datas="' + append[i]["product_id"] + '" data="' + append[i]["research_id"] + '"  id="yanfa_mod" class="btn btn-link btn-xs" value="修改"/>\
                        <input disabled="disabled" type="button" data="' + append[i]["research_id"] + '" id="yanfa_det" class="btn btn-link btn-xs" value="详情"/>\
                        <a href="#" data-href="delete.php?id=23" onclick=""  onclick="del(this)" data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                $("input[id*='yanfa_det']").each(function () {
                    $(this).click(function(){
                        $.alle_dialog('/promanager/researchAndUse/detail_research.html?use_id='+$(this).attr("data"),'申请单详情', ["50%", "50%"])
                    })
                });
                $("input[id*='yanfa_mod']").each(function () {
                    $(this).click(function(){
                        $.alle_dialog('/promanager/researchAndUse/modify_research.html?use_id='+$(this).attr("data")+"&product_id="+$(this).attr("datas"),'申请单修改', ["50%", "70%"])
                    })
                });
                $("input[id*='yanfa_pro']").each(function () {
                    $(this).click(function(){
                        window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+$(this).attr("data");
                    })
                });
                $("input[id*='yanfa_del']").each(function () {
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

    var research_id=$("#del").val();

    $.ajax({
        type: 'POST',
        url: "/research/manage/researchDel",
        data: {
            research_id: research_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/promanager/researchAndUse/research_index.html";
                }, 1000);
            }
        }
    })


})

