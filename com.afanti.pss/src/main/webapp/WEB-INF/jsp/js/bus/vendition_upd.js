var sale_id = 0;
$(function () {
    sale_id = $.alle_getUrlParam("sale_id");
    $.alle_sysdate_date("sale_time");
    $("#add_product").click(function () {
        var batch_nos = "";
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            batch_nos += "'" + $("#" + id.replace("tr_", "batch_no_")).val() + "',";
        });
        if (batch_nos != null && batch_nos != '') {
            batch_nos = batch_nos.substr(0, batch_nos.lastIndexOf(","));
        }
        $.alle_dialog('/promanager/vendition/vendition_select_product.html?batch_nos=' + batch_nos, "选择产品", ["85%", "85%"]);

    });
    $("#cancel").click(function () {
        window.location.href = "/promanager/vendition/index.html";
    })
    $("#submit").click(function () {
        vendition_upd_save();
    })
    load_vendition_info(sale_id)
})
function load_lxr(supplier_id, s_linkman_id) {
    $.ajax({
        type: 'POST',
        url: "/common/load_lxr",
        data: {
            type: 2,
            id: supplier_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#c_linkman_id").html("");
                var html = '<option value="">请选择</option>';
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    if (append[i]["linkman_id"] == s_linkman_id) {
                        html += '<option selected="selected"  value="' + append[i]["linkman_id"] + '">' + append[i]["chinesename"] + '</option>';
                    } else {
                        html += '<option value="' + append[i]["linkman_id"] + '">' + append[i]["chinesename"] + '</option>';
                    }
                }
                $("#c_linkman_id").html(html)
            } else {
                layer.msg(data["message"])
            }
        }
    });
}
function load_vendition_info(sale_id) {
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/load_vendition_info",
        data: {
            sale_id: sale_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append1 = data["append"]["productSaleInfo"];
                $("#sale_time").val($.alle_time2str_yymm_dd_hhmmss(append1["sale_time"]));
                $("#sale_name").val(append1["sale_name"]);
                $("#customer_name").val(append1["supplier_name"]);
                $("#customer_id").val(append1["customer_id"]);
                $("#customer_id").val(append1["customer_id"]);
                $("#all_total").val(append1["all_total"]);
                load_lxr(append1["customer_id"], append1["c_linkman_id"]);
                $("#desc").val(append1["desc"]);
                var append2 = data["append"]["productSaleDetailList"];
                for (var i = 0; i < append2.length; i++) {
                    var batch_no = append2[i]["batch_no"];
                    var product_id = append2[i]["product_id"];
                    var product_name = append2[i]["name_en"];
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
            }
        }
    });
}
function load_product(batch_no, product_id, pro_name, pro_type_name, amount, amount_used, unit, purity, unit_price, space_id, space_name, desc) {
    var batch_no2 = "'" + batch_no + "'";
    var $product_table = $('#product_table');
    var $html = '';
    $html += '<tr id="tr_' + batch_no + '">'
    $html += '<td><span id="pro_name_"' + batch_no + '>' + pro_name + '</span><input id="product_id_' + batch_no + '" value="' + product_id + '" type="hidden"/> </td>';
    $html += '<td><span id="batch_no_str"' + batch_no + '>' + batch_no + '</span><input type="hidden" id="batch_no_' + batch_no + '" value="' + batch_no + '"/> </td>';
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
    $html += '<td><span> <input readonly="readonly" id="purity_' + batch_no + '" type="text" value="' + purity + '" class="form-control input-sm" placeholder="" style="width: 68%;"></span>%</td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"><input id="unit_' + batch_no + '" value="' + unit + '" type="hidden"> <input id="new_amount_' + batch_no + '" value="' + amount_used + '" type="text" class="form-control input-sm" placeholder="" style="width:68%;"></span>'
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
    $html += '<span> <input id="unit_price_' + batch_no + '" value="' + unit_price + '" onchange="sumTotal()" type="text" class="form-control input-sm" placeholder="" style="width: 68%;"> 元</span>';
    $html += '</td>';
    $html += '<td><input type="hidden" id="space_id_' + batch_no + '" value="' + space_id + '"/> <textarea id="space_name_' + batch_no + '" title="' + space_name + '" readonly="readonly" class="form-control left" rows="1" cols="15">' + space_name + '</textarea></td>';
    $html += '<td><textarea id="desc_' + batch_no + '" class="form-control left" rows="1" cols="15">' + desc + '</textarea></td>';
    $html += '<td>';
    $html += '<a href="javascript:delTr(' + batch_no2 + ')">删除</a>';
    $html += '</td>';
    $html += '</tr>';
    $product_table.prepend($html);
    sumTotal();
}

