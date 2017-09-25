$(function(){
    doSearch_material(0)
})
function show_more(is_all) {
    doSearch_material(is_all)
}
function show_more1(is_all) {
    material_history(is_all)
}
function show_more_sup(is_all) {
    doSearch_supplies(is_all)
}
function show_more_sup1(is_all) {
    supplies_history(is_all)
}
function show_more_res(is_all) {
    doSearch_research(is_all)
}
function show_more_res1(is_all) {
    research_history(is_all)
}
function show_more_repair(is_all) {
    doSearch_repair(is_all)
}

//领用原料首页
function doSearch_material(is_all) {
    $("#m1_material").show()
    $("#m2_material").hide()
    $.ajax({
        type: 'POST',
        url: "/product/manager/getProductMaterialPageList",
        data: {
            is_all:is_all,
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_material").html(data["append_ext"]);
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    var status=$.alle_null2Str(append[i]["status"])
                    var dict_name=$.alle_null2Str(append[i]["dict_name"])
                    var use_id=$.alle_null2Str(append[i]["use_id"])
                    if (status==5001&&dict_name=="已入库"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["use_amount"])+$.alle_null2Str(append[i]["use_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td><a class="btn btn-success btn-sm">' + dict_name + '</a></td>\
                         <td><a title="领用" id="lingyong_material" use_unit="'+$.alle_null2Str(append[i]["use_unit"])+'" use_amount="'+$.alle_null2Str(append[i]["use_amount"])+'" use_id="'+use_id+'" cas="'+$.alle_null2Str(append[i]["cas"])+'" sku="'+$.alle_null2Str(append[i]["sku"])+'"  class="btn btn-success btn-sm left" data-toggle="modal" data-target="#addMaterial"><i class="icon-edit"></i> 领用</a></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==5002&&dict_name=="未入库"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["use_amount"])+$.alle_null2Str(append[i]["use_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td><a class="btn btn-info">已发货</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==5003&&dict_name=="部分入库"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["use_amount"])+$.alle_null2Str(append[i]["use_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==5004&&dict_name=="未发货"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["use_amount"])+$.alle_null2Str(append[i]["use_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==11001&&dict_name=="审核通过"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["use_amount"])+$.alle_null2Str(append[i]["use_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td><a class="btn btn-info">' + dict_name + '</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==11002&&dict_name=="审核不通过"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["use_amount"])+$.alle_null2Str(append[i]["use_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==11003&&dict_name=="暂不审核"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["use_amount"])+$.alle_null2Str(append[i]["use_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==11004&&dict_name=="待审核"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["use_amount"])+$.alle_null2Str(append[i]["use_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td><a class="btn btn-primary">' + dict_name + '</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody_meterial").html(value);
                $("a[id*='lingyong_material']").each(function () {
                    $(this).click(function () {
                        $("#use_id").val($(this).attr("use_id"))
                        $("#cas").val($(this).attr("cas"))
                        $("#sku").val($(this).attr("sku"))
                        $("#use_unit").val($(this).attr("use_unit"))
                        $("#use_amount").val($(this).attr("use_amount"))
                        $("#amount").val($(this).attr("use_amount"))
                    })
                })

            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

//领用原料
function use_material() {
    var use_id=$("#use_id").val()
    var amount=$("#amount").val()
    var use_amount=$("#use_amount").val()
    if (amount>=use_amount) {
        $.ajax({
            type: 'POST',
            url: "/product/manager/use_material",
            data: {
                use_id: use_id
            },
            async: false,
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    var append = eval(data["append"]);
                    for (var i = 0; i < append.length; i++) {
                        var product_id = $.alle_null2Str(append[i]["product_id"])
                        var use_unit = $.alle_null2Str(append[i]["use_unit"])
                        var use_staff = $.alle_null2Str(append[i]["use_staff"])
                        var purity = $.alle_null2Str(append[i]["purity"])
                        var check_staff = $.alle_null2Str(append[i]["check_staff"])
                        var use_desc = $.alle_null2Str(append[i]["use_desc"])
                        var kd_code = $.alle_null2Str(append[i]["kd_code"])
                        var kd_num = $.alle_null2Str(append[i]["kd_num"])
                        var space_id = $.alle_null2Str(append[i]["space_id"])
                        $.ajax({
                            type: 'POST',
                            url: "/product/manager/add_Usematerial",
                            data: {
                                product_id: product_id,
                                use_amount: use_amount,
                                use_unit: use_unit,
                                use_staff: use_staff,
                                purity: purity,
                                check_staff: check_staff,
                                use_desc: use_desc,
                                kd_code: kd_code,
                                kd_num: kd_num,
                                space_id: space_id
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data["result"] == "success") {
                                    layer.msg("操作成功");
                                    setTimeout('refresh()',1000)
                                }
                            }
                        })
                    }
                }
            }
        })
    }else {
        $("#balance1").show()
        return
    }
}


//领用原料历史
function material_history(is_all) {
    $("#m1_material").hide()
    $("#m2_material").show()
    $.ajax({
        type: 'POST',
        url: "/product/manager/material_history",
        data: {
            is_all: is_all
        },
        async: false,
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_material").html(data["append_ext"]);
                var str=data["append_ext"]
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    var status=$.alle_null2Str(append[i]["status"])
                    var dict_name=$.alle_null2Str(append[i]["dict_name"])
                    var use_id=$.alle_null2Str(append[i]["use_id"])
                    if (status==8002&&dict_name=="未出库"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["use_amount"])+$.alle_null2Str(append[i]["use_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td><a class="btn btn-info">' + dict_name + '</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }else {
                        layer.msg('暂无数据');
                    }
                }
                $("#data_tbody_meterial").html(value);
            }else {
                layer.msg(data["message"]);
            }
        }
    })
}


//页面刷新
function refresh() {
    window.location.reload()
}


//页面样式隐藏
$("#quxiao").click(function () {
    $("#balance1").hide()
})



$("a[id*='supplies']").each(function () {
    $(this).click(function () {
        doSearch_supplies(0);
    })
})

//领用耗材首页
function doSearch_supplies(is_all) {
    $("#m1_sup").show()
    $("#m2_sup").hide()
    $.ajax({
        type: 'POST',
        url: "/product/manager/getProductSuppliesPageList",
        data: {
            is_all: is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_supplies").html(data["append_ext"]);
                var str=data["append_ext"]
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    var status=$.alle_null2Str(append[i]["status"])
                    var dict_name=$.alle_null2Str(append[i]["dict_name"])
                    var use_id=$.alle_null2Str(append[i]["use_id"])
                    if (status==5001&&dict_name=="已入库"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td><a class="btn btn-success btn-sm">' + dict_name + '</a></td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["desc"]) + '</td>\
                         <td><a title="领用" use_id="'+use_id+'" consumable_name="'+$.alle_null2Str(append[i]["consumable_name"])+'" amount="'+$.alle_null2Str(append[i]["amount"])+'" class="btn btn-success btn-sm left" id="lingyong_supplies" data-toggle="modal" data-target="#addSupplies"><i class="icon-edit"></i> 领用</a></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==5002&&dict_name=="未入库"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td><a class="btn btn-info">已发货</a></td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["desc"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==5003&&dict_name=="部分入库"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["desc"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==5004&&dict_name=="未发货"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["desc"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==11001&&dict_name=="审核通过"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td><a class="btn btn-info">' + dict_name + '</a></td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["desc"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==11002&&dict_name=="审核不通过"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["desc"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==11003&&dict_name=="暂不审核"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["desc"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if (status==11004&&dict_name=="待审核"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td><a class="btn btn-primary">' + dict_name + '</a></td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["desc"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody_supplies").html(value);
                $("a[id*='lingyong_supplies']").each(function () {
                    $(this).click(function () {
                        $("#use_id_supplies").val($(this).attr("use_id"))
                        $("#supplies_name").val($(this).attr("consumable_name"))
                        $("#use_amount_supplies").val($(this).attr("amount"))
                        $("#amount_supplies").val($(this).attr("amount"))
                    })
                })
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

//领用耗材
function use_supplies() {
    var use_id=$("#use_id_supplies").val()
    var amount=$("#amount_supplies").val()
    var use_amount_supplies=$("#use_amount_supplies").val()
    if (amount>=use_amount_supplies) {
        $.ajax({
            type: 'POST',
            url: "/product/manager/use_supplies",
            data: {
                use_id: use_id
            },
            async: false,
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    var append = eval(data["append"]);
                    for (var i = 0; i < append.length; i++) {
                        var consumable_id = $.alle_null2Str(append[i]["consumable_id"])
                        var staff = $.alle_null2Str(append[i]["staff"])
                        var space_id = $.alle_null2Str(append[i]["space_id"])
                        var desc = $.alle_null2Str(append[i]["desc"])
                        var check_staff = $.alle_null2Str(append[i]["check_staff"])
                        var stock_id = $.alle_null2Str(append[i]["stock_id"])
                        var kd_num = $.alle_null2Str(append[i]["kd_num"])
                        var kd_code = $.alle_null2Str(append[i]["kd_code"])
                        $.ajax({
                            type: 'POST',
                            url: "/product/manager/add_Usesupplies",
                            data: {
                                consumable_id: consumable_id,
                                amount: use_amount_supplies,
                                staff: staff,
                                space_id: space_id,
                                desc:desc,
                                check_staff:check_staff,
                                stock_id:stock_id,
                                kd_num:kd_num,
                                kd_code:kd_code
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data["result"] == "success") {
                                    layer.msg("操作成功");
                                    setTimeout('refresh()',1000)
                                }
                            }
                        })
                    }
                }
            }
        })
    }else {
        $("#balance1_supplies").show()
        return
    }
}

//领用耗材历史
function supplies_history(is_all) {
    $("#m1_sup").hide()
    $("#m2_sup").show()
    $.ajax({
        type: 'POST',
        url: "/product/manager/supplies_history",
        data: {
            is_all:is_all
        },
        async: false,
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_supplies").html(data["append_ext"]);
                var str=data["append_ext"]
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    var status=$.alle_null2Str(append[i]["status"])
                    var dict_name=$.alle_null2Str(append[i]["dict_name"])
                    var use_id=$.alle_null2Str(append[i]["use_id"])
                    if (status==8002&&dict_name=="未出库"){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td><a class="btn btn-info">' + dict_name + '</a></td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["desc"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }else {
                        layer.msg('暂无数据');
                    }
                }
                $("#data_tbody_supplies").html(value);
            }else {
                layer.msg(data["message"]);
            }
        }
    })
}

