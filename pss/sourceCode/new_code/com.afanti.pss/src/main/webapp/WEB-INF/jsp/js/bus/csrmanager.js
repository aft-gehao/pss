$(function () {
    doSearch(1);
    $("#csr_query").click(function () {
        doSearch(1);
    })
    $('#csr_add').click(function(){

        window.location.href="add.html";
    });
})
//获取需要删除的供应商id
function del(e)
{
    $("#del").val($(e).attr("data"));
}
//删除方法
$("#shanchusubmit").click(function(){
    var cs_sup_id=$("#del").val();
    $.ajax({
        type: 'POST',
        url: "/common/add",
        data: {
            cs_sup_id:cs_sup_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/infomanager/csrmanager/index.html";
                }, 1000);
            }
        }
    });
})
function doSearch(p) {
    var credit_level;
    var customer_name = $("#customer_name").val();
    if($("#credit_level").val()!="-1") {
        credit_level=$("#credit_level").val()
    }

    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/cusinfoSelect",
        data: {
            customer_name: customer_name,
            credit_level:credit_level,
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
                    <tr >\
                        <td>' + append[i]["name"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["s_level"]) + '</td>\
                        <td>' + append[i]["s_type"] + '</td>\
                        <td class="operation">\
                         <a id="a_delete_'+append[i]["cs_sup_id"]+'" href="#" data-href="delete.php?id=23" onclick="del(this)" data=' + append[i]["cs_sup_id"] + '  data-toggle="modal" data-target="#confirm-delete"></a>\
                         <input   disabled="disabled" type="button"   id="csr_mod"  data="'+append[i]["cs_sup_id"]+'" class="btn btn-link btn-xs" value="修改"/>\
                         <input   disabled="disabled" type="button"   id="csr_del"  data="'+append[i]["cs_sup_id"]+'" class="btn btn-link btn-xs" value="删除"/>\
                         <input   disabled="disabled" type="button"   id="csr_det"  data="'+append[i]["cs_sup_id"]+'" class="btn btn-link btn-xs" value="详情"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                $("input[id*='csr_mod']").each(function () {
                    $(this).click(function(){
                        window.location.href="/infomanager/csrmanager/modify.html?cs_sup_id="+$(this).attr("data");
                    })
                });
                $("input[id*='csr_det']").each(function () {
                    $(this).click(function(){
                        window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+$(this).attr("data");
                    })
                });
                $("input[id*='csr_del']").each(function () {
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

