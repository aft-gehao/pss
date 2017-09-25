window.onload = function() {
    var purchase_id=$.alle_getUrlParam("purchase_id");//编号
    var stock_status=$.alle_getUrlParam("stock_status");//状态
    var product_name_en=$.alle_getUrlParam("product_name_en");//名称
    purchasing_inventory_preview(purchase_id,stock_status,product_name_en);
};

//入库预览
function purchasing_inventory_preview(purchase_id,stock_status,product_name_en){//stock_status:入库状态
    //页面展示
    if(stock_status!=5002){//状态：未入库，不允许打印
        //当前状态允许打印
        var purchase_id=purchase_id;//采购单编号
        $.ajax({
            type:'POST',
            url:"/inventory/productIn/purchasing_inventory_Templatefind",//链接到模板打印
            data:{
                purchase_id:purchase_id
            },
            dataType:"json",
            success: function(data){
                var append=eval(data["append"]);//入库单详情
                // alert(appends);
                var appends=data["appends"];//经手人：当前用户
                // var enterDate=$.alle_time2str_yymm_dd_hhmmss(append[0]["enter_date"]);//入库日期
                // var left=enterDate.split(" ");//分割：取左边（年-月-日 时：分：秒）
                // var data=left[0].split("-");//分割年月日
                // var year=data[0];//年
                // var month=data[1].replace(/^0/, '')//去除月份前面的0
                // var day=data[2].replace(/^0/, '')//去日前面的0
                var showDetial="";
                for(var i=0;i<append.length;i++)
                {
                    showDetial+='<div id="father" class="father">'+
                                     '<div id="title"><h1>入库单</h1></div>'+
                                           /* '<div>单位'+'<span class="yy">'+year+'年'+month+'月'+day+'日'+'</span>'+*/
                                            '<div class="data"></div>'+
                                            '</div>'+
                                        '<div style=" padding-left: 220px;" >'+
                                        '<table border="1 solid" cellspacing="0" cellpadding="0" id="show">'+
                                            '<tr id="top">'+
                                                '<td>编号</td>'+
                                                '<td>成品名称</td>'+
                                                '<td>规格</td>'+
                                                '<td>单位</td>'+
                                                '<td>数量</td>'+
                                                '<td>单价</td>'+
                                                '<td>金额</td>'+
                                                '<td>过账</td>'+
                                                '<td>附&nbsp;&nbsp;注</td>'+
                                            '</tr>'+
                                            '<tr class="num">'+
                                                '<td class="batch_no">'+append[i]["batch_no"]+'</td>'+
                                                '<td class="product_name_en">'+product_name_en+'</td>'+
                                                '<td class="p_pack">'+append[i]["p_pack"]+'</td>'+
                                                '<td class="p_unit">'+append[i]["p_unit"]+'</td>'+
                                                '<td class="amount">'+append[i]["amount"]+'</td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '<td></td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td colspan="6" class="total">合计</td>'+
                                                '<td class="sum" name="sum">'+'</td>'+
                                                '<td>'+'</td>'+
                                                '<td>'+'</td>'+
                                                '</tr>'+
                                        '</table>'+
                                       '</divstyle=" padding-left: 220px;" >'+
                                                '<div>'+
                                                '<label class="first">记账</label>'+
                                                    '<label>保管</label>'+
                                                    '<label>验收</label>'+
                                                    '<label class="user">经手人'+'<span>'+appends+'</span>'+'</label>'+
                                                    '<label>制单</label>'+
                                                    /*'<lable><a class="print">打印</a></label>'+*/
                                                '</div>'+
                             '</div>'+
                    '<DIV style="BORDER-TOP: #00686b 1px dashed; OVERFLOW: hidden; HEIGHT: 1px">'+'</DIV>';//虚线分割，可供裁剪
                }
                $("body").after(showDetial);
                $(".money").on("blur",function(){//合计
                    var money=$(this).val();
                    var a=$(this).parents("tr").next();//选中合计整行数据
                    if(isNaN(money)){
                        alert("您输入的有误,请输入数字!");
                        return;
                    }else{
                        a.find("td[name='sum']").html(money);
                    }
                });
                $(".print").click(function(){
                    var a=$(this).parents("div").prev();
                    var batch_no=a.find("td[class='batch_no']").html();
                    var p_pack=a.find("td[class='p_pack']").html();
                    var p_unit=a.find("td[class='p_unit']").html();
                    var amount=a.find("td[class='amount']").html();
                    $.ajax({
                        type:'POST',
                        url:"/common/add",//转换pdf
                        data:{
                            batch_no:batch_no,
                            p_pack:p_pack,
                            p_unit:p_unit,
                            amount:amount,
                            product_name_en:product_name_en,
                            appends:appends
                        },
                        dataType:"json",
                        success: function(data){
                        }
                    })
                })
            }
        })
    }else{//当前状态不允许打印
        setTimeout(function () {
            layer.msg("您的产品还未入库，无法打印");
        }, 500);

       // window.history.go(-1);
    }
}


