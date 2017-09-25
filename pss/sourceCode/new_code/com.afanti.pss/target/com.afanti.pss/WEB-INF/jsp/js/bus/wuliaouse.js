$(function () {
    $.alle_section_date("start_time", "end_time");
    doSearch(1);
    var flag = $.alle_getUrlParam("flag");
    if(flag!=null)
    {

        $("#use_add").click(function(){
            window.location.href="/promanager/researchAndUse/add_use_yanfa.html";
        })
    }
    else {
        $("#use_add").click(function () {
            window.location.href = "/promanager/researchAndUse/add_use.html";
        })
    }
    $("#use_query").click(function(){
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
        url: "/product_use/manage/usePage",
        data: {
            sku:sku,
            cas: cas,
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
                    if (append[i]["status"] == 8001) {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: blue">已出库</button>';
                    } else if (append[i]["status"] == 8003) {
                        tml2 += '<button type="button" class="btn btn-info"  style="background-color: #5cb85c">部分出库</button>';
                    } else if (append[i]["status"] == 8002) {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: blue">未出库</button>';
                    }  else if (append[i]["status"] == 11001) {
                        html2 += '<button type="button" class="btn btn-info"  style="background-color: #5cb85c">审核通过</button>';
                    } else if (append[i]["status"] == 11002) {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: blue">审核不通过</button>';
                    }else if (append[i]["status"] == 11003) {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: blue">暂不审核</button>';
                    }
                    else if (append[i]["status"] == 11004) {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: blue">待审核</button>';
                    }
                    else if (append[i]["status"] == 5001) {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: #5cb85c">已入库</button>';
                    }
                    else if (append[i]["status"] == 5002) {
                        html2 += '<button type="button" datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'" class="btn btn-info" id="example" rel="popover"  data-placement="bottom" >在途中</button>';
                    } else if (append[i]["status"] == 5003) {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: blue">部分入库</button>';
                    }
                    else if (append[i]["status"] == 5004) {
                        html2 += '<button type="button" class="btn btn-info">未发货</button>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if (append[i]["status"] == '11004') {
                        value += '\
                    <tr >\
                    <td>' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + append[i]["use_amount"] + '' + append[i]["use_unit"] + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td class="operation">\
                        <input disabled="disabled" type="button" data="' + append[i]["use_id"] + '"  id="use_mod" class="btn btn-link btn-xs" value="修改"/>\
                        <input disabled="disabled"  type="button" data="' + append[i]["use_id"] + '" id="use_del" class="btn btn-link btn-xs" value="删除"/>\
                        <input disabled="disabled" type="button" data="' + append[i]["use_id"] + '" id="use_det" class="btn btn-link btn-xs" value="详情"/>\
                        <a  id="a_delete_'+append[i]["use_id"]+'"  href="#confirm-delete"   data-toggle="modal" data-target="#confirm-delete"></a>\
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
                            <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + append[i]["use_amount"] + '' + append[i]["use_unit"] + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td class="operation">\
                        <input disabled="disabled" type="button" data="' + append[i]["use_id"] + '" id="use_det" class="btn btn-link btn-xs" value="详情"/>\
                        <a href="#" data-href="delete.php?id=23" onclick=""  onclick="del(this)" data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $(document).on('mouseover',  "button[id='example']", function() {

                    var kd_num=$(this).attr("data");
                    var kd_code=$(this).attr("datas");
                    if(kd_code && kd_num) {
                        $(this).popover({
                            html: true,
                            trigger: 'manual',
                            content: function () {
                                return '<div id="test" data="1" class="box popover-box" style="width:600px;over">' +

                                    '</div>'
                            }
                        });
                        $(this).popover('show');
                        $(this).attr("name","test");
                        setTimeout(function () {
                            $.ajax({
                                type: 'POST',
                                url: "/kd/queryKdInfo",
                                data: {
                                    kd_num: kd_num,
                                    kd_code: kd_code
                                },
                                dataType: "json",
                                success: function (data) {
                                    var append = eval("(" + data["append"] + ")");
                                    //遍历json中的数组
                                    var appends = eval(append["Traces"]);
                                    if (append["State"] == 1) {
                                        var htmlss = '<h5 style="color:#ce4844">当前包裹状态:<b>已取件</b></h5>';
                                    }
                                    else if (append["State"] == 2) {
                                        var htmlss = '<h5 style="color:#ce4844">当前包裹状态:<b>在途中</b></h5>';
                                    }
                                    else if (append["State"] == 3) {
                                        var htmlss ='<h5 style="color:#ce4844">当前包裹状态:<b>已签收</b></h5>';
                                    }
                                    else{
                                        layer.msg("当前无物流信息");
                                        $("button[name='test']").popover("hide");
                                    }

                                    for (var i = 0; i < append.Traces.length; i++) {
                                        htmlss += '<p class="title" style="width:450px;"><b>' + appends[i]["AcceptTime"] + '</b>' + $.alle_null2Str(appends[i]["AcceptStation"]) + '</p>';
                                    }
                                    $("#test").html(htmlss);

                                }
                            })
                        }, 700);
                    }
                    else{
                        layer.msg("无物流数据");
                    }

                })
                $(document).on('click',  function(){
                    $("button[name='test']").popover("hide");
                    $("button[name='test']").removeAttr("name");
                });
                $("#data_tbody").html(value);
                $("input[id*='use_det']").each(function () {
                    $(this).click(function(){
                        $.alle_dialog('/promanager/researchAndUse/detail_use.html?use_id='+$(this).attr("data"),'申请单详情', ["50%", "50%"])
                    })
                });
                $("input[id*='use_mod']").each(function () {
                    $(this).click(function(){
                        $.alle_dialog('/promanager/researchAndUse/modify_use.html?use_id='+$(this).attr("data"),'申请单修改', ["50%", "50%"])
                    })
                });
                $("input[id*='use_pro']").each(function () {
                    $(this).click(function(){
                        window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+$(this).attr("data");
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