function vendition_upd_save() {
    var sale_time = $("#sale_time").val();
    var sale_name = $("#sale_name").val();
    var all_total = $("#all_total").val();
    if (!sale_name) {
        tip_msg("请输入销售单名称", "#sale_name");
        return false;
    }
    var customer_id = $("#customer_id").val();
    if (customer_id == null || customer_id == "" || customer_id == 0) {
        tip_msg("请选择客户", "#customer_name");
        return false;
    }
    var c_linkman_id = $("#c_linkman_id").val();
    var desc = $("#desc").val();
    var isFlag = true;
    //校验选择的产品
    $("tr[id^='tr_']").each(function () {
        var id = $(this).attr("id");
        var amount = parseInt($("#" + id.replace("tr_", "amount_")).val());
        var new_amount = parseInt($("#" + id.replace("tr_", "new_amount_")).val());
        var unit_price = $("#" + id.replace("tr_", "unit_price_")).val();
        if (!new_amount) {
            tip_msg("请填写采购量", "#" + id.replace("tr_", "new_amount_"));
            isFlag = false;
            return false;
        } else {
                if (new_amount > amount) {
                    tip_msg("采购量不能大于库存量", "#" + id.replace("tr_", "new_amount_"));
                    isFlag = false;
                    return false;
                } else {
                    isFlag = true;
                }
        }
        if (!unit_price) {
            isFlag = false;
            tip_msg("请输入单价", "#" + id.replace("tr_", "unit_price_"));
            return false;
        } else {
            if (!pat_integer.test(unit_price)) {
                isFlag = false;
                tip_msg("请输入正整数", "#" + id.replace("tr_", "unit_price_"));
                return false;
            } else {
                isFlag = true;
            }
        }
    });
    if (isFlag) {
        var vendition_detail_params = "";
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            var batch_no = $("#" + id.replace("tr_", "batch_no_")).val();
            var product_id = $("#" + id.replace("tr_", "product_id_")).val();
            var new_amount = $("#" + id.replace("tr_", "new_amount_")).val();
            var unit = $("#" + id.replace("tr_", "unit_")).val();
            var purity = $("#" + id.replace("tr_", "purity_")).val();
            var unit_price = $("#" + id.replace("tr_", "unit_price_")).val();
            var desc = $("#" + id.replace("tr_", "desc_")).val();
            var space_id = $("#" + id.replace("tr_", "space_id_")).val();
            vendition_detail_params += batch_no + "," + product_id + "," + new_amount + "," + unit + "," + purity + "," + unit_price + "," + space_id + "," + desc + "_";
        });
        if (!vendition_detail_params) {
            tip_msg("至少选择一个产品", "#showMsg");
            return false;
        }
        var index = layer.confirm('销售总金额为：' + $("#all_total").val() + " 元", {
            btn: ['确认', '取消'] //按钮
        }, function () {
            layer.close(index);
            $.ajax({
                type: 'POST',
                url: "/vendition/manager/vendition_upd_submit",
                data: {
                    sale_id:sale_id,
                    all_total: all_total,
                    sale_time: sale_time,
                    sale_name: sale_name,
                    customer_id: customer_id,
                    c_linkman_id: c_linkman_id,
                    desc: desc,
                    vendition_detail_params: vendition_detail_params.substr(0, vendition_detail_params.lastIndexOf("_"))
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        setTimeout(function () {
                            window.location.href = "/promanager/vendition/index.html";
                        }, 1000);
                    }
                }
            });
        }, function () {
            layer.close(index);
        });
    }
}

$().ready(function () {
    //定时器
    var timeoutIdDpt, last_search;
    //清空缓存
    $("#customer_name").flushCache();
    $("#customer_name").keyup(
        function (event) {
            //处理文本框中的键盘事件
            var myEvent = event || window.event;
            var keyCode = myEvent.keyCode;
            $("#customer_id").val(0);
            if ($(this).val().replace(" ", "") == "")return;
            //如果输入的是字母，退格，delete，空格或者数字键，应该将文本框中的最新信息发送给服务器,
            //其中，空格键和数字键的加入使得输入中文也能支持~~
            if ((keyCode >= 65 && keyCode <= 90)
                || (keyCode >= 48 && keyCode <= 57)
                || (keyCode >= 96 && keyCode <= 105)
                || keyCode == 46 || keyCode == 8
                || keyCode == 32) {

                //将文本框中的内容发送到服务器端
                //对上次未完成的延时操作进行取消
                clearTimeout(timeoutIdDpt);

                //对于服务器端进行交互延迟1000ms，避免快速打字造成的频繁请求
                timeoutIdDpt = setTimeout(function () {
                    var url = "/common/load_auto?t=vendition";
                    $("#customer_name").autocomplete(url, {
                        matchContains: false,
                        minChars: 0,
                        cacheLength: 1, //不缓存
                        matchSubset: false, //不缓存
                        matchCase: false,
                        formatItem: function (row, i, max) {
                            var row = eval("(" + row + ")");
                            return row.text;
                        },
                        formatResult: function (row, i, max) {
                            var row = eval("(" + row + ")");
                            return row.text;
                        },
                        beforeSend: function (XHR) {
                        },
                        complete: function (XHR, TS) {
                        }
                    });
                }, 1000);
            }
        }).result(function (event, row) {
        var row = eval("(" + row + ")");
        $("#customer_id").val(row.value);
        //加载供应商对应联系人
        load_ck_lxr(row.value);
    });
});

function load_ck_lxr(customer_id) {
    $.ajax({
        type: 'POST',
        url: "/common/load_lxr",
        data: {
            type: 2,
            id: customer_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#c_linkman_id").html("");
                var html = '<option value="">请选择</option>';
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    html += '<option value="' + append[i]["linkman_id"] + '">' + append[i]["chinesename"] + '</option>';
                }
                $("#c_linkman_id").html(html)
            } else {
                layer.msg(data["message"])
            }
        }
    });
}

function delTr(tr_id) {
    var tr_id = "tr_" + tr_id;
    $("#" + tr_id).remove();
    sumTotal();
}
function sumTotal() {
    var sumTotal = 0;
    $("tr[id^='tr_']").each(function () {
        var id = $(this).attr("id");
        var price = $("#" + id.replace("tr_", "unit_price_")).val();
        if (price == null || price == "") {
            price = 0;
        }
        sumTotal += parseInt(price);
    });
    $("#all_total").val(sumTotal)
}