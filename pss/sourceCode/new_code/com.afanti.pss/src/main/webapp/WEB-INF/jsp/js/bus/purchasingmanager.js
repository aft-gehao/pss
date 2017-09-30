$(function () {
    doSearch(1);
    $("#pur_query").click(function () {
        doSearch(1);
    })
    $('#pur_add').click(function () {
        window.location.href = "/promanager/purchasing/add.html";
    });
})
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
    var status=$("#status").val();
    var time=$("#time").val();
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/manager/material_purchase_page",
        data: {
            cas: cas,
            start_time: start_time,
            end_time: end_time,
            p: p,
            status:status,
            time:time
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
                    if (append[i]["stock_status"] == 5001) {
                        html2 += '<button type="button" class="btn btn-success" id="example" style="background-color: white;color: black">已入库</button>';
                    } else if (append[i]["stock_status"] == 5003) {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: white;color: black">部分入库</button>';
                    } else if (append[i]["stock_status"] == 5002) {
                        html2 += '<button type="button" style="background-color: white;color: black" datas="' + append[i]["kd_code"] + '" data="' + append[i]["kd_num"] + '" class="btn btn-success" id="example" rel="popover"  data-placement="bottom" >已发货</button>';
                    } else if (append[i]["stock_status"] == 5004) {
                        html2 += '<button type="button" class="btn btn-danger"style="background-color: white;color: black">未发货</button>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    if (append[i]["stock_status"] == 5001 || append[i]["stock_status"] == 5002) {
                        value += '\
                    <tr >\
                          <td>' + $.alle_null2Str(append[i]["cas"]) + '<br>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                          <td>' + $.alle_null2Str(append[i]["amount"]) + '' + $.alle_null2Str(append[i]["unit"]) + '</td>\
                           <td>' + $.alle_null2Str(append[i]["unit_price"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["supplier_name"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["purchase_time"]) + '<br>' + append[i]["staff_name"] + '</td>\
                         <td>' + $.alle_null2Str(html2) + '</td>\
                         <td class="operation">\
                             <a title="材料" id="cailiao"  onclick="cailiao(this)" data="' + append[i]["purchase_d_id"] + '"  class="btn btn-success btn-sm" data-toggle="modal" data-target="#add_cailiao"><i class="iconfont">&#xe606;</i>上传材料</a>\
                            <a title="详细" id="use_id"  use_id="' + append[i]["use_id"] + '"  class="btn btn-success btn-sm"  data-toggle="modal" data-target="#detail-Modal"><i class="iconfont">&#xe8a0;</i>详细</a>\
                            <input disabled="disabled" type="button" data="' + append[i]["repair_id"] + '" id="con_rep_del" class="btn btn-link btn-xs" value=""/>\
                         </td>\
                    </tr>\
                    \
                    ';
                    }
                    if (append[i]["stock_status"] == 5004) {
                        value += '\
                    <tr >\
                            <td>' + $.alle_null2Str(append[i]["cas"]) + '<br>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                          <td>' + $.alle_null2Str(append[i]["amount"]) + '' + $.alle_null2Str(append[i]["unit"]) + '</td>\
                           <td>' + $.alle_null2Str(append[i]["unit_price"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["supplier_name"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["purchase_time"]) + '<br>' + append[i]["staff_name"] + '</td>\
                         <td>' + $.alle_null2Str(html2) + '</td>\
                         <td class="operation">\
                            <a title="发货" id="fahuo"  onclick="fahuo(this)" data="' + append[i]["use_id"] + '"  class="btn btn-success btn-sm" data-toggle="modal" data-target="#fahuo1"><i class="iconfont">&#xe61d;</i>卖方发货</a>\
                            <a title="修改" onclick="pur_up(this)" id="pro_mod"  class="btn btn-success btn-sm"  data="'+append[i]["purchase_id"]+'" purchase_id="' + append[i]["purchase_id"] + '" cas="' + append[i]["cas"] + '" name_ch="' + append[i]["name_ch"] + '" supplier_name="' + append[i]["supplier_name"] + '" amount="' + append[i]["amount"] + '" unit_price="' + append[i]["unit_price"] + '"data-toggle="modal" data-target="#addcaigou" ><i class="iconfont">&#xe606;</i> 修改</a>\
                            <a title="详细" id="use_id" class="btn btn-success btn-sm" use_id="' + $.alle_null2Str(append[i]["use_id"]) + '" data-toggle="modal" data-target="#detail-Modal"><i class="iconfont">&#xe8a0;</i>详细</a>\
                         <input disabled="disabled" type="button" data="' + append[i]["repair_id"] + '" id="con_rep_del" class="btn btn-link btn-xs" value=""/>\
                         </td>\
                    </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                $("a[id*='use_id']").each(function () {
                    $(this).click(function() {
                        var use_id=$(this).attr("use_id")
                        $.ajax({
                            type: 'POST',
                            url: "/meterialpurchease/manager/select_use_id",
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
                                          <td>' + $.alle_null2Str(append[i]["cas"])+'</td>\
                                          <td>' + $.alle_null2Str(append[i]["sku"])+'</td>\
                                          <td>' + $.alle_null2Str(append[i]["amount"])+$.alle_null2Str(append[i]["unit"])+'</td>\
                                          <td>' + $.alle_null2Str(append[i]["name_ch"])+'</td>\
                                          <td>' + $.alle_null2Str(append[i]["name_en"]) + '</td>\
                                          </tr>\
                                          \
                                        ';
                                        $("#apply_name").html(append[i]["apply_name"])
                                        $("#apply_time").html( $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]))
                                        $("#apply_amount").html(append[i]["use_amount"]+append[i]["use_unit"])
                                        $("#apply_desc").html(append[i]["use_desc"])
                                        $("#procurement_name").html(append[i]["procurement_name"])
                                        $("#procurement_time").html( $.alle_time2str_yymm_dd_hhmm(append[i]["purchase_time"]))
                                        $("#procurement_amount").html(append[i]["procurement_amount"]+append[i]["procurement_unit"])
                                        $("#purchase_money").html(append[i]["unit_price"]+'元')
                                        $("#procurement_desc").html(append[i]["procurement_desc"])
                                        $("#enter_name").html(append[i]["storage_name"])
                                        $("#enter_time").html( $.alle_time2str_yymm_dd_hhmm(append[i]["oper_time"]))
                                        $("#storage_amount").html(append[i]["storage_amount"]+append[i]["storage_unit"])
                                        var ht=append[i]["doc_url"]
                                        if (ht==null){
                                            $("#ht").html('<span title="下载合同">无</span>')
                                        } else {
                                            $("#ht").html('<span title="下载合同"><a href='+ht+'><i class="iconfont">&#xe61e;</i></a></span>')
                                        }
                                    }
                                    $("#data_table_detail").html(value);
                                }
                            }
                        })
                    })
                })
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
                                        htmlss += '<p class="title" style="width:450px;"><b>' + appends[i]["AcceptTime"] + '</b>' + $.alle_null2Str(appends[i]["AcceptStation"]) + '</p>';
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

                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
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

