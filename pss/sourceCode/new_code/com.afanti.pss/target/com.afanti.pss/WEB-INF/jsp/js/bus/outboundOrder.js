window.onload = function() {
    var purchase_id=$.alle_getUrlParam("purchase_id");//编号
    var pro_name=$.alle_getUrlParam("pro_name");//产品名称
    out_inventory_FeedBackPreview(purchase_id,pro_name);
};
function out_inventory_FeedBackPreview(purchase_id,pro_name){//采退：出库预览：
    //页面展示
    $.ajax({
        type:'POST',
        url:"/inventory/productOut/out_inventory_FeedBackPreview",//链接到模板打印
        data:{
            purchase_id:purchase_id
        },
        dataType:"json",
        success: function(data){
            var append=eval(data["append"]);//出库单详情
            var enterDate=$.alle_time2str_yymm_dd_hhmmss(append[0]["oper_time"]);//出库日期
            var left=enterDate.split(" ");//分割：取左边（年-月-日 时：分：秒）
            var data=left[0].split("-");//分割年月日
            var year=data[0];//年
            var month=data[1].replace(/^0/, '');//去除月份前面的0
            var day=data[2].replace(/^0/, '');//去日前面的0
            var appends=data["appends"];//经手人：当前用户
            var showDetial="";
            for(var i=0;i<append.length;i++)
            {
                showDetial+=
                    '<div class="page">'+
                    '<div class="head">'+
                        '<h1>出库单<span>(存根)</span></h1>'+
                    '</div>'+
                    '<div class="insurance_info clear">'+
                        '<div class="info_text Material Test">'+
                            '<table border="1" cellpadding="0" cellspacing="0">'+
                            '<tbody>'+
                                '<tr>'+
                                    '<td width="10%">科目</td>'+
                                    '<td width="10%"><input type="text" value=""/></td>'+
                                    '<td colspan="13">'+
                                    '<div  class="date left">'+
                                    '<span class="input"><input type="text" value="'+year+'"/></span>'+
                                    '<span class="time">年</span>'+
                                    '<span class="input"><input type="text" value="'+month+'"/></span>'+
                                    '<span class="time">月</span>'+
                                    '<span class="input"><input type="text" value="'+day+'"/></span>'+
                                    '<span class="time">日</span>'+
                                    '</div>'+
                                    '<div  class="dwei right">'+
                                    '<div class="over">'+
                                    '<span class="left font">对方科目</span>'+
                                    '<span class="left input">'+
                                    '<input type="text" value=""/>'+
                                    '</span>'+
                                    '</div>'+
                                    '</div>'+
                                    '</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td rowspan="2"  colspan="2">名<span style="margin-left: 20%;">称</td>'+
                                    '<td rowspan="2">单位</td>'+
                                    '<td rowspan="2">数量</td>'+
                                    '<td rowspan="2">单价</td>'+
                                    '<td colspan="9" width="20%">金<span style="margin-left: 40%;">额</td>'+
                                    '<td rowspan="2">用途或原因</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>百</td>'+
                                    '<td>十</td>'+
                                    '<td>万</td>'+
                                    '<td>千</td>'+
                                    '<td>百</td>'+
                                    '<td>十</td>'+
                                    '<td>元</td>'+
                                    '<td>角</td>'+
                                    '<td>分</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td colspan="2"><input type="text" value="'+pro_name+'"/></td>'+
                                    '<td><input type="text" value="'+append[i]["unit"]+'"/>	</td>'+
                                    '<td><input type="text" value="'+append[i]["amount"]+'"/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                    '<td><input type="text" value=""/>	</td>'+
                                '</tr>'+
                            '</tbody>'+
                            '</table>'+
                        '</div>'+
                        '<div class="info_text clear">'+
                            '<div class="foot">'+
                                '<ul>'+
                                        '<li>'+
                                        '<div class="t-left">'+
                                        '主管'+
                                        '</div>'+
                                        '<div class="t-right">'+
                                        '<input type="text" value=""/>'+
                                        '</div>'+
                                        '</li>'+
                                        '<li>'+
                                        '<div class="t-left">'+
                                        '会计'+
                                    '</div>'+
                                    '<div class="t-right">'+
                                        '<input type="text" value="李玲"/>'+
                                        '</div>'+
                                        '</li>'+
                                        '<li>'+
                                            '<div class="t-left">'+
                                                 '保管员'+
                                            '</div>'+
                                            '<div class="t-right">'+
                                                 '<input type="text" value=""/>'+
                                            '</div>'+
                                        '</li>'+
                                        '<li>'+
                                            '<div class="t-left">'+
                                            '经手人'+
                                            '</div>'+
                                            '<div class="t-right">'+
                                                '<input type="text" value=""/>'+
                                            '</div>'+
                                    '</li>'+
                                    '<li>'+
                                        '<div class="btn">'+
                                        /*'<input type="text" class="print"  style= "background-color:transparent"  value="打印"/>'+*/
                                        '</div>'+
                                    '</li>'+
                           '</ul>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                    '<DIV style="BORDER-TOP: #00686b 1px dashed; OVERFLOW: hidden; HEIGHT: 1px">'+'</DIV>';//虚线分割，可供裁
            }
            // alert(showDetial);
            $("body").append(showDetial);
            $(".print").click(function(){
                $.ajax({
                    type:'POST',
                    url:"/common/addOut",//转换pdf
                    dataType:"json",
                    success: function(data){
                    }
                })
            })
        }
    })
}


