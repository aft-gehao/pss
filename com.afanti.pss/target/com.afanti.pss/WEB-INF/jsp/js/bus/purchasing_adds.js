$(function () {

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
        $.alle_dialog('/promanager/purchasing/select_product.html?supplier_id=' + supplier_id + '&product_ids=' + product_ids, "选择产品", ["85%", "85%"]);
    })
    $("#cancel").click(function () {
        window.location.href = "/promanager/purchasing/index.html";
    })
    $("#submit").click(function () {
        purchasing_save();
    })
})

function purchasing_save() {
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
    var desc = $("#desc").val();
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
       /* if (!amount) {
            tip_msg("请填写采购量", "#" + id.replace("tr_", "amount_"));
            isFlag = false;
            return false;
        } else {
            if (!pat_integer.test(amount)) {
                tip_msg("请输入正整数", "#" + id.replace("tr_", "amount_"));
                isFlag = false;
                return false;
            } else {
                isFlag = true;
            }
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
        } else {
            if (!pat_integer.test(unit_price)) {
                isFlag = false;
                tip_msg("请输入正整数", "#" + id.replace("tr_", "unit_price_"));
                return false;
            } else {
                isFlag = true;
            }
        }*/

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
                url: "/meterialpurchease/manager/purchaseing_save",
                data: {
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

function load_gys_lxr(supplier_id) {
    $.ajax({
        type: 'POST',
        url: "/common/load_lxr",
        data: {
            type: 1,
            id: supplier_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#s_linkman_id").html("");
                var html = '<option value="">请选择</option>';
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    html += '<option value="' + append[i]["linkman_id"] + '">' + append[i]["chinesename"] + '</option>';
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