$("#quxiao_supplies").click(function () {
    $("#balance1_supplies").hide()
})


$("a[id*='research']").each(function () {
    $(this).click(function () {
        doSearch_research(0);
    })
})
//成品入库首页
function doSearch_research(is_all) {
    $("#m1_res").show()
    $("#m2_res").hide()
    $.ajax({
        type: 'POST',
        url: "/product/manager/getProductResearchPageList",
        data: {
            is_all: is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_research").html(data["append_ext"]);
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);

                for (var i = 0; i < append.length; i++) {

                      var status = $.alle_null2Str(append[i]["status"])
                      var dict_name = $.alle_null2Str(append[i]["dict_name"])
                      var research_id = $.alle_null2Str(append[i]["research_id"])
                      if (status == 5002) {
                          value += '\
                    <tr >\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["research_time"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td><a title="订阅" id="dy_res" unit="' + $.alle_null2Str(append[i]["unit"]) + '" amount="' + $.alle_null2Str(append[i]["amount"]) + '" sku="' + $.alle_null2Str(append[i]["sku"]) + '" cas="' + $.alle_null2Str(append[i]["cas"]) + '" research_id="' + research_id + '" class="btn btn-success btn-sm left" data-toggle="modal" data-target="#addResearch"><i class="icon-edit"></i>订阅入库通知</a></td>\
                        </tr>\
                    \
                    ';
                      }
                      else if (status == 5003) {

                          value += '\
                    <tr >\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["research_time"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                         <td><a title="订阅" id="dy_res" unit="' + $.alle_null2Str(append[i]["unit"]) + '" amount="' + $.alle_null2Str(append[i]["amount"]) + '" sku="' + $.alle_null2Str(append[i]["sku"]) + '" cas="' + $.alle_null2Str(append[i]["cas"]) + '" research_id="' + research_id + '" class="btn btn-success btn-sm left" data-toggle="modal" data-target="#addResearch"><i class="icon-edit"></i>订阅入库通知</a></td>\
                        </tr>\
                    \
                    ';
                      }
                      else if (status == 5004) {

                          value += '\
                    <tr >\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["research_time"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                          <td><a title="订阅" id="dy_res" unit="' + $.alle_null2Str(append[i]["unit"]) + '" amount="' + $.alle_null2Str(append[i]["amount"]) + '" sku="' + $.alle_null2Str(append[i]["sku"]) + '" cas="' + $.alle_null2Str(append[i]["cas"]) + '" research_id="' + research_id + '" class="btn btn-success btn-sm left" data-toggle="modal" data-target="#addResearch"><i class="icon-edit"></i>订阅入库通知</a></td>\
                        </tr>\
                    \
                    ';
                      }
                      else if (status == 11001) {

                          value += '\
                    <tr >\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["research_time"]) + '</td>\
                         <td><a class="btn btn-info">' + dict_name + '</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                      }
                      else if (status == 11003) {

                          value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["research_time"]) + '</td>\
                         <td><a class="btn btn-danger">' + dict_name + '</a></td>\
                          <td><a title="订阅" id="dy_res" unit="' + $.alle_null2Str(append[i]["unit"]) + '" amount="' + $.alle_null2Str(append[i]["amount"]) + '" sku="' + $.alle_null2Str(append[i]["sku"]) + '" cas="' + $.alle_null2Str(append[i]["cas"]) + '" research_id="' + research_id + '" class="btn btn-success btn-sm left" data-toggle="modal" data-target="#addResearch"><i class="icon-edit"></i>订阅入库通知</a></td>\
                        </tr>\
                    \
                    ';
                      }
                      else if (status == 11004) {

                          value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"]) + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["research_time"]) + '</td>\
                         <td><a class="btn btn-primary">' + dict_name + '</a></td>\
                          <td><a title="订阅" id="dy_res" unit="' + $.alle_null2Str(append[i]["unit"]) + '" amount="' + $.alle_null2Str(append[i]["amount"]) + '" sku="' + $.alle_null2Str(append[i]["sku"]) + '" cas="' + $.alle_null2Str(append[i]["cas"]) + '" research_id="' + research_id + '" class="btn btn-success btn-sm left" data-toggle="modal" data-target="#addResearch"><i class="icon-edit"></i>订阅入库通知</a></td>\
                        </tr>\
                    \
                    ';
                      }
                 
                }
                $("#data_tbody_research").html(value);
                $("a[id*='dy_res']").each(function () {
                    $(this).click(function () {
                        $("#res_cas").val($(this).attr("cas"))
                        $("#res_sku").val($(this).attr("sku"))
                        $("#res_amount").val($(this).attr("amount"))
                        $("#res_unit").val($(this).attr("unit"))
                        $("#res_id").val($(this).attr("research_id"))
                        $("#use_res_amount").val($(this).attr("amount"))
                    })
                })
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

//入库订阅
function use_res() {
    var res_amount=$("#res_amount").val()
    var use_res_amount=$("#use_res_amount").val()
    var research_id=$("#res_id").val()
    if (use_res_amount>=res_amount){
        $.ajax({
            type: 'POST',
            url: "/product/manager/use_res",
            data: {
                research_id: research_id,
                res_amount:res_amount
            },
            async: false,
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    var append = eval(data["append"]);
                    for (var i = 0; i < append.length; i++) {
                        $.ajax({
                            type: 'POST',
                            url: "/product/manager/add_Useres",
                            data: {
                                status:$.alle_null2Str(append[i]["status"]),
                                research_staff:$.alle_null2Str(append[i]["research_staff"]),
                                research_name:$.alle_null2Str(append[i]["research_name"]),
                                product_id:$.alle_null2Str(append[i]["product_id"]),
                                amount:res_amount,
                                unit:$.alle_null2Str(append[i]["unit"]),
                                research_batch_no:$.alle_null2Str(append[i]["research_batch_no"]),
                                purity:$.alle_null2Str(append[i]["purity"]),
                                sale_batch_no:$.alle_null2Str(append[i]["sale_batch_no"]),
                                face:$.alle_null2Str(append[i]["face"]),
                                is_waibao:$.alle_null2Str(append[i]["is_waibao"]),
                                hours:$.alle_null2Str(append[i]["is_dy"])
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data["result"] == "success") {
                                    layer.msg("操作成功");
                                    setTimeout('refresh()',500)
                                }
                            }
                        })
                    }
                }
            }
        })
    } else {
        $("#balance1_res").show()
        return
    }
}

