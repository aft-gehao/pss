window.onload = function() {
    var purchase_id=$.alle_getUrlParam("purchase_id");//编号
    var stock_status=$.alle_getUrlParam("stock_status");//状态
    var product_name_en=$.alle_getUrlParam("product_name_en");//名称
    purchasing_inventory_preview(purchase_id,stock_status,product_name_en);
    $("#Shaped").click(function(){
        $("#main").show();
    })
    $("#Pie").click(function(){
        $("#main").hide();
    })
};
function purchasing_inventory_preview(purchase_id,stock_status,product_name_en){//stock_status:入库状态
    alert(product_name_en);
       //alert(purchase_id);
    //alert(product_name_en);
        var purchase_id=purchase_id;//采购单编号
        $.ajax({
            type: 'POST',
            url: "/inventory/productIn/purchasing_inventory_Templatefind",//链接到预览
            data: {
                purchase_id: purchase_id
            },
            dataType: "json",
            success: function (data) {
                var append=eval(data["append"]);//入库单详情
                var appends=data["appends"];//经手人：当前用户
                var enterDate=$.alle_time2str_yymm_dd_hhmmss(append[0]["enter_date"]);//入库日期
                var showDetial="";
                for(var i=0;i<append.length;i++)
                {
                    showDetial+='<tr>'+
                    '<td><input type="text" value="'+enterDate+'"/>	</td>'+
                    '<td><input type="text" value="'+product_name_en+'"/>	</td>'+
                    '<td><input type="text" value="'+append[i]["p_pack"]+'"/>	</td>'+
                    '<td><input type="text" value="'+append[i]["p_unit"]+'"/>	</td>'+
                    '<td><input type="text" value="1"/>	</td>'+
                    '<td><input type="text" value="2"/>	</td>'+
                    '<td><input type="text" value=""/>	</td>'+
                    '</tr>'+
                        '<script type="text/javascript">'+
                    // 基于准备好的dom，初始化echarts实例
                    'var myChart = echarts.init(document.getElementById("main"));'+
                    'option = {'+
                        'tooltip : {'+
                            'trigger: "axis",'+
                            'axisPointer : {'+            // 坐标轴指示器，坐标轴触发有效
                                'type : "shadow"'+        // 默认为直线，可选为：'line' | 'shadow'
                            '}'+
                        '},'+
                        'legend: {'+
                            'data:[""+1+"","产品2"]'+
                        '},'+
                        'grid: {'+
                            'left: "3%",'+
                            'right: "4%",'+
                            'bottom: "3%",'+
                            'containLabel: true'+
                        '},'+
                        'xAxis : ['+
                            '{'+
                                'type : "category",'+
                                'data : ["周一","周二","周三","周四","周五","周六","周日"]'+
                            '}'+
                        '],'+
                        'yAxis : ['+
                            '{'+
                                'type : "value"'+
                            '}'+
                        '],'+
                        'series : ['+
                            '{'+
                                'name:""+1+"",'+
                                'type:"bar",'+
                                'data:[320, 332, 301, 334, 390, 330, 320]'+
                            '},'+
                            '{'+
                                'name:"产品2",'+
                                'type:"bar",'+
                                'data:[120, 132, 101, 134, 90, 230, 210]'+
                            '}'+
                        ']'+
                    '};'+
                    // 使用刚指定的配置项和数据显示图表。
                    'myChart.setOption(option);'+
                '</script>';
                }
                $("tbody").append(showDetial);
            }
        })
}


