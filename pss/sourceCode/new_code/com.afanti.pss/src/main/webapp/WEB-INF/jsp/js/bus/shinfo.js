
function del(id) {

    if(confirm("确定要删除吗？"))
    {

        var url = "index.html";

        window.location.href=url;

    }

}
$(function () {

    $('#gys_add').click(function(){

        window.location.href="add.html";
    });
   /* $('#modify').click(function(){
    alert(1);
        window.location.href="modify.html";
    });*/
    $('.product').click(function(){

        window.location.href="product.html";
    });
    $('.details').click(function(){

        window.location.href="detail.html";
    });

    /*进页面默认执行dosearch函数*/

    doSearch(1);
    $("#gys_query").click(function () {

        doSearch(1);
    })

})
function doSearch(p) {
    var credit_level;
    var supplier_name = $("#supplier_name").val();
    if($("#credit_level").val()!="全部") {
         credit_level = $("#credit_level").val();
    }
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoSelect",
        data: {
            supplier_name: supplier_name,
            credit_level: credit_level,
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
                        <td>' + append[i]["name"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["s_level"]) + '</td>\
                        <td>' + append[i]["s_type"] + '</td>\
                        <td class="operation">\
                        <input   disabled="disabled" type="button"   id="gys_pro"  data="'+append[i]["cs_sup_id"]+'" class="btn btn-link btn-xs" value="产品"/>\
                        <input disabled="disabled" type="button" data="'+append[i]["cs_sup_id"]+'"  id="gys_mod" class="btn btn-link btn-xs" value="修改"/>\
                        <input disabled="disabled"  type="button" data="'+append[i]["cs_sup_id"]+'" id="gys_del" class="btn btn-link btn-xs" value="删除"/>\
                        <input disabled="disabled" type="button" data="'+append[i]["cs_sup_id"]+'" id="gys_det" class="btn btn-link btn-xs" value="详情"/>\
                        <a id="a_delete_'+append[i]["cs_sup_id"]+'" href="#" data-href="delete.php?id=23" onclick="del(this)" data=' + append[i]["cs_sup_id"] + '  data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                $("input[id*='gys_det']").each(function () {
                    $(this).click(function(){
                        window.location.href="/infomanager/shinfo/detail.html?cs_sup_id="+$(this).attr("data");
                    })
                });
                $("input[id*='gys_mod']").each(function () {
                    $(this).click(function(){
                        window.location.href="/infomanager/shinfo/modify.html?cs_sup_id="+$(this).attr("data");
                    })
                });
                $("input[id*='gys_pro']").each(function () {
                    $(this).click(function(){
                        window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+$(this).attr("data");
                    })
                });
                $("input[id*='gys_del']").each(function () {
                    $(this).click(function(){
                        $("#a_delete_"+$(this).attr("data")).click();
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


$("#delete").click(function(){

})
$("#modify").click(function(){
    $("#a_modify").click();
})
$("#b_product").click(function(){
    $("#a_product").click();
})
$("#detail").click(function(){
    $("#a_detail").click();
})
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