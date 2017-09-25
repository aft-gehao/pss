$(function () {
    $("#sumbit").click(function () {
        doSearch(1);
    })
})
function doSearch(p) {
    var reg_hp = $("#reg_hp").val();
    $.ajax({
        type: 'POST',
        url: "/test/testPage",
        data: {
            reg_hp: reg_hp,
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
                        <td>' + append[i]["reg_id"] + '</td>\
                        <td>' + append[i]["reg_hp"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["reg_name"]) + '</td>\
                         <td class="operation"><a href="javascript:;" class="modify">修改</a><a href="#" data-href="delete.php?id=23" data-toggle="modal" data-target="#confirm-delete">删除</a> <a href="javascript:;" class="details">详情</a></td>\
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