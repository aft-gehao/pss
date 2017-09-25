var $table = $('#product_table', window.parent.document);
var product_ids = 0;
var supplier_id = 0;
$(function(){
  
})
window.onload = function() {
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
                var cas = $("#product_cas_" + id).val();
                var sku = $("#product_sku_" + id).val();
                var unit = $("#unit_" + id).val();
                var product_type = $("#product_type_" + id).val();
                produt_ids += product_id;
                add_product(product_id, product_name, unit, 0, purity, sku, cas,product_type);
            }
        })
        if (produt_ids == null || produt_ids == "") {
            layer.msg("至少选择一个产品");
            return false;
        }
        $.alle_dialog_close();
    })
}
function checkClick(obj) {
    // var html='<td style="width: 20px;text-align: center;vertical-align:middle;"><input type="button" value="确定"/></td>';
    // alert($(obj).parent().html());
    // $($(obj).parents("tr").append(html));
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
    //完成全选按钮
    // alert($("tbody tr[class^='tr_']").parents("tr").html());
    var cas = $("#cas").val();
    var sku = $("#sku").val();
    var nameEn = $("#product_name").val();
    $.ajax({
        type: 'POST',
        url: "/research/manage/researchProduct",
        data: {
            sku: sku,
            cas: cas,
            nameEn: nameEn,
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
                    // var pro_name2 = "'" + append[i]["name_ch"] + "'";
                    // alert(pro_name2);


                    var unit = "'" + append[i]["unit"] + "'";
                    //                         <td>' + append[i]["product_type_name"] + '</td>\
                    value += '\
                    <tr style="text-align:  center;vertical-align:middle;height:20px;" class="tr_'+ append[i]["product_id"]+'" id="tr_' + append[i]["product_id"] + '">\
                    <td style="width: 100px;text-align: center;vertical-align:middle;"><input type="hidden" value="' + append[i]["product_id"] + '" id="product_id_' + append[i]["product_id"] + '"><input id="checkbox" name="checkbox" onclick="checkClick(this)" value="' + append[i]["product_id"] + '" type="checkbox"/></td>\
                       <td style="width: 50px;text-align: center;vertical-align:middle;"><input type="hidden" value="' + append[i]["product_type"] + '" id="product_type_' + append[i]["product_id"] + '"> <input type="hidden" id="product_name_' + append[i]["product_id"] + '" value="' + append[i]["name_en"] + '"><input type="hidden" id="product_cas_' + append[i]["product_id"] + '" value="' + append[i]["cas"] + '"><input type="hidden" id="product_sku_' + append[i]["product_id"] + '" value="' + append[i]["sku"] + '">   ' + append[i]["cas"] + '</td>\
                      <td style="width: 50px;text-align: center;vertical-align:middle;">'+append[i]["sku"]+'</td> \
                        <td style="width: 100px;text-align: center;vertical-align:middle;"><input type="hidden" id="purity_' + append[i]["product_id"] + '" value="' + append[i]["purity"] + '"><input type="hidden" id="price_' + append[i]["product_id"] + '" value="' + append[i]["price"] + '"><input type="hidden" id="unit_' + append[i]["product_id"] + '" value="' + unit + '">' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td style="width: 200px;text-align: center;vertical-align:middle;">'+$.alle_null2Str(append[i]["name_ch"])+'</td> \
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
                        var id=$(this).find("input[id^='product_id_']").val();
                        var product_id = $("#product_id_" + id).val();
                        var product_name = $("#product_name_" + id).val();
                        var purity = $("#purity_" + id).val();
                        var cas = $("#product_cas_" + id).val();
                        var sku = $("#product_sku_" + id).val();
                        var unit = $("#unit_" + id).val();
                        var product_type = $("#product_type_" + id).val();
                        produt_ids += product_id;
                        // alert(produt_ids);
                        add_product(product_id, product_name, unit, 0, purity, sku, cas,product_type);
                        //$.alle_dialog_close();//窗体不关闭，用户自己手动关闭
                    })
                })
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}
function delTr(tr_id) {

    var tr_id = "tr_" + tr_id;
    $("#" + tr_id).remove();
    sumTotal();
}
function add_product(product_id, pro_name, unit, price, purity,sku,cas,product_type) {
    var producttr = $('#tr_' + product_id, window.parent.document).html();
    if (typeof(producttr) != "undefined") {
        layer.msg('每个产品只能添加一次');//解决重复
        return false;
    }
    var $html = '';
    $html += '<tr id="tr_' + product_id + '">'
    $html += '<td><span id="pro_cas_' + product_id + '">' + cas + '</span><input id="product_type_' + product_id + '" value="' + product_type + '" type="hidden"/><input id="product_id_' + product_id + '" value="' + product_id + '" type="hidden"/> </td>';
    $html += '<td><span id="pro_sku_' + product_id + '">' + sku + '</span></td>';
    $html += '<td style="position: relative;" id="putu' + product_id + '" ></td>';
    // $html += '<td><span id="pro_type_name"'+product_id+'>'+pro_type_name+'</span></td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input id="amount_' + product_id + '" type="text" class="form-control input-sm" placeholder="" style="width: 45%;"></span>'
    $html += '<select style="width: 45%;" id="unit_' + product_id + '" class="form-control input-sm">';
    if (unit == "g") {
        $html += '<option selected="selected"  value="g">g</option>';
    } else {
        $html += '<option  value="g">g</option>';
    }
    if (unit == "mg") {
        $html += '<option selected="selected"  value="mg">mg</option>';
    } else {
        $html += '<option  value="mg">mg</option>';
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
    $html += '<td><span> <input id="hours_' + product_id + '" value="" type="text" class="form-control input-sm" placeholder="" style="width: 90%;"></span></td>';
    $html += '<td><span> <input id="purity_' + product_id + '" value="" type="text" class="form-control input-sm" placeholder="" style="width: 90%;"></span></td>';
    $html += '<td><span> <input id="face_' + product_id + '" value="" type="text" class="form-control input-sm" placeholder="" style="width: 70%;"></span></td>';
    $html += '<td><select style="width: 100%;" id="waibao_' + product_id + '" class="form-control input-sm"><option  value="2">采购</option><option  value="1">自研发</option><option  value="0">外包</option></select></td>';
    $html += '<td><span> <input id="batch_no_' + product_id + '" value="" type="text" class="form-control input-sm" placeholder="" style="width: 90%;"></span></td>';
    $html += '<td>';
    //$html += '<input id="gyFile" onclick="test()" type="file" multiple="true">'
        /*'<a href="javascript:$("#uploadify").uploadify("upload")">开始上传</a> ' +
        '<a href="javascript:$("#uploadify").uplaodify("cancel","*")">取消上传</a>';*/
    $html +='<input  id="gyFile" type="button" multiple="true" style="display: none;"> ' +
    '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png" onmouseover="test(' + product_id + ')" >'
    $html += '<a href="javascript:delTr(' + product_id + ')">删除</a>';
    $html += '</td>';
    $html += '</tr>';

    $table.prepend($html);
}