//入库历史
function research_history(is_all) {
    $("#m1_res").hide()
    $("#m2_res").show()
    $.ajax({
        type: 'POST',
        url: "/product/manager/research_history",
        data: {
            is_all:is_all
        },
        async: false,
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_research").html(data["append_ext"]);
                var str=data["append_ext"]
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    var status=$.alle_null2Str(append[i]["status"])
                    var dict_name=$.alle_null2Str(append[i]["dict_name"])
                    var research_id=$.alle_null2Str(append[i]["research_id"])
                    if (status==5001&&dict_name=="已入库"){
                        value += '\
                    <tr >\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["amount"])+$.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["research_time"]) + '</td>\
                         <td><a class="btn btn-primary">' + dict_name + '</a></td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    else {
                        layer.msg('暂无数据');
                    }
                }
                $("#data_tbody_research").html(value);
            }else {
                layer.msg(data["message"]);
            }
        }
    })
}
$("#quxiao_res").click(function () {
    $("#balance1_res").hide()
})


//页面刷新
function refresh() {
    window.location.reload()
}

//更多
$("#m1_material").click(function () {
    $("#m1_material").hide()
})
$("#m2_material").click(function () {
    $("#m2_material").hide()
})
$("#m1_sup").click(function () {
    $("#m1_sup").hide()
})
$("#m2_sup").click(function () {
    $("#m2_sup").hide()
})
$("#m1_res").click(function () {
    $("#m1_res").hide()
})
$("#m2_res").click(function () {
    $("#m2_res").hide()
})
$("#m1_repair").click(function () {
    $("#m1_repair").hide()
})
$("#m2_repair").click(function () {
    $("#m2_repair").hide()
})




