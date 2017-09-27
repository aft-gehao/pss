$(function () {
    $("start_time").val("")
    $("end_time").val("")
    $("#a_lingyong").attr("class", "active");
    $("#search").attr("placeholder","CAS,SKU,中文名,申请人员")
    doSearch(1);
    $("#inv_out_query").click(function () {
        doSearch(1);
    })
    load_product_type();
    $("#titleStr").html("供应商/客户")


    //耗材
    var flag = $.alle_getUrlParam("flag");
    if(flag!=null) {
        $("#con_add").click(function () {
            window.location.href = "/promanager/consumable/add_use_kuguan.html";
        })
    }
    else{
        $("#con_add").click(function () {
            window.location.href = "/promanager/consumable/add_use_yanfa.html";
        })
    }

})

function load_product_type() {
    $.ajax({
        type: 'POST',
        url: "/inventory/productOut/load_inventory_type",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#inventory_type").html("");
                var html = "<option value=''>请选择</option>";
                var append = data["append"];
                for (var i = 0; i < append.length; i++) {
                        html += "<option value='" + append[i]["dict_id"] + "'>" + append[i]["dict_name"] + "</option>"
                }

                $("#inventory_type").html(html);
            }
        }
    });
}


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
    }

    $("#yuanliao").show()
    $("#pages_yuanliao").show()

    var out_type = $("#out_type").val();
    var status_id=$("#status_id").val();



    var time=$("#time").val();

    if (time==""){
        $("#outbound_time").html("全部")
    }

    var search=$("#search").val()

    if (str==""){
        $("#type_custom_time").html()
    }else {
        $("#type_custom_time").html(str)
    }



    if (status_id==""){
        status_id=""
        $("#outbound_status").html("全部")
    }else {
        status_id=status_id.substring(0, status_id.length - 1)
    }

    var type_id = $("#type_id").val()

    if (type_id==1){ //耗材领用

        $("#yuanliao").hide()
        $("#pages_yuanliao").hide()

        $("#haocai").show()
        $("#pages_haocai").show()
        $.ajax({
            type: 'POST',
            url: "/consumable/manager/consumablePage",
            data: {
                p: p,
                status_id:status_id,
                time:time,
                start_time:start_time,
                end_time:end_time,
                search:search
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
                        if (append[i]["status"] == 8001) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black">已出库</button>';
                        } else if (append[i]["status"] == 8003) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black">部分出库</button>';
                        } else if (append[i]["status"] == 8002) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black;border-color: red;">未出库</button>';
                        }
                        else if (append[i]["status"] == 5001) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black">已入库</button>';
                        }
                        else if (append[i]["status"] == 5002) {
                            html2 += '<button type="button" datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'" class="btn btn-info btn-sm" style="background-color:white;color:black" >已发货</button>';
                        }
                        else if (append[i]["status"] == 5004) {
                            html2 += '<button  class="btn btn-info btn-sm"  type="button" style="background-color:white;color:black;border-color: red;">未发货</button>';
                        } else if (append[i]["status"] == 5003) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black">部分入库</button>';
                        }
                        else if (append[i]["status"] == 11004) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black">待审核</button>';
                        }
                        else if (append[i]["status"] == 11001) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black">审核通过</button>';
                        }
                        else if (append[i]["status"] == 11002) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black;border-color: red">审核不通过</button>';
                        }
                        else if (append[i]["status"] == 11003) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black;border-color: red;">暂不审核</button>';
                        }
                        else {
                            layer.msg("类型异常,联系管理员");
                        }
                        if (append[i]["status"] == '11004') {
                            value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["amount"]) + ''+ $.alle_null2Str(append[i]["consumable_unit"]) +'</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <a type="button" data="' + append[i]["use_id"] + '"  id="con_mod" class="btn btn-success">修改</a>\
                        <a type="button" data="' + append[i]["use_id"] + '" id="con_del" class="btn btn-success">删除</a>\
                        <a type="button" data="' + append[i]["use_id"] + '" id="con_det" class="btn btn-success">详情</a>\
                        <a  id="a_delete_'+append[i]["use_id"]+'"  href="#confirm-delete"   data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                        }
                        else {
                            value += '\
                    <tr >\
                          <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["amount"]) + ''+ $.alle_null2Str(append[i]["consumable_unit"]) +'</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["use_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td class="operation">\
                        <a type="button" data="' + append[i]["use_id"] + '" id="con_det" class="btn btn-success">详情</a>\
                        <a href="#" data-href="delete.php?id=23" onclick=""  onclick="del(this)" data-toggle="modal" data-target="#confirm-delete"></a>\
                        </td>\
                        </tr>\
                    \
                    ';
                        }
                    }
                    $("#data_tbody_haocai").html(value);

                    $(document).on('mouseover',  "button[id='example']", function() {
                        $("button[name='leave']").popover("hide");
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
                    $("a[id*='con_det']").each(function () {
                        $(this).click(function(){
                            $.alle_dialog('/promanager/consumable/detail_use.html?use_id='+$(this).attr("data"),'申请单详情', ["50%", "50%"])
                        })
                    });
                    $("a[id*='con_mod']").each(function () {
                        $(this).click(function(){
                            $.alle_dialog('/promanager/consumable/modify_use.html?use_id='+$(this).attr("data"),'申请单修改', ["50%", "50%"])
                        })
                    });
                    $("a[id*='con_pro']").each(function () {
                        $(this).click(function(){
                            window.location.href="/infomanager/shinfo/product.html?cs_sup_id="+$(this).attr("data");
                        })
                    });
                    $("a[id*='con_del']").each(function () {
                        $(this).click(function(){
                            $("#del").val($(this).attr("data"));
                            $("#a_delete_"+$(this).attr("data")).click();
                        })
                    });
                    //调用设置分页
                    PAGE_INIT("#pages_haocai", data["append"].pageNo, data["append"].totalPage)
                } else {
                    layer.msg(data["message"]);
                }
            }
        });
    } else {

        $("#yuanliao").show()
        $("#pages_yuanliao").show()

        $("#haocai").hide()
        $("#pages_haocai").hide()
        $.ajax({
            type: 'POST',
            url: "/inventory/productOut/inventory_out_page",
            data: {
                out_type: out_type,
                p: p,
                status_id:status_id,
                time:time,
                start_time:start_time,
                end_time:end_time,
                search:search
            },
            dataType: "json",
            success: function (data) {
                if (data["result"] == "success") {
                    var value = "";
                    if (data["append"]["results"] == 0) {
                        $("#data_tbody_yuanliao").empty()
                        $("#pages_yuanliao").empty()
                        layer.msg('暂无数据');
                        return false;
                    }else{
                        var append = eval(data["append"]["results"]);
                        for (var i = 0; i < append.length; i++) {
                            //暂时先改成cas 和sku
                            var html = "";
                            var name = "";
                            var html1="";
                            if (append[i]["out_type"] == 9001) {
                                name += append[i]["purchase_name"] + "【<strong><font color='red'>采退</font></strong>】"

                            }
                            if (append[i]["out_type"] == 9002) {
                                name += append[i]["purchase_name"] + "【<strong><font color='blue'>销售</font></strong>】"
                            }

                            if (append[i]["out_type"] == 9003 && append[i]["stock_status"] != 8001) {
                                html1 +=  '<a id="inv_out_cancle"  type="button" class="btn btn-success" onclick="cancle_inventory_info(' + append[i]["purchase_id"] + ')">取消</a>';
                            }
                            if (append[i]["out_type"] == 9003) {
                                name += append[i]["purchase_name"] + "【<strong><font color='red'>领用</font></strong>】"
                            }
                            if (append[i]["stock_status"] == 8001) {
                                html += '<button class="btn btn-info btn-sm" style="background-color:white;color:black">' + append[i]["stock_status_name"] + '</button>';
                            } else if (append[i]["stock_status"] == 8002) {
                                html += '<button class="btn btn-info btn-sm" style="background-color:white;color:black;border-color: red;">' + append[i]["stock_status_name"] + '</button></span>';
                            } else if (append[i]["stock_status"] == 8003) {
                                html += '<button class="btn btn-info btn-sm" style="background-color:white;color:black">' + append[i]["stock_status_name"] + '</button>';
                            }
                            var html2 = '';
                            if (append[i]["stock_status"] != 8001) {
                                html2 += '<a id="inv_out_submit" type="button" class="btn btn-success" onclick="out_inventory_info(' + append[i]["purchase_id"] + ',' + append[i]["out_type"] + ',' + append[i]["supplier_name"] + ',' + append[i]["supplier_id"] + ')">出库</a>';
                            }
                            else {
                                html2 += '<a id="inv_out_detail" type="button" class="btn btn-success" onclick="out_inventory_info(' + append[i]["purchase_id"] + ',' + append[i]["out_type"] + ')">详情</a>' ;
                                /* '<input id="inv_out_del" type="button" class="btn btn-link btn-xs" data="' + append[i]["purchase_id"] + '" value="取消"/>';*/
                            }
                            if (append[i]["stock_status"] == 5002 || append[i]["stock_status"] == 5001||append[i]["stock_status"] == 11004 ){}
                            /*else {
                             value += '\
                             <tr >\
                             <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                             <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                             <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                             <td>' + $.alle_null2Str(append[i]["amount"]) + '' + $.alle_null2Str(append[i]["unit"]) + '</td>\
                             <td>' + append[i]["out_type_str"] + '</td>\
                             <td>' + append[i]["staff_name_return"] + '</td>\
                             <td>' + html + '</td>\
                             <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["return_time"]) + '</td>\
                             <td>' + $.alle_null2Str(append[i]["supplier_name"]) + '</td>\
                             <td class="operation">' + html2 + ''+html1+'</td>\
                             </tr>\
                             \
                             ';
                             }*/
                            if (append[i]["out_type"] == 9001 || append[i]["out_type"] == 9002 || append[i]["out_type"] == 9003){
                                value += '\
                    <tr >\
                       <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["amount"]) + '' + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["return_time"]) + '</td>\
                        <td>' + append[i]["staff_name_return"] + '</td>\
                         <td>' + html + '</td>\
                         <td class="operation">' + html2 + ''+html1+'</td>\
                        </tr>\
                    \
                    ';
                                $("#data_tbody_yuanliao").html(value);
                                //调用设置分页
                                PAGE_INIT("#pages_yuanliao", data["append"].pageNo, data["append"].totalPage)
                            }
                        }
                    }
                } else {
                    layer.msg(data["message"]);
                }
                $("input[id*='inv_out_del']").each(function () {
                    var id=$(this).attr("data")
                    $(this).click(function(){
                        alert(id)
                    })
                });
            }
        });
    }
}
function out_inventory_info(purchase_id, out_type,is_sale,supplier_id) {
    //编写出库
    if (out_type == 9001) {//采退
        window.location.href = "/promanager/inventory/inventory_out_info.html?purchase_id=" + purchase_id;
    } else if (out_type == 9002) {//销售
        window.location.href = "/promanager/inventory/inventory_vendition_out_info.html?sale_id=" + purchase_id;
    }
    else if (out_type == 9003) {//领用
        window.location.href = "/promanager/inventory/inventory_use_out_info.html?use_id="+purchase_id+"&is_sale="+is_sale+"&supplier_id="+supplier_id+"";
    }else {
        layer.msg("数据存在问题，请联系管理员");
    }
}
function cancle_inventory_info(id){
    var id=id;
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/useDel",
        data: {
            use_id: id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                   layer.msg("操作成功");
                setTimeout(function () {
                    window.location.reload();
                }, 700);
            }
        }
    })
}
$("#shanchusubmit").click(function(){
    var use_id=$("#del").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/useDel",
        data: {
            use_id: use_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/promanager/consumable/index.html";
                }, 1000);
            }
        }
    })
})


            //出库来源

