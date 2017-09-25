$(function () {
    /*进页面默认执行dosearch函数*/
    $("#cehngpin").show()
    $("#pages_cehngpin").show()
    $("#type_id").val("3")
    $("#product_type").val("4002")
    $("#a_chengpin").attr("class", "active");
    $("#search").attr('placeholder','CAS,SKU,英文名')
    doSearch(1);
    /*$("#inv_realtime_query").click(function () {
        doSearch(1);
    })*/
})
/*function doSearch(p) {
    var cas = $("#cas").val();
    var nameCh = $("#nameCh").val();
    var sku = $("#sku").val();
    var nameEn = $("#nameEn").val();
    var material=$("#material").val();
    $.ajax({
        type: 'POST',
        url: "/inventory/realtimeInventory/stockSelect",
        data: {
            material:material,
            sku:sku,
            cas: cas,
            nameCh: nameCh,
            nameEn: nameEn,
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
                    var unit=append[i]["unit"];
                    if(unit=='kg'||unit=='g'||unit=='mg'){
                        value += '\
                    <tr >\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td style="width: 400px">' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                        <td>' + (append[i]["amountFloat"])+ ''+"g"+'</td>\
                         <td class="operation"><input id="inv_realtime_detail" disabled="disabled" type="button" class="btn btn-link btn-xs" onclick="real_time_detail(' + append[i]["product_id"] + ')"  value="详情"/></td>\
                        </tr>\
                    \
                    ';
                    }
                    else if(unit=='ml'||unit=='l'){
                        value += '\
                    <tr >\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td style="width: 400px">' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                        <td>' + (append[i]["amountFloat"]) + 'ml'+""+'</td>\
                         <td class="operation"><input id="inv_realtime_detail" disabled="disabled" type="button" class="btn btn-link btn-xs" onclick="real_time_detail(' + append[i]["product_id"] + ')"  value="详情"/></td>\
                        </tr>\
                    \
                    ';

                    }
                }
                $("#data_tbody").html(value);
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}*/

