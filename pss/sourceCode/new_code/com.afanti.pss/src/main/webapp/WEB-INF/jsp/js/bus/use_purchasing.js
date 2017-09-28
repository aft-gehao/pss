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
    $("#caigou_status").html(caigou_status.substring(0,caigou_status.length-1));
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

function doSearch(p) {
    var str = $("#test16").val()
    var number_str= find(str,'-',2)
    var start_time=str.substring(0,number_str-1);
    var end_time=str.substring(number_str+2);
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
    var staff_id = $("#staff_id").val();
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/usePurchasing",
        data: {
            start_time:start_time,
            end_time:end_time,
            status: status,
            time:time,
            staff_id:staff_id,
            cas: cas,
            p: p
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var value = "";
                var staffs ='<option value="">未选择</option>';
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                /*  var appends = eval(data["append_ext"]);
                 for(var j=0;j< appends.length;j++)
                 {
                 staffs+='<option value="'+appends[i]["staff_id"]+'">'+appends[i]["staff_name"]+'</option>';
                 }*/
                $("#staff").html(staffs);
                for (var i = 0; i < append.length; i++) {
                    var html = "";
                    var html2 = "";
                    var html3=""
                     if(append[i]["use_desc"]==""||append[i]["use_desc"]==null)
                     {
                         html3+='';
                     }
                    else{
                         html3+='/'+append[i]["use_desc"];
                     }
                    if(append[i]["dict_name"]=="审核通过") {
                        value += '\
                    <tr >\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '<br>' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                        <td>' + append[i]["use_amount"] + '' + append[i]["use_unit"] + '</td>\
                         <td>' + $.alle_null2Str(append[i]["purity"])  + html3 + '</td>\
                         <td>' + append[i]["staff_name"] + '<br>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '<br>' + append[i]["use_desc"] + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '<br>' +$.alle_null2Str(append[i]["check_name"]) + '<br>' + $.alle_null2Str(append[i]["check_desc"]) + '</td>\
                         <td><span class="btn"  style="border-color: blue " disabled="disabled">' + $.alle_null2Str(append[i]["dict_name"])+ '</span></td>\
                         <td class="operation">\
                            <a title="采购"  onclick="purchase_sure(this)" data="' + append[i]["use_id"] + '" datas="' + append[i]["product_id"] + '" datass="' + append[i]["use_unit"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#caigou-delete"><i class="iconfont">&#xe666;</i> 采购</a>\
                            <a title="删除"  onclick="purchase_cancle(this)"   data="' + append[i]["use_id"] + '" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#confirm-delete"><i class="iconfont" style="font-size: 12px;">&#xe76b;</i>取消</a>\
                         </td>\
                    </tr>\
                    \
                    ';
                    }else if (append[i]["dict_name"] == '待审核'||append[i]["dict_name"] == '暂不审核') {
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '<br>' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                        <td>' + append[i]["use_amount"] + '' + append[i]["use_unit"] + '</td>\
                         <td>' + $.alle_null2Str(append[i]["purity"])  + html3 + '</td>\
                         <td>' + append[i]["staff_name"] + '<br>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '<br>' + append[i]["use_desc"] + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '<br>' +$.alle_null2Str( append[i]["check_name"]) + '<br>' + $.alle_null2Str(append[i]["check_desc"]) + '</td>\
                        <td><span class="btn"  style="border-color: #5cb85c">' + $.alle_null2Str(append[i]["dict_name"])+ '</span></td>\
                         <td class="operation">\
                         </td>\
                    ';
                    }else if (append[i]["dict_name"] == '审核不通过') {
                        value += '\
                    <tr >\
                         <td>' + $.alle_null2Str(append[i]["cas"]) + '<br>' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                        <td>' + append[i]["use_amount"] + '' + append[i]["use_unit"] + '</td>\
                         <td>' + $.alle_null2Str(append[i]["purity"])  + html3 + '</td>\
                         <td>' + append[i]["staff_name"] + '<br>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '<br>' + append[i]["use_desc"] + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '<br>' +$.alle_null2Str( append[i]["check_name"]) + '<br>' + $.alle_null2Str(append[i]["check_desc"]) + '</td>\
                         <td><span class="btn"  style="border-color: red">' + $.alle_null2Str(append[i]["dict_name"])+ '</span></td>\
                         <td class="operation">\
                         </td>\
                        </tr>\
                    ';
                    }else{
                        value += '\
                        <tr >\
                          <td>' + $.alle_null2Str(append[i]["cas"]) + '<br>' + $.alle_null2Str(append[i]["nameCh"]) + '</td>\
                        <td>' + append[i]["use_amount"] + '' + append[i]["use_unit"] + '</td>\
                         <td>' + $.alle_null2Str(append[i]["purity"])  + html3 + '</td>\
                         <td>' + append[i]["staff_name"] + '<br>' + $.alle_time2str_yymm_dd_hhmm(append[i]["use_time"]) + '<br>' + append[i]["use_desc"] + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '<br>' +$.alle_null2Str(append[i]["check_name"]) + '<br>' + $.alle_null2Str(append[i]["check_desc"]) + '</td>\
                              <td><span class="btn"  style="border-color: greenyellow">' + $.alle_null2Str(append[i]["dict_name"])+ '</span></td>\
                             <td class="operation">\
                             </td>\
                             </tr>\
                        ';
                    }
                }
                $("#data_tbody").html(value);

                $("input[id*='pur_cancel']").each(function () {
                    $(this).click(function(){
                        var id=$(this).attr("data")
                        $.ajax({
                            type: 'POST',
                            url: "/product_use/manage/purCl",
                            data: {
                                use_id:id
                            },
                            dataType: "json",
                            success:function (data) {
                                if ( data["result"] == "success"){
                                    doSearch(p)
                                }
                            }
                        })
                    })
                });
                $("input[class*='btn btn-success btn-sm']").each(function () {
                    $(this).click(function(){
                        var use_id=$(this).attr("data");
                        var status = $(this).attr("datas");
                        var con_name=$(this).attr("datac");
                        var amount=$(this).attr("dataccc");
                        var unit=$(this).attr("datacc");
                        var pack=$(this).attr("pack");
                        $.ajax({
                            type: 'POST',
                            url: "/consumable/manager/useModify",
                            data: {
                                con_name:con_name,
                                status:status,
                                use_id:use_id,
                                amount:amount,
                                unit:unit,
                                pack:pack
                            },
                            dataType: "json",
                            success: function (data) {
                                layer.msg(data["message"]);
                                if (data["result"] == "success") {
                                    setTimeout(function () {
                                        window.location.href="/promanager/consumable/use_shenhe.html";
                                    }, 1000);
                                }
                            }
                        })
                    })
                });
                $("input[class*='btn btn-fail btn-sm']").each(function () {
                    $(this).click(function(){
                        var use_id=$(this).attr("data");
                        var status = $(this).attr("datas");
                        var con_name=$(this).attr("datac");
                        $.ajax({
                            type: 'POST',
                            url: "/consumable/manager/useModify",
                            data: {
                                con_name:con_name,
                                status:status,
                                use_id:use_id
                            },
                            dataType: "json",
                            success: function (data) {
                                layer.msg(data["message"]);
                                if (data["result"] == "success") {
                                    setTimeout(function () {
                                        window.location.href="/promanager/consumable/use_shenhe.html";
                                    }, 1000);
                                }
                            }
                        })
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
function chuli(e){
    $(".yijian").attr("use_id2",$(e).attr("data"));
    $(".yijian").attr("use_batch_no",$(e).attr("datass"));
}
$(".yijian").click(function(){
    $("#status_yijian").val($(this).attr("yijian"));
    $("#use_id").val($(this).attr("use_id2"));
})
$("#sure").click(function(){
    var use_id2=$("#use_id2").val();
    var status=$("#status_yijian").val();
    var desc=$("#desc").val();
    if(status ==null ||status ==""){
        layer.msg("请选择意见");
        return ;
    }
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/useShenhe",
        data: {
            desc:desc,
            status:status,
            use_id2:use_id2
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href="/promanager/researchAndUse/use_shenhe.html";
                }, 1000);
            }
        }
    })
})
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
function purchase_sure(e){
    var html=""
    $("#use_id").val($(e).attr("data"));
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
    $("#product_id").val($(e).attr("datas"));
}
function purchase_cancle(e){

    $("#use_id").val($(e).attr("data"));
}
function sure_purchase(){
    var new_amount = $("#new_amount").val();

    var use_id = $("#use_id").val();
    var product_id = $("#product_id").val();
    var supplier_name=$("#supplier_name").val();
    var price=$("#price").val();
    var amount=$("#new_amount").val();
    var unit=$("#unit").val();
    var univalence=$("#univalence").val();
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/add_purchasing",
        data: {
            new_amount:new_amount,
            unit:unit,
            univalence:univalence,
            amount:amount,
            product_id:product_id,
            use_id: use_id,
            supplier_name: supplier_name,
            price: price
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

}function sure_cancle() {
    var use_id = $("#use_id").val();

    $.ajax({
        type: 'POST',
        url: "/product_use/manage/purCl",
        data: {
            use_id: use_id
        },
        dataType: "json",
        success: function (data) {
            layer.msg("操作成功");
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.parent.location.reload();
                }, 1000);
            }
        }
    })
}
$("#univalence").blur(function(){
    var amount=$("#new_amount").val();
    var univalence=$("#univalence").val();
    if(amount!=""&& univalence!=null)
    {
        $("#price").val(amount * univalence);
    }

})
$("#price").blur(function(){
    var amount=$("#new_amount").val();
    var price=$("#price").val();
    if(amount!=""&& price!="")
    {
        $("#univalence").val(price / amount);
    }

})
$().ready(function () {
    //定时器
    var timeoutIdDpt, last_search;
    //清空缓存
    $("#staff_name").flushCache();
    $("#staff_name").keyup(
        function (event) {
            //处理文本框中的键盘事件
            var myEvent = event || window.event;
            var keyCode = myEvent.keyCode;
            /*$("#staff_id").val(0);*/
            if ($(this).val().replace(" ", "") == "")return;
            //如果输入的是字母，退格，delete，空格或者数字键，应该将文本框中的最新信息发送给服务器,
            //其中，空格键和数字键的加入使得输入中文也能支持~~
            if ((keyCode >= 65 && keyCode <= 90)
                || (keyCode >= 48 && keyCode <= 57)
                || (keyCode >= 96 && keyCode <= 105)
                || keyCode == 46 || keyCode == 8
                || keyCode == 32) {

                //将文本框中的内容发送到服务器端
                //对上次未完成的延时操作进行取消
                clearTimeout(timeoutIdDpt);

                //对于服务器端进行交互延迟1000ms，避免快速打字造成的频繁请求
                timeoutIdDpt = setTimeout(function () {
                    var url = "/common/load_auto?t=staff_id";
                    $("#staff_name").autocomplete(url, {
                        matchContains: false,
                        minChars: 0,
                        cacheLength: 1, //不缓存
                        matchSubset: false, //不缓存
                        matchCase: false,
                        formatItem: function (row, i, max) {
                            var row = eval("(" + row + ")");
                            return row.text;
                        },
                        formatResult: function (row, i, max) {
                            var row = eval("(" + row + ")");
                            return row.text;
                        },
                        beforeSend: function (XHR) {

                        },
                        complete: function (XHR, TS) {

                        }
                    });
                }, 1000);
            }
        }).result(function (event, row) {

        var row = eval("(" + row + ")");

        $("#staff_id").val(row.value);
    });
});function fahuo(e){
    $("#use_id").val($(e).attr("data"));
}$("#kd_num").blur(function () {
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
            $("#kd_code").html(html);
        }
    })
})
function  fahuo_sure() {
    var use_id=$("#use_id").val();
    var status=5002;
    var kd_code=$("#kd_code").val();
    var kd_num=$("#kd_num").val();
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
$("input[class*='btn btn-fail btn-sm']").each(function () {
    $(this).click(function(){
        var use_id=$(this).attr("data");
        var status = $(this).attr("datas");
        var con_name=$(this).attr("datac");
        $.ajax({
            type: 'POST',
            url: "/consumable/manager/useModify",
            data: {
                con_name:con_name,
                status:status,
                use_id:use_id
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    setTimeout(function () {
                        window.location.href="/promanager/consumable/use_shenhe.html";
                    }, 1000);
                }
            }
        })
    })
});
$("input[id*='use_del']").each(function () {
    $(this).click(function(){
        $("#del").val($(this).attr("data"));
        $("#a_delete_"+$(this).attr("data")).click();
    })
});



$("#shanchusubmit").click(function(){

    var use_id=$("#del").val();

    $.ajax({
        type: 'POST',
        url: "/product_use/manage/useDel",
        data: {
            use_id: use_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/promanager/researchAndUse/index.html";
                }, 1000);
            }
        }
    })


})

$("input[id*='use_del']").each(function () {
    $(this).click(function(){
        $("#del").val($(this).attr("data"));
        $("#a_delete_"+$(this).attr("data")).click();
    })
});
$("input[id*='pur_sure']").each(function () {
    $(this).click(function(){

        $.alle_dialog('/promanager/purchasing/add_purchasing.html?use_id='+$(this).attr("data")+'&product_id='+$(this).attr("datas"),'新增采购单', ["50%", "50%"])
    })
});