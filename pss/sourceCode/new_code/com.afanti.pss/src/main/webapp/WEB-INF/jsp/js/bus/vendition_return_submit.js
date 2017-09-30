var sale_id = 0;
var sale_name = "";
$(function () {
    sale_id = $.alle_getUrlParam("sale_id");
    $("#back").click(function () {
        window.location.href = "/promanager/vendition/index_return.html";
    })
    $("#showView").click(function () {
        window.location.href = "/promanager/vendition/detail.html?sale_id=" + sale_id + "&type=vendition_return";
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
        var index = layer.confirm('是否确认？', {
            btn: ['确认', '取消'] //按钮
        }, function () {
            layer.close(index);
            var params_value = "";
            $('input[name="checkbox"]').each(function () {
                if (this.checked) {
                    var params = $(this).val();
                    var params_sp = params.split(",");
                    var batch_no = params_sp[0];
                    var sale_d_id = params_sp[1];
                    var product_id = params_sp[2];
                    var amount_used = params_sp[3];
                    var unit = params_sp[4];
                    var amount = $("#amount_" + batch_no).val();
                    var reason = $("#desc_" + batch_no).val();
                    params_value += batch_no + "," + sale_d_id + "," + product_id + "," + amount_used + "," + unit + "," + reason + "_";
                }
            });
            $.ajax({
                type: 'POST',
                url: "/vendition/return/vendition_return_submit",
                data: {
                    sale_id: sale_id,
                    params_value: params_value
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    window.location.href = "/promanager/vendition/vendition_return_submit.html?sale_id=" + sale_id;
                }
            });
        }, function () {
            layer.close(index);
        });
        ;
    });
    load_vendition_info(sale_id)
})

function load_vendition_info(sale_id) {
    $.ajax({
        type: 'POST',
        url: "/vendition/return/load_vendition_inventory",
        data: {
            sale_id: sale_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append1 = data["append"]["productSaleInfo"];
                var sale_name = append1["sale_name"];
                $("#sale_name").html(sale_name);
                $("#supplier_name").html(append1["supplier_name"]+"/"+append1["c_linkeman_name"]);
                $("#sale_time").html(append1["staff_name"]+"/"+$.alle_time2str_yymm_dd_hhmmss(append1["sale_time"]));
                $("#customer_id").html(append1["customer_id"]);
                $("#all_total").html(append1["all_total"]);
                $("#desc").html(append1["desc"]);
                var append2 = data["append"]["productSaleDetailList"];
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
                    var space_name = append2[i]["space_name"];
                    var space_id = append2[i]["space_id"];
                    var sale_d_id = append2[i]["sale_d_id"];
                    var sale_id =append2[i]["sale_id"];
                    load_product(batch_no, product_id, product_name, amount, amount_used, unit, purity, unit_price, space_id, space_name, desc, sale_d_id,sale_id);
                }
            }
        }
    });
}

function load_product(batch_no, product_id, pro_name, amount, amount_used, unit, purity, unit_price, space_id, space_name, desc, sale_d_id,sale_id) {
    var batch_no2 = "'" + batch_no + "'";
    var $product_table = $('#product_table');
    var unit2 = "'" + unit + "'";
    var $html = '';
    $html += '<tr id="tr_' + batch_no + '">'
    if (amount == 0) {
        $html += '<td><input type="checkbox" id="checkbox" name="checkbox" value="' + batch_no + ',' + sale_d_id + ',' + product_id + ',' + amount_used + ',' + unit + '"/></td>'
    } else {
        $html += "<td></td>"
    }
    $html += '<td><span id="pro_name_"' + batch_no + '>' + pro_name + '</span><input id="product_id_' + batch_no + '" value="' + product_id + '" type="hidden"/> </td>';
    $html += '<td><span> <input readonly="readonly" style="width: 90px" id="purity_' + batch_no + '" type="text" value="' + purity + '" class="form-control input-sm" placeholder="" style="width: 68%;"></span>%</td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input readonly="readonly" id="new_amount_' + batch_no + '" value="' + amount + '" type="text" class="form-control input-sm" placeholder="" style="width:68%;"></span>'
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
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"><input  id="unit_' + batch_no + '" value="' + unit + '" type="hidden"> <input readonly="readonly" id="new_amount_' + batch_no + '" value="' + amount_used + '" type="text" class="form-control input-sm" placeholder="" style="width:68%;"></span>'
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
    $html += '<td>';
    $html += '<span> <input id="unit_price_' + batch_no + '" readonly="readonly" value="' + unit_price + '" type="text" class="form-control input-sm" placeholder="" style="width: 68%;"> 元</span>';
    $html += '</td>';
    $html += '<td><textarea id="desc_' + batch_no + '" class="form-control left" rows="1" cols="10">' + desc + '</textarea></td>';
    $html += '<td>';
    if (amount == 0) {
        $html += '<a href="javascript:vendition_return(' + sale_d_id + ','+sale_id+')">退货</a>';
    }
    $html += '</td>';
    $html += '</tr>';
    $product_table.prepend($html);
}

function vendition_return( sale_d_id,sale_id) {
    var index = layer.confirm('是否确定退货？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/vendition/return/return_submit",
            data: {
                sale_d_id: sale_d_id,
                sale_id:sale_id
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    window.location.href = "/promanager/vendition/index.html";
                }
            }
        });
    }, function () {
        layer.close(index);
    });
}
