/**
 * Created by Administrator on 2017/9/14 0014.
 */
$(function(){
    doSearch_material(0)
    doSearch_material_out(0)
})

//原料待入库首页
function doSearch_material(is_all) {
    $.ajax({
        type: 'POST',
        url: "/product/manager/warehouseMaterialList",
        data: {
            is_all:is_all
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
                    var html2 ="";
                    var html4="";
                    if (append[i]["stock_status_name"] =='未入库') {
                        html2 += '<a class="btn btn-info btn-sm" style="background-color:white;color:black" datas="' + append[i]["kd_code"] + '" data="' + append[i]["kd_num"] + '"  id="example" rel="popover"  data-placement="bottom" >未入库</a>';
                    }
                    var html ="";
                    var html3 =""
                    html3 += append[i]["purchase_name"] + "【<strong><font color='red'>采购</font></strong>】"
                    if(append[i]["stock_status"] != 5001)
                    {//onclick='purchase_detial(" + append[i]["purchase_id"]+ ","+append[i]["stock_status"]+","+append[i]["in_type"]+")'
                        html += "<a id='inv_in_submit' stock_status='"+append[i]["stock_status"]+"' purchase_id='"+append[i]["purchase_id"]+"' in_type='"+append[i]["in_type"]+"'  class='btn btn-success btn-sm' type='button'>入库</a>";
                        html4 +="<a id='inv_cancle_submit' class='btn btn-success btn-sm' type='button' onclick='cancle_submit(" + append[i]["purchase_id"]+ ")'>取消入库</a>";
                    }else if(append[i]["in_type"] == 7003){
                        html += "<input id='inv_detail' disabled='disabled'   class='btn btn-link btn-xs' type='button' onclick='research_detial(" + append[i]["purchase_id"]+ ","+append[i]["stock_status"]+","+append[i]["in_type"]+")' value='详情'/>";
                    }
                    else{
                        html += "<input id='inv_detail' disabled='disabled'   class='btn btn-link btn-xs' type='button' onclick='purchase_detial(" + append[i]["purchase_id"]+ ","+append[i]["stock_status"]+","+append[i]["in_type"]+")' value='详情'/>";
                    }
                    if(append[i]["stock_status"] != 5001 ||append[i]["stock_status"] != 5002 || append[i]["stock_status"] != 5003){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["unit"] + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                         <td class="operation">' + html + ''+html4+'</td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody_material").html(value);
                $("a[id*='inv_in_submit']").each(function () {
                    $(this).click(function () {
                        var in_type=$(this).attr("in_type")
                        var research_id=$(this).attr("purchase_id")
                        var stock_status=$(this).attr("stock_status")
                        $("#purchase_id_caigou").val(research_id)

                        if(in_type==9001)//采购退货
                        {
                            $('#ruku_caigou').modal('show')
                            $.ajax({
                                type: 'POST',
                                url: "/inventory/productIn/load_purchasing_inventory",
                                data: {
                                    purchase_id: research_id
                                },
                                dataType: "json",
                                success: function (data) {
                                    var a=data["appends"];
                                    if (data["result"] == "success") {
                                        var append1 = data["append"]["materialPurchase"];
                                        $("#ruku_purchase_name_caigou").val(append1["purchase_name"]);
                                        //$("#staff_name").html(append1["staff_name"]);
                                        $("#ruku_supplier_name_caigou").val(append1["supplier_name"]);
                                        $("#ruku_all_total_caigou").val(append1["all_total"]);
                                        //$("#linkman_name").html(append1["linkman_name"]);
                                        $("#ruku_purchase_time_caigou").val($.alle_time2str_yymm_dd_hhmmss(append1["purchase_time"]));
                                        $("#ruku_desc1_caigou").html(append1["desc"]);
                                        var append2 = data["append"]["purchaseInventoryList"];
                                        for (var i = 0; i < append2.length; i++) {
                                            $("#product_id_caigou").val(append2[i]["product_id"]);
                                            $("#ruku_amount_caigou").val(append2[i]["amount"]);
                                            $("#ruku_unit_caigou").val(append2[i]["unit"]);
                                            $("#ruku_new_unit_caigou").val(append2[i]["unit"])
                                            $("#ruku_purity_caigou").val(append2[i]["purity"]);
                                            $("#ruku_amount_used_Incaigou").val(append2[i]["amount_used"]);
                                            $("#ruku_product_name_en_caigou").val(append2[i]["product_name_en"]);
                                            $("#ruku_in_count_caigou").val(append2[i]["in_count"]);
                                            $("#ruku_amount_used_Outcaigou").val(append2[i]["out_amount"]);
                                            $("#purchase_d_id_caigou").val(append2[i]["purchase_d_id"])

                                        }
                                    } else {
                                        layer.msg(data["message"])
                                    }
                                }
                            });
                        }
                        else if(in_type==9002)//销售出库
                        {
                            $.ajax({
                                type: 'POST',
                                url: "/inventory/productIn/load_vendition_in_info",
                                data: {
                                    sale_id: research_id
                                },
                                dataType: "json",
                                success: function (data) {
                                    if (data["result"] == "success") {
                                        var append2 = data["append"]["productSaleDetailList"];
                                        for (var i = 0; i < append2.length; i++) {
                                            $("#batch_no_xiaoshou").val(append2[i]["batch_no"]);
                                            $("#amount_xaioshou").val(append2[i]["amount_used"]);
                                            $("#unit_xaioshou").val(append2[i]["unit"]);
                                            $("#space_name_xiaoshou").val(append2[i]["space_name"]);
                                            $("#space_id_xiaoshou").val(append2[i]["space_id"]);
                                            $("#purchase_id_xiaoshou").val(research_id)
                                        }
                                    }
                                }
                            })
                        }
                        else if(in_type==7003)//自研发
                        {
                            $('#ruku_yanfa').modal('show')
                            $.ajax({
                                type: 'POST',
                                url: "/research/manage/researchSelect",
                                data: {
                                    research_id: research_id
                                },
                                dataType: "json",
                                success: function (data) {
                                    if (data["result"] == "success") {
                                        var append1 = data["append"];
                                        $("#ruku_research_name").val(append1["research_name"])
                                        $("#ruku_staff_name").val(append1["staff_name"]+"/"+$.alle_time2str_yymm_dd_hhmmss(append1["research_time"]))
                                        $("#staff_id").val(append1["research_staff"])
                                        $("#ruku_cas").val(append1["cas"])
                                        $("#ruku_sku").val(append1["sku"])
                                        $("#ruku_pro_name").val(append1["name_en"])
                                        $("#product_id").val(append1["product_id"])
                                        $("#ruku_status").val(append1["dict_name"])
                                        $("#ruku_batch_no").val(append1["research_batch_no"])
                                        $("#ruku_amount").val(append1["amount"])
                                        $("#ruku_unit").val(append1["unit"])
                                        $("#ruku_purity").val(append1["purity"])
                                        $("#ruku_sale_batch_no").val(append1["sale_batch_no"])
                                        $("#ruku_face").val(append1["face"])
                                        $("#purchase_id").val(append1["research_id"])
                                    }
                                }
                            })
                        }
                    })
                })
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

//原料待入库显示更多
function show_more_material(is_all) {
    doSearch_material(is_all)
}

//仓库页面显示
function select_dictWarehouseSpace(i) {
    $.alle_dialog('/promanager/inventory/select_warehouse.html?i=' +i, "选择仓位", ["350px", "80%"]);
}

//原料待入库--->入库按钮--->模态框确认按钮-->采购
function caigou_ruku(){
    var product_id=$("#product_id_caigou").val()
    var space_id = $("#space_id_1").val();
    var left_amount=$("#ruku_amount_used_Outcaigou").val()
    var purity=$("#ruku_purity_caigou").val()
    var purchase_id=$("#purchase_id_caigou").val()
    var purchase_d_id=$("#purchase_d_id_caigou").val()
    var new_amount=$("#ruku_new_amount_caigou").val()
    var unit=$("#ruku_new_unit_caigou").val()
    var enter_name=$("#ruku_enter_name_caigou").val()
    var detail_text=$("#ruku_desc2_caigou").val()
    if (space_id == null || space_id == "" || space_id == 0) {
        tip_msg("请选择仓位", "#space_name_1");
        return false;
    }
    var params_value=purchase_id + "," + product_id + "," + new_amount + "," + left_amount + "," + unit + "," + purchase_d_id + "," + space_id + "," + purity + "," + detail_text + "," + enter_name + "_";
    $.ajax({
        type: 'POST',
        url: "/inventory/productIn/purchasing_inventory_save",
        data: {
            params_value:params_value
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                //入库单点击生成
                setTimeout(function () {
                    window.location.reload()
                    //window.location.href = "/promanager/inventory/add-detail.html?purchase_id=" + purchase_id;
                }, 100);
            }
        }
    });
}

//原料待入库--->入库按钮--->模态框确认按钮-->研发
function yanfa_ruku() {
    var research_id=$("#purchase_id").val();
    var user_id=$("#staff_id").val();
    var time=new Date();
    var space_id=$("#space_id_0").val();
    var purity=$("#ruku_purity").val();
    var unit=$("#ruku_unit").val();
    var amount=$("#ruku_amount").val();
    var research_name=$("#ruku_research_name").val();
    var batch_no=$("#ruku_batch_no").val();
    var sale_batch_no=$("#ruku_sale_batch_no").val();
    var face=$("#ruku_face").val();
    var product_id=$("#product_id").val();
    if(!space_id)
    {
        tip_msg("请输入仓位", "#space_name_0");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/research/manage/researchIn",
        data: {
            research_id:research_id,
            space_id: space_id,
            unit: unit,
            purity: purity,
            amount: amount,
            batch_no: batch_no,
            product_id: product_id,
            user_id:user_id,
            time:time,
            face:face,
            sale_batch_no:sale_batch_no,
            research_name:research_name
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href="/promanager/mywork/kucun.html";
                }, 1000);
            }
        }
    })
}

