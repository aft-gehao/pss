var $table = $('#product_table', window.parent.document);

$(function () {
    $("#inv_realtime_query").click(function(){
        doSearch(1);
    })
    doSearch(1);
    $("#query").click(function () {
        doSearch(1);
    })
})
function doSearch(p) {
    var consumable_name = $("#consumable_name").val();
    var flag=1;
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/stockPage",
        data: {
            consumable_name: consumable_name,
            flag:flag,
            p: p
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                for (var i = 0; i < append.length; i++) {
                    value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + append[i]["pack"] + '</td>\
                        <td>' + append[i]["total"] + append[i]["consumable_unit"]+'</td>\
                        <td class="operation">\
                         <input  type="button"  data="' + append[i]["consumable_id"] + '" id="con_stock_det"   class="btn btn-link btn-xs" value="详情"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                $("input[id*='con_stock_det']").each(function () {
                    $(this).click(function(){
                        window.location.href="/promanager/consumable/consumable_stock_detail.html?consumable_id="+$(this).attr("data");
                    })
                });

                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage);
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}