//库存查询cas
function query_cas() {
    var stock_cas=$("#stock_cas").val()
    $("#apply_yangshi").hide()
    $("#stock_amount").hide()
    $("#stockSelectCas").html("");
    if (stock_cas==""){
        layer.msg('请输入cas');
        return;
    }else {
        $.ajax({
            type: 'POST',
            url: "/product/manager/stockSelectCas",
            data: {
                cas: stock_cas
            },
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    var value = "";
                    if (data["append"] == 0) {
                        layer.msg('暂无数据');
                        return;
                    }
                    var append = eval(data["append"]);
                    for (var i = 0; i < append.length; i++) {
                        var product_id=$.alle_null2Str(append[i]["product_id"])
                        var enter_d_id=$.alle_null2Str(append[i]["enter_d_id"])
                        var amount=$.alle_null2Str(append[i]["amount"])
                        var unit=$.alle_null2Str(append[i]["unit"])
                        if ($.alle_null2Str(append[i]["space_id"])==""){
                            $("#stock_amount").show()
                            $("#apply_yangshi").show()
                            $("#product_id").val(product_id)
                        }else {
                            value += '<p style="margin-left: -50px;">'
                            value += $.alle_null2Str(append[i]["batch_no"]) + $.alle_null2Str(append[i]["space_name"]) + "-剩余:" + amount + unit
                            value +="<input type='text' id='amount"+enter_d_id+"' class='form-control ly-input' placeholder='请输入库存量'>"
                            value += "<button onclick='("+enter_d_id+","+amount+")' class='btn btn-success btn-xs'>领用</button>"
                            value +="<div style='color: red;display: none;' id='blance_pur'>库存余量不足</div>"
                            value += "</p>"
                        }
                    }
                    $("#stockSelectCas").html(value);
                } else {
                    layer.msg(data["message"]);
                }
            }
        })
    }
}


