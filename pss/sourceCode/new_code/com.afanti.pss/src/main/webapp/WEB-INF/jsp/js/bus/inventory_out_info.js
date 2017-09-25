var purchase_id = "";
$(function () {
    purchase_id = $.alle_getUrlParam("purchase_id");
    $("#back").click(function () {
        window.location.href = "/promanager/inventory/edit.html?purchase_id=" + purchase_id;
    });
    load_purchasing_inventory();

    $("#submit").click(function () {
        purchansing_return_sumbit()
    })
    $("#showView").click(function () {
        showInventory();
    })
    $("#checkAll").click(function () {
        if (this.checked) {
            $('input[name="checkbox"]').each(function () {
                this.checked = true;
            })
        } else {
            $('input[name="checkbox"]').each(function () {
                this.checked = false;
            })
        }
    });

    $("#batch_submit").click(function () {
        var checks = "";
        $('input[name="checkbox"]').each(function () {
            if (this.checked) {
                checks += "true";
            }
        });
        if (checks == null || checks == "") {
            layer.msg("至少选择一个选项")
            return false;
        }
        layer.prompt({title: '请输出库单单名', formType: 0}, function (text, index) {
            var params_value = "";
            $('input[name="checkbox"]').each(function () {
                if (this.checked) {
                    var params = $(this).val();
                    var params_sp = params.split(",");
                    var purchase_id = params_sp[0];
                    var product_id = params_sp[1];
                    var purchase_d_id = params_sp[2];
                    var batch_no = params_sp[3];
                    var unit = params_sp[4];
                    var space_id = params[5];
                    var out_desc = $("#out_desc_" + batch_no).val();
                    var amount = $("#amount_" + batch_no).val();
                    params_value += purchase_id + "," + product_id + "," + purchase_d_id + "," + batch_no + "," + unit + "," + space_id + "," + out_desc + "," + amount + "_";
                }
            });
            $.ajax({
                type: 'POST',
                url: "/inventory/productOut/out_inventory_sbmit",
                data: {
                    params_value: params_value.substr(0, params_value.lastIndexOf("_")),
                    out_name: text
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        window.location.href = "/promanager/inventory/inventory_out_info.html?purchase_id=" + purchase_id;
                    }
                }
            });
        });
    })
})
function load_purchasing_inventory() {
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
                $("#purchase_name").html(append2["purchase_name"]);
                $("#supplier_name").html(append2["supplier_name"]+"/"+append2["linkman_name"]);
                $("#all_total").html(append2["all_total"]);
                $("#purchase_time").html(append2["staff_name"]+"/"+$.alle_time2str_yymm_dd_hhmmss(append2["purchase_time"]));
                $("#desc").html(append2["desc"]);
                for (var i = 0; i < append.length; i++) {
                    var product_id = append[i]["product_id"];
                    var product_name = append[i]["name_en"];
                    var amount = append[i]["amount"];
                    var unit = append[i]["unit"];
                    var amount_used = append[i]["amount_used"];
                    var enter_d_ids = append[i]["enter_d_ids"];
                    var batch_no = append[i]["batch_no"];
                    var out_amount = append[i]["out_amount"];
                    var reason = append[i]["reason"];
                    var space_name = append[i]["space_name"];
                    var space_id = append[i]["space_id"];
                    var out_desc = append[i]["out_desc"];
                    var stock_status = append[i]["stock_status"];
                    var stock_status_name = append[i]["stock_status_name"];
                    var product_type_name = append[i]["product_type_name"];
                    var purity = append[i]["purity"];
                    load_product(product_id, product_name, enter_d_ids, unit, amount_used, batch_no, space_name, out_desc, space_id, stock_status, stock_status_name, product_type_name, purity);
                }
            } else {
                layer.msg(data["message"])
            }
        }
    });
}

