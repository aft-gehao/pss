$(function () {
    /* load_product_type();*/
    doSearch(1);
    $("#inv_in_query").click(function () {
        doSearch(1);
    })
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            doSearch(1);
        }
    })
})

/*function load_product_type() {
    $.ajax({
        type: 'POST',
        url: "/inventory/productIn/load_inventory_type",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#stock_status").html("");
                var html = "<option value='5002'>未入库</option><option value=''>请选择</option><option value='5001'>已入库</option><option value='5003'>部分入库</option>";
               /!* var append = data["append"];
                for (var i = 0; i < append.length; i++) {
                    html += "<option value='" + append[i]["dict_id"] + "'>" + append[i]["dict_name"] + "</option>"
                }*!/
                $("#stock_status").html(html);
            }
        }
    });
}*/
function doSearch(p) {

    var consumable_name = $("#consumable_name").val();
    var stock_status = $("#stock_status").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/UsePage",
        data: {
            consumable_name: consumable_name,
            stock_status:stock_status,
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
                    if(append[i]==null)
                    {
                        layer.msg('暂无数据');
                        return;
                    }
                    var html2 ="";
                    var html4="";
                    if (append[i]["dict_name"] =='已出库') {
                        html2 += '<input type="hidden" id="use_id" value="'+$.alle_null2Str(append[i]["use_id"])+'">'+'<span class="label label-success" style="background-color: #5cb85c">已出库</span>';
                    } else if (append[i]["dict_name"] =='部分出库') {
                        html2 +='<input type="hidden" id="use_id" value="'+$.alle_null2Str(append[i]["use_id"])+'">'+ '<span class="label label-info" style="background-color: #5cb85c">部分出库</span>';
                    } else if (append[i]["dict_name"] =='未出库') {
                        html2 += '<input type="hidden" id="use_id" value="'+$.alle_null2Str(append[i]["use_id"])+'">'+'<span class="label label-danger">未出库</span>';
                        html4 += "<input id='con_out_cancle'   class='btn btn-link btn-xs' type='button' onclick='out_cancle(" + append[i]["use_id"]+ ")' value='取消'/>";
                    }
                    var html ="";
                    var html3 ="";
                    if(append[i]["dict_name"] != "已出库")
                    {
                        html += "<input id='con_out_submit'  disabled='disabled'  class='btn btn-link btn-xs' type='button' onclick='out_detial(" + append[i]["stock_id"]+ "," + append[i]["use_id"]+ ","+append[i]["amount"]+"," + append[i]["consumable_id"]+ ")' value='出库'/>";
                    }

                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                        <td>' + append[i]["space_name"] + '</td>\
                        <td>' + html2 + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                         <td class="operation">' + html + ''+html4+'</td>\
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

function out_detial(stock_id,use_id,amount,consumable_id) {

    $.ajax({
        type: 'POST',
        url: "/consumable/manager/out_use",
        data: {
            stock_id: stock_id,
            use_id: use_id,
            consumable_id:consumable_id,
            amount:amount
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {

                setTimeout(function () {

                    window.location.reload();

                }, 1000);
            }

        }
    })
}
function out_cancle(id)
{
    var id=id;
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/useDel",
        data: {
            use_id: id
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            }

        }
    })
}