//申请采购
function apply_purchasing() {
    var stock_Addamount=$("#stock_Addamount").val()
    var stock_Addunit=$("#stock_Addunit").val()
    var product_id=$("#product_id").val()
    var use_desc=$("#use_desc").val()
    $.ajax({
        type: 'POST',
        url: "/product/manager/apply_purchasing",
        data: {
            product_id:product_id,
            amount: stock_Addamount,
            unit:stock_Addunit,
            enter_desc:use_desc
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout('refresh()',500)
            }
        }
    })
}

//采购申请领用
function lingyong_purchasing(enter_d_id,amount) {
    var use_amount=$('#amount'+enter_d_id+'').val()
    if (use_amount==""){
        layer.msg("请输入库存量");
        return;
    }else {
        if (use_amount<=amount) {
            $.ajax({
                type: 'POST',
                url: "/product/manager/use_purchasing",
                data: {
                    enter_d_id:enter_d_id
                },
                async: false,
                dataType: "json",
                success: function (data) {
                    if (data["result"] == "success") {
                        var append = eval(data["append"]);
                        for (var i = 0; i < append.length; i++) {
                            var product_id=$.alle_null2Str(append[i]["product_id"])
                            var use_staff=$.alle_null2Str(append[i]["staff_id"])
                            var purity=$.alle_null2Str(append[i]["purity"])
                            var space_id=$.alle_null2Str(append[i]["space_id"])
                            var unit=$.alle_null2Str(append[i]["unit"])
                            $.ajax({
                                type: 'POST',
                                url: "/product/manager/add_purchasing",
                                data: {
                                    product_id: product_id,
                                    use_amount: use_amount,
                                    use_unit: unit,
                                    use_staff:use_staff,
                                    purity:purity,
                                    space_id:space_id
                                },
                                async: false,
                                dataType: "json",
                                success: function (data) {
                                    if (data["result"] == "success") {
                                        layer.msg("操作成功");
                                        setTimeout('refresh()',500)
                                    }
                                }
                            })
                        }
                    }
                }
            })
        }else {
            $("#blance_pur").show()
            return;
        }
    }

}


