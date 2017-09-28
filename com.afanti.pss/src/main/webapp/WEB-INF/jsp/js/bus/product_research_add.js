$(function () {

    $.alle_sysdate_date("research_time");
    $("#submit").click(function(){
        research_save();
    })
    $("#add_product").click(function(){
        $.alle_dialog('/promanager/researchAndUse/research_select_product.html','选择产品', ["85%", "85%"])
    })
    $("#cancel").click(function(){
        window.location.href="/promanager/researchAndUse/index.html";
    })
    ;
})


function research_save() {
    var research_time = $("#research_time").val();
    var research_name = $("#research_name").val();
    if (!research_name) {
        tip_msg("请输入申请单名称", "#research_name");
        return false;
    }
    var isFlag = true;
    //校验选择的产品
    $("tr[id^='tr_']").each(function () {
        var id = $(this).attr("id");
        var amount = parseFloat($("#" + id.replace("tr_", "amount_")).val());
        // alert(amount)
        var purity = parseFloat( $("#" + id.replace("tr_", "purity_")).val());
        var unit = $("#" + id.replace("tr_", "unit_")).val();
        // alert(amount);
        if (isNaN(amount)) {
            tip_msg("请填写入库量", "#" + id.replace("tr_", "amount_"));
            isFlag = false;
            return false;
        }
        if(amount<0){
            tip_msg("请填写入库量", "#" + id.replace("tr_", "amount_"));
            isFlag = false;
            return false;
        }
        if (!purity) {
            tip_msg("请填写纯度", "#" + id.replace("tr_", "purity_"));
            isFlag = false;
            return false;
        }
        if (unit==""||unit=='') {
            tip_msg("请选择单位", "#" + id.replace("tr_", "unit_"));
            isFlag = false;
            return false;
        }

    });
    if (isFlag) {
        $("tr[id^='tr_']").each(function () {
            var id = $(this).attr("id");
            var product_id = $("#" + id.replace("tr_", "product_id_")).val();
            var amount = $("#" + id.replace("tr_", "amount_")).val();
            var unit = $("#" + id.replace("tr_", "unit_")).val();
            var purity = $("#" + id.replace("tr_", "purity_")).val();
            var product_type = $("#" + id.replace("tr_", "product_type_")).val();
            var is_waibao = $("#" + id.replace("tr_", "waibao_")).val();
            var face=$("#" + id.replace("tr_", "face_")).val();
            var hours=$("#" + id.replace("tr_", "hours_")).val();
            var sale_batch_no=$("#" + id.replace("tr_", "batch_no_")).val();
            $.ajax({
                type: 'POST',
                url: "/research/manage/researchAdd",
                data: {
                    product_type:product_type,
                    research_time: research_time,
                    research_name: research_name,
                    hours: hours,
                    product_id: product_id,
                    amount: amount,
                    unit: unit,
                    is_waibao:is_waibao,
                    face:face,
                    purity:purity,
                    sale_batch_no:sale_batch_no
                },
                dataType: "json",
                success: function (data) {
                    layer.msg(data["message"]);
                    if (data["result"] == "success") {
                        var str="";
                        $("a[id^='putu_']").each(function () {
                            if($(this).attr("data")==product_id)
                            {
                                str+=$(this).attr("title")+",";
                            }
                        })
                        var research_id=data["append"];

                        $.ajax({
                            type: 'POST',
                            url: "/research/manage/putuAdd",
                            data: {
                                product_id:product_id,
                                str:str,
                                research_id:research_id
                            },
                            dataType: "json",
                            success: function (data) {

                            }
                        })

                        setTimeout(function () {
                            window.location.href = "/promanager/researchAndUse/research_index.html";
                        }, 1000);
                    }
                }
            });
        });
    }
}
/*
 $().ready(function () {
 //定时器
 var timeoutIdDpt, last_search;
 //清空缓存
 $("#product_name").flushCache();
 $("#product_name").keyup(
 function (event) {
 //处理文本框中的键盘事件
 var myEvent = event || window.event;
 var keyCode = myEvent.keyCode;
 $("#product_id").val(0);
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
 var url = "/common/load_auto?t=product";
 $("#product_name").autocomplete(url, {
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
 $("#product_id").val(row.value);
 });
 });
 */

