$(function () {
    $.alle_section_date("start_time", "end_time");
    doSearch(1);
    $("#pro_query").click(function () {
        doSearch(1);
    })
})

function doSearch(p) {
    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();
    var sku = $("#sku").val();
    var cas = $("#cas").val();
    var unit=$("#unit").val()
    $.ajax({
        type: 'POST',
        url: "/inventory/realtimeInventory/baobiaoSelect",
        data: {
            start_time: start_time,
            end_time: end_time,
            cas: cas,
            sku: sku,
            p: p,
            unit:unit
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
                    var out=append[i]["a_out"] + $.alle_null2Str(append[i]["unit"])
                    var enter=append[i]["a_in"]+ $.alle_null2Str(append[i]["unit"])
                    var surplus=append[i]["amount_leave"]+ $.alle_null2Str(append[i]["unit"])
                    value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                         <td id="but_out" onclick="but_out()" style="background-color: lightsteelblue;cursor: pointer;">' + out + '</td>\
                         <td id="but_in" onclick="but_in()" style="background-color: lightsteelblue;cursor: pointer;">' + enter + '</td>\
                          <td>' + surplus + '</td>\
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

function to_upd_purchasing(purchase_id) {
    window.location.href = "/promanager/purchasing/modify.html?purchase_id=" + purchase_id;
}
function purchasing_del(purchase_id) {
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/meterialpurchease/manager/material_purchase_del",
            data: {
                purchase_id: purchase_id
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    setTimeout(function () {
                        doSearch(1);
                    }, 1000);
                }
            }
        });
    }, function () {
        layer.close(index);
    });
}

function purchasing_detial(purchase_id) {
    window.location.href = "/promanager/purchasing/detail.html?type=purchasing&purchase_id=" + purchase_id;
}

function show_image(url) {
    $.alle_dialog_img(url);
}

$("#excel_add").click(function () {

    var start_time=$("#start_time").val();
    var end_time=$("#end_time").val();
    var cas=$("#cas").val();
    var sku=$("#sku").val();
    $.ajax({
        type: 'POST',
        url: "/inventory/realtimeInventory/baobiaoAdd",
        data: {
            start_time:start_time,
            end_time:end_time,
            cas:cas,
            sku:sku,

        },
        dataType: "json",
        success: function (data) {
              
           window.location.href=data["result"];

        }
    });
})
function but_out() {
    $.alle_dialog("/promanager/inventory/detail.html")
}
function but_in() {
    $.alle_dialog("/promanager/inventory/detail.html")
}
$("#Unit_conversion").click(function () {
    var unit="g";
    var start_time=$("#start_time").val();
    var end_time=$("#end_time").val();
    var cas=$("#cas").val();
    var sku=$("#sku").val();
    $.ajax({
        type: 'POST',
        url: "/inventory/realtimeInventory/baobiaoAdd",
        data: {
            unit:unit,
            start_time:start_time,
            end_time:end_time,
            cas:cas,
            sku:sku,
        },
        dataType: "json",
        success: function (data) {
            window.location.href=data["result"];
        }
    });
})