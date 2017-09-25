$(function () {

    $.alle_sysdate_date("use_time");
    $("#submit").click(function(){
        use_save();
    })
    $("#qinggou_product").click(function(){
        $.alle_dialog("/promanager/consumableRepair/qinggou_select_consumable.html", "选择产品", ["85%", "85%"]);

    })
    $("#cancel").click(function(){
        window.location.href="/promanager/consumableRepair/index.html";
    })
    ;
})

function use_save() {
    var isFlag = true;
    //校验选择的产品
    $("tr[id^='tr_']").each(function () {
        var id = $(this).attr("id");
        var new_amount =$("#" + id.replace("tr_", "new_amount_")).val();
        if (!new_amount) {
            tip_msg("请填写申请量", "#" + id.replace("tr_", "new_amount_"));
            isFlag = false;
            return false;
        }
    });
    if (isFlag) {
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            var consumable_id = $("#" + id.replace("tr_", "product_id_")).val();
            var new_amount = $("#" + id.replace("tr_", "new_amount_")).val();
            var desc = $("#" + id.replace("tr_", "desc_")).val();
            $.ajax({
                type: 'POST',
                url: "/consumable/manager/consumable_repair_add",
                data: {
                    consumable_id: consumable_id,
                    new_amount: new_amount,
                    desc:desc
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        setTimeout(function () {
                            window.location.href = "/promanager/consumableRepair/index.html";
                        }, 1000);
                    }
                }
            });
        });
    }
}


function delTr(tr_id) {
    var tr_id = "tr_" + tr_id;
    $("#" + tr_id).remove();
    sumTotal();
}