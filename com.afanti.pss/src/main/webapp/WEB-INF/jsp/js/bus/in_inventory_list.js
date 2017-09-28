$(function () {
   /* load_product_type();*/
    $("#a_yuanliao").attr("class", "active");
    $("#search").attr("placeholder","CAS,,SKU,中文名,申请人员")
    doSearch(1);
    $("#inv_in_query").click(function () {
        doSearch(1);
    })

    $("#titleStr").html("供应商/客户")
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
    $("#haocai").hide()
    $("#pages_haocai").hide()
    $("#yuanliao").show()
    $("#pages").show()
    if (str==""){
        $("#type_custom_time").html("所有")
    }else {
        $("#type_custom_time").html(str)
    }
    var search = $("#search").val();
    var stock_status = $("#status_id").val();
    if (stock_status==""){
        $("#type_status").html("全部")
    }
    var in_type=$("#type_id").val();
    var time=$("#time").val();
    if (time==""){
        $("#type_time").html("全部")
    }
    if(in_type == 9002)
    {
        $("#titleStr").html("客户/供应商")
    }else{
        $("#titleStr").html("供应商/客户")
    }
    var page=$("#page_id").val()
    if (page==1){
        $("#yuanliao").hide()
        $("#pages").hide()
        $("#haocai").show()
        $("#pages_haocai").show()
        if (stock_status==""){
            stock_status=""
        }else {
            stock_status=stock_status.substring(0, stock_status.length - 1)
        }
        $.ajax({
            type: 'POST',
            url: "/consumable/manager/PurchasingPage",
            data: {
                stock_status:stock_status,
                p: p,
                search:search,
                time:time,
                start_time:start_time,
                end_time:end_time
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
                            html2 += '<button type="button" class="btn btn-success btn-sm" style="background-color:white;color:black">已入库</button>';
                        } else if (append[i]["dict_name"] =='部分入库') {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black">部分入库</button>';
                        } else if (append[i]["dict_name"] =='未入库'  ) {
                            html2 += '<button type="button" datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'" class="btn btn-info btn-sm" style="background-color:white;color:black">已发货</button>';
                        }
                        else if(append[i]["dict_name"] =='返修在途')
                        {
                            html2 += '<input type="hidden" id="purchase_id" value="'+$.alle_null2Str(append[i]["purchase_id"])+'">'+'<span class="label label-danger" style="background-color:white;color:black;border-color: red;">(返修)未入库</span>';
                        }
                        var amount=append[i]["amount"];
                        var html ="";
                        var html3 =""
                        if(append[i]["dict_name"] == "部分入库" || append[i]["dict_name"] == "未入库" ||append[i]["dict_name"] == "未发货")
                        {
                            html += "<a id='con_in_submit' class='btn btn-info' type='button' onclick='purchase_detial_haocai(" + append[i]["purchase_id"]+ ","+amount+"," + append[i]["consumable_id"]+ ")'>入库</a>";
                        }
                        else if(append[i]["dict_name"] == "返修在途" )
                        {
                            html += "<a id='con_in_submit' class='btn btn-info' type='button' onclick='purchase_detial_repair_haocai(" + append[i]["purchase_id"]+ ","+amount+"," + append[i]["consumable_id"]+ ")'>入库</a>";
                        }
                            value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["consumable_name"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["pack"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["consumable_unit"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + html2 + '</td>\
                         <td class="operation">' + html + '</td>\
                        </tr>\
                    \
                    ';
                    }
                    $("#data_tbody_haocai").html(value);
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
                    PAGE_INIT("#pages_haocai", data["append"].pageNo, data["append"].totalPage)
                } else {
                    layer.msg(data["message"]);
                }
            }
        })
    }
    else {
        $.ajax({
            type: 'POST',
            url: "/inventory/productIn/inventory_productIn_list",
            data: {
                stock_status: stock_status,
                in_type:in_type,
                p: p,
                start_time: start_time,
                end_time: end_time,
                time:time,
                search:search
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
                        var html2 ="";
                        var html4="";
                        if(append[i]["in_type"]=="7003" && append[i]["stock_status"] != 5001)
                        {
                            html4 +="<a id='inv_cancle_submit' class='btn btn-success' type='button' onclick='cancle_submit(" + append[i]["purchase_id"]+ ")'>取消</a>";
                        }
                        if (append[i]["stock_status_name"] =='已入库') {
                            html2 += '<button type="button" class="btn btn-success btn-sm" style="background-color:white;color:black">已入库</button>';
                        } else if (append[i]["stock_status_name"] =='部分入库') {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black">部分入库</button>';
                        } else if (append[i]["stock_status_name"] =='未入库') {
                            html2 += '<button type="button" datas="'+append[i]["kd_code"]+'" data="'+append[i]["kd_num"]+'" class="btn btn-info btn-sm" style="background-color:white;color:black;border-color: red">未入库</button>';
                        }
                        else if (append[i]["stock_status"] == 5004) {
                            html2 += '<button type="button" class="btn btn-info btn-sm" style="background-color:white;color:black;border-color: red">未发货</button>';
                        }
                        var html ="";
                        var html3 =""
                        html3 += append[i]["purchase_name"] + "【<strong><font color='red'>采购</font></strong>】"
                        if(append[i]["stock_status"] != 5001)
                        {
                            html += "<a id='inv_in_submit' class='btn btn-success' type='button' onclick='purchase_detial(" + append[i]["purchase_id"]+ ","+append[i]["stock_status"]+","+append[i]["in_type"]+")'>入库</a>";

                        }else if(append[i]["in_type"] == 7003){
                            html += "<a id='inv_detail' class='btn btn-success' type='button' onclick='research_detial(" + append[i]["purchase_id"]+ ","+append[i]["stock_status"]+","+append[i]["in_type"]+")'>详情</a>";
                        }
                        else{
                            html += "<a id='inv_detail' class='btn btn-success' type='button' onclick='purchase_detial(" + append[i]["purchase_id"]+ ","+append[i]["stock_status"]+","+append[i]["in_type"]+")'>详情</a>";
                        }
                        if(append[i]["stock_status"] != 5001 ||append[i]["stock_status"] != 5002 || append[i]["stock_status"] != 5003){
                            value += '\
                    <tr >\
                        <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["unit"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + html2 + '</td>\
                         <td class="operation">' + html + ''+html4+'</td>\
                        </tr>\
                    \
                    ';
                        }
                        else {
                            value += '\
                    <tr >\
                      <td>' + $.alle_null2Str(append[i]["cas"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["sku"]) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["name_ch"]) + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["unit"] + '</td>\
                        <td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["purchase_time"]) + '</td>\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + html2 + '</td>\
                        </tr>\
                    \
                    ';
                        }
                    }
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
                    $("#data_tbody").html(value);
                    //调用设置分页
                    PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
                } else {
                    layer.msg(data["message"]);
                }
            }
        });
    }

}

