
var use_id;
$(function () {
    var use_id = $.alle_getUrlParam("use_id");
    var unit = decodeURI($.alle_getUrlParam("unit"),"UTF-8");
    $("#unit").html(unit);
})
$("#submit").click(function(){
    var use_id = $.alle_getUrlParam("use_id");

    var consumable_id = $.alle_getUrlParam("consumable_id");
    var amount=$("#amount").val();
    var purchase_money=$("#price").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/add_purchasing",
        data: {
            use_id: use_id,
            amount: amount,
            consumable_id:consumable_id,
            purchase_money: purchase_money
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.parent.location.reload();
                }, 1000);
            }
        }
    })

})