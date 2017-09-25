var purchase_id = "";
$(function () {
    purchase_id = $.alle_getUrlParam("purchase_id");
    $.alle_sysdate_date("purchase_time");
    $("#add_product").click(function () {
        var supplier_id = $("#supplier_id").val();
        if (supplier_id == null || supplier_id == "" || supplier_id == 0) {
            layer.msg("请选择供应商");
            return false;
        }
        var product_ids = "";
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            product_ids += $("#" + id.replace("tr_", "product_id_")).val() + ",";
        });
        if (product_ids != null && product_ids != '') {
            product_ids = product_ids.substr(0, product_ids.lastIndexOf(","));
        }
        $.alle_dialog('/promanager/purchasing/select_product.html?supplier_id=' + supplier_id + '&product_ids=' + product_ids, "选择产品", ["80%", "85%"]);
    })
    $("#cancel").click(function () {
        window.location.href = "/promanager/purchasing/index.html";
    })
    $("#submit").click(function () {
        purchasing_upd();
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
                $("#purchase_name").val(append1["purchase_name"]);
                $("#supplier_name").val(append1["supplier_name"]);
                $("#supplier_id").val(append1["supplier_id"]);
                $("#all_total").val(append1["all_total"]);
                load_gys_lxr(append1["supplier_id"], append1["s_linkman_id"]);
                $("#desc").val(append1["desc"]);
                var append2 = data["append"]["materialPurchaseDetailList"];
                for (var i = 0; i < append2.length; i++) {
                    var product_id = append2[i]["product_id"];
                    var amount = append2[i]["amount"];
                    var unit = append2[i]["unit"];
                    var purity = append2[i]["purity"];
                    var desc = append2[i]["desc"];
                    var unit_price = append2[i]["unit_price"];
                    var pro_type_name = append2[i]["product_type_name"];
                    load_product(product_id, append2[i]["product_name"],pro_type_name,amount, unit, purity, unit_price, desc);
                }
            }
        }
    });
}

function load_product(product_id, pro_name,pro_type_name, amount, unit, purity, unit_price, desc) {
    var $product_table = $('#product_table');
    var $html = '';
    $html += '<tr id="tr_' + product_id + '">'
    $html += '<td><span id="pro_name_"' + product_id + '>' + pro_name + '</span><input id="product_id_' + product_id + '" value="' + product_id + '" type="hidden"/> </td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input id="amount_' + product_id + '" value="' + amount + '" type="number" class="form-control input-sm" placeholder="" style="width: 45%;" maxlength="20"></span>'
    $html += '<select style="width: 45%;" id="unit_' + product_id + '"  class="form-control input-sm">';
    $html += '<option value="">请选择</option>';
    if (unit == "mg") {
        $html += '<option selected="selected"  value="mg">mg</option>';
    } else {
        $html += '<option  value="mg">mg</option>';
    }
    if (unit == "g") {
        $html += '<option selected="selected"  value="g">g</option>';
    } else {
        $html += '<option  value="g">g</option>';
    }
    if (unit == "ml") {
        $html += '<option selected="selected"  value="ml">ml</option>';
    } else {
        $html += '<option   value="ml">ml</option>';
    }
    if (unit == "l") {
        $html += '<option selected="selected"  value="L">L</option>';
    } else {
        $html += '<option  value="L">L</option>';
    }
    if (unit == "L") {
        $html += '<option selected="selected"  value="L">L</option>';
    } else {
        $html += '<option  value="L">L</option>';
    }
    $html += '</select>';
    $html += '</td>';
    $html += '<td>><span> <input id="purity_' + product_id + '" type="text" value="' + purity + '" class="form-control input-sm" placeholder="" style="width: 40%;" maxlength="20"></span></td>';
    $html += '<td>';
    $html += '<span> <input id="unit_price_' + product_id + '" value="' + unit_price + '" onchange="sumTotal()" type="number" class="form-control input-sm" placeholder="" style="width: 68%;" maxlength="20"> </span>';
    $html += '<span class="ml10">元</span>';
    $html += '</td>';
    $html += '<td><textarea id="desc_' + product_id + '" class="form-control left" rows="1" cols="30" maxlength="255">' + desc + '</textarea></td>';
    $html += '<td>';
    $html += '<a href="javascript:delTr(' + product_id + ')">删除</a>';
    $html += '</td>';
    $html += '</tr>';
    $product_table.prepend($html);
}

function load_gys_lxr(supplier_id) {
    $.ajax({
        type: 'POST',
        url: "/common/load_lxr",
        data: {
            type:1,
            id: supplier_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#s_linkman_id").html("");
                var html = '<option value="">请选择</option>';
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    html += '<option value="' + append[i]["s_linkman_id"] + '">' + append[i]["chinesename"] + '</option>';
                }
                $("#s_linkman_id").html(html)
            } else {
                layer.msg(data["message"])
            }
        }
    });
}

