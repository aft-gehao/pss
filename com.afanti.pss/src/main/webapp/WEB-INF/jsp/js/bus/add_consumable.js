$(function () {
    $("#submit").click(function () {
        submit();
    })
    var amount=$.alle_getUrlParam("amount");
    var purchase_id=$.alle_getUrlParam("purchase_id");
    var consumable_id=$.alle_getUrlParam("consumable_id");
    var flag=$.alle_getUrlParam("flag");
})
function submit() {
    var flag=$.alle_getUrlParam("flag");
    var space_id=$("#space_id_0").val();
    var new_amount=$("#amount").val();
    var amount=$.alle_getUrlParam("amount");
    var purchase_id=$.alle_getUrlParam("purchase_id");
    var consumable_id=$.alle_getUrlParam("consumable_id");
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumableInventory",
        data: {
            flag:flag,
            amount:amount,
            space_id: space_id,
            new_amount:new_amount,
            purchase_id:purchase_id,
            consumable_id:consumable_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("入库成功");
                setTimeout(function () {
                    window.parent.location.reload();
                }, 1000);
            }
        }
    })

}
function select_dictWarehouseSpace(i) {
    $.alle_dialog('/promanager/inventory/select_warehouse.html?i=' +i, "选择仓位", ["100%", "100%"]);
}