//原料待入库--->入库按钮--->模态框确认按钮-->销售
function xiaoshou_ruku() {
    var sale_id=$("#purchase_id_xiaoshou").val()
    var batch_no=$("#batch_no_xiaoshou").val()
    var desc=$("#ruku_desc_xiaoshou").val()
    var amount=$("#amount_xaioshou").val()
    var params_value = batch_no + "," + desc + "," + amount;
    $.ajax({
        type: 'POST',
        url: "/inventory/productIn/vendition_in_inventory",
        data: {
            sale_id: sale_id,
            params_value: params_value
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.reload()
                }, 1000);
            }
        }
    })
}

//原料待入库-->取消入库
function cancle_submit(id){
    var id=id;
    $.ajax({
        type: 'POST',
        url: "/research/manage/researchDel",
        data: {
            research_id: id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    window.location.reload();
                }, 700);
            }
        }
    })
}


//原料待入库-->历史记录
function materialHistory(is_all) {
        $.ajax({
            type: 'POST',
            url: "/product/manager/warehouseMaterialList_history",
            data: {
                is_all:is_all
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
                        if(append[i]["stock_status"] == 5001){
                            value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["unit"] + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                        }
                    }
                    $("#data_tbody_material").html(value);
                } else {
                    layer.msg(data["message"]);
                }
            }
        })
}