function delTr(tr_id) {

    var tr_id = "tr_" + tr_id;
    $("#" + tr_id).remove();
    sumTotal();
}
function  test(product_id) {
    $("#putu").val(product_id);
    $("#imghead").hide();
    $("#gyFile").uploadify({
        'buttonImage':'/js/commons/fileinput/img/photo_icon1.png',//路径换成对应自己的路径
        'swf':'/js/uploadify/uploadify.swf',     //路径换成对应自己的路径
        'uploader':'/common/upload?path=upload.sd.gysnl',   //路径换成对应自己的路径
        'buttonText': '上传谱图',
        'multi': true,
        'height': 130,
        'width':130,
        fileSizeLimit:'5MB',//设置上传文件的容量最大值
        uploadLimit: 20,//上传文件的数量。
        'method'   :'post',
        'onFallback' : function() {//检测FLASH失败调用
            alert("您未安装flash控件");
        },
        onUploadComplete:function(file){
            layer.msg("上传成功");
            var $html = '';
            $html += '<a href="http://source.tanyangnet.com/'+file.name+'" id="putu_'+$("#putu").val()+'" data="'+$("#putu").val()+'" title="'+file.name+'" alt="'+file.name+'">';
            $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png"  >'
            $html += '</a>';
            $html += '<a onclick="remove_putu(this)" id="putu_'+$("#putu").val()+'" data="putu_'+$("#putu").val()+'" style="position: absolute;margin-top: 0;right: 20px;">x</a>';
            $("#putu"+$("#putu").val()+"").append($html);
        },
        /*onUploadSuccess:function(file,data,respone){
         successUpload(file,data,respone);
         },*/
        fileTypeExts: '*.jpg;*.png;*.gif;*.pdf;*.doc;*.docx;*.jpeg;*.txt',
        fileTypeDesc: '图片/PDF'
    });


    $("#gyFile-button").css({"height":"50px","width":"50px"});
    $("#gyFile").css({"height":"50px","width":"50px"});
    $("#SWFUpload_0").css({"margin-left":"-25px","height":"50px","width":"50px","background-repeat":"no-repeat","background-image":"url(/js/commons/fileinput/img/photo_icon1.png)"});

}
//单个文件上传成功后
function successUpload(file,reslut,respone){
    var product_id=$("#putu").val();
    var data  = JSON.parse(reslut);
    var commonUrl = data.commonUrl;//七牛公共空间
    if(data.code==1){
        var url = data.url;//相对路径
        var allUrl = commonUrl+url;//七牛全路径-用于d标签点击打开
        var showUrl=commonUrl+url;//全路径-用户页面回显：如果附件是图片格式则与allUrl相同；若附件
        var replaceStr = "\"";
        allUrl = allUrl.replace(new RegExp(replaceStr,'gm'),'');
        var url_id = allUrl.substring(allUrl.length-17,allUrl.length-4).replace(".","");//用图片id作为主键，用于删除
        var fileName = file.name
            .replace(new RegExp(replaceStr,'gm'),'').replace(new RegExp("#",'gm'),'');
        var urlName = url;
        var $html = '';
        $html += '<a id="putu_'+product_id+'" data="'+product_id+'" href="'+url+'" title="'+fileName+'" alt="'+fileName+'">';
        $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png"  >'
        $html += '</a>';
        $("#putu"+product_id+"").append($html);
    }
}
function remove_putu(e)
{
    $("a[id="+$(e).attr("data")+"]").remove();
    $("a[data="+$(e).attr("data")+"]").remove();
}