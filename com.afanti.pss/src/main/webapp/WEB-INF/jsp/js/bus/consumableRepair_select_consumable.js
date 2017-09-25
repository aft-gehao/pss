var $table = $('#product_table', window.parent.document);

$(function () {
    doSearch(1);
    $("#query").click(function () {
        doSearch(1);
    })

    $("#checkAll").click(function () {
        if (this.checked) {
            $('input[name="checkbox"]').each(function () {
                this.checked = true;
            })
        } else {
            $('input[name="checkbox"]').each(function () {
                this.checked = false;
            })
        }
    });
    $("#cancel").click(function () {
        $.alle_dialog_close();
    })
    $("#add_product").click(function () {
        var produt_ids = "";
        $('input[name="checkbox"]').each(function () {
            if (this.checked) {
                var id = $(this).val();
                // alert($(this).html());
                var consumable_id = $("#consumable_id_" + id).val();
                var consumable_name = $("#consumable_name_" + id).val();
                var consumable_unit_ = $("#consumable_unit_" + id).val();
                var pack = $("#pack_" + id).val();
                produt_ids += consumable_id;
                add_product(consumable_id,pack, consumable_name, consumable_unit_);
            }
        })
        if (produt_ids == null || produt_ids == "") {
            layer.msg("至少选择一个产品");
            return false;
        }
        $.alle_dialog_close();
    })
})
function checkClick(obj) {
    if (!obj.checked) {
        $("#checkAll").removeAttr("checked");
    }
}
function doSearch(p) {

    var consumable_name = $("#consumable_name").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumableInfoPage",
        data: {
            consumable_name: consumable_name,
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
                    var pro_name = "'" + append[i]["name_en"] + "'";
                    var pro_type_name = "'" + append[i]["product_type_name"] + "'";
                    var p_type = "'" + append[i]["product_type"] + "'";
                    var unit = "'" + append[i]["unit"] + "'";
                    value += '\
                    <tr class="tr_'+ append[i]["consumable_id"]  +'" id="tr_' + append[i]["consumable_id"] + '">\
                    <td><input type="hidden" value="' + append[i]["consumable_id"] + '" id="consumable_id_' + append[i]["consumable_id"] + '"><input id="checkbox" name="checkbox" onclick="checkClick(this)" value="' + append[i]["consumable_id"] + '" type="checkbox"/></td>\
                        <td><input type="hidden" value="' + append[i]["pack"] + '" id="pack_' + append[i]["consumable_id"] + '"> <input type="hidden" value="' + append[i]["consumable_name"] + '" id="consumable_name_' + append[i]["consumable_id"] + '"> ' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td><input type="hidden" value="' + append[i]["consumable_unit"] + '" id="consumable_unit_' + append[i]["consumable_id"] + '">' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage);
                //选中当前行进行新增事件
                var produt_ids = "";
                $("tr[class^='tr_']").each(function () {
                    $(this).dblclick(function () {
                        // alert($(this).html());
                        var id=$(this).find("input[id^='consumable_id_']").val();
                        var consumable_id = $("#consumable_id_" + id).val();
                        var consumable_name = $("#consumable_name_" + id).val();
                        var consumable_unit_ = $("#consumable_unit_" + id).val();
                        var pack = $("#pack_" + id).val();
                        produt_ids += consumable_id;
                        add_product(consumable_id,pack,consumable_name, consumable_unit_);
                        //$.alle_dialog_close();//窗体不关闭，用户自己手动关闭
                    })
                })
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

function add_product(product_id,pack,pro_name,unit) {

    var producttr = $('#tr_' + product_id, window.parent.document).html();
    if (producttr) {
        layer.msg("每个耗材只能添加一次");
        return false;
    }
       var $html = '';
       $html += '<tr id="tr_'+product_id+'">'
       $html += '<td><span id="pro_name_'+product_id+'">'+pro_name+'</span><input id="product_id_'+product_id+'" value="'+product_id+'" type="hidden"/> </td>';
        $html += '<td><span id="pack_'+product_id+'">'+pack+'</span></td>';
        $html += "<td>";
        $html +='<input  id="new_amount_' + product_id + '" value="" type="text" class="form-control input-sm" placeholder="" style="width: 40%;">';
        $html += unit;
        $html += "</td>";
        $html += '<td><textarea id="desc_' + product_id + '" title=""  class="form-control" rows="1" cols="15"></textarea></td>';
        $html += '<td>';
        $html += '<a href="javascript:delTr(' + product_id + ')">删除</a>';
        $html += '</td>';
        $html += '</tr>';
       $table.prepend($html);
    }


