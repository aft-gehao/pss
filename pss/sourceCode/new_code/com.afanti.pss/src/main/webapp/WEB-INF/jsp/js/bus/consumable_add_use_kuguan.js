$(function () {

    $.alle_sysdate_date("use_time");
    $("#submit").click(function(){
        duanxin();
    })
    $("#add_product").click(function(){
        $.alle_dialog('/promanager/consumable/select_product.html','选择产品', ["85%", "85%"])
    })
    $("#qinggou_product").click(function(){
        $.alle_dialog("/promanager/consumable/qinggou_select_consumable.html", "选择产品", ["85%", "85%"]);

    })
    $("#cancel").click(function(){
        window.location.href="/promanager/researchAndUse/index.html?flag=1";
    })
    ;
})

function duanxin() {
    var staff_name=$("#staff_name").val();
    var mobilephone=$("#mobilephone").val();
    var use_time = $("#use_time").val();
    var use_name = $("#use_name").val();
    if (!use_name) {
        tip_msg("请输入申请单名称", "#use_name");
        return false;
    }
    var isFlag = true;
    //校验选择的产品
    $("tr[id^='tr_']").each(function () {
        var id = $(this).attr("id");
        var amount =$("#" + id.replace("tr_", "amount_")).val();
        var new_amount =$("#" + id.replace("tr_", "new_amount_")).val();
        if (!new_amount) {
            tip_msg("请填写申请量", "#" + id.replace("tr_", "new_amount_"));
            isFlag = false;
            return false;
        }
        if(amount!='' && parseInt(new_amount) > parseInt(amount))
        {
                  tip_msg("申请量不能大于库存量", "#" + id.replace("tr_", "new_amount_"));
                  isFlag = false;
                  return false;
        }
    });
    if(mobilephone=='')
    {
        tip_msg("此员工无联系方式，请区员工管理核对", "#mobilephone");
        return false;
    }
    if(!staff_name)
    {
        tip_msg("请输入领用人", "#staff_name");
        return false;
    }
    if(!mobilephone)
    {
        if(!pat_phone.test(mobilephone))
        {
            tip_msg("此员工无联系方式有误,请去员工管理重新核对后再输入!", "#mobilephone");
            return false;
        }
    }
    var str="您有领用单需要生成："
    if(!($("tr[id^='tr_']").attr("id")))
    {
        layer.msg("请选择领用耗材");
        return false;
    }
    $("tr[id^='tr_']").each(function () {
        var id = $(this).attr("id");
        var product_name =$("#" + id.replace("tr_", "pro_name_")).html();
        var new_amount = parseFloat($("#" + id.replace("tr_", "new_amount_")).val());
        var unit = $("#" + id.replace("tr_", "unit_")).val();
        if(!new_amount)
        {
            layer.msg("领用单信息填写有误，请检查");
        }
        if(!product_name)
        {
            product_name="(无耗材名)";
        }
        str +=new_amount+unit+product_name+",";
    });
    $.ajax({
        type: 'POST',
        url: "/sms/sendFeedback",
        data: {
            str: str,
            mobilephone: mobilephone
        },
        dataType: "json",
        success: function (data) {

            layer.msg("短信发送成功！请注意接收");
            var code=data["append"];

            $("#i_code").click();
        }
    });
}


function delTr(tr_id) {
    var tr_id = "tr_" + tr_id;
    $("#" + tr_id).remove();
    sumTotal();
}
$().ready(function () {
    //定时器
    var timeoutIdDpt, last_search;
    //清空缓存
    $("#staff_name").flushCache();
    $("#staff_name").keyup(
        function (event) {
            //处理文本框中的键盘事件
            var myEvent = event || window.event;
            var keyCode = myEvent.keyCode;
            $("#staff_id").val(0);
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
                    var url = "/common/load_auto?t=staff";
                    $("#staff_name").autocomplete(url, {
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

        $("#mobilephone").val(row.value);
    });
});
$("#submit1").click(function () {
    yanzheng();
})
function yanzheng() {
    var code = $("#code").val()
    $.ajax({
        type: 'POST',
        url: "/sms/getCode",
        data: {
            code: code

        },
        dataType: "json",
        success: function (data) {

            if (data["append"] == "success") {
                use_save();
            }
            else if (data["append"] == "fail") {
                tip_msg("验证码不正确", "#code");
            }

        }
    });
}
function use_save() {
    var use_time = $("#use_time").val();
    var use_name = $("#use_name").val();
    var staff_name = $("#staff_name").val();
    var code=$("#code").val()
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            var stock_id = $("#" + id.replace("tr_", "stock_id_")).val();
            var space_id = $("#" + id.replace("tr_", "space_id_")).val();
            var consumable_id = $("#" + id.replace("tr_", "product_id_")).val();
            var new_amount = $("#" + id.replace("tr_", "new_amount_")).val();
            var desc = $("#" + id.replace("tr_", "desc_")).val();
            $.ajax({
                type: 'POST',
                url: "/consumable/manager/consumable_add",
                data: {
                    staff_name:staff_name,
                    code:code,
                    stock_id:stock_id,
                    space_id:space_id,
                    use_time: use_time,
                    use_name: use_name,
                    consumable_id: consumable_id,
                    new_amount: new_amount,
                    desc:desc
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        setTimeout(function () {
                            window.location.href = "/promanager/consumable/index.html";
                        }, 1000);
                    }
                }
            });
        });
}