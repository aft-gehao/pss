$(function () {
    doSearch(0);
    $(".status").click(function(){
        $("#status").val($(this).attr("data"));
        $(".status").css("background-color","white");
        $(".status").css("color","black");
        doSearch(0);
        $(this).css("background-color","#5bc0de");
        $(this).css("color","white");
    })
    $(".con_status").click(function(){
        $("#con_status").val($(this).attr("data"));
        $(".con_status").css("background-color","white");
        $(".con_status").css("color","black");
        doSearch(0);
        $(this).css("background-color","#5bc0de");
        $(this).css("color","white");
    })
})

function show_more(is_all){
 
    doSearch(is_all)
}
function show_more_consumable(is_all){

    doSearch(is_all)
}
function doSearch(is_all) {
   var status=$("#status").val();
    var con_status=$("#con_status").val();
    $.ajax({
        type: 'POST',
        url: "/meterialpurchease/manager/work_select",
        data: {
            is_all:is_all

        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                var value = "";
                var values = "";
                var append = eval(data["append"]);
                var appends= eval(data["appends"]);
                $("#pro_count").html(data["append_ext"]);
                $("#con_count").html(data["append_ext2"]);
                if(append.length==0)
                {
                    value += '\
                    <tr >\
                        <td>暂无数据</td>\
                    </tr>\
                    \
                    ';
                }
                if(appends.length==0)
                {
                    values += '\
                    <tr >\
                        <td>暂无数据</td>\
                    </tr>\
                    \
                    ';
                }
                for (var i = 0; i < append.length; i++) {
                    if(status==11001 && append[i]["dict_name"]=="审核通过")
                    {

                        value += '\
                    <tr >\
                    <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["use_amount"]) + '' + $.alle_null2Str(append[i]["use_unit"]) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["purity"]) + '' + $.alle_null2Str(append[i]["use_desc"]) + '</td>\
                        <td><button class="btn btn-info btn-sm" style="background-color:white;color:black">' + $.alle_null2Str(append[i]["dict_name"]) + '</button></td>\
                        <td>\
                        <a title="采购"  onclick="purchase_sure(this)" data="' + append[i]["use_id"] + '" datas="' + append[i]["product_id"] + '" datass="' + append[i]["use_unit"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#caigou-delete"><i class="iconfont">&#xe666;</i> 采购</a>\
                        <a title="删除"  onclick="purchase_cancle(this)"   data="' + append[i]["use_id"] + '" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#confirm-delete"><i class="iconfont" style="font-size: 12px;">&#xe76b;</i> 取消</a>\
                    </td>\
                    </tr>\
                    \
                    ';
                    }
                    else if(status==5004 && append[i]["dict_name"] == "未发货") {
                            value += '\
                    <tr >\
                    <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["use_amount"]) + '' + $.alle_null2Str(append[i]["use_unit"]) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["purity"]) + '' + $.alle_null2Str(append[i]["use_desc"]) + '</td>\
                        <td><button class="btn btn-info btn-sm" style="background-color:white;color:red">' + $.alle_null2Str(append[i]["dict_name"]) + '</button></td>\
                        <td>\
                        <a title="发货"  onclick="fahuo(this)" data="' + append[i]["use_id"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#fahuo"><i class="iconfont">&#xe61d;</i> 卖方发货</a>\
                    </td>\
                    </tr>\
                    \
                    ';
                    }
                   else if(append[i]["dict_name"] == "未发货" && status!=5004 && status!=11001) {

                            value += '\
                    <tr >\
                    <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["use_amount"]) + '' + $.alle_null2Str(append[i]["use_unit"]) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["purity"]) + '' + $.alle_null2Str(append[i]["use_desc"]) + '</td>\
                        <td><button class="btn btn-info btn-sm" style="background-color:white;color:red">' + $.alle_null2Str(append[i]["dict_name"]) + '</button></td>\
                        <td>\
                        <a title="发货"  onclick="fahuo(this)" data="' + append[i]["use_id"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#fahuo"><i class="iconfont">&#xe61d;</i> 卖方发货</a>\
                    </td>\
                    </tr>\
                    \
                    ';
                        }
                        else if(append[i]["dict_name"] == "审核通过" && status!=5004 && status!=11001) {
                            value += '\
                    <tr >\
                    <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["use_amount"]) + '' + $.alle_null2Str(append[i]["use_unit"]) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["check_time"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["purity"]) + '' + $.alle_null2Str(append[i]["use_desc"]) + '</td>\
                        <td><button class="btn btn-info btn-sm" style="background-color:white;color:black">' + $.alle_null2Str(append[i]["dict_name"]) + '</button></td>\
                        <td>\
                        <a title="采购"  onclick="purchase_sure(this)" data="' + append[i]["use_id"] + '" datas="' + append[i]["product_id"] + '" datass="' + append[i]["use_unit"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#caigou-delete"><i class="iconfont">&#xe666;</i> 采购</a>\
                        <a title="删除"  onclick="purchase_cancle(this)"   data="' + append[i]["use_id"] + '" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#confirm-delete"><i class="iconfont" style="font-size: 12px;">&#xe76b;</i> 取消</a>\
                    </td>\
                    </tr>\
                    \
                    ';
                    }
                }
                for (var i = 0; i < appends.length; i++) {
                    if(con_status==11001 && appends[i]["dict_name"]=="审核通过")
                    {
                            values += '\
                    <tr >\
                        <td>' + appends[i]["consumable_name"] + '</td>\
                        <td>' + $.alle_null2Str(appends[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(appends[i]["amount"]) + '' + $.alle_null2Str(appends[i]["consumable_unit"]) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmm(appends[i]["check_time"]) + '</td>\
                         <td>' + $.alle_null2Str(appends[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(appends[i]["desc"]) + '</td>\
                       <td><button class="btn btn-info btn-sm" style="background-color:white;color:black">' + $.alle_null2Str(appends[i]["dict_name"]) + '</button></td>\
                     <td>\
                         <a title="采购" onclick="sure_consumable(this)" dataname="' + appends[i]["consumable_name"] + '" data="' + appends[i]["consumable_unit"] + '" datas="' + appends[i]["use_id"] + '" datass="' + appends[i]["amount"] + '"  datasss="' + appends[i]["consumable_id"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#caigou-delete-2"><i class="iconfont">&#xe666;</i> 采购</a>\
                        <a title="删除"  data="' + appends[i]["use_id"] + '" onclick="con_cancle(this)" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#confirm-delete1"><i class="iconfont" style="font-size: 12px;">&#xe76b;</i> 取消</a>\
                    </td>\
                    </tr>\
                    \
                    ';
                    }
                    else if(con_status==5004 && appends[i]["dict_name"] == "未发货") {

                            values += '\
                                <tr >\
                                <td>' + appends[i]["consumable_name"] + '</td>\
                                <td>' + $.alle_null2Str(appends[i]["pack"]) + '</td>\
                                <td>' + $.alle_null2Str(appends[i]["amount"]) + '' + $.alle_null2Str(appends[i]["consumable_unit"]) + '</td>\
                                <td>' + $.alle_time2str_yymm_dd_hhmm(appends[i]["check_time"]) + '</td>\
                                <td>' + $.alle_null2Str(appends[i]["staff_name"]) + '</td>\
                                <td>' + $.alle_null2Str(appends[i]["desc"]) + '</td>\
                                <td><button class="btn btn-info btn-sm" style="background-color:white;color:red">' + $.alle_null2Str(appends[i]["dict_name"]) + '</button></td>\
                                <td>\
                                <a title="发货"  onclick="con_fahuo(this)" data="' + appends[i]["use_id"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#con_fahuo"><i class="iconfont">&#xe61d;</i> 卖方发货</a>\
                                </td>\
                                </tr>\
                            \
                            ';
                    }
                    else if(appends[i]["dict_name"] == "未发货" && con_status!=5004 && con_status!=11001){
                            values += '\
                    <tr >\
                    <td>' + appends[i]["consumable_name"] + '</td>\
                    <td>' + $.alle_null2Str(appends[i]["pack"]) + '</td>\
                    <td>' + $.alle_null2Str(appends[i]["amount"]) + '' + $.alle_null2Str(appends[i]["consumable_unit"]) + '</td>\
                    <td>' + $.alle_time2str_yymm_dd_hhmm(appends[i]["check_time"]) + '</td>\
                    <td>' + $.alle_null2Str(appends[i]["staff_name"]) + '</td>\
                    <td>' + $.alle_null2Str(appends[i]["desc"]) + '</td>\
                    <td><button class="btn btn-info btn-sm" style="background-color:white;color:red">' + $.alle_null2Str(appends[i]["dict_name"]) + '</button></td>\
                    <td>\
                    <a title="发货"  onclick="con_fahuo(this)" data="' + appends[i]["use_id"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#con_fahuo"><i class="iconfont">&#xe61d;</i> 卖方发货</a>\
                    </td>\
                    </tr>\
                    \
                    ';
                    }
                    else if(appends[i]["dict_name"] == "审核通过" && con_status!=5004 && con_status!=11001) {
                            values += '\
                    <tr >\
                        <td>' + appends[i]["consumable_name"] + '</td>\
                        <td>' + $.alle_null2Str(appends[i]["pack"]) + '</td>\
                        <td>' + $.alle_null2Str(appends[i]["amount"]) + '' + $.alle_null2Str(appends[i]["consumable_unit"]) + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmm(appends[i]["check_time"]) + '</td>\
                         <td>' + $.alle_null2Str(appends[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_null2Str(appends[i]["desc"]) + '</td>\
                       <td><button class="btn btn-info btn-sm"style="background-color:white;color:black">' + $.alle_null2Str(appends[i]["dict_name"]) + '</button></td>\
                     <td>\
                    <a title="采购" onclick="sure_consumable(this)" dataname="' + appends[i]["consumable_name"] + '" data="' + appends[i]["consumable_unit"] + '" datas="' + appends[i]["use_id"] + '" datass="' + appends[i]["amount"] + '"  datasss="' + appends[i]["consumable_id"] + '" class="btn btn-success btn-sm" data-toggle="modal" data-target="#caigou-delete-2"><i class="iconfont">&#xe666;</i> 采购</a>\
                        <a title="删除"  data="' + appends[i]["use_id"] + '" onclick="con_cancle(this)" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#confirm-delete1"><i class="iconfont" style="font-size: 12px;">&#xe76b;</i> 取消</a>\
                    </td>\
                    </tr>\
                    \
                    ';
                        }
                }
                $("#data_tbody1").html(value);
                $("#data_tbody2").html(values);
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}
function  con_cancle(e) {
    $("#use_id").val($(e).attr("data"));
}
function purchase_sure(e){
    $("#use_id").val($(e).attr("data"));
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
    $("#product_id").val($(e).attr("datas"));
}
function purchase_cancle(e){

    $("#use_id").val($(e).attr("data"));
}
function sure_purchase(){
    var use_id = $("#use_id").val();
    var product_id = $("#product_id").val();
    var supplier_name=$("#supplier_name").val();
    var price=$("#price").val();
    var amount=$("#new_amount").val();
    var unit=$("#unit").val();
    var univalence=$("#univalence").val();
    var desc=$("#pur_desc").val();
    $.ajax({
        type: 'POST',
        url: "/product_use/manage/add_purchasing",
        data: {
            unit:unit,
            univalence:univalence,
            amount:amount,
            product_id:product_id,
            use_id: use_id,
            supplier_name: supplier_name,
            price: price,
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




/*    $("input[id*='pur_con_qx']").each(function () {
        $(this).click(function(){
            var id=$(this).attr("data")
            $.ajax({
                type: 'POST',
                url: "/consumable/manager/consumableCl",
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
    });*/
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
function con_fahuo(e)
{
    $("#use_id").val($(e).attr("data"));
}
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
$("#add_cas").bind('propertychange input',(function(){
    setTimeout(function() {
        var cas = $("#add_cas").val();
        $.ajax({
            type: 'POST',
            url: "/product/manager/product_page_list",
            data: {
                cas: cas,
                p:1
            },
            dataType: "json",
            success: function (data) {
                if(data["append"]!=null) {
                    var append = eval(data["append"]["results"]);
                    if (append.length == 0) {
                        $("#add_product_id").val(0);
                    }
                    else {
                        $("#add_cas").val(append[1]["cas"]);
                        /*    $("#add_sku").val(append[1]["sku"]);*/
                        $("#add_name_ch").val(append[1]["name_ch"]);
                        $("#add_product_id").val(append[1]["product_id"]);

                    }
                }
            }
        })
    },2000);
})
)
$().ready(function () {
    //定时器
    var timeoutIdDpt, last_search;
    //清空缓存
    $("#add_suppllier_name").flushCache();
    $("#add_suppllier_name").keyup(
        function (event) {
            //处理文本框中的键盘事件
            var myEvent = event || window.event;
            var keyCode = myEvent.keyCode;
            $("#supplier_id").val(0);
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
                    var url = "/common/load_auto?t=purchasing";
                    $("#add_suppllier_name").autocomplete(url, {
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
        $("#supplier_id").val(row.value);
    });
});
function add_pur_sure(){
              var product_id=$("#add_product_id").val();
              var cas=$("#add_cas").val();
              var name_ch=$("#add_name_ch").val()
              var purity=$("#add_purity").val()
              var supplier_name=$("#add_supplier_name").val();
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
                    supplier_name: supplier_name,
                    supplier_id: supplier_id,
                    purity:purity,
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
