$(function () {
    $.alle_section_date("start_time", "end_time");
    doSearch(1);
    $("#pur_query").click(function () {
        doSearch(1);
    })
})
function back() {
    doSearch(1);
}




function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}

function doSearch(p) {
    var caigou_statuss=$("#caigou_status").html();
    if (caigou_statuss==""){
        $("#caigou_status").html("全部");
    }
    var caigou_timee=$("#caigou_time").html();
    if (caigou_timee==""){
        $("#caigou_time").html("全部");
    }
    //自定义时间
    var str = $("#test16").val();
    if(str==""){
        $('#caigou_my_time').html("未定义");
    }
    else {
        var number_str = find(str, '-', 2)
        var start_time = str.substring(0, number_str - 1);
        var end_time = str.substring(number_str + 2);
        $('#caigou_my_time').html(str);
    }

    var cas = $("#cas").val();
    var time = $("#time").val();
    var status = $("#status").val();
    var start_time=str.substring(0,number_str-1);
    var end_time=str.substring(number_str+2);
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/return/material_purchase_return_page",
        data: {
            time:time,
            status:status,
            cas: cas,
            start_time: start_time,
            end_time: end_time,
            p: p
        },
        dataType: "json",
        success: function (data) {
            console.log("success");
            if (data["result"] == "success") {
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                for (var i = 0; i < append.length; i++) {
                    var html = "";
                    var html2 = "";


                    if (append[i]["stock_status"] == 8001||append[i]["stock_status"] == 8002) {
                        html2 += '<button type="button" class="btn btn-success btn-sm" style="background-color:white;color:black" >已退货</span>';
                    }
                    else if (append[i]["stock_status"] == 5001|| append[i]["purchase_isdel"]==0) {
                        html2 += '<button type="button"  class="btn btn-danger btn-sm" style="background-color:white;color:black" >未退货</span>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if(append[i]["stock_status"] != 8002&&append[i]["stock_status"] != 8001){
                        value += '\
                    <tr >\
                          <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                          <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                          <td>' + append[i]["supplier_name"] + '</td>\
                          <td>' + append[i]["amount"] + '</td>\
                          <td>' + $.alle_null2Str(append[i]["all_total"]) + '</td>\
                          <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                          <td>' + append[i]["staff_name"] + '</td>\
                          <td>' + html2 + '</td>\
                         <td class="operation"><input id="pur_return_submit" disabled="disabled" class="btn btn-success btn-sm"  type="button" class="btn btn-link btn-xs" onclick="purchasing_return(' + append[i]["purchase_id"] + ',' + append[i]["stock_status"] + ')" value="退货"/>\
                    </td>\
                    </tr>\
                    \
                    '
                    }else {
                        value += '\
                    <tr >\
                          <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                          <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                          <td>' + append[i]["supplier_name"] + '</td>\
                          <td>' + append[i]["amount"] + '</td>\
                          <td>' + $.alle_null2Str(append[i]["all_total"]) + '</td>\
                          <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                          <td>' + append[i]["staff_name"] + '</td>\
                          <td>' + html2 + '</td>\
                          <td class="operation"> \
                            <input  type="button" onclick="purchasing_detial(' + append[i]["purchase_id"] + ')"  class="btn btn-success btn-sm" data="' + $.alle_null2Str(append[i]["repair_id"]) + '" data-toggle="modal" value="详细">\
                          </td>\
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
//详细
function purchasing_detial(purchase_id) {
    window.location.href = "/promanager/purchasing/detail.html?type=purchasing&purchase_id=" + purchase_id;
}

function purchasing_return(purchase_id, isFlag) {
    window.location.href = '/promanager/purchasing/purchansing_return_submit.html?is_flag=' + isFlag + '&purchase_id=' + purchase_id;
}
function test(e)
{
    if($(e).attr("class")=='info active')
    {
        $(e).removeClass("info active").attr("class","info");
    }
    else if($(e).attr("class")=='info'){

        $(e).removeClass("info").attr("class","info active");
    }
    if($(e).attr("class")=='time active')
    {
        $("a[class='time active']").removeClass("time active").attr("class","time");
    }
    else if($(e).attr("class")=='time'){

        $("a[class='time active']").removeClass("time active").attr("class","time");
        $(e).removeClass("time").attr("class","time active");
    }
    var info="";
    var time="";
    var caigou_status="";
    var caigou_time="";
    $("a[class='info active']").each(function(){
        info +=$(this).attr("data")+",";
        caigou_status+=$(this).html()+"&nbsp;";
    })
    $("#status").val(info);
    $("#caigou_status").html(caigou_status);
    $("a[class='time active']").each(function(){
        time +=$(this).attr("data");
        caigou_time=$(this).html();
    })
    $("#time").val(time);
    $("#caigou_time").html(caigou_time);
    if($("a[class='info active']").length!=0 )
    {
        $("a[class='info1 active']").removeClass("active");
    }
    else{
        $("a[class='info1']").removeClass("info1").attr("class","info1 active");
        $("#caigou_status").html("全部");
    }
    if($("a[class='time active']").length!=0 )
    {
        $("a[class='time1 active']").removeClass("active");
        $("#caigou_time").html("全部");
    }
    else{
        $("a[class='time1']").removeClass("time1").attr("class","time1 active");
    }
    doSearch(1);
}