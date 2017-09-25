var sale_id = 0;
$(function () {
    sale_id = $.alle_getUrlParam("sale_id");
    $("#back").click(function () {
        window.location.href = "/promanager/inventory/add.html";
    })
    $("#showView").click(function () {
        window.location.href = "/promanager/vendition/detail.html?type=vendition_inventory_in&sale_id=" + sale_id;
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
                    var batch_no = $(this).val();
                    var desc = $("#desc_" + batch_no).val();
                    var amount = $("#amount_" + batch_no).val();
                    params_value += batch_no + "," + desc + "," + amount + "_";
                }
            });
            $.ajax({
                type: 'POST',
                url: "/inventory/productIn/vendition_in_inventory",
                data: {
                    sale_id: sale_id,
                    params_value: params_value.substr(0, params_value.lastIndexOf("_"))
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        setTimeout(function () {
                            window.location.href = "/promanager/inventory/inventory_vendition_in_info.html?sale_id=" + sale_id;
                        }, 1000);
                    }
                }
            });
        }, function () {
            layer.close(index);
        });
        ;
    });
    load_vendition_in_info(sale_id)
})
function load_vendition_in_info(sale_id) {
    $.ajax({
        type: 'POST',
        url: "/inventory/productIn/load_vendition_in_info",
        data: {
            sale_id: sale_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append1 = data["append"]["productSaleInfo"];
                $("#sale_name").html(append1["sale_name"]);
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
                    var amount = append2[i]["amount_used"];
                    var amount_used = 0;
                    var unit = append2[i]["unit"];
                    var purity = append2[i]["purity"];
                    var desc = append2[i]["desc"];
                    var unit_price = append2[i]["unit_price"];
                    var pro_type_name = append2[i]["product_type_name"];
                    var space_name = append2[i]["space_name"];
                    var space_id = append2[i]["space_id"];
                    var sale_status = append2[i]["sale_status"];
                    var sale_status_name = append2[i]["sale_status"];
                    var sale_d_id = append2[i]["sale_d_id"];
                    load_product(batch_no, product_id, product_name, amount, unit, purity, unit_price, space_id, space_name, sale_status, sale_d_id, desc);
                }
            }
        }
    });
}
function load_product(batch_no, product_id, pro_name, amount, unit, purity, unit_price, space_id, space_name, sale_status, sale_d_id, desc) {
    var batch_no2 = "'" + batch_no + "'";
    var unit_str = "'" + unit + "'";
    var $product_table = $('#product_table');
    var html2 = "";
    if (sale_status == 5001) {
        html2 += '<span class="label label-success">已入库</span>';
    } else if (sale_status == 5002) {
        html2 += '<span class="label label-danger">未入库</span></span>';

    } else if (sale_status == 5003) {
        html2 += '<span class="label label-info">部分入库</span>';
    }
    else if (sale_status == 0) {
        html2 += '<span class="label label-danger">未提交退货</span></span>';
    } else {
        layer.msg("类型异常，请联系管理员");
    }
    var $html = '';
    $html += '<tr id="tr_' + batch_no + '">'
    if (sale_status == 5002) {
        $html += '<td><input type="checkbox" id="checkbox" name="checkbox" value="' + batch_no + '"/></td>'
    } else {
        $html += "<td></td>"
    }
    $html += '<td><span id="pro_name_"' + batch_no + '>' + pro_name + '</span><input id="product_id_' + batch_no + '" value="' + product_id + '" type="hidden"/> </td>';
    $html += '<td><span id="batch_no_str"' + batch_no + '>' + batch_no + '</span><input type="hidden" id="batch_no_' + batch_no + '" value="' + batch_no + '"/> </td>';
    $html += '<td><span></span>' + html2 + '</span></td>';
    $html += '<td><span> <input style="width:100px;" readonly="readonly" id="purity_' + batch_no + '" type="text" value="' + purity + '" class="form-control input-sm" placeholder="" style="width: 40%;"></span>%</td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input readonly="readonly" id="amount_' + batch_no + '" value="' + amount + '" type="text" class="form-control input-sm" placeholder="" style="width: 40%;"></span>'
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
    $html += '<td><input type="hidden" id="space_id_' + batch_no + '" value="' + space_id + '"/> <textarea id="space_name_' + batch_no + '" title="' + space_name + '" readonly="readonly" class="form-control left" rows="1" cols="30">' + space_name + '</textarea></td>';
    $html += '<td><textarea id="desc_' + batch_no + '" class="form-control left" rows="1" cols="10">' + desc + '</textarea></td>';
    $html += '<td>';
    if (sale_status == 5002) {
        $html += '<a href="javascript:vendition_out_inventory(' + batch_no2 + ')">入库</a>';
    }
    $html += '</td>';
    $html += '</tr>';
    $product_table.prepend($html);
}

function vendition_out_inventory(batch_no) {
    var desc = $("#desc_" + batch_no).val();
    var amount = $("#amount_" + batch_no).val();
    var index = layer.confirm('是否确认入库？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
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
                        window.location.href = "/promanager/inventory/inventory_vendition_in_info.html?sale_id=" + sale_id;
                    }, 1000);
                }
            }
        });
    }, function () {
        layer.close(index);
    });
}