function load_product(product_id, pro_name, purchase_d_id, unit, amount_used, batch_no, space_name, out_desc, space_id, stock_status, stock_status_name, product_type_name, purity) {
    var unit_str = "'" + unit + "'"
    var batch_no_str = "'" + batch_no + "'"
    var html2 = "";
    if (stock_status == 8001) {
        html2 += '<span class="label label-success">' + stock_status_name + '</span>';
    } else if (stock_status == 8002) {
        html2 += '<span class="label label-danger">' + stock_status_name + '</span></span>';
    } else if (stock_status == 8003) {

        html2 += '<span class="label label-info">' + stock_status_name + '</span>';
    }
    var $product_table = $('#product_table');
    var $html = '';


    $html += '<tr id="tr_' + batch_no + '">'
    if (stock_status == 8003 || stock_status == 8002) {
        $html += '<td><input type="checkbox" id="checkbox" name="checkbox" value="' + purchase_id + ',' + product_id + ',' + purchase_d_id + ',' + batch_no + ',' + unit + ',' + space_id + '"/></td>'
    } else {
        $html += '<td></td>';
    }
    $html += '<td><span id="batch_no_"' + batch_no + '>' + batch_no + '</span></td>';
    $html += '<td><input type="hidden" id="purchase_d_id_' + batch_no + '" value="' + purchase_d_id + '"/> <span id="pro_name_"' + batch_no + '>' + pro_name + '</span><input id="product_id_' + batch_no + '" value="' + product_id + '" type="hidden"/> </td>';
    $html += '<td><span>' + html2 + '</span></td>';
    $html += '<td><span>' + purity + '%</span></td>';
    $html += '<td><input style="width: 60px" readonly="readonly"  id="amount_' + batch_no + '" type="text" value="' + amount_used + '" class="form-control input-sm"/>';
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "g") {
        $html += 'g';
    }
    if (unit == "ml") {
        $html += 'ml';
    }
    if (unit == "L") {
        $html += 'L';
    }
    if (unit == "l") {
        $html += 'L';
    }
    $html += '</td>';
    $html += '<td><textarea id="space_name_' + batch_no + '"  readonly="readonly" class="form-control left" rows="1" cols="20">' + space_name + '</textarea></td>';

    if (out_desc != null && out_desc != '') {
        $html += '<td><textarea id="out_desc_' + batch_no + '"  readonly="readonly" class="form-control left" rows="1" cols="15">' + out_desc + '</textarea></td>';
    } else {
        $html += '<td><textarea id="out_desc_' + batch_no + '" class="form-control left" rows="1" cols="15"></textarea></td>';
    }
    if (stock_status == 8003 || stock_status == 8002) {
        $html += '<td><a onclick="javascript:out_inventory_sbmit(' + purchase_id + ',' + product_id + ',' + purchase_d_id + ',' + batch_no_str + ',' + unit_str + ',' + space_id + ')">出库</a> </td>';
    } else {
        $html += '<td><a href="/promanager/inventory/OutboundOrder.html?purchase_id='+purchase_id+'&pro_name='+pro_name+'">预览</a>'+'</td>';//链接到html
    }
    $product_table.prepend($html);
}
function out_inventory_detail(purchase_d_id) {
    $.ajax({
        type: 'POST',
        url: "/inventory/productOut/out_inventory_detail",
        data: {
            purchase_d_id: purchase_d_id,
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append = data["append"];
                var showDetial = '<div style="width: 98%;margin-top: 10px;margin-left: 5px"><p class="lead">采购单出库详情</p> ' +
                    '<table class="table" style="margin-top: -10px"> <tbody>' +
                    '<tr> ' +
                    '<th style="width:40%">出库名称:</th>' +
                    '<td>' + append["out_name"] + '</td> ' +
                    '</tr>' +
                    '<tr> ' +
                    '<th>产品名称</th>' +
                    '<td>' + append["product_name"] + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>出库量</th>' +
                    '<td>' + append["amount_str"] + '</td>' +
                    '</tr>' +
                    '<tr><th>出库人</th>' +
                    '<td>' + append["staff_name"] + '</td>' +
                    '</tr>' +
                    '<tr><th>出库时间</th><td>' + $.alle_time2str_yymm_dd_hhmmss(append["out_date"]) + '</td></tr>' +
                    '<tr><th>出库描述</th><td>' + append["out_desc"] + '</td></tr></tbody></table></div>';
            } else {
                layer.msg(data["message"]);
            }
            $.alle_dialog_mini(showDetial);
        }
    });

}
function showInventory() {
    window.location.href = "/promanager/purchasing/detail.html?type=out_inventory&purchase_id=" + purchase_id;
}

function out_inventory_sbmit(purchase_id, product_id, purchase_d_id, batch_no, unit, space_id) {
    var out_desc = $("#out_desc_" + batch_no).val();
    var amount = $("#amount_" + batch_no).val();
    layer.prompt({title: '请输入出库单名称', formType: 0}, function (text, index) {
        var params_value = purchase_id + "," + product_id + "," + purchase_d_id + "," + batch_no + "," + unit + "," + space_id + "," + out_desc + "," + amount;
        layer.close(index);
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
                        window.location.href = "/promanager/inventory/inventory_out_info.html?purchase_id=" + purchase_id;
                    }, 1000);
                }
            }
        });
    });
}
