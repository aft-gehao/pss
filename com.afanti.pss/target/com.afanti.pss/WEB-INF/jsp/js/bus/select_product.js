var $table = $('#product_table', window.parent.document);
var product_ids = 0;
var supplier_id = 0;
$(function () {
    product_ids = $.alle_getUrlParam("product_ids");
   // alert(product_ids);
    supplier_id = $.alle_getUrlParam("supplier_id");
    doSearch(1);
    $("#query").click(function () {
        doSearch(1);
    })
    load_product_type();
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
                var product_id = $("#product_id_" + id).val();
                var product_name = $("#product_name_" + id).val();
                var purity = $("#purity_" + id).val();
                var unit = $("#unit_" + id).val();
                produt_ids += product_id;
                add_product(product_id, product_name, unit, 0, purity);
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
function load_product_type() {
    $.ajax({
        type: 'POST',
        url: "/product/manager/load_product_type",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#product_type").html("");
                var html = "<option value=''>请选择</option>";
                var append = data["append"];
                for (var i = 0; i < append.length; i++) {
                    html += "<option value='" + append[i]["dict_id"] + "'>" + append[i]["dict_name"] + "</option>"
                }
                $("#product_type").html(html);
            }
        }
    });
}
function doSearch(p) {

    var cas = $("#cas").val();
    var product_name = $("#product_name").val();
    var product_type = $("#product_type").val();
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/manager/supplier_product_page_list",
        data: {
            cas: cas,
            product_name: product_name,
            supplier_id: supplier_id,
            product_type: product_type,
            product_ids: product_ids,
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
                    var unit = "'" + append[i]["unit"] + "'";
                    //                         <td>' + append[i]["product_type_name"] + '</td>\
                    value += '\
                    <tr  class="tr_'+ append[i]["product_id"]+'" id="tr_' + append[i]["product_id"] + '">\
                    <td><input type="hidden" value="' + append[i]["product_id"] + '" id="product_id_' + append[i]["product_id"] + '"><input id="checkbox" name="checkbox" onclick="checkClick(this)" value="' + append[i]["product_id"] + '" type="checkbox"/></td>\
                       <td> <input type="hidden" id="product_name_' + append[i]["product_id"] + '" value="' + append[i]["name_en"] + '"> ' + append[i]["cas"] + '</td>\
                        <td><input type="hidden" id="purity_' + append[i]["product_id"] + '" value="' + append[i]["purity"] + '"><input type="hidden" id="price_' + append[i]["product_id"] + '" value="' + append[i]["price"] + '"><input type="hidden" id="unit_' + append[i]["product_id"] + '" value="' + unit + '">' + $.alle_null2Str(append[i]["name_en"]) + '</td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage);
                //选中当前行进行新增事件//可能存在有问题11
                var produt_ids = "";
                $("tr[class^='tr_']").each(function () {
                    $(this).dblclick(function () {
                        // alert($(this).html());
                        var id=$(this).find("input[id^='product_id_']").val();
                        var product_id = $("#product_id_" + id).val();
                        var product_name = $("#product_name_" + id).val();
                        var purity = $("#purity_" + id).val();
                        var unit = $("#unit_" + id).val();
                        produt_ids += product_id;
                        add_product(product_id, product_name, unit, 0, purity);
                        //$.alle_dialog_close();//窗体不关闭，用户自己手动关闭
                    })
                })
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

function add_product(product_id, pro_name, unit, price, purity) {
    var producttr = $('#tr_' + product_id, window.parent.document).html();
    if (producttr) {
        layer.msg("每个产品只能添加一次");
        return false;
    }
    var $html = '';
    $html += '<tr id="tr_' + product_id + '">'
    $html += '<td><span id="pro_name_"' + product_id + '>' + pro_name + '</span><input id="product_id_' + product_id + '" value="' + product_id + '" type="hidden"/> </td>';
    // $html += '<td><span id="pro_type_name"'+product_id+'>'+pro_type_name+'</span></td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input id="amount_' + product_id + '" type="text" class="form-control input-sm" placeholder="" style="width: 45%;"></span>'
    $html += '<select style="width: 45%;" id="unit_' + product_id + '" class="form-control input-sm">';
    $html += '<option value="">请选择</option>';
    if (unit == "mg") {
        $html += '<option selected="selected"  value="mg">mg</option>';
    } else {
        $html += '<option  value="mg">mg</option>';
    }
    if (unit == "g") {
        $html += '<option selected="selected"  value="g">g</option>';
    } else {
        $html += '<option  value="g">g</option>';
    }
    if (unit == "kg") {
        $html += '<option selected="selected"  value="kg">kg</option>';
    } else {
        $html += '<option  value="kg">kg</option>';
    }
    if (unit == "ml") {
        $html += '<option selected="selected"  value="ml">ml</option>';
    } else {
        $html += '<option   value="ml">ml</option>';
    }
    if (unit == "l") {
        $html += '<option selected="selected"  value="L">L</option>';
    } else {
        $html += '<option  value="L">L</option>';
    }
    if (unit == "L") {
        $html += '<option selected="selected"  value="L">L</option>';
    } else {
        $html += '<option  value="L">L</option>';
    }
    $html += '</select>';
    $html += '</td>';
    $html += '<td><span> <input id="purity_' + product_id + '" value="' + purity + '" type="text" class="form-control input-sm" placeholder="" style="width: 40%;"></span></td>';
    $html += '<td>';
    $html += '<span> <input id="unit_price_' + product_id + '" value="' + price + '" onchange="sumTotal()" type="text" class="form-control input-sm" placeholder="" style="width: 68%;"> </span>';
    $html += '<span class="ml10">元</span>';
    $html += '</td>';
    $html += '<td><textarea id="desc_' + product_id + '" class="form-control left" rows="1" cols="30"></textarea></td>';
    $html += '<td>';
    $html += '<a href="javascript:delTr(' + product_id + ')">删除</a>';
    $html += '</td>';
    $html += '</tr>';
    $table.prepend($html);
    parent.sumTotal();
}
