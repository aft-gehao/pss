$(function () {
    doSearch(1);
    $("#pur_query").click(function () {
        doSearch(1);
    })
    $('#pur_add').click(function () {
        window.location.href = "/promanager/purchasing/add.html";
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
    var start_time=str.substring(0,number_str-1);
    var end_time=str.substring(number_str+2);
    var cas = $("#cas").val();
    var time = $("#time").val();
    var status = $("#status").val();
    var consumable_name = $("#consumable_name").val();
    var flag=1;
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/UsePage",
        data: {
            start_time:start_time,
            end_time:end_time,
            time:time,
            status:status,
            search: cas,
            consumable_name: consumable_name,
            p: p,
            flag:flag
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

                    var html = "";
                    var html2 = "";
                    if(append[i]["status"] ==11001) {
                        value += '\
                       <tr  id="example" rel="popover" name="desc" data-placement="bottom"  data="'+$.alle_null2Str(append[i]["desc"])+'" >\
                         <td   data="'+$.alle_null2Str(append[i]["desc"])+'">' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                          <td >' + append[i]["amount"] + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '<br>' + append[i]["staff_name"] + '</td>\
                           <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '<br>' + append[i]["check_name"] + '</td>\
                          <td><span class="btn"  style="border-color: green">' + $.alle_null2Str(append[i]["dict_name"])+ '</span></td>\
                         <td class="operation">\
                          <a title="采购" onclick="sure_consumable(this)" dataname="' + append[i]["consumable_name"] + '" data="' + append[i]["consumable_unit"] + '" datas="' + append[i]["use_id"] + '" datass="' + append[i]["amount"] + '"  datasss="' + append[i]["consumable_id"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#caigou-delete-2"><i class="iconfont">&#xe666;</i> 采购</a>\
                        <a title="删除"  data="' + append[i]["use_id"] + '" onclick="con_cancle(this)" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#confirm-delete1"><i class="iconfont">&#xe76b;</i> 取消</a>\
                          </td>\
                        </tr>\
                    \
                    ';
                    }
                    else{
                        value += '\
                       <tr  id="example" rel="popover" name="desc" data-placement="bottom"  data="'+$.alle_null2Str(append[i]["desc"])+'" >\
                         <td   data="'+$.alle_null2Str(append[i]["desc"])+'">' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                          <td >' + append[i]["amount"] + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '<br>' + append[i]["staff_name"] + '</td>\
                           <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '<br>' + append[i]["check_name"] + '</td>\
                          <td><span class="btn"  style="border-color: red">' + $.alle_null2Str(append[i]["dict_name"])+ '</span></td>\
                          <td class="operation">\
                             <a title="详情111" id="fahuo"  onclick="fahuo(this)" data="' + append[i]["use_id"] + '"  class="btn btn-success btn-sm" data-toggle="modal" data-target="#con_fahuo"><i class="iconfont">&#xe8a0;</i>  详情</a>\
                          </td>\
                          </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage);
                $(document).on('mouseover',  "button[id='example']", function() {
                    var kd_num = $(this).attr("data");
                    var kd_code = $(this).attr("datas");
                    if (kd_code && kd_num) {
                        $(this).popover({
                            html: true,
                            trigger: 'manual',
                            content: function () {
                                return '<div id="test" data="1" class="box popover-box" style="width:600px;over">' +

                                    '</div>'
                            }
                        });
                        $(this).popover('show');
                        $(this).attr("name", "test");
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
                                    var htmlss = '<h5 style="color:#ce4844">当前包裹状态:<b>已签收</b></h5>';
                                }
                                else {
                                    layer.msg("当前无物流信息");
                                    $("button[name='test']").popover("hide");
                                }

                                for (var i = 0; i < append.Traces.length; i++) {
                                    htmlss += '<p class="title" style="width:450px;"><b>' + appends[i]["AcceptTime"] + '</b>' + $.alle_null2Str(appends[i]["AcceptStation"]) + '</p>';
                                }
                                $("#test").html(htmlss);

                            }
                        })
                    }
                    else {
                        layer.msg("无物流数据");
                    }
                })
            }
            //发货
            function not_found(){
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


            $(document).on('click',  function(){
                $("button[name='test']").popover("hide");
                $("button[name='test']").removeAttr("name");
            });
            $("input[id*='pur_sure']").each(function () {
                $(this).click(function () {

                    $.alle_dialog('/promanager/consumable/add_purchasing.html?use_id=' + $(this).attr("data") + '&consumable_id=' + $(this).attr("datas"), '新增采购单', ["50%", "50%"])
                })
            });
        }
    })
}
function to_upd_purchasing(purchase_id) {
    window.location.href = "/promanager/purchasing/modify.html?purchase_id=" + purchase_id;
}
function purchasing_del(purchase_id) {
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/meterialpurchease/manager/material_purchase_del",
            data: {
                purchase_id: purchase_id
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

function purchasing_detial(purchase_id) {

    window.location.href = "/promanager/purchasing/detail.html?type=purchasing&purchase_id=" + purchase_id;
}

function show_image(url) {
    $.alle_dialog_img(url);
}
function change(e)
{
    $("#unit").html($(e).attr("datass"));
    $("#name").val($(e).attr("datas"));
    $("#new_amount").val($(e).attr("datasss"));
    $("#price").val($(e).attr("purchase_money"));
    $("#purchase_id").val($(e).attr("purchase_id"));
}
function sure_change(){
    var is_del=0;
    var purchase_money=$("#price").val();
    var name=$("#name").val();
    var amount=$("#new_amount").val();
    var purchase_id=$("#purchase_id").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/con_purchase_modify",
        data: {
            name:name,
            is_del:is_del,
            purchase_id: purchase_id,
            purchase_money:purchase_money,
            amount:amount
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            }
        }
    });

}
function purchase_cancle(e){

    $("#purchase_id").val($(e).attr("data"));

}
function sure_cancle(){
    var purchase_id=$("#purchase_id").val();
    var is_del=1;
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/con_purchase_modify",
        data: {
            purchase_id: purchase_id,
            is_del:is_del


        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            }
        }
    });
}
$(document).on('mouseover',"tr[id='example']", function() {
    if($(this).attr("data")!="") {
        $(this).popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return '<div class="box popover-box" style="width:200px;over">' +
                    '<h5 style="color:#ce4844"><b>备注信息:</b></h5>' +
                    '<p class="title"><b>'+$(this).attr("data")+'</b></p>' +
                    '</div>'
            }
        });
        $(this).popover('show');
    }
})

