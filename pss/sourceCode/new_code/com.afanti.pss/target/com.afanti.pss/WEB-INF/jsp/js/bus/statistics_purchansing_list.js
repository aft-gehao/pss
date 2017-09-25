/*采购报表*/
window.onload = function() {

    $.alle_section_date("start_time", "end_time");
    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();
    var cas=$("#cas").val();
    //alert(cas);
    $("#amount").click(function(){//采购量点击
        $("#money").attr("style","background: transparent;background-color: buttonface");
        $("#money").removeAttr("checked");
        $(this).attr("style","background: transparent;border: 0;");
        $(this).attr("checked","checked");
        doSearch(1);
    })
    $("#money").click(function(){//采购金额点击
        $("#amount").attr("style","background: transparent;background-color: buttonface");
        $("#amount").removeAttr("checked");
        $(this).attr("style","background: transparent;border: 0;");
        $(this).attr("checked","checked");
        doSearch(1);
    })
    showEnterDetailYear();
    doSearch(1);


    /**
     * //      p: 分页当前页
     * //number:0：刚进入状态，
     *          1：采购金额点击第一次状态，
     *          2：采购金额点击第二次状态,
     *          3:采购量点击第一次状态，
     *          4：采购量点击第二次状态
     * @type {number}
     */
    // var number=0;
    // doSearch(1,number);
}

$("#pur_query").click(function(){
    doSearch(1);//查询按钮
})

function showEnterDetailYear(){
    $.ajax({
        type: 'POST',
        url: "/Statistics/showEnterDetailYear",
        dataType: "json",
        success: function (data) {
            var append = eval(data["append"]);
            $("#year").html("");
            var html = "<option value='0'>请选择</option>";
            for (var i = 0; i < append.length; i++) {
                html += "<option value='"+append[i]+"'>" + append[i] + "</option>"
            }
            $("#year").html(html);
        }
    });
}
/**
 * 展示全年采购列表
 * @param p
 */
var states=0;//按钮状态
function doSearch(p){
    //alert($("#amount").parents().html());//获取采购量和采购金额谁别选中
    var $father=$("#amount").parents();
    var checkedCondition=$father.find("input[checked='checked']").val();
    var cas=$("#cas").val();
    var year=$("#year option:selected").val();

    $.ajax({
        type: 'POST',
        url: "/Statistics/purchasing_Chart_ShowAll",
        data: {
            p: p,
            cas:cas,
            year:year
        },
        dataType: "json",
        success: function (data) {
            var append = eval(data["append"]["results"]);
            var showDetial="";

            for(var i=0;i<append.length;i++)
            {
                showDetial+='<tr class="assessDetail">'+
                            '<td>'+append[i]["cas"]+'</td>';
                            var sum=append[i]["sum"];

                            for(var j=0;j<sum.length;j++){
                                if(checkedCondition=="采购量"){
                                    states=1;
                                    showDetial+='<td class='+j+'  onclick="show(this,states)">'+sum[j]["amount"]+'</td>';//采购量
                                }else if(checkedCondition=="采购金额"){
                                    states=2;
                                    showDetial+='<td class='+j+'  onclick="show(this,states)">'+sum[j]["unit_price"]+'</td>';//采购金额
                                }
                            }
                showDetial+='</tr>';
            }
            $("table tr").eq(0).nextAll().remove();//除标题之外的所有tr清空
            $("table").append(showDetial);
            PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage);
        },
        error:function() {
            alert("数据加载失败！请检查数据链接是否正确");
        }
    });
}
function show(o,states){
    var tdnum=$(o).html();//a标签
    var cas =$(o).parents("tr").find("td:first").html();
    var month=parseInt($(o).prop("class"))+1;//下标从0开始的
    if(tdnum!=0){
        if(states==1){//采购量
            $.alle_dialog_custom("/promanager/statistics/purchasingAmount_Statistics_Chart.html?cas="+cas+"&month="+month+"&states="+states+"",'', ["100%", "100%"]);
        }else if(states){//采购金额
            $.alle_dialog_custom("/promanager/statistics/purchasingPrice_Statistics_Chart.html?cas="+cas+"&month="+month+"&states="+states+"",'', ["100%", "100%"]);
        }

    }else {
            layer.msg('暂无数据');
    }
}







/*function doSearch(p,number) {
    //alert(number);
    $.ajax({
        type: 'POST',
        url: "/Statistics/purchasing_Chart_Show",
        data: {
             p: p,
            number:number
         },
        dataType: "json",
        success: function (data) {
            purchasingShow(data);//模板
        },
        error:function() {
            alert("数据加载失败！请检查数据链接是否正确");

        }
        //
    });
}*/
//采购年度总量、总价柱状图
/*function purchasingShow(data){
    var len=data["i"];
    //data["legend"]   图表
    //data["categories"] 产品-->x轴
    //data["values"] z值
    var Item = function(){
        return {
            name:'',
            type:'bar',
            barWidth:30,
            label: {//头坐标系值
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data:[]
        }
    };// series中的每一项为一个item,所有的属性均可以在此处定义
    var x = function(){
        return {
            type : 'category',
            axisLabel : { //轴移属性，可设置
                show:true,
                interval: 0,//,    // {number}
                rotate: 45,
                margin: 8
            },
            data : []
        }
    };//x轴对应的产品
    var le = function(){
        return {
            data:[]
        }
    }
    var legends = [];// 准备存放图例数据
    var Series = []; // 准备存放图表数据
    var xAxis=[];
    //legends.push(data["legend"]);// 将每一项的图例也放到图例的数组中-->legends
    var ll=new le();        //填充图表
    ll.data=data["legend"];

    var xx=new x();                 //填充x轴
    xx.data=data["categories"];

    var it = new Item();
    it.name =data["legend"][0];// 先将每一项填充数据
    it.data =data["money"];
   // alert(data["unit"][0]+"0"+data["unit"][1]);
    var it2 = new Item();
    it2.name=data["legend"][1];
    it2.data =  data["values"];

    legends.push(ll);//将item放在legends中
    xAxis.push(xx);//将xx放在xAxis中
    Series.push(it);//将item放在series中
    Series.push(it2);//将item放在series中
    option.title.text="采购报表";
    option.legend = legends;// 设置图例
    option.xAxis=xAxis;//设计x轴
    option.series = Series; // 设置图表
    // var showDetial="";//在html中加载时刷新
    // showDetial=' <div class="" style="text-align: center">'+
    //     '<div><input type="button" style="background-color: red" onclick="do1(this)" value="采购金额排序"/>' +
    //     '<input type="button" value="向上"/></div>';
    // $("#main").prepend(showDetial);
    myChart.setOption(option);// 重新加载图表
    //调用设置分页
    PAGE_INIT("#pages", data["page"].pageNo, data["page"].totalPage);

}*/

