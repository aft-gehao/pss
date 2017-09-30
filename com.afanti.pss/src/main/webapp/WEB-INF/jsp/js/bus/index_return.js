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


function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}


function doSearch(p) {

    var str = $("#test16").val()
    var number_str= find(str,'-',2)
    var start_time=str.substring(0,number_str-1);
    var end_time=str.substring(number_str+2);
    if (str==""){
        $("#type_custom_time").html("所有")
    }  else {
        $("#type_custom_time").html(str)
    }

    var status = $("#status_id").val();
    if (status==""){
        $("#type_status").html("全部")
    }

    var time = $("#time").val();
    if (time==""){
        $("#type_time").html("全部")
    }
    var search=$("#search").val()

    $.ajax({
        type: 'POST',
        url: "/vendition/return/vendition_retun_page",
        data: {
            search:search,
            time:time,
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
                        html_type += '<button type="button" class="btn btn-success btn-sm" style="background-color:white;color:black">已入库</button>';
                    }
                    else if (append[i]["stock_status"] == 5003) {
                        html_type += '<button type="button" class="btn btn-success btn-sm" style="background-color:white;color:black">部分入库</button>';
                    }
                    else if (append[i]["stock_status"] == 5002 || append[i]["stock_status"]==0) {
                        html_type += '<button type="button" class="btn btn-success btn-sm" style="background-color:white;color:black;border-color: red;">未入库</button></span>';
                    }else {
                        layer.msg("类型异常,联系管理员");
                    }
                    html_sumbit += "<a id='ven_return_submit' class='btn btn-success' type='button' onclick='vendition_return(" + append[i].sale_id + ")'>退货</a>";
                    value += '\
                    <tr >\
                      <td>' + append[i]["cus_name"] + '</td>\
                         <td>' + append[i]["all_total"] + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["sale_time"]) + '</td>\
                          <td>' + append[i]["staff_name"] + '</td>\
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
    //console.log("123");
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
    var type_status=""
    var type_time=""
    $("a[class='info active']").each(function(){
        info +=$(this).attr("data")+",";
        type_status +=$(this).html()+"/"
    })
    $("#type_status").html(type_status.substring(0,type_status.length-1));
    $("#status_id").val(info.substring(0,info.length-1));
    $("a[class='time active']").each(function(){
        time +=$(this).attr("data");
        type_time=$(this).html();

    })
    $("#time").val(time);
    $("#type_time").html(type_time)
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
    $("#search").val("")
    $("#test16").val("")
    doSearch(1);
}

function do_query() {
    doSearch(1)
}