function purchase_detial(purchase_id,stock_status,in_type) {
    if(in_type==9001)//采购退货
    {
        window.location.href = "/promanager/inventory/add-detail.html?stock_status="+stock_status+"&purchase_id="+purchase_id;
    }
    if(in_type==9002)//销售出库
    {

        window.location.href = "/promanager/inventory/inventory_vendition_in_info.html?stock_status="+stock_status+"&sale_id="+purchase_id;
    }
    if(in_type==7003)//自研发
    {
        // alert(1);
        window.location.href = "/promanager/inventory/inventory_research_in_info.html?research_id="+purchase_id;
    }
}
function research_detial(purchase_id,stock_status,in_type) {

    if(in_type==7003)
    {
         // alert(2);
        window.location.href = "/promanager/inventory/inventory_research_in_detail.html?research_id="+purchase_id;
    }
}
function cancle_submit(id){
      var id=id;
    $.ajax({
        type: 'POST',
        url: "/research/manage/researchDel",
        data: {
            research_id: id
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

//原料采购
function raw_material_purchase(e) {
    $("#type_id").val("9001")
    $("#page_id").val("")
    $("#test16").val("")
    $("#search").val("")
    $(e).attr("class", "active");
    $("#a_haocai").attr("class", "");
    $("#a_xiaoshou").attr("class", "");
    $("#a_yanfa").attr("class", "");
    $("#type_source").html($(e).html())
    $("#search").attr("placeholder","CAS,,SKU,中文名,申请人员")
    doSearch(1)
}
//耗材采购
function consumable_purchasing(e) {
    $("#page_id").val("1")
    $("#test16").val("")
    $("#search").val("")
    $(e).attr("class", "active");
    $("#a_yuanliao").attr("class", "");
    $("#a_xiaoshou").attr("class", "");
    $("#a_yanfa").attr("class", "");
    $("#type_source").html($(e).html())
    $("#search").attr("placeholder","耗材名,申请人员")
    doSearch(1)
}

//产品销售退货
function sales_returns(e) {
    $("#page_id").val("")
    $("#type_id").val("9002")
    $("#test16").val("")
    $("#search").val("")
    $(e).attr("class", "active");
    $("#a_haocai").attr("class", "");
    $("#a_yuanliao").attr("class", "");
    $("#a_yanfa").attr("class", "");
    $("#type_source").html($(e).html())
    $("#search").attr("placeholder","CAS,SKU,中文名,申请人员")
    doSearch(1)
}

//自研发
function yanfa(e) {
    $("#page_id").val("")
    $("#type_id").val("7003")
    $("#test16").val("")
    $("#search").val("")
    $(e).attr("class", "active");
    $("#a_haocai").attr("class", "");
    $("#a_xiaoshou").attr("class", "");
    $("#a_yuanliao").attr("class", "");
    $("#type_source").html($(e).html())
    $("#search").attr("placeholder","CAS,SKU,中文名,申请人员")
    doSearch(1)
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
    var html_time=""
    $("a[class='info active']").each(function(){
        info +=$(this).attr("data")+",";
        html +=$(this).html()+"/"
    })
    $("#type_status").html(html.substring(0,html.length-1))
    $("#status_id").val(info);
    $("a[class='time active']").each(function(){
        time +=$(this).attr("data");
        html_time=$(this).html()
    })
    $("#type_time").html(html_time)
    $("#time").val(time);
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
    doSearch(1)
}


//搜索框查询
function do_query() {
    doSearch(1)
}

function purchase_detial_haocai(purchase_id,amount,consumable_id) {

    $.alle_dialog('/promanager/consumableInventory/add_consumable.html?purchase_id=' + purchase_id + '&amount=' +amount+ '&consumable_id=' +consumable_id,'耗材入库', ["50%", "90%"])
}
function purchase_detial_repair_haocai(purchase_id,amount,consumable_id) {

    $.alle_dialog('/promanager/consumableInventory/add_consumable.html?purchase_id=' + purchase_id + '&amount=' +amount+ '&consumable_id=' +consumable_id+'&flag=1','耗材入库', ["50%", "90%"])
}