function purchasing_upd() {
    var purchase_time = $("#purchase_time").val();
    var purchase_name = $("#purchase_name").val();
    var all_total = $("#all_total").val();
    if (!purchase_name) {
        tip_msg("请输入采购单名称", "#purchase_name");
        return false;
    }
    var supplier_id = $("#supplier_id").val();
    if (supplier_id == null || supplier_id == "" || supplier_id == 0) {
        tip_msg("请选择供应商", "#supplier_name");
        return false;
    }
    var s_linkman_id = $("#s_linkman_id").val();
    var isFlag = true;
    //校验选择的产品
    $("tr[id^='tr_']").each(function () {
        var id = $(this).attr("id");
        var product_id = $("#" + id.replace("tr_", "product_id_")).val();
        var pro_name = $("#" + id.replace("tr_", "pro_name_")).val();
        var amount = $("#" + id.replace("tr_", "amount_")).val();
        var unit = $("#" + id.replace("tr_", "unit_")).val();
        var purity = $("#" + id.replace("tr_", "purity_")).val();
        var unit_price = $("#" + id.replace("tr_", "unit_price_")).val();
        var desc = $("#" + id.replace("tr_", "desc_")).val();
        if (!amount) {
            tip_msg("请填写采购量", "#" + id.replace("tr_", "amount_"));
            isFlag = false;
            return false;
        }
        if (!unit) {
            isFlag = false;
            tip_msg("请选择采购量单位", "#" + id.replace("tr_", "unit_"));
            return false;
        } else {
            isFlag = true;
        }
        if (!purity) {
            isFlag = false;
            tip_msg("请填写纯度", "#" + id.replace("tr_", "purity_"));
            return false;
        }
        if (!unit_price) {
            isFlag = false;
            tip_msg("请输入单价", "#" + id.replace("tr_", "unit_price_"));
            return false;
        } 

    });
    if (isFlag) {
        var purchasing_detail_params = "";
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            var product_id = $("#" + id.replace("tr_", "product_id_")).val();
            var pro_name = $("#" + id.replace("tr_", "pro_name_")).val();
            var id = $(this).attr("id");
            var amount = $("#" + id.replace("tr_", "amount_")).val();
            var unit = $("#" + id.replace("tr_", "unit_")).val();
            var purity = $("#" + id.replace("tr_", "purity_")).val();
            var unit_price = $("#" + id.replace("tr_", "unit_price_")).val();
            var desc = $("#" + id.replace("tr_", "desc_")).val();
            purchasing_detail_params += product_id + "," + amount + "," + unit + "," + purity + "," + unit_price + "," + desc + "_";
        });
        if (!purchasing_detail_params) {
            tip_msg("至少选择一个产品", "#showMsg");
            return false;
        }
        var index = layer.confirm('采购总金额为：' + $("#all_total").val() + " 元", {
            btn: ['确认', '取消'] //按钮
        }, function () {
            layer.close(index);
            $.ajax({
                type: 'POST',
                url: "/meterialpurchease/manager/purchaseing_upd",
                data: {
                    purchase_id: purchase_id,
                    all_total: all_total,
                    purchase_time: purchase_time,
                    purchase_name: purchase_name,
                    supplier_id: supplier_id,
                    s_linkman_id: s_linkman_id,
                    desc: desc,
                    purchasing_detail_params: purchasing_detail_params.substr(0, purchasing_detail_params.lastIndexOf("_"))
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        setTimeout(function () {
                            window.location.href = "/promanager/purchasing/index.html";
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
    $("#supplier_name").flushCache();
    $("#supplier_name").keyup(
        function (event) {
            //处理文本框中的键盘事件
            var myEvent = event || window.event;
            var keyCode = myEvent.keyCode;
            $("#supplier_id").val(0);
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
                    var url = "/common/load_auto?t=purchasing";
                    $("#supplier_name").autocomplete(url, {
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
        $("#supplier_id").val(row.value);
        //加载供应商对应联系人
        load_gys_lxr(row.value);
    });
});

function load_gys_lxr(supplier_id, s_linkman_id) {
    $.ajax({
        type: 'POST',
        url: "/common/load_lxr",
        data: {
            type:1,
            id: supplier_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#s_linkman_id").html("");
                var html = '<option value="">请选择</option>';
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    if (append[i]["linkman_id"] == s_linkman_id) {
                        html += '<option selected="selected"  value="' + append[i]["linkman_id"] + '">' + append[i]["chinesename"] + '</option>';
                    } else {
                        html += '<option value="' + append[i]["linkman_id"] + '">' + append[i]["chinesename"] + '</option>';
                    }
                }
                $("#s_linkman_id").html(html)
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
        sumTotal += parseFloat(price);
    });
    $("#all_total").val(sumTotal)
}