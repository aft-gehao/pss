$(function () {
    doSearch(1);
    $("#xunjia_query").click(function () {
        doSearch(1);
    })

    $("#add_select").click(function () {
        add_select();
    })
})

function doSearch(p) {
    var sku = $("#sku").val();
    var cas = $("#cas").val();
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/materialQuotationSelect",
        data: {
            cas: cas,
            sku: sku,
            p: p,
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                var appends = data["appends"]
                $("#staff_name").val(appends)
                for (var i = 0; i < append.length; i++) {
                    var sku = $.alle_null2Str(append[i]["sku"])
                    var cas = $.alle_null2Str(append[i]["cas"])
                    var purity = $.alle_null2Str(append[i]["purity"])
                    var amount = $.alle_null2Str(append[i]["amount"])
                    var price = $.alle_null2Str(append[i]["price"]) + "元/" + $.alle_null2Str(append[i]["unit"])
                    var create_time = $.alle_time2str_yymm_dd_hhmm(append[i]["create_time"])
                    var name = $.alle_null2Str(append[i]["name"])
                    var rate = $.alle_null2Str(append[i]["rate"])
                    value += '\
                    <tr >\
                        <td>' + sku + '</td>\
                         <td>' + cas + '</td>\
                         <td>' + purity + '</td>\
                         <td>' + amount + '</td>\
                         <td>' + price + '</td>\
                         <td>' + create_time + '</td>\
                         <td>' + name + '</td>\
                         <td>' + rate + '</td>\
                         <td> <a title="转化" id="add-cunhuo" custom="'+append[i]["custom"]+'" name_en="' + append[i]["name_en"] + '" product_id="' + append[i]["product_id"] + '" quotation_id="' + append[i]["quotation_id"] + '" cas="' + append[i]["cas"] + '" sku="' + append[i]["sku"] + '" purity="' + append[i]["purity"] + '" amount="' + append[i]["amount"] + '" unit="' + append[i]["unit"] + '" price="' + append[i]["price"] + '" lead_start="' + append[i]["lead_start"] + '" lead_end="' + append[i]["lead_end"] + '" name="' + append[i]["name"] + '" rate="' + append[i]["rate"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#Add-qh">订单转化</a></td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);

                $("a[id*='add-cunhuo']").each(function () {
                    $(this).click(function () {
                        $("#cunhuo_cas").val($(this).attr("cas"))
                        $("#cunhuo_sku").val($(this).attr("sku"))
                        $("#cunhuo_name_en").val($(this).attr("name_en"))
                        $("#cunhuo_purity").val($(this).attr("purity"))
                        $("#cunhuo_amount").val($(this).attr("amount"))
                        $("#cunhuo_unit").val($(this).attr("unit"))
                        $("#cunhuo_price").val($(this).attr("price"))
                        $("#cunhuo_leadStart").val($(this).attr("lead_start"))
                        $("#cunhuo_leadEnd").val($(this).attr("lead_end"))
                        $("#customer_cunhuo").val($(this).attr("name"))
                        $("#cunhuo_rate").val($(this).attr("rate"))
                        $("#quotation_id").val($(this).attr("quotation_id"))
                        $("#product_id").val($(this).attr("product_id"))
                        $("#custom").val($(this).attr("custom"))
                    })
                })

                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}


function add_select() {
    /*$("#add_cas").focus(function () {
        //定时器
        var timeoutIdDpt, last_search;
        //清空缓存
        $("#add_cas").flushCache();
        $("#add_cas").keyup(
            function (event) {
                //处理文本框中的键盘事件
                var myEvent = event || window.event;
                var keyCode = myEvent.keyCode;
                $("#product_cas").val(0);
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
                        var url = "/common/load_auto?t=product_cas";
                        $("#add_cas").autocomplete(url, {
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
                                console.info(row)
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
            })/!*.result(function (event, row) {
            var row = eval("(" + row + ")");
            $("#product_cas").val(row.value);
            load_ck_lxr_cas(row.value);
        });*!/
    })
    /!*function load_ck_lxr_cas(product_cas) {
        $.ajax({
            type: 'POST',
            url: "/product/manager/load_product_info",
            data: {
                product_id: product_cas
            },
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    $("#add_sku").val(data["append"]["sku"]);
                } else {
                    layer.msg(data["message"])
                }
            }
        });
    }*!/

    $("#add_sku").focus(function () {
        //定时器
        var timeoutIdDpt, last_search;
        //清空缓存
        $("#add_sku").flushCache();
        $("#add_sku").keyup(
            function (event) {
                //处理文本框中的键盘事件
                var myEvent = event || window.event;
                var keyCode = myEvent.keyCode;
                $("#product_sku").val(0);
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
                        var url = "/common/load_auto?t=product_sku";
                        $("#add_sku").autocomplete(url, {
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
            })/!*.result(function (event, row) {
            var row = eval("(" + row + ")");
            $("#product_sku").val(row.value);
            load_ck_lxr_sku(row.value);
        });*!/
    })*/
    /*function load_ck_lxr_sku(product_sku) {
        $.ajax({
            type: 'POST',
            url: "/product/manager/load_product_info",
            data: {
                product_id: product_sku
            },
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    $("#add_cas").val(data["append"]["cas"]);
                } else {
                    layer.msg(data["message"])
                }
            }
        });
    }*/

    $("#customer_name").focus(function () {
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
                        var url = "/common/load_auto?t=xunjia";
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
        });
    })

//询价单添加时查询库存余额
    $("#add_amount").focus(function () {
        $("#kucun_balance1").hide()
        $("#kucun_balance2").hide()
    })
    $("#add_amount").blur(function () {
        var add_amount = $("#add_amount").val()
        var add_unit = $("#add_unit").val()
        var product_id_cas = $("#product_cas").val()
        var product_id_sku = $("#product_sku").val()
        var add_cas = $("#add_cas").val()
        var add_sku = $("#add_cas").val()
        var product_id = ""
        if (add_sku == 0 && add_cas == 0) {
            layer.msg("请输入cas,sku")
        } else {
            if (product_id_cas == 0) {
                product_id = product_id_sku
                select_add_amount()
            }
            if (product_id_sku == 0) {
                product_id = product_id_cas
                select_add_amount()
            }
        }
        function select_add_amount() {
            $.ajax({
                type: 'POST',
                url: "/vendition/manager/select_amount",
                data: {
                    product_id: product_id,
                    unit: add_unit
                },
                dataType: "json",
                success: function (data) {
                    if (data["result"] == "success") {
                        var append = eval(data["append"]);
                        if (append != "") {
                            for (var i = 0; i < append.length; i++) {
                                var su = append[i]["su"]
                                if (su < add_amount) {
                                    $("#kucun_balance1").show()
                                }
                            }
                        } else {
                            $("#kucun_balance2").show()
                        }
                    }
                }
            })
        }

    })

}
//询价单添加
$("#add_xunjia").click(function () {
    var product_id;
    var add_cas = $("#add_cas").val()
    var add_sku = $("#add_sku").val()
    var product_sku_id = $("#product_sku").val()
    var product_cas_id = $("#product_cas").val()
    var name_en=$("#add_name_en").val();
    var add_purity = $("#add_purity").val()
    var add_amount = $("#add_amount").val()
    var add_unit = $("#add_unit").val()
    var add_price = $("#add_price").val()
    var add_rate = $("#add_rate").val()
    var customer_id = $("#customer_id").val()
    var customer_name = $("#customer_name").val()
    if (add_cas != "" && add_sku != "" && add_purity != "" && add_amount != "" && add_price != "" && customer_name != "") {
        $.ajax({
            type: 'POST',
            url: "/vendition/manager/info_select",
            data: {
                cas: add_cas,
                customer_name:customer_name,
                add_amount:add_amount,
                sku:add_sku,
                name_en:name_en
            },
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    var product_id=data["append"];
                    var custom=data["append_ext"];
                    var amount= $("#add_amount").val();
                    var purity=$("#add_purity").val();
                    var unit=$("#add_unit").val();
                    var price= $("#add_price").val()
                    var add_leadStart = $("#add_leadStart").val()
                    var add_leadEnd = $("#add_leadEnd").val()
                    var add_rate = $("#add_rate").val()
                    $.ajax({
                        type: 'POST',
                        url: "/vendition/manager/add_xunjia",
                        data: {
                            product_id: product_id,
                            custom_id: custom,
                            amount: amount,
                            purity: purity,
                            unit: unit,
                            price: price,
                            add_rate: add_rate,
                        },
                        dataType: "json",
                        success: function (data) {
                            layer.msg("操作成功");
                            setTimeout(function(){
                                window.location.reload();
                            },1000);
                        }
                    })
                }
            }
        })
    }
    else{
        layer.msg("请补齐数据");
         return;
    }
})