$(document).on('mouseleave', "tr[id='example']", function(){
    $(this).popover('hide');
});
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
function sure_consumable(e) {
    $("#con_name").val($(e).attr("dataname"));
    $("#use_id").val($(e).attr("datas"));
    $("#consumable_id").val($(e).attr("datasss"));
    $("#consumable_unit").val($(e).attr("data"));
    $("#amount").val($(e).attr("datass"));
    $("#con_amount").val($(e).attr("datass"));
    if($(e).attr("data")==null || $(e).attr("data")=="")
    {
        var str="<option>个</option>"
    }
    else {
        var str = "<option>" + $(e).attr("data") + "</option>"
    }
    $("#con_unit").html(str);
}
function con_pur_sure() {
    var use_id = $("#use_id").val();
    var consumable_id = $("#consumable_id").val();
    var amount = $("#con_amount").val();
    var purchase_money = $("#con_price").val();
    var desc = $("#desc").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/add_purchasing",
        data: {
            use_id: use_id,
            amount: amount,
            consumable_id: consumable_id,
            purchase_money: purchase_money,
            desc:desc
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.parent.location.reload();
                }, 1000);
            }
        }
    })
}
function  con_cancle(e) {
    $("#use_id").val($(e).attr("data"));
}
function con_sure_cancle() {
    var use_id=$("#use_id").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/consumableCl",
        data: {
            use_id:use_id
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

