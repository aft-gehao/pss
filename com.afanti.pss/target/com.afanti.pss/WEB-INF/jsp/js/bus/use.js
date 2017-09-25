$(function () {
    doSearch(1);
    $("#pro_query").click(function () {
        doSearch(1);
    })
    $("#pro_add").click(function () {
        window.location.href = "/infomanager/product/product_add.html";
    })
    load_product_type();
})

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
        url: "/product/manager/product_page_list",
        data: {
            cas: cas,
            product_name: product_name,
            product_type: product_type,
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
                    var images = "'" + append[i]["imgage"] + "'";
                    value += '\
                    <tr >\
                        <td><img onclick="show_image(' + append[i]["product_id"] + ')" src="/js/commons/fileinput/img/photo_icon.png" width="80" height="80"></td>\
                       <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["name_en"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["create_time"]) + '</td>\
                          <td>' + append[i]["create_oper_name"] + '</td>\
                         <td class="operation">\
                         <input   type="button" disabled="disabled"    id="pro_mod"  data="'+append[i]["product_id"]+'" class="btn btn-link btn-xs" value="修改"/>\
                         <input  type="button" disabled="disabled"   id="pro_del"  data="'+append[i]["product_id"]+'" class="btn btn-link btn-xs" value="删除"/>\
                         <input   type="button" disabled="disabled"   id="pro_det"  data="'+append[i]["product_id"]+'" class="btn btn-link btn-xs" value="详情"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                $("input[id*='pro_del']").each(function () {
                    $(this).click(function(){

                        window.location.href="javascript:product_del("+($(this).attr("data"))+")";
                    })
                });
                $("input[id*='pro_mod']").each(function () {
                    $(this).click(function(){
                        window.location.href="javascript:to_upd_produce("+($(this).attr("data"))+")";
                    })
                });
                $("input[id*='pro_det']").each(function () {
                    $(this).click(function(){
                        window.location.href="javascript:product_detial("+($(this).attr("data"))+")";
                    })
                });
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

function to_upd_produce(product_id) {
    window.location.href = "/infomanager/product/product_upd.html?product_id="+product_id;
}
function product_del(product_id) {
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/product/manager/product_del",
            data: {
                product_id: product_id
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

function product_detial(product_id) {
    window.location.href = '/infomanager/product/product_detial.html?product_id=' + product_id;

}

function show_image(product_id) {
    $.ajax({
        type: 'POST',
        url: "/product/manager/load_product_image",
        data: {
            product_id: product_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $.alle_dialog_img(data["append"]);
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}