/*
//单击定制单存货首次页面查询
function select_cunhuo() {
    var product_id = $("#product_id").val()
    var unit = $("#cunhuo_unit").val()
    var amount = $("#cunhuo_amount").val()
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/select_amount",
        data: {
            product_id: product_id,
            unit: unit
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append = eval(data["append"]);
                if (append != "") {
                    for (var i = 0; i < append.length; i++) {
                        var su = append[i]["su"]
                        if (su < amount) {
                            var add_allowance1=amount-su
                            $("#su_amount").html(su+unit)
                            $("#add_allowance2").html(add_allowance1+unit)
                            $("#add_sale2").show()
                        }
                    }
                } else {
                    $("#add_allowance1").val(amount)
                    $("#add_sale1").show()
                }
            }
        }
    })
}
$("#cunhuo_amount").focus(function () {
    $("#add_sale1").hide()
    $("#add_sale2").hide()
})
$("#cunhuo_amount").blur(function () {
    select_cunhuo()
})*/


//页面跳转到销售管理
$("#add_cunhuo").click(function () {
    //字节编码
    var customer = $("#custom").val()
    var cas = $("#cunhuo_cas").val()
    var sku = $("#cunhuo_sku").val()
    var quotation_id = $("#quotation_id").val()
    var name_en = encodeURI(encodeURI($("#cunhuo_name_en").val()))
    var user_name = escape($("#staff_name").val())
    var cunhuo_price=$("#cunhuo_price").val()
    var cunhuo_purity=$("#cunhuo_purity").val()
    var cunhuo_amount=$("#cunhuo_amount").val()
    var cunhuo_unit=$("#cunhuo_unit").val()
    var custom=encodeURI(encodeURI($("#customer_cunhuo").val()))
    var product_id=$("#product_id").val()
    var sale_way=$("#sale_way").val()
    var vendition_detail_params = product_id + "#" + cunhuo_amount + "#" + cunhuo_unit + "#" + cunhuo_purity + "#" + cunhuo_price +"#"+quotation_id+"_"
    //保存到product_sale表中
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/vendition_quoation",
        data: {
            customer_id: customer,
            sale_isdel:1,
            sale_way:sale_way,
            vendition_detail_params:vendition_detail_params.substr(0,vendition_detail_params.lastIndexOf("_"))
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                doSearch(1);
                var sale_d_id=data["append"];
                layer.msg('操作成功');
                setTimeout(function() {
                window.open("/promanager/vendition/sale_hetong.html?sale_way="+sale_way+"&customer="+custom+"&cas="+cas+"&name_en="+name_en+"&amount="+cunhuo_amount+"&price="+cunhuo_price+"&unit="+cunhuo_unit+"&sale_d_id="+sale_d_id);
                },1000);
            }
        }
    })






    //跳转销售管理页面时先去查询是否存在
    /*$.ajax({
        type: 'POST',
        url: "/vendition/manager/vendition_product_page_list",
        data: {
            cas: cas,
            p:1
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var append = data["append"]["results"];
                if (append == "") {
                    //window.location.href = "/promanager/vendition/add.html?flag=0&user_name=" + user_name + "&customer=" + customer + "&cas=" + cas + "&sku=" + sku + "&cunhuo_price=" + cunhuo_price + "&cunhuo_purity="+cunhuo_purity+"&cunhuo_amount="+cunhuo_amount+"&cunhuo_unit="+cunhuo_unit+""
                }
                else {
                    //window.location.href = "/promanager/vendition/add.html?flag=1&user_name=" + user_name + "&customer=" + customer + "&cas=" + cas + "&sku=" + sku + "&quotation_id=" + quotation_id + ""
                }
            }
        }
    })*/
})



//页面样式取消
$("#qu_xiao").click(function () {
    $("#add_sale1").hide()
    $("#add_sale2").hide()
})
$("#add_quxiao").click(function () {
    $("#kucun_balance1").hide()
    $("#kucun_balance2").hide()
})



//库存余量不足，进行添加
/*function add_task(add_allowance) {
    var unit=$("#cunhuo_unit").val()
    var quotation_id=$("#quotation_id").val()
    var product_id= $("#product_id").val()
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/add_task",
        data: {
            product_id: product_id,
            amount: add_allowance,
            quotation_id: quotation_id,
            unit:unit
        },
        dataType: "json",
        success: function (data) {
            layer.msg("操作成功");
        }
    })
}
$("#add_task1").click(function () {
    var add_allowance=$("#add_allowance1").val()
    add_task(add_allowance)
    $("#add_task1").hide()
})
$("#add_task2").click(function () {
    var add_allowance=$("#add_allowance2").val()
    add_task(add_allowance)
    $("#add_task2").hide()
})*/
