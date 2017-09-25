var $table = $('#product_table', window.parent.document);

$(function () {
    doSearch(1);
    $("#query").click(function () {
        doSearch(1);
    })
    $("#add").click(function () {
        
        $.alle_dialog_close();
       
    })

    $("#cancel").click(function () {
        $.alle_dialog_close();
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

    $("#add_product").click(function () {
        var produt_ids = "";
        $('input[name="checkbox"]').each(function () {
            if (this.checked) {
                var id = $(this).val();
                var consumable_id = $("#consumable_id_" + id).val();
                var consumable_name = $("#consumable_name_" + id).val();
                var amount = $("#amount_" + id).val();
                var space_id = $("#space_id_" + id).val();
                var space_name = $("#space_name_" + id).val();
                var pack = $("#pack_" + id).val();
                var consumable_unit=$("#consumable_unit_" + id).val();
                produt_ids += consumable_id;
                add_product(id,pack,consumable_id,consumable_name,space_name,space_id,amount,consumable_unit)
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
        url: "/consumable/manager/stockPage",
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
                    value += '\
                    <tr class="tr_'+append[i]["stock_id"]  +'" id="tr_' + append[i]["stock_id"] + '">\
                        <td><input type="checkbox" name="checkbox" onclick="checkClick(this)" value="'+append[i]["stock_id"]+'"></td>\
                        <td><input type="hidden" id="consumable_id_'+append[i]["stock_id"]+'" value="'+append[i]["consumable_id"]+'"><input type="hidden" id="consumable_name_'+append[i]["stock_id"]+'" value="'+append[i]["consumable_name"]+'">' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td><input type="hidden" id="pack_'+append[i]["stock_id"]+'" value="'+append[i]["pack"]+'">' + append[i]["pack"] + '</td>\
                           <td><input type="hidden" id="amount_'+append[i]["stock_id"]+'" value="'+append[i]["amount"]+'">' + append[i]["amount"] + append[i]["consumable_unit"]+'</td>\
                            <td><input type="hidden" id="consumable_unit_'+append[i]["stock_id"]+'" value="'+append[i]["consumable_unit"]+'"><input type="hidden" id="space_name_'+append[i]["stock_id"]+'" value="'+append[i]["space_name"]+'"><input type="hidden" id="space_id_'+append[i]["stock_id"]+'" value="'+append[i]["space_id"]+'"> ' + append[i]["space_name"] + '</td>\
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
                         var id=$(this).find("input[name='checkbox']").val();

                        var consumable_id = $("#consumable_id_" + id).val();
                        var consumable_name = $("#consumable_name_" + id).val();
                        var amount = $("#amount_" + id).val();
                        var space_id = $("#space_id_" + id).val();
                        var space_name = $("#space_name_" + id).val();
                        var pack = $("#pack_" + id).val();
                        var consumable_unit=$("#consumable_unit_" + id).val();
                        produt_ids += consumable_id;
                        add_product(id,pack,consumable_id,consumable_name,space_name,space_id,amount,consumable_unit)
                        //$.alle_dialog_close();//窗体不关闭，用户自己手动关闭
                    })
                })
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

function add_product(id,pack,product_id, pro_name,space_name, space_id,amount,unit) {
    var producttr = $('#tr_' + product_id, window.parent.document).html();
    if (producttr) {
        layer.msg("每种耗材只能添加一次");//解决重复
        return false;
    }

    var $html = '';
    $html += '<tr id="tr_' + product_id + '">';
    $html += '<input id="stock_id_'+product_id+'" type="hidden" value="'+ id +'">';
    $html += '<input id="unit_'+product_id+'" type="hidden" value="'+ unit +'">';
    $html += '<input id="product_id_'+product_id+'" type="hidden" value="'+ product_id +'">';
    $html += '<td><span id="pro_name_' + product_id + '">' + pro_name + '</span></td>';
    $html += '<td><span id="pack_' + product_id + '">' + pack + '</span></td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input readonly="readonly" id="amount_' + product_id + '" type="text" value="' + amount + '" class="form-control input-sm" placeholder="" style="width: 68%;"></span>'
    $html += unit;
    $html += '</td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"><input  id="new_amount_' + product_id + '" type="text" value="" class="form-control input-sm" placeholder="" style="width: 68%;"></span>'
    $html += unit;
    $html += "</td>";
    $html += '<td><input type="hidden" id="space_id_' + product_id + '" value="' + space_id + '"/> <textarea id="space_name_' + product_id + '" title="' + space_name + '" readonly="readonly" class="form-control left" rows="1" cols="15">' + space_name + '</textarea></td>';
    $html += '<td>';
    $html += '<textarea id="desc_' + product_id + '"   class="form-control left" rows="1" cols="15"></textarea>';
    $html += '</td>';
    $html += '<td>';
    $html += '<a href="javascript:delTr(' + product_id + ')">删除</a>';
    $html += '</td>';
    $html += '</tr>';
    $table.prepend($html);
}