//原料入库历史-->更多
function show_more_material_history(is_all) {
    materialHistory(is_all)
}

//原料待出库首页
function doSearch_material_out(is_all) {
    var inventory_type=""
    $.ajax({
        type: 'POST',
        url: "/inventory/productOut/inventory_out_list",
        data: {
            is_all:is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_material_out").html(data["append_ext"]);
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    //暂时先改成cas 和sku
                    var html = "";
                    var name = "";
                    var html1="";
                    if (append[i]["out_type"] == 9001) {
                        name += append[i]["purchase_name"] + "【<strong><font color='red'>采退</font></strong>】"

                    }
                    if (append[i]["out_type"] == 9002) {
                        name += append[i]["purchase_name"] + "【<strong><font color='blue'>销售</font></strong>】"
                    }

                    if (append[i]["out_type"] == 9003 && append[i]["stock_status"] != 8001) {
                        html1 +=  '<a id="inv_out_cancle"  class="btn btn-success btn-sm" type="button" onclick="cancle_inventory_info(' + append[i]["purchase_id"] + ')">取消</a>';
                    }
                    if (append[i]["out_type"] == 9003) {
                        name += append[i]["purchase_name"] + "【<strong><font color='red'>领用</font></strong>】"
                    }
                    if (append[i]["stock_status"] == 8001) {
                        html += '<span class="label label-success">' + append[i]["stock_status_name"] + '</span>';
                    } else if (append[i]["stock_status"] == 8002) {
                        html += '<span class="label label-danger">' + append[i]["stock_status_name"] + '</span></span>';
                    } else if (append[i]["stock_status"] == 8003) {
                        html += '<span class="label label-info">' + append[i]["stock_status_name"] + '</span>';
                    }
                    var html2 = '';
                    if (append[i]["stock_status"] != 8001) {
                        html2 += '<a id="inv_out_submit" class="btn btn-success btn-sm" type="button" purchase_id=' + append[i]["purchase_id"] + ' out_type=' + append[i]["out_type"] + '>出库</a>';
                    }
                    else {
                        //html2 += '<input id="inv_out_detail" disabled="disabled" type="button" class="btn btn-link btn-xs" onclick="out_inventory_info(' + append[i]["purchase_id"] + ',' + append[i]["out_type"] + ')" value="详情"/>' ;
                        /* '<input id="inv_out_del" type="button" class="btn btn-link btn-xs" data="' + append[i]["purchase_id"] + '" value="取消"/>';*/
                    }
                    if (append[i]["stock_status"] == 5002 || append[i]["stock_status"] == 5001||append[i]["stock_status"] == 11004 ){}
                    else {
                        value += '\
                    <tr >\
                       <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["amount"]) + '' + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + append[i]["out_type_str"] + '</td>\
                        <td>' + append[i]["staff_name_return"] + '</td>\
                         <td>' + html + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["return_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["supplier_name"]) + '</td>\
                         <td class="operation">' + html2 + ''+html1+'</td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody_material_out").html(value);
                $("a[id*='inv_out_submit']").each(function () {
                    $(this).click(function () {
                        $('#chuku_modal').modal('show')
                        var out_type=$(this).attr("out_type")
                        var purchase_id=$(this).attr("purchase_id")
                        $("#out_type_id").val(out_type)

                            if (out_type == 9001) {         //采退
                                $.ajax({
                                    type: 'POST',
                                    url: "/inventory/productOut/load_out_inventory",
                                    data: {
                                        purchase_id: purchase_id
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        if (data["result"] == "success") {
                                            var append = data["append"]["outInventoryList"];
                                            var append2 = data["append"]["materialPurchase"];
                                            for (var i = 0; i < append.length; i++) {
                                                $("#product_id_chuku").val(append[i]["product_id"]);
                                                $("#chuku_unit").val(append[i]["unit"]);
                                                $("#batch_no_chuku").val(append[i]["batch_no"]);
                                                $("#chuku_amount").val(append[i]["out_amount"]);
                                                $("#chuku_space_name").val(append[i]["space_name"]);
                                                $("#space_id_chuku").val(append[i]["space_id"]);
                                                $("#purchase_id_chuku").val(purchase_id)
                                                $("#purchase_d_id_chuku").val(append[i]["purchase_d_id"])
                                            }
                                        } else {
                                            layer.msg(data["message"])
                                        }
                                    }
                                });
                            } else if (out_type == 9002) {//销售

                                $.ajax({
                                    type: 'POST',
                                    url: "/vendition/manager/load_vendition_info",
                                    data: {
                                        sale_id: purchase_id
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        var a=data["appends"];
                                        if (data["result"] == "success") {
                                            var append1 = data["append"]["productSaleInfo"];
                                            var append2 = data["append"]["productSaleDetailList"];
                                            for (var i = 0; i < append2.length; i++) {
                                                $("#batch_no_chuku").val(append2[i]["batch_no"]);
                                                $("#product_id_chuku").val(append2[i]["product_id"]);
                                                $("#chuku_space_name").val(append2[i]["space_name"]);
                                                $("#chuku_amount").val(append2[i]["amount_used"]);
                                                $("#chuku_unit").val(append2[i]["unit"]);
                                                $("#unit_price_chuku").val(append2[i]["unit_price"]);
                                                $("#chuku_space_name").val(append2[i]["space_name"]);
                                                $("#space_id_chuku").val(append2[i]["space_id"]);
                                                $("#sale_d_id_chuku").val(append2[i]["sale_d_id"]);
                                                $("#purchase_id_chuku").val(purchase_id);
                                            }
                                        }
                                    }
                                })
                            }
                            else if (out_type == 9003) {//领用
                                $.ajax({
                                    type: 'POST',
                                    url: "/product_use/manage/useSelect",
                                    data: {
                                        use_id: purchase_id
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        if (data["result"] == "success") {
                                            var append1 = data["append"];
                                            $("#purchase_id_chuku").val(append1["use_id"]);
                                            $("#chuku_amount").val(append1["use_amount"]);
                                            $("#chuku_unit").val(append1["use_unit"]);
                                            $("#chuku_space_name").val(append1["space_name"]);
                                        }
                                    }
                                })
                            } else {
                                layer.msg("数据存在问题，请联系管理员");
                            }
                    })
                })
            } else {
                layer.msg(data["message"]);
            }
            /* $("input[id*='inv_out_del']").each(function () {
             var id=$(this).attr("data")
             $(this).click(function(){
             alert(id)
             })
             });*/
        }
    });
}

