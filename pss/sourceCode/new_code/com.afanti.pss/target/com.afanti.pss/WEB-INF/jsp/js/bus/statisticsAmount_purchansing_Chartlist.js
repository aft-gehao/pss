/**
 * Created by Administrator on 2017/7/7 0007.
 */
var cas ='';
var month = '';
var states ='';
//采购量排序

/*采购报表*/
window.onload = function() {
    cas = $.alle_getUrlParam("cas");
    month = $.alle_getUrlParam("month");
    states = $.alle_getUrlParam("states");
    purchasing_Chart_ShowAmountAll(1,cas,month);
    doSearch(1);

}
function purchasing_Chart_ShowAmountAll(p,cas,month){
    $.ajax({
        type: 'POST',
        url: "/Statistics/purchasing_Chart_MonthShowAll",
        data: {
            p: p,
            cas:cas,
            month:month
        },
        dataType: "json",
        success: function (data) {
            var append =  eval(data["append"][0]);//月度采购量展示数据
            var showDetial="";
            showDetial+='<tr class="assessDetail">'+
                '<td>'+append["cas"]+'</td>';
            for(var j=0;j<append["monthlyAmountData"].length;j++){
                var amount=parseInt(append["monthlyAmountData"][j]);
                showDetial+='<td>'+amount.toFixed(3)+'</td>';//采购量
            }
            showDetial+='</tr>';
            $("table tr").eq(0).nextAll().remove();//除标题之外的所有tr清空
            $("table").append(showDetial);
        },
        error:function() {
            alert("数据加载失败！请检查数据链接是否正确");
        }
    });
}
function doSearch(p) {
    //alert(clickNumber1);

    var number=0;
    if(clickNumber1 %2==0){
        number=1;
    }else{
        number=2;
    }
        $.ajax({
            type: 'POST',
            url: "/Statistics/purchasing_Chart_Show",
            data: {
                p: p,
                cas:cas,
                number:number,
                month:month
            },
            dataType: "json",
            success: function (data) {

                purchasingShow(data);//模板
            },
            error:function() {
                alert("数据加载失败！请检查数据链接是否正确");
            }

        });


}
//采购年度总量、总价柱状图
function purchasingShow(data){
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
    it.data =data["values"];
    legends.push(ll);//将item放在legends中
    xAxis.push(xx);//将xx放在xAxis中
    Series.push(it);//将item放在series中
    option.title.text="采购报表";
    option.legend = legends;// 设置图例
    option.xAxis=xAxis;//设计x轴
    option.series = Series; // 设置图表
    myChart.setOption(option);// 重新加载图表
    //调用设置分页
    PAGE_INIT("#pages", data["page"].pageNo, data["page"].totalPage);
}


//采购年度总量、总价柱状图
function purchasingShow2(data){
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
    it.data =data["values"];
    legends.push(ll);//将item放在legends中
    xAxis.push(xx);//将xx放在xAxis中
    Series.push(it);//将item放在series中
    option.title.text="采购报表";
    option.title.subtext="";
    option.legend = legends;// 设置图例
    option.xAxis=xAxis;//设计x轴
    option.series = Series; // 设置图表
    myChart.setOption(option);// 重新加载图表
    //调用设置分页
    PAGE_INIT("#pages", data["page"].pageNo, data["page"].totalPage);
}

var clickNumber1 =0;
function do1(){
    if(clickNumber1 %2==0){
        //第一次点击触发
        $("#sort").val("↑");
        doSearch(1);
    }else{
        //第二次点击触发
        $("#sort").val("↓");
        doSearch(1);
    }
    clickNumber1 ++;
}








