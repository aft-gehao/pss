$(function () {
    /* load_product_type();*/
    doSearch(1);
    $("#inv_in_query").click(function () {
        doSearch(1);
    })
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            doSearch(1);
        }
    })
})

/*function load_product_type() {
    $.ajax({
        type: 'POST',
        url: "/inventory/productIn/load_inventory_type",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#stock_status").html("");
                var html = "<option value='5002'>未入库</option><option value=''>请选择</option><option value='5001'>已入库</option><option value='5003'>部分入库</option>";
               /!* var append = data["append"];
                for (var i = 0; i < append.length; i++) {
                    html += "<option value='" + append[i]["dict_id"] + "'>" + append[i]["dict_name"] + "</option>"
                }*!/
                $("#stock_status").html(html);
            }
        }
    });
}*/
function doSearch(p) {

    var consumable_name = $("#consumable_name").val();
    var stock_status = $("#stock_status").val();
    $.ajax({
        type: 'POST',
        url: "/consumable/manager/PurchasingPage",
        data: {
            consumable_name: consumable_name,
            stock_status:stock_status,
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
                    if(append[i]==null)
                    {
                        layer.msg('暂无数据');
                        return;
                    }
                    var html2 ="";
                    if (append[i]["dict_name"] =='已入库') {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: #5cb85c">已入库</button>';
                    } else if (append[i]["dict_name"] =='部分入库') {
                        html2 += '<button type="button" class="btn btn-info" style="background-color: blue">部分入库</button>';
                    } else if (append[i]["dict_name"] =='未入库'  ) {
                        html2 += '<button type="button" datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'" class="btn btn-info" id="example" rel="popover"  data-placement="bottom" >已发货</button>';
                    }
                    else if(append[i]["dict_name"] =='返修在途')
                    {
                        html2 += '<input type="hidden" id="purchase_id" value="'+$.alle_null2Str(append[i]["purchase_id"])+'">'+'<span class="label label-danger">(返修)未入库</span>';
                    }
                    var amount=append[i]["amount"];
                    var html ="";
                    var html3 =""
                    if(append[i]["dict_name"] == "部分入库" || append[i]["dict_name"] == "未入库" ||append[i]["dict_name"] == "未发货")
                    {
                        html += "<input id='con_in_submit' disabled='disabled'   class='btn btn-link btn-xs' type='button' onclick='purchase_detial(" + append[i]["purchase_id"]+ ","+amount+"," + append[i]["consumable_id"]+ ")' value='入库'/>";
                    }
                    else if(append[i]["dict_name"] == "返修在途" )
                    {
                        html += "<input id='con_in_submit' disabled='disabled'   class='btn btn-link btn-xs' type='button' onclick='purchase_detial_repair(" + append[i]["purchase_id"]+ ","+amount+"," + append[i]["consumable_id"]+ ")' value='入库'/>";
                    }
                    if(append[i]["dict_name"]=="未鉴定" )
                    {
                        
                    }else {
                        value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                        <td>' + html2 + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                         <td class="operation">' + html + '</td>\
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
                        $("button[name='test']").popover("hide");
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

function purchase_detial(purchase_id,amount,consumable_id) {

         $.alle_dialog('/promanager/consumableInventory/add_consumable.html?purchase_id=' + purchase_id + '&amount=' +amount+ '&consumable_id=' +consumable_id,'耗材入库', ["50%", "90%"])
}
function purchase_detial_repair(purchase_id,amount,consumable_id) {

    $.alle_dialog('/promanager/consumableInventory/add_consumable.html?purchase_id=' + purchase_id + '&amount=' +amount+ '&consumable_id=' +consumable_id+'&flag=1','耗材入库', ["50%", "90%"])
}