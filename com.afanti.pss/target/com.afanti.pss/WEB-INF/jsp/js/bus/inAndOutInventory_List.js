/**
 * Created by Administrator on 2017/6/23 0023.
 */

$(function () {
    $.alle_section_date("start_time", "end_time");
    doSearch(1);
    $("#pur_return_query").click(function () {
        doSearch(1);
    })
})
function back() {
    doSearch(1);
}
function doSearch(p) {
    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();
    alert(end_time);
    var cas = $("#cas").val();
    var name_ch=$("#name_ch").val();//中文
    alert(cas);
    $.ajax({
        type: 'POST',
        url: "/inAndOutInventory/inAndOutInventory_List",
        data: {
            cas: cas,
            start_time: start_time,
            end_time: end_time,
            p: p,
            name_ch:name_ch
        },
        dataType: "json",
        success: function (data) {
            // if (data["result"] == "success") {
            var value = "";
            //     if (data["append"] == null) {
            //         layer.msg('暂无数据');
            //         return;
            //     }
            var append = eval(data["append"]);
            alert(append)
            for (var i = 0; i < append.length; i++) {
                var html = "";
                // var html2 = "";
                // if (append[i]["stock_status"] =='已入库') {
                //     html2 += '<span class="label label-success">已入库</span>';
                // } else if (append[i]["stock_status"] =='部分入库') {
                //     html2 += '<span class="label label-info">部分入库</span>';
                // } else if (append[i]["stock_status"] =='未入库') {
                //     html2 += '<span class="label label-danger">未入库</span></span>';
                // }


                // if (append[i]["stock_status"] == 8001) {
                //     html2 += '<span class="label label-success">已出库</span>';
                // }
                // else if (append[i]["stock_status"] == 8003) {
                //     html2 += '<span class="label label-info">部分出库</span>';
                // }
                // else if (append[i]["stock_status"] == 8002 || append[i]["stock_status"] == 0) {
                //     html2 += '<span class="label label-danger">未出库</span></span>';
                // }else {
                //     layer.msg("类型异常,联系管理员");
                // }
                html += '<input id="pur_return_submit" disabled="disabled" type="button" class="btn btn-link btn-xs" onclick="purchasing_return(' + ')" value="状图"/>'+
                    '<input id="pur_return_submit" disabled="disabled" type="button" class="btn btn-link btn-xs" onclick="purchasing_return(' + ')" value="饼图"/>';
                value += '\
                    <tr class="one">\
                        <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["name_en"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["mold"]) + '</td>\
                         <td class="d">' + $.alle_time2str_yymm_dd_hhmmss(append[i]["hourTime"]) + '</td>\
                         <td class="Storage">' + $.alle_null2Str(append[i]["amount"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td class="operation">' + html + '</td>\
                        </tr>\
                    \
                    ';
            }
            $("#data_tbody").html(value);
            //调用设置分页
            // PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            // } else {
            //     layer.msg(data["message"]);
            // }
        }
    });
}

// function purchasing_return(purchase_id, isFlag) {
//     window.location.href = '/promanager/purchasing/purchansing_return_submit.html?is_flag=' + isFlag + '&purchase_id=' + purchase_id;
// }

