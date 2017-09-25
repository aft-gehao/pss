var purchase_id = "";
var is_flag = 0;
$(function () {
    purchase_id = $.alle_getUrlParam("purchase_id");
    is_flag= $.alle_getUrlParam("is_flag");
    var type = $.alle_getUrlParam("type");
    $("#back").click(function () {
        if( type == "purchasing") {
            window.location.href = "/promanager/purchasing/index.html";
        }
        if( type == "inventory") {
            window.location.href = "/promanager/inventory/add-detail.html?purchase_id="+purchase_id;
        }
        if(type =="purchansing_return")
        {
            window.location.href = "/promanager/purchasing/purchansing_return_submit.html?purchase_id="+purchase_id+"&is_flag="+is_flag;
        }
        if(type=="out_inventory")
        {
            window.location.href = "/promanager/inventory/inventory_out_info.html?purchase_id="+purchase_id;
        }
    })
    load_purchasing_info()
})

function load_purchasing_info() {
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/manager/load_purchasing_info",
        data: {
            purchase_id: purchase_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append1 = data["append"]["materialPurchase"];
                $("#purchase_name").html(append1["purchase_name"]);
                $("#supplier_name").html(append1["supplier_name"]+"/"+append1["linkman_name"]);
                $("#all_total").html(append1["all_total"]);
                $("#purchase_time").html(append1["staff_name"]+"/"+$.alle_time2str_yymm_dd_hhmmss(append1["purchase_time"]));
                $("#desc").html(append1["desc"]);
                var append2 = data["append"]["materialPurchaseDetailList"];
                for (var i = 0; i < append2.length; i++) {
                    var product_id = append2[i]["product_id"];
                    var cas= append2[i]["cas"] ;
                    var sku= append2[i]["sku"] ;
                    var name_ch= append2[i]["name_ch"] ;
                    var product_name = append2[i]["product_name"] ;
                    var amount = append2[i]["amount"];
                    var unit = append2[i]["unit"];
                    var purity = append2[i]["purity"];
                    var desc = append2[i]["desc"];
                    var unit_price = append2[i]["unit_price"];
                    var pro_type_name = append2[i]["product_type_name"];

                    load_product(product_id, product_name,pro_type_name, amount, unit, purity, unit_price, desc,cas,sku,name_ch);
                }
            }
        }
    });
}

function load_product(product_id, pro_name,pro_type_name, amount, unit, purity, unit_price, desc,cas,sku,name_ch) {
    var $product_table = $('#tbody');
    var $html = '';
    $html += '<tr">'

    $html += '<td><span>' +$.alle_null2Str(cas)  + '</span> </td>';
    $html += '<td><span>' + $.alle_null2Str(name_ch) +'</span> </td>';
    $html += '<td><span>' + $.alle_null2Str(pro_name) + '</span> </td>';
    $html += "<td>";
    $html += '<span>'+amount+'</span>'
    $html += '<span>';
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
    $html += '</span>';
    $html += '</td>';
    $html += '<td><span>'+purity+'</span><span></span>%</td>';
    $html += '<td>';
    $html += '<span> '+unit_price+' </span>';
    $html += '<span class="ml10">元</span>';
    $html += '</td>';
    $html += '<td><span>'+desc+'</span></td>';
    $html += '</tr>';
    $product_table.prepend($html);
}