//原料待出库-->首页加载更多
function show_more_material_out(is_all) {
    doSearch_material_out(is_all)
}

//原料待出库--->按钮
function pending_delivery_chuku() {
    var out_type_id=$("#out_type_id").val()

    if (out_type_id==9001){     //采购出库
        var product_id = $("#product_id_chuku").val();
        var unit = $("#chuku_unit").val();
        var batch_no = $("#batch_no_chuku").val();
        var amount = $("#chuku_amount").val();
        var space_id = $("#space_id_chuku").val();
        var purchase_id=$("#purchase_id_chuku").val()
        var purchase_d_id=$("#purchase_d_id_chuku").val()
        var text=$("#chuku_desc_name").val()
        var out_desc=$("#chuku_desc").val()
        var params_value = purchase_id + "," + product_id + "," + purchase_d_id + "," + batch_no + "," + unit + "," + space_id + "," + out_desc + "," + amount;

        $.ajax({
            type: 'POST',
            url: "/inventory/productOut/out_inventory_sbmit",
            data: {
                params_value: params_value,
                out_name: text
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                }
            }
        })
    } else if (out_type_id == 9002){   //销售出库
        var batch_no = $("#batch_no_chuku").val();
        var product_id = $("#product_id_chuku").val();
        var space_name = $("#chuku_space_name").val();
        var amount = $("#chuku_amount").val();
        var unit = $("#chuku_unit").val();
        var unit_price = $("#unit_price_chuku").val();
        var space_name = $("#chuku_space_name").val();
        var space_id = $("#space_id_chuku").val();
        var sale_d_id = $("#sale_d_id_chuku").val();
        var sale_id=$("#purchase_id_chuku").val();
        var text=$("#chuku_desc_name").val()
        var desc=$("#chuku_desc").val()

        var params_value = batch_no + "," + unit + "," + product_id + "," + sale_d_id + "," + unit_price + "," + space_id + "," + desc + "," + amount + "," + sale_id + "_";
        $.ajax({
            type: 'POST',
            url: "/inventory/productOut/vendition_out_inventory",
            data: {
                params_value: params_value.substr(0, params_value.lastIndexOf("_")),
                out_name: text
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                }
            }
        })
    } else if (out_type_id == 9003){   //领用出库
        var use_id=$("#purchase_id_chuku").val()
        $.ajax({
            type: 'POST',
            url: "/product_use/manage/useOut",
            data: {
                use_id: use_id
            },
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    layer.msg("操作成功");
                    setTimeout(function () {
                        //详情页面刷新
                        window.location.reload()
                    }, 1000);
                }
            }
        })
    }
}

