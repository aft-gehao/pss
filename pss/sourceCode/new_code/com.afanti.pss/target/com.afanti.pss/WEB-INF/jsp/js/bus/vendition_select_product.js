var $table = $('#product_table', window.parent.document);
var batch_nos = 0;
$(function () {
    batch_nos = $.alle_getUrlParam("batch_nos");
    doSearch(1);
    $("#query").click(function () {
         doSearch(1);
    })
    load_product_type();
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
                var product_id = $("#product_id_" + id).val();
                var product_name = $("#product_name_" + id).val();
                var unit = $("#unit_" + id).val();
                var product_price = $("#product_price_" + id).val();
                var purity = $("#purity_" + id).val();
                var space_name = $("#space_name_" + id).val();
                var space_id = $("#space_id_" + id).val();
                var batch_no = $("#batch_no_" + id).val();
                var amount = $("#amount_" + id).val();
                var sale_batch_no = $("#sale_batch_no_" + id).val();
                var face = $("#face_" + id).val();
                var cas = $("#cas_" + id).val();
                var sku = $("#sku_" + id).val();
                produt_ids += product_id;
                add_product(product_id, product_name, unit, product_price, purity, space_name, space_id, batch_no, amount,sale_batch_no,face,cas,sku)
            }
        })
        if (produt_ids == null || produt_ids == "") {
            layer.msg("至少选择一个产品");
            return false;
        }
        $.alle_dialog_close();
    })
//链接判断
    var flag=$.alle_getUrlParam("flag")
    if (flag==2){
        var cas=$.alle_getUrlParam("cas")
        $("#sale_name").val(cas)
        //加载时的迟缓
        setTimeout('$("#query").click()',500)
    }

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

    var cas = $("#sale_name").val();
    var product_name = $("#product_name").val();
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/vendition_product_page_list",
        data: {
            cas: cas,
            product_name: product_name,
            batch_nos: batch_nos,
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
                    var batch_no = "'" + append[i]["batch_no"] + "'";
                    var pro_name = "'" + append[i]["product_name"] + "'";
                    var space_name = append[i]["space_name"] ;
                    var unit = append[i]["unit"];
                    value += '\
                    <tr class="tr_'+ batch_no  +'" id="tr_' + batch_no + '">\
                        <td><input type="checkbox" name="checkbox" onclick="checkClick(this)" value="'+append[i]["batch_no"]+'"></td>\
                        <td>' + $.alle_null2Str(append[i]["batch_no"]) + '</td>\
                         <td>' + append[i]["cas"] + '</td>\
                         <td>' + append[i]["name_en"] + '</td>\
                           <td>' + append[i]["amount"] + append[i]["unit"]+'</td>\
                            <td>' + append[i]["purity"] + '</td>\
                            <td>\
                            <input type="hidden" id="product_id_'+append[i]["batch_no"]+'" value="'+append[i]["product_id"]+'"/>' +
                            '<input type="hidden" id="product_name_'+append[i]["batch_no"]+'" value="'+append[i]["name_en"]+'"/>' +
                        '<input type="hidden" id="unit_'+append[i]["batch_no"]+'" value="'+append[i]["unit"]+'"/>' +
                        '<input type="hidden" id="product_price_'+append[i]["batch_no"]+'" value="0"/>' +
                        '<input type="hidden" id="purity_'+append[i]["batch_no"]+'" value="'+append[i]["purity"]+'"/>' +
                        '<input type="hidden" id="space_name_'+append[i]["batch_no"]+'" value="'+space_name+'"/>' +
                        '<input type="hidden" id="space_id_'+append[i]["batch_no"]+'" value="'+append[i]["space_id"]+'"/>' +
                        '<input type="hidden" id="batch_no_'+append[i]["batch_no"]+'" value="'+append[i]["batch_no"]+'"/>' +
                        '<input type="hidden" id="amount_'+append[i]["batch_no"]+'" value="'+append[i]["amount"]+'"/>' +
                        '<input type="hidden" id="face_'+append[i]["batch_no"]+'" value="'+append[i]["face"]+'"/>' +
                        '<input type="hidden" id="sale_batch_no_'+append[i]["batch_no"]+'" value="'+append[i]["sale_batch_no"]+'"/>' +
                        '<input type="hidden" id="cas_'+append[i]["batch_no"]+'" value="'+append[i]["cas"]+'"/>' +
                        '<input type="hidden" id="sku_'+append[i]["batch_no"]+'" value="'+append[i]["sku"]+'"/>' +
                        ' ' + append[i]["space_name"] + '</td>\
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
                        // var id=$(this).find("input[id^='product_id_']").val();
                        var id=$(this).find("input[name='checkbox']").val();
                        var product_id = $("#product_id_" + id).val();
                        var product_name = $("#product_name_" + id).val();
                        var unit = $("#unit_" + id).val();
                        var product_price = $("#product_price_" + id).val();
                        var purity = $("#purity_" + id).val();
                        var space_name = $("#space_name_" + id).val();
                        var space_id = $("#space_id_" + id).val();
                        var batch_no = $("#batch_no_" + id).val();
                        var amount = $("#amount_" + id).val();
                        var sale_batch_no = $("#sale_batch_no_" + id).val();
                        var face = $("#face_" + id).val();
                        var cas = $("#cas_" + id).val();
                        var sku = $("#sku_" + id).val();
                        produt_ids += product_id;
                        add_product(product_id, product_name, unit, product_price, purity, space_name, space_id, batch_no, amount,sale_batch_no,face,cas,sku);
                        //$.alle_dialog_close();//窗体不关闭，用户自己手动关闭
                    })
                })
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

