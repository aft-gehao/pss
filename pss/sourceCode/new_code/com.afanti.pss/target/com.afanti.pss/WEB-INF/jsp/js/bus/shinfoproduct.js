

$("#product_modify").click(function(){
    var p_pack=$("#p_pack").val();
    var p_price=$("#p_price").val();
    var p_purity=$("#p_purity").val();
    var supplier_id=$("#supplier_id_m").val();
    var product_id=$("#product_id_m").val();
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoProductUpData",
        data: {
            supplier_id: supplier_id,
            p_pack: p_pack,
            p_price: p_price,
            p_purity: p_purity,
            product_id: product_id
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                layer.msg('修改成功');
                window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+$("#supplier_id_m").val();
            } else {
                layer.msg(data["message"]);
            }
        }
    });


})
$("#delete").click(function(){
    var supplier_id= $("#supplier_id_d").val();
    var product_id=$("#product_id_d").val();
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoProductDelete",
        data: {
            supplier_id: supplier_id,
            product_id: product_id
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                layer.msg('删除成功');
                window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+supplier_id;
            } else {
                layer.msg(data["message"]);
            }
        }
    });

})
function del_p(e)
{
    var supplier_id=$(e).attr("data");
    var product_id=$(e).attr("datas");
    $("#product_id_d").val(product_id);
    $("#supplier_id_d").val(supplier_id);
}
function updata(e)
{

    var supplier_id=$(e).attr("data_s");
    var product_id=$(e).attr("data");
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/ProductUpDataSelect",
        data: {
            supplier_id: supplier_id,
            product_id: product_id
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                var value = "";
                if (data["append"]== null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append =data["append"];

                    value= '\
                     <form class="form-inline" >\
                   <div class="modify-p m10">\
                   <input type="hidden" id="product_id_m" value="'+product_id+'">\
                    <input type="hidden" id="supplier_id_m" value="'+supplier_id+'">\
                        <span class="form-control-static">cas：</span>\
                    <span id="p_cas" >' + append["cas"] + '</span>\
                        </div>\
                        <div class="modify-p m10">\
                        <span class="form-control-static">产品英文名：</span>\
                    <span id="p_en">' + append["name_en"] + '</span>\
                        </div>\
                        <div class="modify-p m10">\
                        <span class="form-control-static">产品中文名：</span>\
                    <span  id="p_ch">' + append["name_ch"] + '</span>\
                        </div>\
                        <div class="modify-p m10">\
                        <span class="form-control-static">包装规格：</span>\
                    <input type="text" id="p_pack" style="width:65px;" class="form-control input-sm" value="' + append["p_packs"] + '" maxlength="20">\
                        </div>\
                        <div class="modify-p m10">\
                        <span class="form-control-static">纯度：</span>\
                    <input type="text" id="p_purity" style="width:65px;" class="form-control input-sm" value="' + append["p_purity"] + '" maxlength="20"><span ></span>\
                        </div>\
                       </form>\
                    \
                    ';
                $("#table").html(value);

            } else {
                layer.msg(data["message"]);
            }
        }
    });

}
$(function () {


    $('#cancel,#cancel-2').click(function(){
        var cs_sup_id =  $.alle_getUrlParam("cs_sup_id");
        window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+cs_sup_id;
    });
    $('#back-Cg').click(function(){

        window.location.href="index.html";
    });


    /*进页面默认执行dosearch函数*/

    doSearch(1);
    $("#submit").click(function () {

        doSearch(1);
    })

})
$("#add").click(function(){
    var cs_sup_id =  $.alle_getUrlParam("cs_sup_id");
     var url="/infomanager/shinfo/product_add.html?cs_sup_id="+cs_sup_id
    window.location.href="/infomanager/shinfo/product_add.html?cs_sup_id="+cs_sup_id;

})
function doSearch(p) {
    var cs_sup_id =  $.alle_getUrlParam("cs_sup_id");

    //搜索条件
    var name_ch =$("#name_ch").val();
    var name_en =  $("#name_en").val();
    var cas = $("#cas").val();
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoProductSelect",
        data: {
            cs_sup_id: cs_sup_id,
            name_ch: name_ch,
            name_en: name_en,
            cas: cas,
            p: p
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                var value = "";

                if (data["append"]== null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                for (var i = 0; i < append.length; i++) {
                    value += '\
                    <tr >\
                       <input type="hidden" id="product_id" value="' + append[i]["product_id"] + '">\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + append[i]["name_en"] + '</td>\
                        <td>' + append[i]["p_purity"] +'%'+'</td>\
                        <td class="operation">\
                        <a onclick="updata(this)" data="' + append[i]["product_id"] + '" data_s="' + append[i]["supplier_id"] + '" href="#" data-toggle="modal" data-target="#myModal">修改</a>\
                        <a href="#"  onclick="del_p(this)" data="' + append[i]["supplier_id"] + '" datas="' + append[i]["product_id"] + '"  data-toggle="modal" data-target="#confirm-delete">删除</a>\
                        </td>\
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
//获取需要删除的供应商id
function del(e)
{
    $("#del").val($(e).attr("data"));
}
//删除联系人方法
$("#shanchusubmit").click(function(){
    var cs_sup_id=$("#del").val();
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoDelete",
        data: {
            cs_sup_id:cs_sup_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/infomanager/shinfo/index.html";
                }, 1000);
            }
        }
    });
})