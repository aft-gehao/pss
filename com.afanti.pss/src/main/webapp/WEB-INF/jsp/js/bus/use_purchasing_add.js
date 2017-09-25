
var use_id;
$(function () {
    var use_id = $.alle_getUrlParam("use_id");

})
$("#submit").click(function(){
    var use_id = $.alle_getUrlParam("use_id");
    var product_id = $.alle_getUrlParam("product_id");
    var purchasing_name=$("#purchasing_name").val();
    var supplier_name=$("#supplier_name").val();
    var price=$("#price").val();
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/add_purchasing",
        data: {
            product_id:product_id,
            use_id: use_id,
            purchasing_name: purchasing_name,
            supplier_name: supplier_name,
            price: price
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