function add_product(product_id, pro_name, unit, price, purity, space_name, space_id, batch_no, amount,sale_batch_no,face,cas,sku) {
    var producttr = $('#tr_' + batch_no, window.parent.document).html();
    if (producttr) {
        layer.msg("每个产品只能添加一次");
        return false;
    }
    var batch_no2 = "'" + batch_no + "'";
    var $html = '';
    $html += '<tr id="tr_' + batch_no + '">';
    $html += '<td><span id="batch_no_str"' + batch_no + '>' + batch_no + '</span><input type="hidden" id="batch_no_' + batch_no + '" value="' + batch_no + '"/> </td>';
    $html += '<td><span id="pro_name_"' + batch_no + '>' + pro_name + '</span><input id="product_id_' + batch_no + '" value="' + product_id + '" type="hidden"/> </td>';
    $html += '<td><span id="pro_sku_"' + batch_no + '>' + sku + '</span> </td>';
    $html += '<td><span id="pro_cas_"' + batch_no + '>' + cas + '</span> </td>';
    $html += '<td><span id="face_"' + batch_no + '>' + face+ '</span> </td>';
    $html += '<td><span id="sale_batch_no_"' + batch_no + '>' + sale_batch_no + '</span> </td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input readonly="readonly" id="amount_' + batch_no + '" type="text" value="' + amount + '" class="form-control input-sm" placeholder="" style="width: 68%;"></span>'
    $html += '';
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "g") {
        $html += 'g';
    }
    if (unit == "ml") {
        $html += 'ml';
    }
    if (unit == "l") {
        $html += 'L';
    }
    if (unit == "L") {
        $html += 'L';
    }
    $html += '</td>';
    $html += '<td><span> <input  readonly="readonly" id="purity_' + batch_no + '" value="' + purity + '" type="text" class="form-control input-sm" placeholder="" style="width: 100%;"></span></td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"><input type="hidden" id="unit_' + batch_no + '" value="' + unit + '"/> <input  id="new_amount_' + batch_no + '" type="text" value="' + amount + '" class="form-control input-sm" placeholder="" style="width: 68%;"></span>'
    $html += '';
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "g") {
        $html += 'g';
    }
    if (unit == "ml") {
        $html += 'ml';
    }
    if (unit == "l") {
        $html += 'L';
    }
    if (unit == "L") {
        $html += 'L';
    }
    $.html += "</td>";
    $html += '<td>';
    $html += '<span> <input id="unit_price_' + batch_no + '" value="' + price + '" onchange="sumTotal()" type="text" class="form-control input-sm" placeholder="" style="width: 68%;"> 元</span>';
    $html += '</td>';
    $html += '<td><input type="hidden" id="space_id_' + batch_no + '" value="' + space_id + '"/> <textarea id="space_name_' + batch_no + '" title="' + space_name + '" readonly="readonly" class="form-control left" rows="1" cols="15">' + space_name + '</textarea></td>';
    $html += '<td>';
    $html += '<a href="javascript:delTr(' + batch_no2 + ')">删除</a>';
    $html += '</td>';
    $html += '</tr>';
    $table.prepend($html);
    parent.sumTotal();
}