//原料待出库-->取消按钮
function cancle_inventory_info(id){
    var id=id;
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/useDel",
        data: {
            use_id: id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    window.location.reload();
                }, 700);
            }
        }
    })

}


//原料待出库-->历史记录按钮
function material_out_History(is_all) {
    $.ajax({
        type: 'POST',
        url: "/inventory/productOut/inventory_out_list_history",
        data: {
            is_all:is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_material_out").html(data["append_ext"]);
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    var html='<span class="label label-success">' + append[i]["stock_status_name"] + '</span>'
                        value += '\
                    <tr >\
                       <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["amount"]) + '' + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + append[i]["out_type_str"] + '</td>\
                        <td>' + append[i]["staff_name_return"] + '</td>\
                         <td>' + html + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["return_time"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["supplier_name"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody_material_out").html(value);

            } else {
                layer.msg(data["message"]);
            }
        }
    })
}

//原料待出库-->历史记录加载更多
function show_more_material_out_history(is_all) {
    material_out_History(is_all)
}


//耗材待入库首页加载
$("a[id*='haocai']").each(function () {
    $(this).click(function () {
        doSearch_supplies(0);
        doSearch_supplies_out(0);
    })
})
function doSearch_supplies(is_all) {
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/PurchasingList",
        data: {
            is_all:is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_supplies_in").html(data["append_ext"]);
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    if(append[i]==null)
                    {
                        layer.msg('暂无数据');
                        return;
                    }
                    var html2 ="";
                    if (append[i]["dict_name"] =='已入库') {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: #5cb85c">已入库</button>';
                    } else if (append[i]["dict_name"] =='部分入库') {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: blue">部分入库</button>';
                    } else if (append[i]["dict_name"] =='未入库'  ) {
                        html2 += '<button type="button" datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'" class="btn btn-info" id="example" rel="popover"  data-placement="bottom" >已发货</button>';
                    }
                    var amount=append[i]["amount"];
                    var html ="";
                    var html3 =""
                    if(append[i]["dict_name"] == "部分入库" || append[i]["dict_name"] == "未入库" ||append[i]["dict_name"] == "未发货")
                    {
                        html += "<a id='con_in_submit' class='btn btn-success btn-mini' type='button' onclick='purchase_detial_supplies(" + append[i]["purchase_id"]+ ","+amount+"," + append[i]["consumable_id"]+ ")'>入库</a>";
                    }
                    else if(append[i]["dict_name"] == "返修在途" )
                    {
                        html += "<a id='con_in_submit' class='btn btn-success btn-mini' type='button' onclick='purchase_detial_repair_supplies(" + append[i]["purchase_id"]+ ","+amount+"," + append[i]["consumable_id"]+ ")'>入库</a>";
                    } if(append[i]["dict_name"]=="未鉴定" )
                    {

                    }else {
                        value += '\
                             <tr >\
                             <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                             <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                             <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                             <td>' + html2 + '</td>\
                             <td>' + append[i]["staff_name"] + '</td>\
                             <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                             <td class="operation">' + html + '</td>\
                             </tr>\
                             \
                             ';
                    }
                }
                $("#data_tbody_supplies").html(value);
            } else {
                layer.msg(data["message"]);
            }
        }
    })
}

