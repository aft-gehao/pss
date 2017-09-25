$(function () {
    $.alle_section_date("start_time", "end_time");
    doSearch(1);
    $("#ven_return_query").click(function () {
        doSearch(1);
    })
    $('#add_vendition').click(function () {
        window.location.href = "/promanager/vendition/add.html";
    });
})

function doSearch(p) {

    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();
    var cas = $("#cas").val();
    var status = $("#status").val();
    var time = $("#time").val();
    $.ajax({
        type: 'POST',
        url: "/vendition/return/vendition_retun_page",
        data: {
            time:time,
            cas: cas,
            status: status,
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
                    var html_type = "";
                    var html_sumbit = "";
                    if (append[i]["stock_status"] == 5001) {
                        html_type += '<span class="label label-success">已入库</span>';
                    }
                    else if (append[i]["stock_status"] == 5003) {
                        html_type += '<span class="label label-info">部分入库</span>';
                    }
                    else if (append[i]["stock_status"] == 5002 || append[i]["stock_status"]==0) {
                        html_type += '<span class="label label-danger">未入库</span></span>';
                    }else {
                        layer.msg("类型异常,联系管理员");
                    }
                    html_sumbit += "<input id='ven_return_submit' disabled='disabled'  class='btn btn-link btn-xs' type='button' onclick='vendition_return(" + append[i].sale_id + ")' value='退货'/>";
                    value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["sale_name"]) + '</td>\
                         <td>' + html_type + '</td>\
                         <td>' + append[i]["all_total"] + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["sale_time"]) + '</td>\
                          <td>' + append[i]["staff_name"] + '</td>\
                          <td>' + append[i]["cus_name"] + '</td>\
                         <td class="operation">' + html_sumbit + '</td>\
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

function vendition_return(sale_id) {
    window.location.href = '/promanager/vendition/vendition_return_submit.html?sale_id=' + sale_id;
}
function vendition_detial(sale_id) {
    window.location.href = "/promanager/vendition/vendition_return_submit.html?sale_id=" + sale_id;
}
function test(e){
    console.log("123");
    if($(e).attr("class")=='info active'){
        $(e).removeClass("info active").attr("class","info");
    }else if($(e).attr("class")=='info'){

        $(e).removeClass("info").attr("class","info active");
    }
    if($(e).attr("class")=='time active'){
        $("a[class='time active']").removeClass("time active").attr("class","time");
    } else if($(e).attr("class")=='time'){

        $("a[class='time active']").removeClass("time active").attr("class","time");
        $(e).removeClass("time").attr("class","time active");
    }

    var info="";
    var time="";
    $("a[class='info active']").each(function(){
        info +=$(this).attr("data")+",";
    })
    $("#status").val(info);
    $("a[class='time active']").each(function(){
        time +=$(this).attr("data");
    })
    $("#time").val(time);
    if($("a[class='info active']").length!=0 ) {
        $("a[class='info1 active']").removeClass("info1 active").attr("class","info1");
    } else{
        $("a[class='info1']").removeClass("info1").attr("class","info1 active");
    }
    if($("a[class='time active']").length!=0 ) {
        $("a[class='time1 active']").removeClass("time1 active").attr("class","time1");
    }else{
        $("a[class='time1']").removeClass("time1").attr("class","time1 active");
    }
    doSearch(1);
}

