$(function () {
    $.alle_sysdate_date("sale_time");
    $("#add_product").click(function () {
        var batch_nos = "";
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            batch_nos += "'"+$("#" + id.replace("tr_", "batch_no_")).val() + "',";
        });
        if (batch_nos != null && batch_nos != '') {
            batch_nos = batch_nos.substr(0, batch_nos.lastIndexOf(","));
        }

        var flag=$("#flag").val()

        $.alle_dialog('/promanager/vendition/vendition_select_product.html?flag='+flag+'&cas='+cas+'&batch_nos='+batch_nos, "选择产品", ["85%", "85%"]);
    })
    $("#cancel").click(function () {
        window.location.href = "/promanager/vendition/index.html";
    })
    $("#submit").click(function () {
        vendition_save();
    })




    //库存中存在时-----触发add_product单击事件查询
    var flag=""
    if ($.alle_getUrlParam("flag")==1){
        var cas=$.alle_getUrlParam("cas")
        var customer=unescape($.alle_getUrlParam("customer"))
        $("#customer_name").val(customer)
        $("#customer_name").attr("disabled","disabled");
        var str=""
        var oDate = new Date(); //实例一个时间对象；
        str+=oDate.getFullYear()+"-";   //获取系统的年；
        str+=oDate.getMonth()+1+"-";   //获取系统月份，由于月份是从0开始计算，所以要加1
        str+=oDate.getDate()+" "; // 获取系统日,
        //字节解码
        var user_name=unescape($.alle_getUrlParam("user_name"))+str
        $("#sale_name").val(user_name)
        $("#flag").val(2)
        setTimeout('$("#add_product").click()',1)
    }
    //库存中不存在时-----不触发add_product单击事件----页面填充新单
    if ($.alle_getUrlParam("flag")==0){
        var cas=$.alle_getUrlParam("cas")
        var customer=unescape($.alle_getUrlParam("customer"))
        $("#customer_name").val(customer)
        $("#customer_name").attr("disabled","disabled");
        var str=""
        var oDate = new Date(); //实例一个时间对象；
        str+=oDate.getFullYear()+"-";   //获取系统的年；
        str+=oDate.getMonth()+1+"-";   //获取系统月份，由于月份是从0开始计算，所以要加1
        str+=oDate.getDate(); // 获取系统日,
        //字节解码
        var user_name=unescape($.alle_getUrlParam("user_name"))+str
        $("#sale_name").val(user_name)
        var value=""
        value += "<tr>"
        value += '<td><span></span> </td>';
        value += '<td><span></span> </td>';
        value += '<td><span>' + $.alle_getUrlParam("sku") + '</span> </td>';
        value += '<td><span>' + cas + '</span> </td>';
        value += '<td><span></span> </td>';
        value += '<td><span></span> </td>';
        value += '<td><span>' + $.alle_getUrlParam("cunhuo_amount")+$.alle_getUrlParam("cunhuo_unit") + '</span> </td>';
        value += '<td><span>' + $.alle_getUrlParam("cunhuo_purity") + '</span> </td>';
        value += '<td><span></span> </td>';
        value += '<td><span>' + $.alle_getUrlParam("cunhuo_price") + '</span> </td>';
        value += '<td><span></span> </td>';
        value += '<td><span>删除</span> </td>';
        value+="</tr>"
        $("#product_table").prepend(value)

    }





})

function vendition_save() {
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
        var amount = parseFloat($("#" + id.replace("tr_", "amount_")).val()).toFixed(2);
        var new_amount = parseFloat($("#" + id.replace("tr_", "new_amount_")).val()).toFixed(2);
        var unit_price = $("#" + id.replace("tr_", "unit_price_")).val();
        if (!new_amount) {
            tip_msg("请填写销售量", "#" + id.replace("tr_", "new_amount_"));
            isFlag = false;
            return false;
        } else {
                if((new_amount-amount)>0)
                { 
                    tip_msg("销售量不能大于库存量", "#" + id.replace("tr_", "new_amount_"));
                    isFlag = false;
                    return false;
                }else{
                    isFlag = true;
                }
        }
        if (!unit_price) {
            isFlag = false;
            tip_msg("请输入单价", "#" + id.replace("tr_", "unit_price_"));
            return false;
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
            vendition_detail_params +=batch_no+","+ product_id + "," + new_amount + "," + unit + "," + purity + "," + unit_price +","+space_id+"," + desc + "_";
        });
        if(!vendition_detail_params)
        {
            tip_msg("至少选择一个产品", "#showMsg");
            return false;
        }
        var index = layer.confirm('销售总金额为：' + $("#all_total").val() + " 元", {
            btn: ['确认', '取消'] //按钮
        }, function () {
            layer.close(index);
            $.ajax({
                type: 'POST',
                url: "/vendition/manager/vendition_sumbit",
                data: {
                    all_total:all_total,
                    sale_time: sale_time,
                    sale_name: sale_name,
                    customer_id: customer_id,
                    c_linkman_id: c_linkman_id,
                    desc: desc,
                    vendition_detail_params:vendition_detail_params.substr(0,vendition_detail_params.lastIndexOf("_"))
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
            type:2,
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
        sumTotal += parseFloat(price);
    });
    sumTotal = sumTotal.toFixed(2);
    $("#all_total").val(sumTotal)
}