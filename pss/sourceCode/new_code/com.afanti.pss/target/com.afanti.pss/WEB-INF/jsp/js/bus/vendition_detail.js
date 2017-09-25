var sale_id = "";
var type = "";
$(function () {
    sale_id = $.alle_getUrlParam("sale_id");
    type = $.alle_getUrlParam("type");
    $("#back").click(function () {
        if (type == "inventory_vendition_out") {
            window.location.href = "/promanager/inventory/inventory_vendition_out_info.html?sale_id=" + sale_id;
        }
        if (type == "vendition_inventory_in") {
            window.location.href = "/promanager/inventory/inventory_vendition_in_info.html?sale_id=" + sale_id;
        }
        if (type == "vendition_return") {
            window.location.href = "/promanager/vendition/vendition_return_submit.html?sale_id=" + sale_id;
        }
        if (type == "vendition") {
            window.location.href = "/promanager/vendition/index.html";
        }
    });
    load_vendition_info()
})
function load_vendition_info() {
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/load_vendition_info",
        data: {
            sale_id: sale_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append2 = data["append"]["productSaleDetailList"];
                var append1 = data["append"]["productSaleInfo"];
                $("#sale_name").html(append1["sale_name"]);
                $("#supplier_name").html(append1["supplier_name"]+"/"+$.alle_null2Str(append1["c_linkeman_name"]));
                $("#sale_time").html(append1["staff_name"]+"/"+$.alle_time2str_yymm_dd_hhmmss(append1["sale_time"]));
                $("#customer_id").html(append1["customer_id"]);
                $("#all_total").html(append2[0]["unit_price"]);
                $("#desc").html(append1["desc"]);
                for (var i = 0; i < append2.length; i++) {
                    var batch_no = append2[i]["batch_no"];
                    var product_id = append2[i]["product_id"];
                    var product_name = append2[i]["product_name"];
                    var amount = append2[i]["amount"];
                    var amount_used = append2[i]["amount_used"];
                    var unit = append2[i]["unit"];
                    var purity = append2[i]["purity"];
                    var desc = append2[i]["desc"];
                    var unit_price = append2[i]["unit_price"];
                    var pro_type_name = append2[i]["product_type_name"];
                    var space_name = append2[i]["space_name"];
                    var space_id = append2[i]["space_id"];
                    load_product(batch_no, product_id, product_name, pro_type_name, amount, amount_used, unit, purity, unit_price, space_id, space_name, desc);
                }
            } else {
                layer.msg(data["append"]["message"]);
            }
        }
    });
}
function load_product(batch_no, product_id, product_name, pro_type_name, amount, amount_used, unit, purity, unit_price, space_id, space_name, desc) {

    var batch_no2 = "'" + batch_no + "'";
    var $product_table = $('#tbody');
    var $html = '';
    $html += '<tr id="tr_' + batch_no + '">'
    $html += '<td><span>' + $.alle_null2Str( batch_no) + '</span> </td>';
    $html += '<td><span>' + $.alle_null2Str( product_name)+ '</span> </td>';
    $html += '<td><span> ' + $.alle_null2Str( purity) + '</span></td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;">' + amount + ''
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
    if (unit == "kg") {
        $html += 'kg';
    }
    $html += '</span></td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;">' + amount_used + ''
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
    if (unit == "kg") {
        $html += 'kg';
    }
    $html += '</span></td>';
    $html += '<td>';
    $html += '<span>' + $.alle_null2Str( unit_price) + ' 元</span>';
    $html += '</td>';
    $html += '<td><span>' + $.alle_null2Str( space_name) + '</span></td>';
    $html += '<td><span>' + $.alle_null2Str( desc) + '</span></td>';
    $html += '</tr>';
    $product_table.prepend($html);
}


