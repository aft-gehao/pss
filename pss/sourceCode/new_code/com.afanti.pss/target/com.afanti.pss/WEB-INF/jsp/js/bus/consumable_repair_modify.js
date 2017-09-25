$(function () {
    var repair_id = $.alle_getUrlParam("repair_id");
   doSearch(repair_id);
})
/*
function use_save() {
    var use_time = $("#use_time").val();
    var use_name = $("#use_name").val();
    var use_unit = $("#use_unit").val();
    var batch_no = $("#batch_no").val();
    var product_name = $("#product_name").val();
    var amount = $("#amount").val();
    if (!use_name) {
        tip_msg("请输入申请单名称", "#use_name");
        return false;
    }
    if (!amount) {
        tip_msg("请输入申请量", "#amount");
        return false;
    } if (!product_name) {
        tip_msg("请输入申请物料名", "#product_name");
        return false;
    }
    var product_id = $("#product_id").val();
    $.ajax({
                type: 'POST',
                url: "/product_use/manage/use_save",
                data: {
                    use_time: use_time,
                    use_name: use_name,
                    product_name: product_name,
                    amount: amount,
                    use_unit:use_unit,
                    batch_no:batch_no
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

}*/

function doSearch(repair_id) {


            $.ajax({
                type: 'POST',
                url: "/consumable/manager/repairSelect",
                data: {
                    repair_id: repair_id
                },
                dataType: "json",
                success: function (data) {
                        $("#repair_time").val($.alle_time2str_yymm_dd_hhmmss(data["append"]["repair_time"]));
                        $("#amount").val(data["append"]["repair_amount"]);
                        $("#unit").html(data["append"]["consumable_unit"]);
                        $("#nameEn").val(data["append"]["consumable_name"]);
                        $("#desc").val(data["append"]["repair_desc"]);
                        $("#staff_name").val(data["append"]["staff_name"]);
                }
            })

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
*/$("#submit").click(function(){
       var repair_desc=$("#desc").val();
       var repair_amount=$("#amount").val();
       var repair_id = $.alle_getUrlParam("repair_id");
        if(!repair_amount)
        {
            tip_msg("请填写返修量", "#amount");
        }
        $.ajax({
            type: 'POST',
            url: "/consumable/manager/repairModify",
            data: {
                repair_amount: repair_amount,
                repair_desc:repair_desc,
                repair_id:repair_id
            },
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    layer.msg("操作成功");
                    setTimeout(function () {
                        //详情页面刷新
                        window.parent.location.reload();
                    }, 1000);
                }
            }
        })
})