//耗材名查询
function query_haocaiName() {
    var haocai_name=$("#haocai_name").val()
    $("#apply_supplies").hide()
    if (haocai_name==""){
        layer.msg('请输入耗材名');
        return;
    }else {
        $.ajax({
            type: 'POST',
            url: "/product/manager/suppliesSelectName",
            data: {
                consumable_name: haocai_name
            },
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    var value = "";
                    if (data["append"] == 0) {
                        layer.msg('暂无数据');
                        return;
                    }
                    var append = eval(data["append"]);
                    for (var i = 0; i < append.length; i++) {
                        var consumable_id=$.alle_null2Str(append[i]["consumable_id"])
                        var space_id=$.alle_null2Str(append[i]["space_id"])
                        var amount=$.alle_null2Str(append[i]["amount"])
                        if (space_id==""){
                            $("#apply_supplies").show()
                            $("#consumable_id").val(consumable_id)
                        }else {
                            value += '<p style="margin-left: -50px;">'
                            value += $.alle_null2Str(append[i]["space_name"])+ "-剩余:" + amount + $.alle_null2Str(append[i]["consumable_unit"])
                            value +="<input id='supplies_amount"+consumable_id+"' type='text' class='form-control ly-input' placeholder='请输入库存量'>"
                            value += "<a onclick='lingyong_sup("+consumable_id+","+space_id+","+amount+")' class='btn btn-success btn-xs'>领用</a>"
                            value +="<div id='blance_sup' style='color: red;display: none;'>库存余量不足</div>"
                            value += "</p>"
                        }
                    }
                    $("#suppliesSelectName").html(value);
                } else {
                    layer.msg(data["message"]);
                }
            }
        })
    }
}

//耗材申请添加
function add_supplies() {
    var supplies_Addamount=$("#supplies_Addamount").val()
    var consumable_id=$("#consumable_id").val()
    var desc=$("#desc").val()
    $.ajax({
        type: 'POST',
        url: "/product/manager/add_supplies",
        data: {
            amount: supplies_Addamount,
            consumable_id:consumable_id,
            desc:desc
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout('refresh()',500)
            }
        }
    })
}

//耗材领用申请
function lingyong_sup(consumable_id,space_id,amount) {
    var amount_use=$("#supplies_amount"+consumable_id+"").val()
    if (amount_use==""){
        layer.msg("请输入库存量");
    } else {
        if (amount_use<=amount){
            $.ajax({
                type: 'POST',
                url: "/product/manager/add_consumable_use",
                data: {
                    consumable_id:consumable_id,
                    space_id: space_id,
                    amount:amount_use
                },
                dataType: "json",
                success: function (data) {
                    if (data["result"] == "success") {
                        layer.msg("操作成功");
                        setTimeout('refresh()',500)
                    }
                }
            })
        } else {
            $("#blance_sup").show()
            return;
        }
    }
}


//耗材返修
$("a[id*='repair']").each(function () {
    $(this).click(function () {
        doSearch_repair(0);
    })
})