function purchasing_modify(purchase_id) {
    window.location.href = "/promanager/purchasing/product_upd.html?purchase_id=" + purchase_id;
}
function purchasing_detial(purchase_id) {
    window.location.href = "/promanager/purchasing/detail.html?type=purchasing&purchase_id=" + purchase_id;
}
function fahuo(e){
    $("#use_id").val($(e).attr("data"));
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

function  fahuo_sure() {
    var use_id=$("#use_id").val();
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
        url: "/meterialpurchease/manager/fahuo",
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
//发货传user_id
function con_fahuo(e)
{
    $("#use_id").val($(e).attr("data"));
}
//提交发货

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

/*
 $("#add_cas").blur(function(){

 var cas=$("#add_cas").val();
 $.ajax({
 type: 'POST',
 url: "/meterialpurchease/manager/material_info",
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
 })*/
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

function con_not_found()
{
    $("#con_kd_code").css("display","none");
    $("#con_text").html('<input type="text" id="con_kd_name_ss"   class="form-control" style="width: 140px;">')
    $("#con_not_found").html('(请填写快递公司名称)');
    /* $("#con_kd_name_ss").on({
     blur: ac,
     input:ac,
     propertychange:ac,
     keydown: function(e) {
     if (e.keyCode == 13) ac.call(this)
     }
     });*/
    $("#con_kd_name_ss").bind('propertychange input',(function(){
            setTimeout(function() {
                var kd_name = $("#con_kd_name_ss").val();
                $.ajax({
                    type: 'POST',
                    url: "/consumable/manager/kd_info_select",
                    data: {
                        kd_name: kd_name
                    },
                    dataType: "json",
                    success: function (data) {

                        var append = data["append"];
                        if (append != null) {
                            $("#con_not_found").attr("kd_code", append["kd_code"]);
                            $("#con_kd_name_ss").val(append["kd_name"]);
                        }
                        else {
                            layer.msg("没有查询到物流公司信息请修改物流公司名称")
                        }
                    }
                })
            },2000);
        })
    )
}
function show_image(url) {
    $.alle_dialog_img(url);
}
function pur_up(e)
{
    var pur_id=$(e).attr("data");
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/manager/load_purchasing_info",
        data: {
            purchase_id: pur_id
        },
        dataType: "json",
        success: function (data) {
            var append =  data["append"]["materialPurchaseDetailList"];
            var append1=  data["append"]["materialPurchase"];
            for(var i=0;i<append.length;i++)
            {
                $("#add_suppllier_name").val(append1["supplier_name"]);
                $("#new_amount").val(append[i]["amount"]);
                var html=""
                if($(e).attr("datass")=="g"){
                    html +="<option>g</option>";
                    html +="<option>kg</option>";
                    html +="<option>mg</option>";
                    html +="<option>L</option>";
                    html +="<option>ml</option>";
                }
                else if($(e).attr("datass")=="kg")
                {
                    html +="<option>kg</option>";
                    html +="<option>g</option>";
                    html +="<option>mg</option>";
                    html +="<option>L</option>";
                    html +="<option>ml</option>";
                }
                else if($(e).attr("datass")=="mg")
                {
                    html +="<option>mg</option>";
                    html +="<option>kg</option>";
                    html +="<option>g</option>";
                    html +="<option>L</option>";
                    html +="<option>ml</option>";
                }
                else if($(e).attr("datass")=="L")
                {
                    html +="<option>L</option>";
                    html +="<option>mg</option>";
                    html +="<option>kg</option>";
                    html +="<option>g</option>";
                    html +="<option>ml</option>";
                }
                else if($(e).attr("datass")=="ml")
                {
                    html +="<option>ml</option>";
                    html +="<option>L</option>";
                    html +="<option>mg</option>";
                    html +="<option>kg</option>";
                    html +="<option>g</option>";
                }
                else if($(e).attr("datass")=="l")
                {
                    html +="<option>L</option>";
                    html +="<option>ml</option>";
                    html +="<option>mg</option>";
                    html +="<option>kg</option>";
                    html +="<option>g</option>";

                }
                else{
                    html +="<option>g</option>";
                    html +="<option>L</option>";
                    html +="<option>ml</option>";
                    html +="<option>mg</option>";
                    html +="<option>kg</option>";
                }
                $("#unit").html(html);
                $("#pur_d_id").val(append[i]["purchase_d_id"]);
                $("#pur_id").val(append1["purchase_id"]);
                $("#unit_price").val(append[i]["unit_price"])
                $("#desc").val(append[i]["desc"])
            }
        }
    })
}
function sure_up(){
    var purchase_d_id=$("#pur_d_id").val();
    var purchase_id=$("#pur_id").val();
    var supplier_name=$("#add_suppllier_name").val();
    var amount=$("#new_amount").val();
    var unit=$("#unit").val();
    var unit_price=$("#unit_price").val();
    var desc=$("#desc").val();
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/manager/pur_upd",
        data: {
            purchase_id:purchase_id,
            purchase_d_id: purchase_d_id,
            supplier_name: supplier_name,
            amount: amount,
            unit: unit,
            desc:desc,
            unit_price: unit_price
        },
        dataType: "json",
        success: function (data) {
            layer.msg("操作成功");
            setTimeout(function () {
                window.location.reload();
            },1000)
        }
    })
}
$(document).on('mouseover',"tr[id='example']", function() {
//如果属于入库状态则悬浮框显示入库时间
    if($(this).attr("data")==5001 && !document.getElementById("test")) {

        var purchase_d_id=$(this).attr("datas");
        $(this).popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return '<div class="box popover-box" id="test" style="width:200px;over">' +

                    '</div>'
            }
        });

        $(this).popover('show');
        $(this).attr("name", "test");
        $.ajax({
            type: 'POST',
            url: "/meterialpurchease/manager/select_enter_time",
            data: {
                purchase_d_id:purchase_d_id
            },
            dataType: "json",
            success: function (data) {
                var htmlss='';
                htmlss = '<p class="title" style="width:450px;">入库时间：<b> '+ $.alle_time2str_yymm_dd_hhmm(data["append"]["enter_date"]) + '</b></p>';
                $("#test").html(htmlss);
            }
        })
    }
    //如果属于未入库状态则显示采购备注用于一些特殊的物流联系方式等
    if($(this).attr("data")!=5001 && !document.getElementById("test") && $(this).attr("datass")!="") {
        var desc=$(this).attr("datass");
        $(this).popover({
            html: true,
            trigger: 'manual',
            content: function () {
                return '<div class="box popover-box" id="test" style="width:200px;over">' +
                    '<p class="title" style="width:450px;">采购备注：<b> '+ $.alle_null2Str(desc)+ '</b></p>'
                '</div>'
            }
        });
        $(this).popover('show');
        $(this).attr("name", "test");
    }
})
$(document).on('mouseleave',"tr[id='example']",  function(){

    $("tr[name='test']").popover("hide");
    $("tr[name='test']").removeAttr("name");
});



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




