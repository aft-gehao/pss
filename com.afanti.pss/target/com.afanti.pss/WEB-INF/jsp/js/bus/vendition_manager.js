$(function () {
    $.alle_section_date("start_time", "end_time");
    doSearch(1);
    $("#ven_query").click(function () {
        doSearch(1);
    })
    $('#ven_add').click(function () {
        window.location.href = "/promanager/vendition/add.html";
    });
    
})


function doSearch(p) {
    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();
    var cas = $("#cas").val();
    var sku = $("#sku").val();
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/vendition_purchase_page",
        data: {
            cas: cas,
            sku: sku,
            start_time: start_time,
            end_time: end_time,
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
                    var html_mod = "";
                    var html_type = "";
                    var html_sumbit = "";
                    var html_doc = "";
                    if (append[i]["status"] == 8001) {
                        html_type += '<span class="label label-success">' + append[i]["status_str"] + '</span>';
                    }
                    if (append[i]["status"] == 8003) {
                        html_type += '<span class="label label-info">' + append[i]["status_str"] + '</span> ';
                    }
                    if (append[i]["status"] == 8002) {
                        html_type += '<span class="label label-danger">' + append[i]["status_str"] + '</span></span>';
                        html_doc += "<a  id='ven_doc' class='btn btn-link' style='padding: 0px;' onclick='test(this)' data='"+append[i]["hetong_doc"]+"'>下载合同</a>";
                        html_mod += "<a  id='ven_doc'data-toggle='modal' data-target='#hetong-mod' class='btn btn-link' style='padding: 0px; 'onclick='mod_doc(this)' data='"+append[i]["sale_d_id"]+"'>修改合同</a>";
                    }
                    value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["amount"]) + '' + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["unit_price"]) + '</td>\
                      <td>' + $.alle_null2Str(append[i]["sale_batch_no"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["cus_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["sale_time"]) + '</td>\
                        <td>' +html_type + '</td>\
                         <td class="operation">' + html_sumbit + ''+html_mod+''+html_doc+'</td>\
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

function to_upd_vendition(sale_id) {
    window.location.href = "/promanager/vendition/edit.html?sale_id=" + sale_id;
}
function del_vendition(sale_id) {
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/vendition/manager/del_vendition",
            data: {
                sale_id: sale_id
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
function vendition_detial(sale_id) {
    window.location.href = "/promanager/vendition/detail.html?type=vendition&sale_id=" + sale_id;
}
function show_image(url) {
    $.alle_dialog_img(url);
}
function vendition_doc(path) {
    window.location.href="http://source.tanyangnet.com"+path;
}
function test(e)
{
    window.open("http://source.tanyangnet.com/"+$(e).attr("data"));
}
function mod_doc(e){

    var sale_d_id=$(e).attr("data");
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/select_vendition",
        data: {
            sale_d_id: sale_d_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#cunhuo_cas").val(data["append"]["cas"])
                $("#cunhuo_sku").val(data["append"]["sku"])
                $("#cunhuo_name_en").val(data["append"]["name_en"])
                $("#cunhuo_purity").val(data["append"]["purity"])
                $("#cunhuo_amount").val(data["append"]["amount"])
                $("#cunhuo_price").val(data["append"]["unit_price"])
                $("#sale_d_id").val(data["append"]["sale_d_id"])
                $("#sale_way").val(data["append"]["sale_way"])
            }
        }
    });
}
$("#sure_mod").click(function () {
       var amount= $("#cunhuo_amount").val();
       var sale_way= $("#sale_way").val();
       var purity= $("#cunhuo_purity").val();
       var unit_price= $("#cunhuo_price").val();
       var sale_d_id=$("#sale_d_id").val();
       var unit=$("#cunhuo_unit").val();
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/vendition_updata",
        data: {
            amount:amount,
            unit:unit,
            purity:purity,
            unit_price:unit_price,
            sale_d_id: sale_d_id
        },
        dataType: "json",
        success: function (data) {
            $.ajax({
                type: 'POST',
                url: "/vendition/manager/select_vendition",
                data: {
                    sale_d_id: sale_d_id
                },
                dataType: "json",
                success: function (data) {
                    layer.msg("操作成功");
                    var custom=encodeURI(encodeURI(data["append"]["name"]))
                    var sale_way=data["append"]["sale_way"]
                    var cas=data["append"]["cas"]
                    var name_en=encodeURI(encodeURI(data["append"]["name_en"]))
                    var amount=data["append"]["amount"]
                    var price=data["append"]["unit_price"]
                    var unit=data["append"]["unit"]
                    setTimeout(function() {
                        window.open("/promanager/vendition/sale_hetong.html?sale_way="+sale_way+"&customer="+custom+"&cas="+cas+"&name_en="+name_en+"&amount="+amount+"&price="+price+"&unit="+unit+"&sale_d_id="+sale_d_id);
                    },1000);

                }
            });

        }
    });

})