//耗材返修首页
function doSearch_repair(is_all) {
    $("#m1_repair").show()
    $("#m2_repair").hide()
    $.ajax({
        type: 'POST',
        url: "/product/manager/suppliesRepairList",
        data: {
            is_all: is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_repair").html(data["append_ext"]);
                var value = "";
                if (data["append"] == 0) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
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
                    else if (append[i]["status"] == 5004) {
                        html2 += '<span class="label label-danger" style="background-color: #5cb85c">未发货</span>';
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
                        <td></td>\
                        </tr>\
                    \
                    ';
                    }
                    /*<a title="鉴定" repair_amount="'+$.alle_null2Str(append[i]["repair_amount"])+'" repair_id="'+$.alle_null2Str(append[i]["repair_id"])+'" consumable_name="'+$.alle_null2Str(append[i]["consumable_name"])+'" id="apply_repair" class="btn btn-success btn-sm" data-toggle="modal" data-target="#addRepair"><i class="icon-edit"></i></a>*/
                    else{
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_amount"]) + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["repair_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                       <td>' + $.alle_null2Str(append[i]["repair_desc"]) + '</td>\
                        <td>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
            }
            $("#data_tbody_repair").html(value);
            $("a[id*='apply_repair']").each(function () {
                $(this).click(function () {
                    $("#repair_name").val($(this).attr("consumable_name"))
                    $("#repair_amount").val($(this).attr("repair_amount"))
                    $("#repair_id").val($(this).attr("repair_id"))
                })
            })
        }
    })
}

//耗材返修添加
function add_repair() {
    var repair_amount = $("#repair_amount").val()
    var repair_use_amount=$("#repair_use_amount").val()
    if (repair_use_amount==""){
        layer.msg("请输入返修量");
        return;
    } else if (repair_amount>=repair_use_amount){
        var repair_id = $("#repair_id").val()
        $.ajax({
            type: 'POST',
            url: "/product/manager/suppliesRepairList",
            data: {
                is_all: 1,
                repair_id:repair_id
            },
            async: false,
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    var append = eval(data["append"]);
                    for (var i = 0; i < append.length; i++) {
                        var consumable_id=$.alle_null2Str(append[i]["consumable_id"])
                        var repair_staff=$.alle_null2Str(append[i]["repair_staff"])
                        var repair_desc=$.alle_null2Str(append[i]["repair_desc"])
                        var repair_id=$.alle_null2Str(append[i]["repair_id"])
                        $.ajax({
                            type: 'POST',
                            url: "/product/manager/addRepairList",
                            data: {
                                consumable_id: consumable_id,
                                repair_staff:repair_staff,
                                repair_amount:repair_use_amount,
                                repair_desc:repair_desc,
                                repair_id:repair_id
                            },
                            async: false,
                            dataType: "json",
                            success: function (data) {
                                if (data["result"] == "success") {
                                    layer.msg("操作成功");
                                    setTimeout('refresh()',500)
                                }
                            }
                        })
                    }
                }
            }
        })

    }else {
        $("#balance_repair").show()
        return;
    }
}


//设备返修小弹窗
function fanxiu_add_select() {
    var fanxiu_name=$("#fanxiu_name").val()
    var guige_name=$("#guige_name").val()
    var fanxiu_amount=$("#fanxiu_amount").val()
    var fanxiu_unit=$("#fanxiu_unit").val()
    var fanxiu_desc=$("#fanxiu_desc").val()
    $.ajax({
        type: 'POST',
        url: "/product/manager/fanxiu_add_select",
        data: {
            fanxiu_name: fanxiu_name,
            guige_name: guige_name,
            fanxiu_unit:fanxiu_unit,
            repair_amount:fanxiu_amount,
            repair_desc:fanxiu_desc
        },
        async: false,
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                if (data["append"] == null) {
                    layer.msg('新添返修设备');
                    setTimeout('refresh()',500)
                    return;
                }else{
                    var append = eval(data["append"]);
                    for (var i = 0; i < append.length; i++) {
                        var consumable_id=$.alle_null2Str(append[i]["consumable_id"])
                        var repair_staff=$.alle_null2Str(append[i]["staff_id"])
                        $.ajax({
                            type: 'POST',
                            url: "/product/manager/addFanxiuRepair",
                            data: {
                                consumable_id: consumable_id,
                                repair_staff:repair_staff,
                                repair_amount:fanxiu_amount,
                                repair_desc:fanxiu_desc
                            },
                            async: false,
                            dataType: "json",
                            success: function (data) {
                                if (data["result"] == "success") {
                                    layer.msg("操作成功");
                                    setTimeout('refresh()',500)
                                }
                            }
                        })
                    }
                }
            }
            else if(data["result"] == "successforadd"){
                layer.msg("操作成功");
                setTimeout(function(){
                    window.location.reload();
                },1000)

            }
        }
    })
}

