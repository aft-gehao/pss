/*销售报表*/
window.onload = function() {
    $.alle_section_date("start_time", "end_time");
    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();
    var cas=$("#cas").val();
    //alert(cas);
    $("#amount").click(function(){//销售量点击
        $("#money").attr("style","background: transparent;background-color: buttonface");
        $("#money").removeAttr("checked");
        $(this).attr("style","background: transparent;border: 0;");
        $(this).attr("checked","checked");
        doSearch(1);
    })
    $("#money").click(function(){//销售金额点击
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
     *          1：销售金额点击第一次状态，
     *          2：销售金额点击第二次状态,
     *          3:销售量点击第一次状态，
     *          4：销售量点击第二次状态
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
        url: "/Statistics/sale/showEnterDetailYear",
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
 * 展示全年销售列表
 * @param p
 */
var states=0;//按钮状态
function doSearch(p){
    //alert($("#amount").parents().html());//获取销售量和销售金额谁别选中
    var $father=$("#amount").parents();
    var checkedCondition=$father.find("input[checked='checked']").val();
    var cas=$("#cas").val();
    var year=$("#year option:selected").val();

    $.ajax({
        type: 'POST',
        url: "/Statistics/sale/sale_Chart_ShowAll",
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
                    if(checkedCondition=="销售量"){
                        states=1;
                        showDetial+='<td class='+j+'  onclick="show(this,states)">'+sum[j]["amount"]+'</td>';//销售量
                    }else if(checkedCondition=="销售金额"){
                        states=2;
                        showDetial+='<td class='+j+'  onclick="show(this,states)">'+sum[j]["unit_price"]+'</td>';//销售金额
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
        if(states==1){//销售量
            $.alle_dialog_custom("/promanager/statistics/saleAmount_Statistics_Chart.html?cas="+cas+"&month="+month+"&states="+states+"",'', ["100%", "100%"]);
        }else if(states){//销售金额
            $.alle_dialog_custom("/promanager/statistics/salePrice_Statistics_Chart.html?cas="+cas+"&month="+month+"&states="+states+"",'', ["100%", "100%"]);
        }

    }else {
        layer.msg('暂无数据');
    }
}