function real_time_detail(product_id) {
    var product_type=$("#product_type").val()
    if(product_type==4001){
        window.location.href='/promanager/researchAndUse/material_detail.html?productId=' + product_id;
    }else {
        window.location.href = '/promanager/inventory/detail.html?productId=' + product_id;
    }

}
function doSearch(p) {
    var type_id=$("#type_id").val()
    var search=$("#search").val()
    var flag=1;
    if (type_id==1){//耗材
        $("#yuanliao").hide()
        $("#pages_yuanliao").hide()
        $("#chengpin").hide()
        $("#pages_chengpin").hide()
        $("#haocai").show()
        $("#pages_haocai").show()

        $.ajax({
            type: 'POST',
            url: "/consumable/manager/stockPage",
            data: {
                p: p,
                flag:flag,
                search:search
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
                        <td>' + append[i]["pack"] + '</td>\
                        <td>' + append[i]["total"] + append[i]["consumable_unit"]+'</td>\
                        <td class="operation">\
                         <a  data="' + append[i]["consumable_id"] + '" id="con_stock_det"   class="btn btn-success">详情</a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                    $("#data_tbody_haocai").html(value);
                    $("a[id*='con_stock_det']").each(function () {
                        $(this).click(function(){
                            window.location.href="/promanager/consumable/consumable_stock_detail.html?consumable_id="+$(this).attr("data");
                        })
                    });
                    //调用设置分页
                    PAGE_INIT("#pages_haocai", data["append"].pageNo, data["append"].totalPage);
                } else {
                    layer.msg(data["message"]);
                }
            }
        });
    }else if (type_id==2){//原料
        var product_type=$("#product_type").val()
        $("#haocai").hide()
        $("#pages_haocai").hide()
        $("#chengpin").hide()
        $("#pages_chengpin").hide()
        $("#yuanliao").show()
        $("#pages_yuanliao").show()
        $.ajax({
            type: 'POST',
            url: "/inventory/realtimeInventory/stockSelect",
            data: {
                product_type:product_type,
                p: p,
                search:search
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
                        var unit=append[i]["unit"];
                        if(unit=='kg'||unit=='g'||unit=='mg'){
                            value += '\
                    <tr >\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td style="width: 400px">' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                        <td>' + (append[i]["amountFloat"])+ ''+"g"+'</td>\
                         <td class="operation"><a id="inv_realtime_detail" type="button" class="btn btn-success" onclick="real_time_detail(' + append[i]["product_id"] + ')">详情</a></td>\
                        </tr>\
                    \
                    ';
                        }
                        else if(unit=='ml'||unit=='l'){
                            value += '\
                    <tr >\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td style="width: 400px">' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                        <td>' + (append[i]["amountFloat"]) + 'ml'+""+'</td>\
                         <td class="operation"><a id="inv_realtime_detail" type="button" class="btn btn-success" onclick="real_time_detail(' + append[i]["product_id"] + ')">详情</a></td>\
                        </tr>\
                    \
                    ';
                        }
                    }
                    $("#data_tbody_yuanliao").html(value);
                    //调用设置分页
                    PAGE_INIT("#pages_yuanliao", data["append"].pageNo, data["append"].totalPage)
                } else {
                    layer.msg(data["message"]);
                }
            }
        });
    }else if (type_id==3){//成品
        var product_type=$("#product_type").val()
        $("#haocai").hide()
        $("#pages_haocai").hide()
        $("#yuanliao").hide()
        $("#pages_yuanliao").hide()
        $("#chengpin").show()
        $("#pages_chengpin").show()
        $.ajax({
            type: 'POST',
            url: "/inventory/realtimeInventory/stockSelect",
            data: {
                product_type:product_type,
                p: p,
                search:search
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
                        var unit=append[i]["unit"];
                        if(unit=='kg'||unit=='g'||unit=='mg'){
                            value += '\
                    <tr >\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td style="width: 400px">' + $.alle_null2Str(append[i]["nameEn"]) + '</td>\
                        <td>' + (append[i]["amountFloat"])+ ''+"g"+'</td>\
                         <td class="operation"><a id="inv_realtime_detail" type="button" class="btn btn-success" onclick="real_time_detail(' + append[i]["product_id"] + ')">详情</a></td>\
                        </tr>\
                    \
                    ';
                        }
                        else if(unit=='ml'||unit=='l'){
                            value += '\
                    <tr >\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td style="width: 110px">' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td style="width: 400px">' + $.alle_null2Str(append[i]["nameEn"]) + '</td>\
                        <td>' + (append[i]["amountFloat"]) + 'ml'+""+'</td>\
                         <td class="operation"><a id="inv_realtime_detail" type="button" class="btn btn-success" onclick="real_time_detail(' + append[i]["product_id"] + ')">详情</a></td>\
                        </tr>\
                    \
                    ';

                        }
                    }
                    $("#data_tbody_chengpin").html(value);
                    //调用设置分页
                    PAGE_INIT("#pages_chengpin", data["append"].pageNo, data["append"].totalPage)
                } else {
                    layer.msg(data["message"]);
                }
            }
        });
    }

}




//类型来源

//耗材
function supplies_type(e) {
    $("#search").val("")
    $("#type_id").val("1")
    $("#a_haocai").attr("class", "active");
    $("#a_yuanliao").attr("class", "");
    $("#a_chengpin").attr("class", "");
    $("#type_source").html($(e).html())
    $("#search").attr('placeholder','耗材名')
    doSearch(1)
}
//原料
function material_type(e) {
    $("#search").val("")
    $("#type_id").val("2")
    $("#product_type").val("4001")
    $("#a_yuanliao").attr("class", "active");
    $("#a_chengpin").attr("class", "");
    $("#a_haocai").attr("class", "");
    $("#type_source").html($(e).html())
    $("#search").attr("placeholder","CAS,中文名")
    doSearch(1)
}
//成品
function finished_product_type(e) {
    $("#search").val("")
    $("#type_id").val("3")
    $("#product_type").val("4002")
    $("#a_chengpin").attr("class", "active");
    $("#a_yuanliao").attr("class", "");
    $("#a_haocai").attr("class", "");
    $("#type_source").html($(e).html())
    $("#search").attr('placeholder','CAS,SKU,英文名')
    doSearch(1)
}

//条件查询
$("#search_key_btn").click(function(){
    doSearch(1)
})