//原料领用
function raw_materials_used(e) {
    $("#test16").val("")
    $("#type_id").val("")
    $("#out_type").val("9003")

    $("#search").val("")
    $("#a_lingyong").attr("class", "active");
    $("#a_tuihuo").attr("class", "");
    $("#a_Hlingyong").attr("class", "");
    $("#a_xiaoshou").attr("class", "");
    $("#outbound_source").html($(e).html())
    $("#search").attr("placeholder","CAS,SKU,中文名,申请人员")

    doSearch(1);
}

//原料退货
function raw_material_return(e) {
    $("#test16").val("")
    $("#type_id").val("")
    $("#out_type").val("9001")

    $("#search").val("")
    $("#a_lingyong").attr("class", "");
    $("#a_tuihuo").attr("class", "active");
    $("#a_Hlingyong").attr("class", "");
    $("#a_xiaoshou").attr("class", "");
    $("#outbound_source").html($(e).html())
    $("#search").attr("placeholder","CAS,SKU,中文名,申请人员")

    doSearch(1);
}

//产品销售
function product_sales(e) {
    $("#test16").val("")
    $("#type_id").val("")
    $("#out_type").val("9002")

    $("#search").val("")
    $("#a_lingyong").attr("class", "");
    $("#a_tuihuo").attr("class", "");
    $("#a_Hlingyong").attr("class", "");
    $("#a_xiaoshou").attr("class", "active");
    $("#outbound_source").html($(e).html())
    $("#search").attr("placeholder","CAS,SKU,中文名,申请人员")

    doSearch(1);
}

