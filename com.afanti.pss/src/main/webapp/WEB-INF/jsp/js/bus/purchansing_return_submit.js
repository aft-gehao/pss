var purchase_id = "";
var is_flag = 0;
var sum_amount = 0;
$(function () {
    purchase_id = $.alle_getUrlParam("purchase_id");
    $("#back").click(function () {
        window.location.href = '/promanager/purchasing/edit.html';
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
        var index = layer.confirm('是否确定？', {
            btn: ['确认', '取消'] //按钮
        }, function () {
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
                    var amount = $("#amount_" + batch_no).val();
                    var reason = $("#desc_" + batch_no).val();
                    params_value += purchase_id + "," + product_id + "," + purchase_d_id + "," + batch_no + "," + unit + "," + amount + "," + reason + "_";
                }
            });
            $.ajax({
                type: 'POST',
                url: "/meterialpurchease/return/purchansing_return_sumbit",
                data: {
                    params_value: params_value.substr(0, params_value.lastIndexOf("_"))
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        window.location.href = "/promanager/purchasing/purchansing_return_submit.html?is_flag=" + is_flag + "&purchase_id=" + purchase_id;
                    }
                }
            });
        }, function () {
            layer.close(index);
        });

    })
})
function load_purchasing_inventory() {
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/return/load_purchasing_inventory_return_list",
        data: {
            purchase_id: purchase_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append = data["append"]["purchaseInventoryReturnList"];
                var append2 = data["append"]["materialPurchase"];
                $("#purchase_name").html(append2["purchase_name"]);
                $("#supplier_name").html(append2["supplier_name"]+"/"+append2["linkman_name"]);
                $("#all_total").html(append2["all_total"]);
                $("#purchase_time").html(append2["staff_name"]+"/"+$.alle_time2str_yymm_dd_hhmmss(append2["purchase_time"]));
                $("#desc").html(append2["desc"]);
                for (var i = 0; i < append.length; i++) {
                    sum_amount += parseFloat(append[i]["amount_used"]);
                    var product_id = append[i]["product_id"];
                    var product_name = append[i]["product_name"];
                    var amount = append[i]["amount"];
                    var unit = append[i]["unit"];
                    var amount_used = append[i]["amount_used"];
                    var enter_d_ids = append[i]["enter_d_ids"];
                    var batch_no = append[i]["batch_no"];
                    var out_amount = append[i]["out_amount"];
                    var reason = append[i]["reason"];
                    var space_name = append[i]["space_name"];
                    var purity = append[i]["purity"];
                    load_product(product_id, product_name, enter_d_ids, amount, unit, amount_used, batch_no, out_amount, reason, space_name, purity);
                }
            } else {
                layer.msg(data["message"])
            }
        }
    });
}

function out_inventory_detail(batch_no) {
    $.ajax({
        type: 'POST',
        url: "/inventory/productOut/out_inventory_detail",
        data: {
            batch_no: batch_no,
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append = data["append"];
                if (append != null && append != "") {
                    var showDetial = '<div style="width: 98%;margin-top: 10px;margin-left: 5px"><p class="lead">采购出库详情</p> ' +
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
                        '<tr><th>仓位</th><td>' + append["space_name"] + '</td></tr>' +
                        '<tr><th>出库时间</th><td>' + $.alle_time2str_yymm_dd_hhmmss(append["out_date"]) + '</td></tr>' +
                        '<tr><th>出库描述</th><td>' + append["out_desc"] + '</td></tr></tbody></table></div>';
                    $.alle_dialog_mini(showDetial);
                } else {
                    layer.msg("数据还没有出库");
                }
            } else {
                layer.msg(data["message"]);
            }
        }
    });

}

