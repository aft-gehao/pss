$(function () {

    doSearch(1);
    $("#pur_query").click(function () {
        doSearch(1);
    })
})
function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}
function  doSearch(p) {
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
    var status=$("#status").val();
    var time=$("#time").val();
    var cas=$("#cas").val();
    var consumable_name=$("#consumable_name").val();
    var start_time=str.substring(0,number_str-1);
    var end_time=str.substring(number_str+2);
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumableRepairPage",
        data: {
            start_time:start_time,
            end_time:end_time,
            cas:cas,
            time:time,
            status:status,
            consumable_name: consumable_name,
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
                    var html = "";
                    var html2 = "";
                    if (append[i]["status"] == 14001) {

                        html2 += ' <button  class="btn btn-danger btn-sm" style="background-color:white;color:black" > 未鉴定 </button>';
                    } else if (append[i]["status"] == 14002) {
                        html2 += ' <button  class="btn btn-success btn-sm" style="background-color:white;color:black" > 鉴定报废 </button>';
                    } else if (append[i]["status"] == 14003) {
                        html2 += '<button  datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'" class="btn btn-success btn-sm" style="background-color:white;color:black" id="example" rel="popover"  data-placement="bottom" >已发货</button>';
                    }
                    else if (append[i]["status"] == 5001) {
                        html2 +=' <button  class="btn btn-success btn-sm" style="background-color:white;color:black" > 已入库</button>';
                    }
                    else if (append[i]["status"] == 5002) {
                        html2 += '<button  datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'"  class="btn btn-success btn-sm" style="background-color:white;color:black"  id="example" rel="popover"  data-placement="bottom" >已发货</button>';
                    } else if (append[i]["status"] == 5003) {
                        html2 +=' <button   class="btn btn-info btn-sm" style="background-color:white;color:black" >部分入库 </button>';
                    }
                    else if (append[i]["status"] == 5004) {
                        html2 +=' <button   class="btn btn-danger btn-sm" style="background-color:white;color:black" >未发货 </button>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if(append[i]["status"]==14001) {
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_amount"]) + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["check_people"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_desc"]) + '</td>\
                         <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <input  type="button" onclick="jianding(this)" class="btn btn-success btn-sm" data="' + $.alle_null2Str(append[i]["repair_id"]) + '" data-toggle="modal" data-target="#Handle" value="鉴定">\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                    else if(append[i]["status"]==5004){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_amount"]) + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["check_people"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_desc"]) + '</td>\
                         <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <a title="发货" id="fahuo"  onclick="fahuo(this)"  class="btn btn-success btn-sm" data="' + $.alle_null2Str(append[i]["repair_id"]) + '" data-toggle="modal" data-target="#test"><i class="icon-edit"></i> 发货</a>\
                        <input disabled="disabled" type="button" data="' + append[i]["repair_id"] + '"  id="con_rep_mod" class="btn btn-success btn-sm" value="修改"/>\
                        <input  disabled="disabled" type="button" data="' + append[i]["repair_id"] + '" id="con_rep_det"  class="btn btn-success btn-sm" value="详情"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                    else if(append[i]["status"]==5002){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_amount"]) + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["check_people"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_desc"]) + '</td>\
                        \ <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <input  disabled="disabled" type="button" data="' + append[i]["repair_id"] + '" id="con_rep_det"  class="btn btn-success btn-sm" value="详情"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                    } else if(append[i]["status"]==14003){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_amount"]) + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["check_people"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_desc"]) + '</td>\
                         <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        </td>\
                        </tr>\
                    \
                    ';
                    }  else if(append[i]["status"]==5001){
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_amount"]) + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["check_people"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["repair_desc"]) + '</td>\
                         <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <input  disabled="disabled" type="button" data="' + append[i]["repair_id"] + '" id="con_rep_det"  class="btn btn-success btn-sm" value="详情"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                $(document).on('mouseover',  "button[id='example']", function() {
                    var kd_num=$(this).attr("data");
                    var kd_code=$(this).attr("datas");
                    if(kd_code && kd_num) {
                        $(this).popover({
                            html: true,
                            trigger: 'manual',
                            content: function () {
                                return '<div id="test" data="1" class="box popover-box" style="width:600px;over">' +

                                    '</div>'
                            }
                        });
                        $(this).popover('show');
                        $(this).attr("name","test");
                        setTimeout(function () {
                            $.ajax({
                                type: 'POST',
                                url: "/kd/queryKdInfo",
                                data: {
                                    kd_num: kd_num,
                                    kd_code: kd_code
                                },
                                dataType: "json",
                                success: function (data) {
                                    var append = eval("(" + data["append"] + ")");
                                    //遍历json中的数组
                                    var appends = eval(append["Traces"]);
                                    if (append["State"] == 1) {
                                        var htmlss = '<h5 style="color:#ce4844">当前包裹状态:<b>已取件</b></h5>';
                                    }
                                    else if (append["State"] == 2) {
                                        var htmlss = '<h5 style="color:#ce4844">当前包裹状态:<b>在途中</b></h5>';
                                    }
                                    else if (append["State"] == 3) {
                                        var htmlss ='<h5 style="color:#ce4844">当前包裹状态:<b>已签收</b></h5>';
                                    }
                                    else{
                                        layer.msg("当前无物流信息");
                                        $("button[name='test']").popover("hide");
                                    }

                                    for (var i = 0; i < append.Traces.length; i++) {
                                        htmlss += '<p class="title" style="width:550px;"><b>' + appends[i]["AcceptTime"] + '</b>' + $.alle_null2Str(appends[i]["AcceptStation"]) + '</p>';
                                    }
                                    $("#test").html(htmlss);

                                }
                            })
                        }, 700);
                    }
                    else{
                        layer.msg("无物流数据");
                    }

                })
                $(document).on('click',  function(){
                    $("button[name='test']").popover("hide");
                    $("button[name='test']").removeAttr("name");
                });
                /* $("input[id*='con_rep_mod']").each(function () {
                 $(this).click(function(){
                 var unit=encodeURI(encodeURI($(this).attr("datasss")));
                 $.alle_dialog('/promanager/consumableRepair/checking_repair.html?repair_id='+$(this).attr("data")+'&repair_amount='+$(this).attr("datas")+'&checking_amount='+$(this).attr("datass")+'&unit='+unit,'申请单详情', ["50%", "50%"])
                 })
                 });*/

                $("input[id*='con_rep_det']").each(function () {
                    $(this).click(function(){
                        $.alle_dialog('/promanager/consumableRepair/detail_use.html?repair_id='+$(this).attr("data"),'申请单详情', ["50%", "50%"])
                    })
                });
                $("input[id*='con_rep_mod']").each(function () {
                    $(this).click(function(){
                        $.alle_dialog('/promanager/consumableRepair/modify_use.html?repair_id='+$(this).attr("data"),'申请单修改', ["50%", "50%"])
                    })
                });
                $("input[id*='con_pro']").each(function () {
                    $(this).click(function(){
                        window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+$(this).attr("data");
                    })
                });
                $("input[id*='con_rep_del']").each(function () {
                    $(this).click(function(){
                        $("#del").val($(this).attr("data"));
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
$(".yijian").click(function(){

    $("#sure").attr("data",$(this).attr("yijian"))
    $(".yijian").css("background-color","white")
    $(".yijian").css("border-color","grey")
    if($(this).attr("yijian")=='5004'){
        $(this).css("background-color","#5cb85c");
        $(this).css("border-color","#4cae4c");
    }
    else{
        $(this).css("background-color","#d9534f");
        $(this).css("border-color","#d43f3a");
    }

})
$("#fahuo").click(function(){

    $("#repair_id").val($(this).attr("data"));

})

$("#sure").click(function(){

    var status=$("#sure").attr("data");
    var price=$("#price").val();
    var company=$("#company").val();
    var repair_id=$("#repair_id").val();
    var amount=$("#amount").val();
    if(status==14002)
    {
        $.ajax({
            type: 'POST',
            url: "/consumable/manager/repairDel",
            data: {
                repair_id:repair_id
            },
            dataType: "json",
            success:function (data) {
                if ( data["result"] == "success"){

                    layer.msg("操作成功");
                    setTimeout(function(){
                        window.location.reload();
                    }, 1000);
                }
            }
        })
    }
    else {
        $.ajax({
            type: 'POST',
            url: "/consumable/manager/check_repair",
            data: {
                status: status,
                price: price,
                company: company,
                repair_id: repair_id,
                amount: amount
            },
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    layer.msg("操作成功");
                    setTimeout(function(){
                        window.location.reload();
                    }, 1000);
                }
            }
        })
    }
})
//详细
function purchasing_detial(purchase_id) {
    window.location.href = "/promanager/purchasing/detail.html?type=purchasing&purchase_id=" + purchase_id;
}
function jianding(e) {

    $("#repair_id").val($(e).attr("data"));
}
function not_found()
{
    $("#kd_code").css("display","none");
    $("#text").html('<input type="text" id="kd_name_ss"  class="form-control" style="width: 140px;">')
    $("#not_found").html('(请填写快递公司名称)');
    $("#kd_name_ss").bind('propertychange input',(function(){
            setTimeout(function() {
                var kd_name=$("#kd_name_ss").val();
                $.ajax({
                    type: 'POST',
                    url: "/consumable/manager/kd_info_select",
                    data: {
                        kd_name:kd_name
                    },
                    dataType: "json",
                    success:function (data) {
                        var append=data["append"];
                        $("#not_found").attr("kd_code",append["kd_code"]);
                        $("#kd_name_ss").val(append["kd_name"]);
                    }
                })
            },2000);
        })
    )
}
function  fahuo_sure() {
    var repair_id=$("#repair_id").val();
    var status=5002;
    if($("#not_found").attr("kd_code")=="" || $("#not_found").attr("kd_code")==null) {
        var kd_code = $("#kd_code").val();
    }
    else{
        var kd_code=$("#not_found").attr("kd_code");
    }
    var kd_num=$("#kd_num").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/fahuo_repair",
        data: {
            repair_id:repair_id,
            status:status,
            kd_code:kd_code,
            kd_num:kd_num

        },
        dataType: "json",
        success:function (data) {
            layer.msg("操作成功");
            if ( data["result"] == "success"){
                setTimeout(function () {
                    window.parent.location.reload();
                }, 1000);
            }

        }
    })
}
$("#kd_num").blur(function () {
    var num=$("#kd_num").val();
    $.ajax({
        type: 'POST',
        url: "/kd/queryKdCode",
        data: {
            num:num
        },
        dataType: "json",
        success:function (data) {

            var append=eval("(" + data["append"] + ")");
            //遍历json中的数组
            var appends=eval(append["Shippers"]);

            var html="";
            for(var i=0;i<append.Shippers.length;i++)
            {
                html+='<option value='+appends[i]["ShipperCode"]+'>'+appends[i]["ShipperName"]+'</option>'
            }
            html+='<option value="SF">顺丰快递</option>'
            html+='<option value="STO">申通快递</option>'
            html+='<option value="ZTO">中通快递</option>'
            html+='<option value="STO">圆通快递</option>'
            html+='<option value="HHTT">天天快递</option>'
            html+='<option value="DBL">德邦</option>'
            $("#kd_code").html(html);
        }
    })
})
function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
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
        caigou_status+=$(this).html()+"/";
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