$("#add_sku").blur(function(){
    var cas=$("#add_cas").val();
    var sku=$("#add_sku").val();
    if(cas!='' && cas!='') {
        $.ajax({
            type: 'POST',
            url: "/meterialpurchease/manager/selectProduct",
            data: {
                sku: sku,
                cas: cas
            },
            dataType: "json",
            success: function (data) {
                $("#product_id").val(data["append"]);
            }
        })
    }
    else{
        layer.msg("请填写cas和sku");
        return;
    }
})
function add_shengchan(){
    $.alle_sysdate_date("research_time");
    var product_type=4002;
    var research_time=$("#research_time").val();
    var hours=$("#add_hours").val();
    var amount=$("#add_amount").val();
    var product_id=$("#product_id").val();
    var unit=$("#add_unit").val();
    var is_waibao=$("#batch").val();
    var face=$("#add_face").val();
    var face=$("#add_face").val();
    var purity=$("#add_purity").val();
    var sale_batch_no=$("#sale_batch_no").val();
    if(product_id !='') {
        $.ajax({
            type: 'POST',
            url: "/research/manage/researchAdd",
            data: {
                product_type: product_type,
                research_time: research_time,
                hours: hours,
                product_id: product_id,
                amount: amount,
                unit: unit,
                is_waibao: is_waibao,
                face: face,
                purity: purity,
                sale_batch_no: sale_batch_no
            },
            dataType: "json",
            success: function (data) {
                layer.msg("操作成功");
                setTimeout(function () {
                    window.location.reload()
                }, 1000)
            }
        })
    }
    else{
        layer.msg("请填充数据")
        return ;
    }
}

/*
 //查询返修耗材名
 function query_equipmentName() {
 $("#apply_repair").hide()
 $("#blance_repair").hide()
 var consumable_name=$("#fanxiu_name").val()
 $.ajax({
 type: 'POST',
 url: "/product/manager/selectRepairName",
 data: {
 consumable_name:consumable_name
 },
 dataType: "json",
 success: function (data) {
 if (data["result"] == "success") {
 if (data["append"] == 0) {
 layer.msg("暂无数据");
 return;
 }
 var append = eval(data["append"]);
 for (var i = 0; i < append.length; i++) {
 var amount=$.alle_null2Str(append[i]["repair_amount"])
 $("#repair_consumable_id").val($.alle_null2Str(append[i]["consumable_id"]))
 var repair_id=$.alle_null2Str(append[i]["repair_id"])
 var value=""
 value += '<p style="margin-left: -50px;">'
 value += $.alle_null2Str(append[i]["consumable_name"])+ "-剩余:" + amount + $.alle_null2Str(append[i]["consumable_unit"])
 value +="<input id='repair_amount"+repair_id+"' type='text' class='form-control ly-input' placeholder='请输入库存量'>"
 value += "<a onclick='lingyong_repair("+repair_id+","+amount+")' class='btn btn-success btn-xs'>申请返修</a>"
 value +="<div id='blance_repair' style='color: red;display: none;'>库存余量不足</div>"
 value += "</p>"
 }
 $("#repair_name_select").html(value);
 }else {
 layer.msg("类型异常,联系管理员");
 }
 }
 })
 }

 //设备返修领用
 function lingyong_repair(repair_id,amount) {
 var repair_amount=$("#repair_amount"+repair_id+"").val()
 if (amount>=repair_amount){
 $.ajax({
 type: 'POST',
 url: "/product/manager/addRepairFanxiu",
 data: {
 repair_id: repair_id,
 repair_amount:repair_amount
 },
 dataType: "json",
 success: function (data) {
 if (data["result"] == "success") {
 layer.msg("操作成功");
 setTimeout('refresh()',500)
 }
 }
 })
 }else {
 $("#blance_repair").show()
 }
 }
 */

//设备返修  如果没有  添加
/*function add_apply_repair() {
 var repair_Addamount=$("#repair_Addamount").val()
 var repair_consumable_id=$("#repair_consumable_id").val()
 var repair_desc=$("#repair_desc").val()
 $.ajax({
 type: 'POST',
 url: "/product/manager/no_addRepairFanxiu",
 data: {
 consumable_id: repair_consumable_id,
 repair_amount:repair_Addamount,
 repair_desc:repair_desc
 },
 dataType: "json",
 success: function (data) {
 if (data["result"] == "success") {
 layer.msg("操作成功");
 setTimeout('refresh()',500)
 }
 }
 })
 }*/


/*
 //控件隐藏
 function quxiao_repair() {
 $("#balance_repair").hide()
 }*/