$("#fahuo").click(function(){

    $("#use_id").val($(e).attr("data"));

})

//添加采购确认事件
function add_pur_sure(){
    var product_id=$("#add_product_id").val();
    var purchase_d_id=$("#purchase_d_id").val();
    var cas=$("#add_cas").val();
    var name_ch=$("#add_name_ch").val()
    var supplier_name=$("#add_supplier_name").val();
    var amount=$("#add_amount").val();
    var unit=$("#add_unit").val();
    var price=$("#add_price").val();
    var desc=$("#add_desc").val();
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/manager/pur_upd",
        data: {
            cas: cas,
            name_ch: name_ch,
            supplier_name: supplier_name,
            amount: amount,
            unit: unit,
            price: price,
            desc: desc,
            product_id:product_id,
            purchase_d_id:purchase_d_id
        },
        dataType: "json",
        success: function (data) {
            layer.msg("操作成功");
            window.location.reload();
        }
    })
}
//发货确认事件
function  fahuo_sure() {
    var use_id=$("#use_id").val();
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
        url: "/meterialpurchease/manager/fahuo",
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
//筛选条件
$('#switch-show').click(function (){


    var statuss=$(".auto a:nth-child(4)").text();


    $("#now_status").val(statuss);
});
function add_pur_sure(){
    var product_id=$("#add_product_id").val();
    var cas=$("#add_cas").val();
    var name_ch=$("#add_name_ch").val()
    var supplier_name=$("#add_supplier_name1").val();
    var purity=$("#add_purity").val();
    var supplier_id=$("#supplier_id").val();
    var amount=$("#add_amount").val();
    var unit=$("#add_unit").val();
    var price=$("#add_price").val();
    var desc=$("#add_desc").val();
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/manager/add_pur_for_cg",
        data: {
            cas: cas,
            name_ch: name_ch,
            purity:purity,
            supplier_name: supplier_name,
            supplier_id: supplier_id,
            amount: amount,
            unit: unit,
            price: price,
            desc: desc,
            product_id:product_id
        },
        dataType: "json",
        success: function (data) {
            layer.msg("操作成功");
            window.location.reload();
        }
    })

}
function cailiao(e)
{
    $("#purchase_d_id").val($(e).attr("data"))
    $('#gyFile').uploadify({
        'buttonImage':'/js/commons/fileinput/img/uploadify1.png',//路径换成对应自己的路径
        'swf':'/js/uploadify/uploadify.swf',     //路径换成对应自己的路径
        'uploader':'/common/uploadhetong?path=upload.sd.gysnl',   //路径换成对应自己的路径
        'buttonText': '上传谱图',
        'multi': true,
        'height': 80,
        'width':80,
        fileSizeLimit:'5MB',//设置上传文件的容量最大值
        uploadLimit: 20,//上传文件的数量。
        'method'   :'post',
        'onFallback' : function() {//检测FLASH失败调用
            alert("缺少flash！");
        },
        onUploadSuccess:function(file,data,respone){
            var data1 = eval("(" + data+ ")");

            var commonUrl = data1["commonUrl"]
            var fileName = data1["myFileName"];//七牛公共空间
            if(data1.code==1){
                var url = data1["url"];//相对路径
                var allUrl = commonUrl+url;//七牛全路径-用于d标签点击打开
                var $html = '';
                $html += '<a  class="hetong" onclick="putu(this)" datas="'+url+'" data="'+allUrl+'" title="'+fileName+'" alt="'+fileName+'">';
                if(file.type=='.pdf'){
                    $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/noimg1.png"  >'
                }else if(file.type=='.zip')
                {
                    $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/noimg-zip1.png"  >'
                }
                else if(file.type=='.doc'||file.type=='.docx'){
                    $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/noimg-word1.png"  >'
                }
                else{
                    $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/noimg1.png"  >'
                }
                $html += '</a>';
                $("#hetong").append($html);
            }
        },
        fileTypeExts: '*.jpg;*.png;*.gif;*.pdf;*.doc;*.docx;*.jpeg',
        fileTypeDesc: '图片/PDF'
    });
    $('#gyFile2').uploadify({
        'buttonImage':'/js/commons/fileinput/img/uploadify1.png',//路径换成对应自己的路径
        'swf':'/js/uploadify/uploadify.swf',     //路径换成对应自己的路径
        'uploader':'/common/uploadmaterial?path=upload.sd.gysnl',   //路径换成对应自己的路径
        'buttonText': '上传谱图',
        'multi': true,
        'height': 80,
        'width':80,
        fileSizeLimit:'5MB',//设置上传文件的容量最大值
        uploadLimit: 20,//上传文件的数量。
        'method'   :'post',
        'onFallback' : function() {//检测FLASH失败调用
            alert("缺少flash！");
        },
        onUploadSuccess:function(file,data,respone){
            var data1 = eval("(" + data+ ")");

            var commonUrl = data1["commonUrl"]
            var fileName = data1["myFileName"];//七牛公共空间
            if(data1.code==1){
                var url = data1["url"];//相对路径
                var allUrl = commonUrl+url;//七牛全路径-用于d标签点击打开
                var $html = '';
                $html += '<a  class="material" onclick="putu(this)" datas="'+url+'" data="'+allUrl+'" title="'+fileName+'" alt="'+fileName+'">';
                if(file.type=='.pdf'){
                    $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/noimg1.png"  >'
                }else if(file.type=='.zip')
                {
                    $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/noimg-zip1.png"  >'
                }
                else if(file.type=='.doc'||file.type=='.docx'){
                    $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/noimg-word1.png"  >'
                }
                else{
                    $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/noimg1.png"  >'
                }
                $html += '</a>';
                $("#material").append($html);
            }
        },
        fileTypeExts: '*.jpg;*.png;*.gif;*.pdf;*.doc;*.docx;*.jpeg',
        fileTypeDesc: '图片/PDF'
    });
}
function add_doc()
{
    var purchase_d_id=$("#purchase_d_id").val();
    var material=''
    var hetong=''
   $(".hetong").each(function(){
       var url=$(this).attr("datas");
       if(url!=null)
       {
           hetong+=url+','
       }
   })
    $(".material").each(function(){
        var url2=$(this).attr("datas");
        if(url2!=null)
        {
            material+=url2+','
        }
    })
    if(hetong!=''|| material!='') {
        $.ajax({
            type: 'POST',
            url: "/meterialpurchease/manager/add_doc",
            data: {
                hetong: hetong,
                material: material,
                purchase_d_id:purchase_d_id
            },
            dataType: "json",
            success: function (data) {
                layer.msg("操作成功");
               window.location.reload();
            }
        })
    }
}
function putu(e)
{
    window.open($(e).attr("data"));
}
function cancle_doc() {
    window.location.reload();
}