function load_product(product_id, pro_name, purchase_d_id, amount, unit, amount_used, batch_no, out_amount, reason, space_name, purity) {
    var unit_str = '"' + unit + '"';
    var batch_no_str = '"' + batch_no + '"'
    var $product_table = $('#product_table');
    var $html = '';
    $html += '<tr id="tr_' + batch_no + '">'
    if (parseFloat(amount_used) == 0) {
        $html += '<td></td>'
    } else {
            $html += '<td><input name="checkbox" value="' + purchase_id + ',' + product_id + ',' + purchase_d_id + ',' + batch_no + ',' + unit + '" type="checkbox"></td>'

    }

    $html += '<td><span id="batch_no_"' + batch_no + '>' + batch_no + '</span></td>';
    $html += '<td><input type="hidden" id="purchase_d_id_' + batch_no + '" value="' + purchase_d_id + '"/> <span id="pro_name_"' + batch_no + '>' + pro_name + '</span><input id="product_id_' + batch_no + '" value="' + product_id + '" type="hidden"/> </td>';
    $html += '<td style="width: 100px"><span id="purity_"' + batch_no + '>' + purity + "</span></td>";
    $html += '<td><span id="amount_"' + batch_no + '>' + amount;
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "g") {
        $html += 'g';
    }
    if (unit == "kg") {
        $html += 'kg';
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
    $html += ' <input type="hidden" id="product_' + batch_no + '" value="' + product_id + '"/></span></td>';
    $html += "";

    $html += '<td><span id="amount_used"' + batch_no + '>' + amount_used;
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "kg") {
        $html += 'kg';
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
    $html += '<input type="hidden" id="batch_no_' + batch_no + '" value="' + batch_no + '"/></span></td>';
    $html += '<td><input style="width: 60px" readonly="readonly"  id="amount_' + batch_no + '" type="text" value="' + amount_used + '" class="form-control input-sm"/>';
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "kg") {
        $html += 'kg';
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
    $html += '<td><textarea readonly="readonly" id="space_name' + batch_no + '" class="form-control left" rows="1" cols="30">' + $.alle_null2Str(space_name) + '</textarea></td>';
    if (amount_used == 0) {
        $html += '<td><textarea readonly="readonly" id="desc_' + batch_no + '" class="form-control left" rows="1" cols="10">' + $.alle_null2Str(reason) + '</textarea></td>';
    } else {
        if (parseFloat(out_amount) == parseFloat(amount_used)) {
            $html += '<td><textarea readonly="readonly" id="desc_' + batch_no + '" class="form-control left" rows="1" cols="10">' + $.alle_null2Str(reason) + '</textarea></td>';
        } else {
            $html += '<td><textarea id="desc_' + batch_no + '" class="form-control left" rows="1" cols="10"></textarea></td>';
        }
    }
    if (parseFloat(amount_used) == 0) {
        $html += "<td><a href='javascript:out_inventory_detail(" + batch_no_str + ")'>查看</a> </td>";
    } else {
        if (parseFloat(out_amount) == parseFloat(amount_used)) {
            $html += "<td><a href='javascript:out_inventory_detail(" + batch_no_str + ")'>查看</a> </td>";
        } else {
            $html += "<td><a onclick='javascript:purchansing_return_sumbit(" + purchase_id + "," + product_id + "," + purchase_d_id + "," + batch_no_str + "," + unit_str + ")'>退货</a> </td>";
        }
    }

    $product_table.prepend($html);
}
function showInventory() {
    window.location.href = "/promanager/purchasing/detail.html?type=purchansing_return&purchase_id=" + purchase_id + "&is_flag=" + is_flag;
}

function purchansing_return_sumbit(purchase_id, product_id, purchase_d_id, batch_no, unit) {
    var amount = $("#amount_" + batch_no).val();
    var reason = $("#desc_" + batch_no).val();
    var index = layer.confirm('是否确定退货？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        var params_value = purchase_id + "," + product_id + "," + purchase_d_id + "," + batch_no + "," + unit + "," + amount + "," + reason + "_";
        $.ajax({
            type: 'POST',
            url: "/meterialpurchease/return/purchansing_return_sumbit",
            data: {
                params_value: params_value
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    window.location.href = "/promanager/purchasing/purchansing_return_submit.html?is_flag=" + is_flag + "&purchase_id=" + purchase_id;
                }
            }
        });
    }, function () {
        layer.close(index);
    });
}


function purchasing_return_all(purchase_id) {
    layer.prompt({title: '请填写备注', formType: 2}, function (text, index) {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/meterialpurchease/return/purchansing_return_sumbit",
            data: {
                purchase_id: purchase_id,
                return_inv_type: 1,
                reason: text
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    setTimeout(function () {
                        parent.doSearch(1);
                        $.alle_dialog_close();
                    }, 1000);
                }
                // layer.msg(data["message"]);
                // if (data["result"] == "success") {
                //     setTimeout(function () {
                //         window.location.href = '/promanager/purchasing/edit.html?purchase_id=' + purchase_id;
                //     }, 1000);
                // }
            }
        });
    });

}