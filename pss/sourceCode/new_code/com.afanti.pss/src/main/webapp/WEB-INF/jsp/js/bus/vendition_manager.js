$(function () {
    $.alle_section_date("start_time", "end_time");
    doSearch(1);
    $("#ven_query").click(function () {
        doSearch(1);
    })
    $('#ven_add').click(function () {
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

    var status=$("#status_id").val()
    if (status==""){
        $("#type_status").html("全部")
    }

    var time=$("#time").val()
    if (time==""){
        $("#type_time").html("全部")
    }

    var search=$("#search").val()

    $.ajax({
        type: 'POST',
        url: "/vendition/manager/vendition_purchase_page",
        data: {
            search:search,
            start_time:start_time,
            end_time:end_time,
            time:time,
            status:status,
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
                    var html_mod = "";
                    var html_type = "";
                    var html_sumbit = "";
                    var html_doc = "";
                    var html_use='<a class="btn btn-success" id="material_lingyong" style="margin-left: 0px" type="button" data='+append[i]["sale_d_id"]+'>领用产品</a>&nbsp;'
                    if (append[i]["status"] == 8001) {
                        html_type += '<button class="btn btn-success btn-sm" style="background-color:white;color:black">' + append[i]["status_str"] + '</button>';
                    }
                    if (append[i]["status"] == 8003) {
                        html_type += '<button class="btn btn-success btn-sm" style="background-color:white;color:black">' + append[i]["status_str"] + '</button> ';
                    }
                    if (append[i]["status"] == 8002) {
                        html_type += '<button class="btn btn-success btn-sm" style="background-color:white;color:black;border-color: red;">' + append[i]["status_str"] + '</button></span>';
                        html_doc += "<a  id='ven_doc' class='btn btn-success' style='margin-left: 0px' type='button' onclick='test(this)' data='"+append[i]["hetong_doc"]+"'>下载合同</a>";
                        html_mod += "<a  id='ven_doc' class='btn btn-success' style='margin-left: 0px' type='button' data-toggle='modal' data-target='#hetong-mod' onclick='mod_doc(this)' data='"+append[i]["sale_d_id"]+"'>修改合同</a>&nbsp;";
                    }
                    value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["amount"]) + '' + $.alle_null2Str(append[i]["unit"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["unit_price"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["sale_batch_no"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["cus_name"]) + '</td>\
                         <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>' + $.alle_time2str_yymm_dd_hhmm(append[i]["sale_time"]) + '</td>\
                        <td>' +html_type + '</td>\
                         <td class="operation">' + html_use+ '' + html_sumbit + ''+html_mod+''+html_doc+'</td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                $("a[id*='material_lingyong']").each(function () {
                    $(this).click(function(){
                        var sale_d_id=$(this).attr("data")
                        $.alle_dialog('/promanager/researchAndUse/add_use_yanfa.html?permissions=1&sale_d_id='+sale_d_id+'')
                    })
                })
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

function to_upd_vendition(sale_id) {
    window.location.href = "/promanager/vendition/edit.html?sale_id=" + sale_id;
}
function del_vendition(sale_id) {
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/vendition/manager/del_vendition",
            data: {
                sale_id: sale_id
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
function vendition_detial(sale_id) {
    window.location.href = "/promanager/vendition/detail.html?type=vendition&sale_id=" + sale_id;
}
function show_image(url) {
    $.alle_dialog_img(url);
}
function vendition_doc(path) {
    window.location.href="http://source.tanyangnet.com"+path;
}
function test(e)
{
    window.open("http://source.tanyangnet.com/"+$(e).attr("data"));
}
function mod_doc(e){

    var sale_d_id=$(e).attr("data");
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/select_vendition",
        data: {
            sale_d_id: sale_d_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#cunhuo_cas").val(data["append"]["cas"])
                $("#cunhuo_sku").val(data["append"]["sku"])
                $("#cunhuo_name_en").val(data["append"]["name_en"])
                $("#cunhuo_purity").val(data["append"]["purity"])
                $("#cunhuo_amount").val(data["append"]["amount"])
                $("#cunhuo_price").val(data["append"]["unit_price"])
                $("#sale_d_id").val(data["append"]["sale_d_id"])
                $("#sale_way").val(data["append"]["sale_way"])
            }
        }
    });
}
$("#sure_mod").click(function () {
       var amount= $("#cunhuo_amount").val();
       var sale_way= $("#sale_way").val();
       var purity= $("#cunhuo_purity").val();
       var unit_price= $("#cunhuo_price").val();
       var sale_d_id=$("#sale_d_id").val();
       var unit=$("#cunhuo_unit").val();
    $.ajax({
        type: 'POST',
        url: "/vendition/manager/vendition_updata",
        data: {
            amount:amount,
            unit:unit,
            purity:purity,
            unit_price:unit_price,
            sale_d_id: sale_d_id
        },
        dataType: "json",
        success: function (data) {
            $.ajax({
                type: 'POST',
                url: "/vendition/manager/select_vendition",
                data: {
                    sale_d_id: sale_d_id
                },
                dataType: "json",
                success: function (data) {
                    layer.msg("操作成功");
                    var custom=encodeURI(encodeURI(data["append"]["name"]))
                    var sale_way=data["append"]["sale_way"]
                    var cas=data["append"]["cas"]
                    var name_en=encodeURI(encodeURI(data["append"]["name_en"]))
                    var amount=data["append"]["amount"]
                    var price=data["append"]["unit_price"]
                    var unit=data["append"]["unit"]
                    setTimeout(function() {
                        window.open("/promanager/vendition/sale_hetong.html?sale_way="+sale_way+"&customer="+custom+"&cas="+cas+"&name_en="+name_en+"&amount="+amount+"&price="+price+"&unit="+unit+"&sale_d_id="+sale_d_id);
                    },1000);

                }
            });

        }
    });

})

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
    $("#search").val("")
    $("#test16").val("")
    doSearch(1)
}


function do_query() {
    doSearch(1)
}

