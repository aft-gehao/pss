$(function () {
var supplier_id=$.alle_getUrlParam("cs_sup_id");
    $.alle_sysdate_date("purchase_time");
    $("#add_product").click(function () {

       $.alle_dialog("/infomanager/shinfo/select_product.html?supplier_id="+supplier_id, "选择产品", ["85%", "85%"]);

    })
    $("#cancel").click(function () {
        window.location.href = "/infomanager/shinfo/product.html?cs_sup_id="+supplier_id;
    })
    $("#submit").click(function () {
        purchasing_save();
    })

})

function purchasing_save() {

    var isFlag = true;
    //校验选择的产品
    $("tr[id^='tr_']").each(function () {
        var id = $(this).attr("id");
        var product_id = $("#" + id.replace("tr_", "product_id_")).val();
        var pro_name = $("#" + id.replace("tr_", "pro_name_")).val();

        var unit = $("#" + id.replace("tr_", "unit_")).val();
        var purity = $("#" + id.replace("tr_", "purity_")).val();
        var unit_price = $("#" + id.replace("tr_", "unit_price_")).val();
        if (!purity) {
            isFlag = false;
            tip_msg("请填写纯度", "#" + id.replace("tr_", "purity_"));
            return false;
        }
    });
    if (isFlag) {
        var product_id='';
        var pro_name='';
        var unit='';
        var purity='';
        var unit_price='';
        var supplier_id = $.alle_getUrlParam("cs_sup_id");
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
             product_id += $("#" + id.replace("tr_", "product_id_")).val()+"#";
             pro_name += $("#" + id.replace("tr_", "pro_name_")).html()+"#";
             unit += $("#" + id.replace("tr_", "unit_")).val()+"#";
             purity += $("#" + id.replace("tr_", "purity_")).val()+"#";
             unit_price += $("#" + id.replace("tr_", "unit_price_")).val()+"#";
        });
            $.ajax({
                type: 'POST',
                url: "/cus/supplier/manager/shinfoProductAdd",
                data: {
                    supplier_id: supplier_id,
                    product_id:product_id,
                    pro_name: pro_name,
                    unit: unit,
                    purity: purity,
                    unit_price: unit_price
                },
                dataType: "json",
                success: function (data) {
                    if (data["result"] == "success") {
                        setTimeout(function () {
                            layer.msg("保存成功！")
                            window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+supplier_id;
                        }, 1000);
                    }
                }
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
            url: "/meterialpurchease/manager/load_gys_lxr",
            data: {
                supplier_id: supplier_id
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
    }