//耗材领用
function consumables_supply(e) {
    $("#test16").val("")
    $("#type_id").val("1")

    $("#search").val("")
    $("#a_lingyong").attr("class", "");
    $("#a_tuihuo").attr("class", "");
    $("#a_Hlingyong").attr("class", "active");
    $("#a_xiaoshou").attr("class", "");
    $("#outbound_source").html($(e).html())
    $("#search").attr("placeholder","耗材名,申请人员")

    doSearch(1);
}

//条件查询确认
function query_confirm() {
    doSearch(1);
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
    var html="";
    var html_time="";
    $("a[class='info active']").each(function(){
        info +=$(this).attr("data")+",";
        html +=$(this).html()+"/"
    })
    $("#outbound_status").html(html.substring(0,html.length-1))
    $("#status_id").val(info);
    $("a[class='time active']").each(function(){
        time +=$(this).attr("data");
        html_time=$(this).html()
    })
    $("#time").val(time);
    $("#outbound_time").html(html_time)
    if($("a[class='info active']").length!=0 )
    {
        $("a[class='info1 active']").removeClass("info1 active").attr("class","info1");
    }
    else{
        $("a[class='info1']").removeClass("info1").attr("class","info1 active");
    }
    if($("a[class='time active']").length!=0 )
    {
        $("a[class='time1 active']").removeClass("time1 active").attr("class","time1");
    }
    else{
        $("a[class='time1']").removeClass("time1").attr("class","time1 active");
    }
    $("#start_time").val("")
    $("#end_time").val("")
    $("#search").val("")
    doSearch(1);
}
