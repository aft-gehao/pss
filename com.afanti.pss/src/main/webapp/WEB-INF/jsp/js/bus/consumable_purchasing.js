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
    var stock_status = $("#status").val();
    stock_status.substring(0,stock_status.length-1)
    var consumable_name = $("#consumable_name").val();
    var flag=1;
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/PurchasingPage",
        data: {
            start_time:start_time,
            end_time:end_time,
            time:time,
            search: cas,
            consumable_name: consumable_name,
            flag:flag,
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
                    var html = "";
                    var html2 = "";
                    var html3='<a type="button" class="btn btn-success" id="use_id" use_id='+append[i]["use_id"]+' data-toggle="modal" data-target="#detail-Modal">详情</a>';
                    if (append[i]["status"] == 5001) {
                        html2 += '<button type="button" class="btn btn-success btn-sm" style="background-color:white;color:black" >已入库</button>';
                    }
                    else if (append[i]["status"] == 5002) {
                        html2 += '<button type="button" class="btn btn-success btn-sm" style="background-color:white;color:black" datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'" class="btn " id="example" rel="popover"  data-placement="bottom" >已发货</button>';
                    } else if (append[i]["status"] == 5003) {
                        html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black">部分入库</button>';
                    }
                    else if (append[i]["status"] == 5004) {
                        html2 += '<button type="button" class="btn btn-danger btn-sm "style="background-color:white;color:black">未发货</button>';
                    }

                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if(append[i]["status"] ==5002 ||append[i]["status"] ==5001) {
                        value += '\
                       <tr  id="example" rel="popover" name="desc" data-placement="bottom"  data="'+$.alle_null2Str(append[i]["desc"])+'" >\
                         <td   data="'+$.alle_null2Str(append[i]["desc"])+'">' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                          <td >' + append[i]["amount"] + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                           <td>' +  $.alle_null2Str(append[i]["purchase_money"]) +'元</td>\
                           <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["purchase_time"]) + '<br>' + append[i]["pur_staff"] + '</td>\
                          <td>' + $.alle_null2Str(html2) + '</td>\
                          <td class="operation">'+html3+'</td>\
                        </tr>\
                    \
                    ';
                    }
                    else{
                        value += '\
                      <tr rel="popover" name="desc" data="'+$.alle_null2Str(append[i]["desc"])+'" >\
                         <td id="example" rel="popover" name="desc" data-placement="bottom"  data="'+$.alle_null2Str(append[i]["desc"])+'">' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                          <td>' + append[i]["amount"] + '' + $.alle_null2Str(append[i]["consumable_unit"]) + '</td>\
                            <td>' +  $.alle_null2Str(append[i]["purchase_money"]) +'元</td>\
                          <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["purchase_time"]) + '<br>' + append[i]["pur_staff"] + '</td>\
                          <td>' + $.alle_null2Str(html2) + '</td>\
                          <td class="operation">'+html3+' \
                             <a title="发货" id="fahuo"  onclick="fahuo(this)" data="' + append[i]["use_id"] + '"  class="btn btn-success btn-sm" data-toggle="modal" data-target="#con_fahuo"><i class="iconfont">&#xe61d;</i> 发货</a>\
                             <a title="修改" purchase_id="' + append[i]["purchase_id"] + '"  purchase_money="' + append[i]["purchase_money"] + '" onclick="change(this)" datas="' + append[i]["consumable_name"] + '" datasss="' + append[i]["amount"] + '" datass="' + append[i]["consumable_unit"] + '" data="' + append[i]["purchase_id"] + '"class="btn btn-success btn-sm" data-toggle="modal" data-target="#caigou-delete"><i class="iconfont">&#xe606;</i>修改</a>\
                          </td>\
                          </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                $("a[id*='use_id']").each(function () {
                    $(this).click(function() {
                        $("#use_id_detail").val($(this).attr("use_id"));
                        var use_id=$("#use_id_detail").val()
                        $.ajax({
                            type: 'POST',
                            url: "/consumable/manager/detail_consumables",
                            data: {
                                use_id:use_id
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data["result"] == "success") {
                                    var value = "";
                                    if (data["append"] == null) {
                                        layer.msg('暂无数据');
                                        return;
                                    }

                                    var append = eval(data["append"]);
                                    for (var i = 0; i < append.length; i++) {
                                        value += '\
                                        <tr>\
                                          <td>' + $.alle_null2Str(append[i]["consumable_name"])+'</td>\
                                          <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                                          </tr>\
                                          \
                                        ';
                                        $("#apply_name").html(append[i]["apply_name"])
                                        $("#apply_time").html( $.alle_time2str_yymm_dd_hhmm(append[i]["apply_time"]))
                                        $("#apply_amount").html(append[i]["apply_amount"]+append[i]["consumable_unit"])
                                        $("#apply_desc").html(append[i]["apply_desc"])
                                        $("#procurement_name").html(append[i]["procurement_name"])
                                        $("#procurement_time").html( $.alle_time2str_yymm_dd_hhmm(append[i]["procurement_time"]))
                                        $("#procurement_amount").html(append[i]["procurement_amount"]+append[i]["consumable_unit"])
                                        $("#purchase_money").html(append[i]["purchase_money"]+'元')
                                        $("#procurement_desc").html(append[i]["procurement_desc"])
                                        $("#enter_name").html(append[i]["enter_name"])
                                        $("#enter_time").html( $.alle_time2str_yymm_dd_hhmm(append[i]["enter_time"]))
                                        $("#storage_amount").html(append[i]["storage_amount"]+append[i]["consumable_unit"])
                                        var stock_id=append[i]["stock_id"]
                                        if (stock_id==""){
                                            $("#stock_id").hide()
                                        }else {
                                            $("#stock_id").show()
                                        }
                                   }
                                    $("#data_table_detail").html(value);
                                }
                            }
                        })
                    })
                })
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
//耗材申请
function addhaocai() {

    window.location.href = "/promanager/consumable/add_use_yanfa.html" ;
}
$("#con_kd_num").blur(function () {
    var num=$("#con_kd_num").val();
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
            html+='<option value="JJKY">佳吉快运</option>'
            $("#con_kd_code").html(html);
        }
    })
})
//确认发货
function  con_fahuo_sure() {
    var use_id=$("#use_id").val();
    var status=5002;
    if($("#con_not_found").attr("kd_code")=="" || $("#con_not_found").attr("kd_code")==null) {
        var kd_code=$("#con_kd_code").val();
    }
    else{
        var kd_code=$("#con_not_found").attr("kd_code");
    }
    if(kd_code==""||kd_code==null)
    {
        layer.msg("无此快递公司，请重新输入快递公司名");
    }
    var kd_num=$("#con_kd_num").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/fahuo",
        data: {
            use_id:use_id,
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
function fahuo(e){
    $("#use_id").val($(e).attr("data"));
}
function add_con_pur_sure(){
    var consumable_name=$("#add_con_name").val();
    var amount=$("#add_con_amount").val();
    var unit=$("#add_con_unit").val();
    var desc=$("#add_con_desc").val();
    var price=$("#add_con_price").val();
    if(consumable_name=="" || amount=="" ||price=="" ||unit=="")
    {
        layer.msg("信息填写不全，请补充");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/kuaisu_pur",
        data: {
            consumable_name:consumable_name,
            amount:amount,
            unit:unit,
            desc:desc,
            price:price
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