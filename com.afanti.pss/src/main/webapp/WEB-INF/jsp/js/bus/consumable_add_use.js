$(function () {

    $.alle_sysdate_date("use_time");
    $("#submit").click(function(){
        use_save();
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

function use_save() {
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
    if (isFlag) {
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
                            window.location.href = "/promanager/consumable/checking.html";
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