//耗材待入库--->入库按钮
function purchase_detial_supplies(purchase_id,amount,consumable_id) {
    $.alle_dialog('/promanager/consumableInventory/add_consumable.html?purchase_id=' + purchase_id + '&amount=' +amount+ '&consumable_id=' +consumable_id,'耗材入库', ["50%", "90%"])
}
function purchase_detial_repair_supplies(purchase_id,amount,consumable_id) {
    $.alle_dialog('/promanager/consumableInventory/add_consumable.html?purchase_id=' + purchase_id + '&amount=' +amount+ '&consumable_id=' +consumable_id+'&flag=1','耗材入库', ["50%", "90%"])
}

//耗材待入库-->首页加载更多
function show_more_supplies_in(is_all) {
    doSearch_supplies(is_all)
}

//耗材待入库-->历史记录
function ruku_supplies_history(is_all) {
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/PurchasingList_history",
        data: {
            is_all:is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_supplies_in").html(data["append_ext"]);
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    if(append[i]==null)
                    {
                        layer.msg('暂无数据');
                        return;
                    }
                    var html2 ="";
                    if (append[i]["dict_name"] =='已入库') {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: #5cb85c">已入库</button>';
                    } else if (append[i]["dict_name"] =='部分入库') {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: blue">部分入库</button>';
                    } else if (append[i]["dict_name"] =='未入库'  ) {
                        html2 += '<button type="button" datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'" class="btn btn-info" id="example" rel="popover"  data-placement="bottom" >已发货</button>';
                    }
                    var amount=append[i]["amount"];
                    var html ="";
                    var html3 =""
                    if(append[i]["dict_name"] == "部分入库" || append[i]["dict_name"] == "未入库" ||append[i]["dict_name"] == "未发货")
                    {
                        html += "<a id='con_in_submit' class='btn btn-success btn-mini' type='button' onclick='purchase_detial_supplies(" + append[i]["purchase_id"]+ ","+amount+"," + append[i]["consumable_id"]+ ")'>入库</a>";
                    }
                    else if(append[i]["dict_name"] == "返修在途" )
                    {
                        html += "<a id='con_in_submit' class='btn btn-success btn-mini' type='button' onclick='purchase_detial_repair_supplies(" + append[i]["purchase_id"]+ ","+amount+"," + append[i]["consumable_id"]+ ")'>入库</a>";
                    } if(append[i]["dict_name"]=="未鉴定" )
                    {

                    }else {
                        value += '\
                             <tr >\
                             <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                             <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                             <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                             <td>' + html2 + '</td>\
                             <td>' + append[i]["staff_name"] + '</td>\
                             <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                             <td class="operation">' + html + '</td>\
                             </tr>\
                             \
                             ';
                    }
                }
                $("#data_tbody_supplies").html(value);
            } else {
                layer.msg(data["message"]);
            }
        }
    })
}

