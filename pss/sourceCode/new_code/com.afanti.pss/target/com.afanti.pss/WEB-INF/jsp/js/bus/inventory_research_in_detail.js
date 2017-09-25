var purchase_id = "";
var stock_status = 0;
$(function () {
    var research_id = $.alle_getUrlParam("research_id");
    stock_status = $.alle_getUrlParam("stock_status");
    $("#back").click(function () {
        window.location.href = "/promanager/inventory/add.html";
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

    load_research_in_info(research_id)
})
function load_research_in_info(research_id) {
    $.ajax({
        type: 'POST',
        url: "/research/manage/researchSelect",
        data: {
            research_id: research_id
        },
        dataType: "json",
        success: function (data) {
            var a=data["appends"];
            // alert("a"+a);
            if (data["result"] == "success") {
                var append1 = data["append"];
                $("#research_name").html(append1["research_name"]);
                $("#name").val(append1["research_staff"]);
                $("#time").val(append1["research_time"]);
                $("#staff_name").html(append1["staff_name"]+"/"+$.alle_time2str_yymm_dd_hhmmss(append1["research_time"]));
                    var batch_no = append1["research_batch_no"];
                    var product_id = append1["product_id"];
                    var product_name =append1["name_en"];
                    var amount = append1["amount"];
                    var unit =append1["unit"];
                    var purity = append1["purity"];
                    var sale_batch_no = append1["sale_batch_no"];
                    var face = append1["face"];
                    var sale_status =append1["status"];
                    var sale_status_name = append1["dict_name"];
                    var research_id = append1["research_id"];
                    var space_name = append1["space_name"];
                    load_product(batch_no, product_id, product_name, amount, unit, purity, sale_status_name, research_id,space_name,sale_batch_no,face,a);
                }
            }

    });
}

function load_product(batch_no,product_id,pro_name,amount, unit,purity, sale_status_name, research_id,space_name,sale_batch_no,face,a) {
    var $product_table = $('#product_table');
    var $html = '';
    $html += '<tr id="tr_' + research_id + '">'
    $html += '<td><input type="hidden" id="research_id" value="'+research_id+'"><input type="checkbox" id="checkbox" name="checkbox" value="' + batch_no + '"/></td>'
    $html += '<td><span id="batch_no">' + batch_no + '</span></td>';
    $html += '<td><span id="sale_batch_no">' + sale_batch_no + '</span></td>';
    $html += '<td><span id="face">' + face + '</span></td>';
    $html += '<td><span class="label label-danger" id="status_' + research_id + '">' + sale_status_name + '</span></td>';
    $html += '<td><span id="pro_name_' + research_id + '">' + pro_name + '</span><input id="product_id" value="' + product_id + '" type="hidden"/> </td>';
    // $html += '<td><span id="pro_type_name"'+product_id+'>'+pro_type_name+'</span></td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input id="amount" readonly="readonly" value="' + amount + '" type="text" class="form-control input-sm" placeholder="" style="width: 35%;"></span>'
    $html += '<select style="width: 60%;" id="unit" class="form-control input-sm">';
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
    $html += '<td><span> <input id="purity" value="' + purity + '" type="text"  readonly="readonly" class="form-control input-sm" placeholder="" style="width: 60%;"></span></td>';
    $html += '<td><input type="hidden" id="space_id_0" value=""/> <textarea readonly="readonly"    class="form-control left" rows="1" cols="10" style="width: 200px;">'+space_name+'</textarea></td>';
    $html += '<td><a href="/promanager/inventory/Template.html?purchase_id='+a+'&product_name_en='+pro_name+'&stock_status='+stock_status+'">预览</a></td>';
    $html += '</tr>';
    $product_table.prepend($html);

}
