$(function () {
    //进页面加载此函数
    doSearch(1);
    $("#back-Cg").click(function(){
        window.location.href="/promanager/consumable/consumable_stock.html";
    })
})

function doSearch(p) {
    var consumable_id = $.alle_getUrlParam("consumable_id");
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/selectInventoryDetail",
        data: {
            consumable_id: consumable_id,
            p: p
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var value = "";
                // alert(data["append"]);
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                for (var i = 0; i < append.length; i++) {
                    // <td>' + append[i]["purchase_name"] + '</td>\
                    value += '\
                    <tr >\
                        <td>' + append[i]["consumable_name"] + '</td>\
                        <td>' + append[i]["pack"] + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["enter_time"]) + '</td>\
                        <td>' + append[i]["space_name"] + '</td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}
