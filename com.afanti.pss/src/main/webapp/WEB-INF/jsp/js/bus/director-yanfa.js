/**
 * Created by Administrator on 2017/9/12 0012.
 */
$(function(){
    doSearch_material(0)
})
//原料请购审核页面显示更多
function show_more(is_all) {
    doSearch_material(is_all)
}
//原料请购审核首页
function doSearch_material(is_all) {
    $.ajax({
        type: 'POST',
        url: "/product/manager/MaterialRequisitionAuditList",
        data: {
            is_all:is_all
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                $("#count_material").html(data["append_ext"]);
                var value = "";
                if (data["append"]== null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    var html = "";
                    var html2 = "";
                    if (append[i]["status"] == 11004) {
                        html2 += '<a class="btn btn-info btn-sm" style="background-color:white;color:black">待审核</a>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if (append[i]["status"] == '11004') {
                        value += '\
                    <tr >\
                         <td>' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                          <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + append[i]["use_amount"] + '' + append[i]["use_unit"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <a title="处理" onclick="chuli(this)" datass="'+append[i]["use_batch_no"]+'"  data="' + append[i]["use_id"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#Handle">处理</a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody_meterial").html(value);
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

//按钮意见选择   获取相应的状态
function chuli(e){
    $(".yijian").attr("use_id",$(e).attr("data"));
    $(".yijian").attr("use_batch_no",$(e).attr("datass"));
}
$(".yijian").click(function(){
    $("#status_yijian").val($(this).attr("yijian"));
    $("#use_id").val($(this).attr("use_id"));
})

//原料审核确认
$("#sure").click(function(){
    var use_id=$("#use_id").val();
    var status=$("#status_yijian").val();
    var desc=$("#desc").val();
    if(status ==null ||status =="")
    {
        layer.msg("请选择意见");
        return ;
    }
    $.ajax({
        type: 'POST',
        url: "/product/manager/ConfirmationAudit",
        data: {
            desc:desc,
            status:status,
            use_id:use_id
        },
        dataType: "json",
        success: function (data) {
            //layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href="/promanager/mywork/director-yanfa.html";
                }, 1000);
            }
        }
    })
})


//耗材请购审核
$("a[id*='supplies']").each(function () {
    $(this).click(function () {
        doSearch_supplies(0);
    })
})

//耗材请购审核页面
function doSearch_supplies(is_all) {
    $.ajax({
        type: 'POST',
        url: "/product/manager/getConsumableList",
        data: {
            is_all:is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_supplies").html(data["append_ext"]);
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    var html = "";
                    var html2 = "";
                    if (append[i]["status"] == 11004) {
                        html2 += '<a class="btn btn-info btn-sm" style="background-color:white;color:black">待审核</a>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if (append[i]["status"] == '11004') {
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"])+ '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
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
                }
                $("#data_tbody_supplies").html(value);
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
                                        window.location.href="/promanager/mywork/director-yanfa.html";
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
                                        window.location.href="/promanager/mywork/director-yanfa.html";
                                    }, 1000);
                                }
                            }
                        })
                    })
                });
            }
        }
    })
}

//耗材请购审核页面显示更多
function show_more_sup(is_all) {
    doSearch_supplies(is_all)
}

//入库审核
$("a[id*='research']").each(function () {
    $(this).click(function () {
        doSearch_research(0);
    })
})
//入库审核页面
function doSearch_research(is_all) {
    $.ajax({
        type: 'POST',
        url: "/product/manager/getResearchList",
        data: {
            is_all:is_all
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                $("#count_storage").html(data["append_ext"]);
                var value = "";
                if (data["append"]== null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    var html = "";
                    var html2 = "";
                   if (append[i]["status"] == 11003) {
                        html2 += '<a class="btn btn-info btn-sm" style="background-color:white;color:black">暂不审核</a>';
                    }
                    else if (append[i]["status"] == 11004) {
                        html2 += '<a class="btn btn-info btn-sm" style="background-color:white;color:black">待审核</a>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    var htmls = ""
                    var str = append[i]["putu_url"];
                    if(str!=null) {
                        if (str.indexOf(",") >= 0) {
                            var strs = new Array();
                            strs = str.split(",");
                            for (var x = 0; x < strs.length; x++) {//"javascript:void(window.open("http://source.tanyangnet.com/' + strs[x] + '")"
                                htmls += '<a  href="http://source.tanyangnet.com/' + strs[x] + '" title="' + strs[x] + '" alt="' + strs[x] + '">';
                                htmls += '<img id="imghead" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png"  >'
                                htmls += '</a>';
                            }
                        }
                        else {
                            htmls += '<a  href="http://source.tanyangnet.com/' + str + '" title="' + str + '" alt="' + str + '">';
                            htmls += '<img id="imghead" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png"  >'
                            htmls += '</a>';
                        }
                    }
                    if (append[i]["status"] == '11004'||append[i]["status"] == '11003') {
                        value += '\
                    <tr >\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + append[i]["sku"] + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["unit"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                        <td>'+htmls+'</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <a data="' + append[i]["research_id"] + '" id="check_tg" class="btn btn-success">同意</a>\
                        <a data="' + append[i]["research_id"] + '" id="check_btg" class="btn btn-danger">不同意</a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody_research").html(value);
                $("input[class*='btn btn-link btn-xs']").each(function () {
                    $(this).click(function(){
                        var use_id=$(this).attr("data");
                        var use_batch_no=$(this).attr("datass");
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
                    })
                });
                $("a[id*='check_tg']").each(function () {
                    var research_id=$(this).attr("data")
                    $(this).click(function(){
                        $.ajax({
                            type: 'POST',
                            url: "/product/manager/check_tg",
                            data: {
                                research_id:research_id
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data["result"] == "success") {
                                    setTimeout(function () {
                                        doSearch_research(0)
                                    }, 1000);
                                }
                            }
                        })
                    })
                });
                $("a[id*='check_btg']").each(function () {
                    var research_id=$(this).attr("data")
                    $(this).click(function(){
                        $.ajax({
                            type: 'POST',
                            url: "/product/manager/researchDel",
                            data: {
                                research_id:research_id
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data["result"] == "success") {
                                    setTimeout(function () {
                                        doSearch_research(0)
                                    }, 1000);
                                }
                            }
                        })
                    })
                });
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

//入库审核页面加载更多
function show_more_storage(is_all) {
    doSearch_research(is_all);
}