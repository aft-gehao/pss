$(function () {

    var permissions = $.alle_getUrlParam("permissions");
    var sale_d_id=$.alle_getUrlParam("sale_d_id")
    if (permissions==1){
        $("#sale_d_id").val(sale_d_id)
        $("#type_sale").val("1")
        $("#use_name").val("销售单")
        $("#permissions").hide()
        $("#qinggou_product").hide()
        $("#apply_name").hide()
        $("#top").hide()
        $("#name").html("销售单产品详细")
    }


    $.alle_sysdate_date("use_time");
    $("#submit").click(function(){
        use_save();
    })
    $("#add_product").click(function(){
        $.alle_dialog('/promanager/researchAndUse/select_product.html','选择产品', ["100%", "100%"])
    })
    $("#qinggou_product").click(function(){
        $.alle_dialog("/promanager/researchAndUse/qinggou_select_product.html", "选择产品", ["85%", "85%"]);

    })
    $("#cancel").click(function(){
        window.location.href="/promanager/researchAndUse/index.html?flag=1";
    })
    ;
})

function use_save() {

    var type_sale=$("#type_sale").val()
    var sale_d_id=$("#sale_d_id").val()
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
        var amount = parseFloat($("#" + id.replace("tr_", "amount_")).val());
        var new_amount = parseFloat($("#" + id.replace("tr_", "new_amount_")).val());
        var unit_price = $("#" + id.replace("tr_", "unit_price_")).val();
        if (!new_amount) {
            tip_msg("请填写申请量", "#" + id.replace("tr_", "new_amount_"));
            isFlag = false;
            return false;

        } else {
            if (new_amount > amount) {
                tip_msg("申请量不能大于库存量", "#" + id.replace("tr_", "new_amount_"));
                isFlag = false;
                return false;
            } else {
                isFlag = true;
            }
        }
    });
    if (isFlag) {
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            var batch_no = $("#" + id.replace("tr_", "batch_no_")).val();
            var product_id = $("#" + id.replace("tr_", "product_id_")).val();
            var new_amount = $("#" + id.replace("tr_", "new_amount_")).val();
            var unit = $("#" + id.replace("tr_", "unit_")).val();
            var purity = $("#" + id.replace("tr_", "purity_")).val()+"%";
            var space_id = $("#" + id.replace("tr_", "space_id_")).val();
            var use_desc = $("#" + id.replace("tr_", "desc_")).val();
            $.ajax({
                type: 'POST',
                url: "/product_use/manage/useAdd_yanfa",
                data: {
                    sale_d_id:sale_d_id,
                    type_sale:type_sale,
                    use_time: use_time,
                    use_name: use_name,
                    batch_no: batch_no,
                    product_id: product_id,
                    new_amount: new_amount,
                    purity:purity,
                    use_desc:use_desc,
                    unit: unit,
                    space_id: space_id
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        setTimeout(function () {
                            //window.location.href = "/promanager/researchAndUse/index.html?flag=1";
                            window.location.reload()
                        }, 1000);
                    }
                }
            });
        });
    }
}
/*
 $().ready(function () {
 //定时器
 var timeoutIdDpt, last_search;
 //清空缓存
 $("#product_name").flushCache();
 $("#product_name").keyup(
 function (event) {
 //处理文本框中的键盘事件
 var myEvent = event || window.event;
 var keyCode = myEvent.keyCode;
 $("#product_id").val(0);
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
 var url = "/common/load_auto?t=product";
 $("#product_name").autocomplete(url, {
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
 $("#product_id").val(row.value);
 });
 });
 */

function delTr(tr_id) {
    var tr_id = "tr_" + tr_id;
    $("#" + tr_id).remove();
    sumTotal();
}