//耗材待入库-->历史记录加载更多
function show_more_supplies_in_history(is_all) {
    ruku_supplies_history(is_all)
}

//耗材待出库-->首页加载
function doSearch_supplies_out(is_all) {
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/UseList",
        data: {
            is_all:is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_supplies_out").html(data["append_ext"]);
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    if(append[i]==null)
                    {
                        layer.msg('暂无数据');
                        return;
                    }
                    var html2 ="";
                    var html4="";
                    if (append[i]["dict_name"] =='已出库') {
                        html2 += '<input type="hidden" id="use_id" value="'+$.alle_null2Str(append[i]["use_id"])+'">'+'<span class="label label-success" style="background-color: #5cb85c">已出库</span>';
                    } else if (append[i]["dict_name"] =='部分出库') {
                        html2 +='<input type="hidden" id="use_id" value="'+$.alle_null2Str(append[i]["use_id"])+'">'+ '<span class="label label-info" style="background-color: #5cb85c">部分出库</span>';
                    } else if (append[i]["dict_name"] =='未出库') {
                        html2 += '<input type="hidden" id="use_id" value="'+$.alle_null2Str(append[i]["use_id"])+'">'+'<span class="label label-danger">未出库</span>';
                        html4 += "<a id='con_out_cancle' class='btn btn-success btn-mini' type='button' onclick='out_cancle(" + append[i]["use_id"]+ ")'>取消</a>";
                    }
                    var html ="";
                    var html3 ="";
                    if(append[i]["dict_name"] != "已出库")
                    {
                        html += "<a id='con_out_submit' class='btn btn-success btn-mini' type='button' onclick='out_detial(" + append[i]["stock_id"]+ "," + append[i]["use_id"]+ ","+append[i]["amount"]+"," + append[i]["consumable_id"]+ ")'>出库</a>";
                    }
                    value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                        <td>' + append[i]["space_name"] + '</td>\
                        <td>' + html2 + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                         <td class="operation">' + html + ''+html4+'</td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody_supplies_out").html(value);
            } else {
                layer.msg(data["message"]);
            }
        }
    })
}

//耗材待出库首页加载更多
function show_more_supplies_out(is_all) {
    doSearch_supplies_out(is_all)
}

//耗材待出库-->出库按钮
function out_detial(stock_id,use_id,amount,consumable_id) {
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/out_use",
        data: {
            stock_id: stock_id,
            use_id: use_id,
            consumable_id:consumable_id,
            amount:amount
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {

                setTimeout(function () {

                    window.location.reload();

                }, 1000);
            }

        }
    })
}

//耗材待出库-->取消按钮
function out_cancle(id) {
    var id=id;
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/useDel",
        data: {
            use_id: id
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            }

        }
    })
}

//耗材待出库-->历史记录
function supplies_out_history(is_all) {
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/UseList_history",
        data: {
            is_all:is_all
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#count_supplies_out").html(data["append_ext"]);
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    if(append[i]==null)
                    {
                        layer.msg('暂无数据');
                        return;
                    }
                    var html2 ='<span class="label label-success" style="background-color: #5cb85c">已出库</span>';
                    value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                        <td>' + append[i]["space_name"] + '</td>\
                        <td>' + html2 + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                         <td></td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody_supplies_out").html(value);
            } else {
                layer.msg(data["message"]);
            }
        }
    })
}

//耗材待出库-->历史记录加载更多
function show_more_supplies_out_history(is_all) {
    supplies_out_history(is_all)
}