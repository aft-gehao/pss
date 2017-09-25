

$(function () {

    var code = $.alle_getUrlParam("code");
    $("#submit").click(function () {
        yanzheng(code);
    })
    $("#test").click(function () {
        
        use_save();
    })




})

function yanzheng(code) {

      if (code == $("#code").val()) {
          $.alle_dialog_close();
          $("#test").click();
      }
      else {
          tip_msg("验证码不正确", "#code");
      }
}
function use_save() {
    
    var use_time = $("#use_time").val();
    var use_name = $("#use_name").val();
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            var batch_no = $("#" + id.replace("tr_", "batch_no_")).val();
            var product_id = $("#" + id.replace("tr_", "product_id_")).val();
            var new_amount = $("#" + id.replace("tr_", "new_amount_")).val();
            var unit = $("#" + id.replace("tr_", "unit_")).val();
            var purity = $("#" + id.replace("tr_", "purity_")).val();
            var space_id = $("#" + id.replace("tr_", "space_id_")).val();
            $.ajax({
                type: 'POST',
                url: "/product_use/manage/useAdd",
                data: {
                    use_time: use_time,
                    use_name: use_name,
                    batch_no: batch_no,
                    product_id: product_id,
                    new_amount: new_amount,
                    unit: unit,
                    space_id: space_id
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        setTimeout(function () {
                            window.location.href = "/promanager/researchAndUse/index.html";
                        }, 1000);
                    }
                }
            });
        });
}