var purchase_id = "";
var stock_status = 0;
$(function () {
    stock_status = $.alle_getUrlParam("stock_status");
    var use_id = 0;
    use_id = $.alle_getUrlParam("use_id");
    var is_sale=$.alle_getUrlParam("is_sale");
    var supplier_id=$.alle_getUrlParam("supplier_id");
$("#back").click(function(){

    window.location.href="/promanager/inventory/edit.html";
    
})
    load_vendition_info(use_id)
})
function load_vendition_info(use_id,is_sale,supplier_id) {
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/useSelect",
        data: {
            use_id: use_id
        },
        dataType: "json",
        success: function (data) {
            var a=data["appends"];
            // alert(a);
            if (data["result"] == "success") {
                var append1 = data["append"];
                $("#use_name").html(append1["use_name"]);
                $("#staff_name").html(append1["staff_name"]+"/"+$.alle_time2str_yymm_dd_hhmmss
                    (append1["use_time"]));
                     var use_id = append1["use_id"];
                    var batch_no = append1["use_batch_no"];
                    var product_id = append1["product_id"];
                    var cas = append1["cas"];
                    var sku = append1["sku"];
                    var product_name = append1["nameEn"];
                    var amount =append1["use_amount"];
                    var amount_used = 0;
                    var unit =append1["use_unit"];
                   /* var purity = append2[i]["purity"];*/
                    var space_name =append1["space_name"];
                    var space_id =append1["space_id"];
                    var sale_status = append1["status"];
                    var sale_status_name = append1["dict_name"];
                    load_product(use_id,batch_no, product_id, product_name, amount,  unit, space_id, space_name, sale_status, sale_status_name,cas,sku,a);
                }
            }
    });
}
function load_product(use_id,batch_no, product_id, pro_name,  amount,  unit,  space_id, space_name, sale_status, sale_status_name,cas,sku,a) {
    var batch_no2 = "'" + batch_no + "'";
    var $product_table = $('#product_table');
    var unit_str = "'" + unit + "'";
    var html2 = "";

    if (sale_status == 8001) {
        html2 += '<span class="label label-success">已出库</span>';
    } else if (sale_status == 8002) {
        html2 += '<span class="label label-danger">未出库</span></span>';

    } else if (sale_status == 8003) {
        html2 += '<span class="label label-info">部分出库</span>';
    }

    var $html = '';
    $html += '<tr id="tr_' + batch_no + '">'
    if (sale_status == 8002 || sale_status == 8003) {
        $html += '<td></td>';
    } else {
        $html += '<td></td>';
    }
    $html += '<td><span>'+$.alle_null2Str(cas)+'</span></td>';
    $html += '<td><span>'+$.alle_null2Str(sku)+'</span></td>';
    $html += '<td><span id="batch_no_str"' + batch_no + '>' + batch_no + '</span><input type="hidden" id="batch_no_' + batch_no + '" value="' + batch_no + '"/> </td>';
    $html += '<td><span id="pro_name_"' + batch_no + '>' + pro_name + '</span><input id="product_id_' + batch_no + '" value="' + product_id + '" type="hidden"/> </td>';
    // $html += '<td><span id="pro_type_name"' + batch_no + '>' + pro_type_name + '</span></td>';
    $html += '<td><span></span>' + html2 + '</span></td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input readonly="readonly" id="amount_' + batch_no + '" value="' + amount + '" type="text" class="form-control input-sm" placeholder="" style="width: 68%;"></span>'
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "g") {
        $html += 'g';
    }
    if (unit == "ml") {
        $html += 'ml';
    }
    if (unit == "l") {
        $html += 'L';
    }
    if (unit == "L") {
        $html += 'L';
    }
    $html += '</td>';
    $html += '<td><input type="hidden" id="space_id_' + batch_no + '" value="' + space_id + '"/> <textarea id="space_name_' + batch_no + '" title="' + space_name + '" readonly="readonly" class="form-control left" rows="1" cols="15">' +  $.alle_null2Str(space_name) + '</textarea></td>';

    $html += '<td>';
    //alert(sale_status);
    if (sale_status == 8002 || sale_status == 8003) {
       $html += '<a data="'+use_id+'" is_sale="'+$.alle_getUrlParam("is_sale")+'" supplier_id="'+$.alle_getUrlParam("supplier_id")+'" onclick="useOut(this)">出库</a>';
    }else{
        $html += '<a href="/promanager/inventory/OutboundOrder.html?purchase_id='+a+'&pro_name='+pro_name+'&stock_status='+stock_status+'">预览</a>';//领用详情预览
    }
    $html += '</td>';
    $html += '</tr>';
    $product_table.prepend($html);
}
function useOut(e)
{

    var use_id=$(e).attr("data");
    var is_sale=$(e).attr("is_sale");
    var supplier_id=$(e).attr("supplier_id");
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/useOut",
        data: {
            is_sale:is_sale,
            supplier_id:supplier_id,
            use_id: use_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/promanager/inventory/edit.html";
                }, 1000);
            }

        }

    })
}
/*
function vendition_out_inventory(batch_no, unit, product_id, sale_d_id, unit_price, space_id) {
    var desc = $("#desc_" + batch_no).val();
    var amount = $("#amount_" + batch_no).val();
    layer.prompt({title: '请输入出库单名称', formType: 0}, function (text, index) {
        layer.close(index);
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
                        window.location.href = "/promanager/inventory/inventory_vendition_out_info.html?sale_id=" + sale_id;
                    }, 1000);
                }
            }
        });
    });
}
*/

// function Receive_Preview(purchase_id){
//     $.ajax({
//         type: 'POST',
//         url: "/inventory/productOut/out_inventory_FeedBackPreview",
//         data: {
//             purchase_id: purchase_id
//         },
//         dataType: "json",
//         success: function (data) {
//
//         }
//     })
// }