/*//采购金额排序
 var clickNumber =0;
 function do1(){
 if(clickNumber %2==0){
 //第一次点击触发
 $("#add").val("↑");
 doSearch(1,1);
 }else{
 //第二次点击触发
 $("#add").val("↓");
 doSearch(1,2);
 // purchasing_query_criteria();
 }
 clickNumber ++;
 }
 //采购量排序
 var clickNumber2 =0;
 function do2(){
 if(clickNumber2 %2==0){
 //第一次点击触发
 $("#sort").val("↑");
 doSearch(1,3);
 }else{
 //第二次点击触发
 $("#sort").val("↓");
 doSearch(1,4);
 // purchasing_query_criteria();
 }
 clickNumber2 ++;
 }
 //附属表采购金额排序
 var clickNumber3 =0;
 function do3(){
 if(clickNumber3 %2==0){
 //第一次点击触发
 $("#add2").val("↑");
 casChooseClick(1,1);
 }else{
 //第二次点击触发
 $("#add2").val("↓");
 casChooseClick(1,2);
 // purchasing_query_criteria();
 }
 clickNumber3 ++;
 }
 //附属表采购量排序
 var clickNumber4 =0;
 function do4(){
 if(clickNumber4 %2==0){
 //第一次点击触发
 $("#sort2").val("↑");
 casChooseClick(1,3);
 }else{
 //第二次点击触发
 $("#sort2").val("↓");
 casChooseClick(1,4);
 // purchasing_query_criteria();
 }
 clickNumber4 ++;
 }*/

/*$().ready(function () {
    //定时器
    var timeoutIdDpt, last_search;
    //清空缓存
    $("#supplier_name").flushCache();
    $("#supplier_name").keyup(
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
                    var url = "/common/load_auto?t=statistics";
                    $("#supplier_name").autocomplete(url, {
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
       // alert(row.text);//cas 存在相同 疑惑
        //alert(row.data);//pro_id
        $("#supplier_id").val(row.text);
        //加载供应商对应联系人
        //load_gys_lxr(row.value);
    });
});*/

/*var p=1;
function casChooseClick(p,number){
    var supplier_id=$("#supplier_id").val();
    $.ajax({
        type: 'POST',
        url: "/Statistics/purchasing_subsidiary_Show",
        data: {
            p: p,
            number:number,
            supplier_id:supplier_id
        },
        dataType: "json",
        success: function (data) {
            purchasing_subsidiary_Show(data);//模板
        },
        error:function() {
            alert("数据加载失败！请检查数据链接是否正确");

        }
        //
    });
}*/


/*采购附属柱状图*/
/*function purchasing_subsidiary_Show(data){
    var len=data["i"];
    //data["legend"]   图表
    //data["categories"] 产品-->x轴
    //data["values"] z值
    var Item = function(){
        return {
            name:'',
            type:'bar',
            barWidth:30,
            label: {//头坐标系值
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            data:[]
        }
    };// series中的每一项为一个item,所有的属性均可以在此处定义
    var x = function(){
        return {
            type : 'category',
            data : []
        }
    };//x轴对应的产品
    var le = function(){
        return {
            data:[]
        }
    }
    var legends = [];// 准备存放图例数据
    var Series = []; // 准备存放图表数据
    var xAxis=[];
    //legends.push(data["legend"]);// 将每一项的图例也放到图例的数组中-->legends
    var ll=new le();        //填充图表
    ll.data=data["legend"];

    var xx=new x();                 //填充x轴
    xx.data=data["categories"];

    var it = new Item();
    it.name =data["legend"][0];// 先将每一项填充数据
    it.data =data["money"];

    var it2 = new Item();
    it2.name =data["legend"][1];// 先将每一项填充数据
    it2.data =  data["values"];
    legends.push(ll);//将item放在legends中
    xAxis.push(xx);//将xx放在xAxis中
    Series.push(it);//将item放在series中
    Series.push(it2);//将item放在series中
    option.title.text="采购销售报表";
    option.title.subtext='单位g/ml';
    option.legend = legends;// 设置图例
    option.xAxis=xAxis;//设计x轴
    option.series = Series; // 设置图表

    // var showDetial="";//在html中加载时刷新
    // showDetial=' <div class="" style="text-align: center">'+
    //     '<div><input type="button" style="background-color: red" onclick="do1(this)" value="采购金额排序"/>' +
    //     '<input type="button" value="向上"/></div>';
    // $("#main").prepend(showDetial);

    myChart2.setOption(option);// 重新加载图表
    //调用设置分页
    PAGE_INIT2("#pages2", data["page"].pageNo, data["page"].totalPage);
}*/


