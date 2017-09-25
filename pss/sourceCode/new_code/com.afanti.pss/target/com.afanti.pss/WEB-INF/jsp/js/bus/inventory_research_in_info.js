
$(function () {
    var research_id = $.alle_getUrlParam("research_id");
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
                    var is_waibao = append1["is_waibao"];
                    var cas = append1["cas"];
                    var sku = append1["sku"];
                    var face = append1["face"];
                    var sale_batch_no = append1["sale_batch_no"];
                    var sale_status =append1["status"];
                    var sale_status_name = append1["dict_name"];
                    var research_id = append1["research_id"];
                    load_product(batch_no, product_id, product_name, amount, unit, purity, sale_status_name, research_id,is_waibao,face,sale_batch_no,cas,sku);
                }
            }

    });
}

function load_product(batch_no,product_id,pro_name,amount, unit,purity, sale_status_name, research_id,is_waibao,face,sale_batch_no,cas,sku) {
   // alert(1);
    var $product_table = $('#product_table');
    var $html = '';

    $html += '<tr id="tr_' + research_id + '">'
    $html += '<td><input type="hidden" id="research_id" value="'+research_id+'"><input type="checkbox" id="checkbox" name="checkbox" value="' + batch_no + '"/></td>'
    $html += '<td><span id="pro_cas_' + research_id + '">' + cas + '</span></td>';
    $html += '<td><span id="pro_sku_' + research_id + '">' + sku + '</span></td>';
    $html += '<td><span id="pro_name_' + research_id + '">' + pro_name + '</span><input id="product_id" value="' + product_id + '" type="hidden"/> </td>';
    $html += '<td><span id="batch_no">' + batch_no + '</span></td>';
    $html += '<td><span id="sale_batch_no">' + sale_batch_no + '</span></td>';
    $html += '<td><span id="face">' + face + '</span></td>';
    $html += '<td><span class="label label-danger" id="status_' + research_id + '">' + sale_status_name + '</span></td>';
    // $html += '<td><span id="pro_type_name"'+product_id+'>'+pro_type_name+'</span></td>';
    $html += "<td>";
    $html += '<span style="margin-right: 3px;"> <input type="hidden" id="unit" value="'+unit+'"><input id="amount" readonly="readonly" value="' + amount + '" type="text" class="form-control input-sm" placeholder="" style="width: 45%;">'+unit+'</span>'
    $html += '</td>';
    $html += '<td><span> <input id="purity" readonly="readonly" value="' + purity + '" type="text" class="form-control input-sm" placeholder="" style="width: 60%;"></span></td>';
    $html += '<td><input type="hidden" id="space_id_0" value=""/> <textarea readonly="readonly"  onclick="select_dictWarehouseSpace(' + 0+ ')" id="space_name_' + 0 + '" title="' + $.alle_null2Str(0) + '" class="form-control left" rows="1" cols="6" style="width: 150px;"></textarea></td>';
    $html += '</tr>';
    $product_table.prepend($html);

}

function select_dictWarehouseSpace(i) {
    $.alle_dialog('/promanager/inventory/select_warehouse.html?i=' +i, "选择仓位", ["350px", "80%"]);
}
$("#submit").click(function () {
    var research_id=$("#research_id").val();
    var user_id=$("#name").val();
    var time=$("#time").val();
    var space_id=$("#space_id_0").val();
    var purity=$("#purity").val();
    var unit=$("#unit").val();
    var amount=$("#amount").val();
    var research_name=$("#research_name").html();
    var batch_no=$("#batch_no").html();
    var sale_batch_no=$("#sale_batch_no").html();
    var face=$("#face").html();
    var product_id=$("#product_id").val();
    if(!space_id)
    {
        tip_msg("请输入仓位", "#space_name_0");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/research/manage/researchIn",
        data: {
            research_id:research_id,
            space_id: space_id,
            unit: unit,
            purity: purity,
            amount: amount,
            batch_no: batch_no,
            product_id: product_id,
            user_id:user_id,
            time:time,
            face:face,
            sale_batch_no:sale_batch_no,
            research_name:research_name
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href="/promanager/inventory/add.html";
                }, 1000);
            }
        }

    });

})