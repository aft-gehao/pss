$(function () {
    //进页面加载此函数
    doSearch(1);
})

function doSearch(p) {
    var productId = $.alle_getUrlParam("productId");
    var flag =$("#flag").val()
    $.ajax({
        type: 'POST',
        url: "/inventory/realtimeInventory/selectInventoryDetail",
        data: {
            productId: productId,
            flag:flag,
            p: p
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var value = "";
                // alert(data["append"]);
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                for (var i = 0; i < append.length; i++) {
                    var html=''
                    if(append[i]["putu"]!=null) {
                        //查询属于产品的谱图，若查不到则不执行
                        var str = append[i]["putu"];
                        var strs = new Array();
                        if (str.indexOf(',')>= 0) {
                            //切割字符串
                            strs = str.split(",");
                            for(var x=0;x<strs.length;x++)
                            {
                                html += '<a  onclick="putu(this)" data="' + strs[x] + '" title="' + strs[x] + '" alt="' + strs[x] + '">';
                                html += '<img id="imghead" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png"  >'
                                html += '</a>';
                            }
                        }
                        else {
                            html += '<a  onclick="putu(this)" data="' + str + '" title="' + str + '" alt="' + str + '">';
                            html += '<img id="imghead" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png"  >'
                            html += '</a>';
                        }
                    }
                    var material=$("#material").val()
                    if (material==1){
                        value += '\
                    <tr >\
                        <td>' + append[i]["sale_batch_no"] + '</td>\
                        <td>' + append[i]["nameEn"] + '</td>\
                        <td>' + append[i]["usedAmount"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["enter_date"]) + '</td>\
                        <td>' + append[i]["space_name"] + '</td>\
                       <td class="operation"><input id="inv_realtime_check" onclick="check_amount(this)" data="' + append[i]["enter_d_id"] + '" data-toggle="modal" data-target="#myModal-2"  type="button" class="btn btn-link btn-xs"   value="盘点"/></td>\
                        </tr>\
                    \
                    ';
                    }else {
                        // <td>' + append[i]["purchase_name"] + '</td>\
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sale_batch_no"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' +$.alle_null2Str( append[i]["purity"]) + '</td>\
                         <td>' + html + '</td>\
                        <td>' + append[i]["usedAmount"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["enter_date"]) + '</td>\
                        <td>' + append[i]["space_name"] + '</td>\
                        </tr>\
                    \
                    ';
                    }

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
function  check_amount(e) {
    $("#enter_d_id").val($(e).attr("data"));
}

$("#check").click(function () {
    var amount = $("#check_amount").val();
    var enter_d_id = $("#enter_d_id").val();
    var reason = $("#reason").val();
    $.ajax({
        type: 'POST',
        url: "/inventory/realtimeInventory/inventory_check",
        data: {
            amount: amount,
            enter_d_id: enter_d_id,
            reason: reason
        },
        dataType: "json",
        success: function (data) {
            layer.msg("操作成功");
            window.location.reload();
        }

    })
})
function putu(e)
{
    window.open("http://source.tanyangnet.com/"+$(e).attr("data"));
}
