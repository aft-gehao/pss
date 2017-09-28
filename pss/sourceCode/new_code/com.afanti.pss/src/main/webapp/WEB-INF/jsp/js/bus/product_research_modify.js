$(function () {

    doSearch();

//使用uploadify插件上传抢单特有能力证据
    $('#gyFile').uploadify({
        'buttonImage':'/js/commons/fileinput/img/uploadify.png',//路径换成对应自己的路径
        'swf':'/js/uploadify/uploadify.swf',     //路径换成对应自己的路径
        'uploader':'/common/uploadputu?path=upload.sd.gysnl',   //路径换成对应自己的路径
        'buttonText': '上传谱图',
        'multi': true,
        'height': 130,
        'width':130,
        fileSizeLimit:'5MB',//设置上传文件的容量最大值
        uploadLimit: 20,//上传文件的数量。
        'method'   :'post',
        'onFallback' : function() {//检测FLASH失败调用
            alert("缺少flash！");
        },
        onUploadSuccess:function(file,data,respone){
            var data1 = eval("(" + data+ ")");

            var commonUrl = data1["commonUrl"]
            var fileName = data1["myFileName"];//七牛公共空间
            if(data1.code==1){
                var url = data1["url"];//相对路径
                var allUrl = commonUrl+url;//七牛全路径-用于d标签点击打开
                var $html = '';
                $html += '<a  name="putu" onclick="putu(this)" datas="'+url+'" data="'+allUrl+'" title="'+fileName+'" alt="'+fileName+'">';
                $html += '<img id="imghead" border="0" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png"  >'
                $html += '</a>';
                $("#putu").append($html);
            }
        },
        fileTypeExts: '*.jpg;*.png;*.gif;*.pdf;*.doc;*.docx;*.jpeg',
        fileTypeDesc: '图片/PDF'
    });
})
/*
 function use_save() {
 var use_time = $("#use_time").val();
 var use_name = $("#use_name").val();
 var use_unit = $("#use_unit").val();
 var batch_no = $("#batch_no").val();
 var product_name = $("#product_name").val();
 var amount = $("#amount").val();
 if (!use_name) {
 tip_msg("请输入申请单名称", "#use_name");
 return false;
 }
 if (!amount) {
 tip_msg("请输入申请量", "#amount");
 return false;
 } if (!product_name) {
 tip_msg("请输入申请物料名", "#product_name");
 return false;
 }
 var product_id = $("#product_id").val();
 $.ajax({
 type: 'POST',
 url: "/product_use/manage/use_save",
 data: {
 use_time: use_time,
 use_name: use_name,
 product_name: product_name,
 amount: amount,
 use_unit:use_unit,
 batch_no:batch_no
 },
 dataType: "json",
 success: function (data) {
 layer.msg(data["message"]);
 if (data["result"] == "success") {
 setTimeout(function () {
 window.location.href = "/promanager/purchasing/index.html";
 }, 1000);
 }
 }
 });

 }*/

function doSearch() {
    var research_id = $.alle_getUrlParam("use_id");

    $.ajax({
        type: 'POST',
        url: "/research/manage/researchSelect",
        data: {
            research_id: research_id
        },
        dataType: "json",
        success: function (data) {
            $("#use_name").val(data["append"]["research_name"]);
            $("#use_time").val($.alle_time2str_yymm_dd_hhmmss(data["append"]["research_time"]));
            $("#amount").val(data["append"]["amount"]);
            $("#cas").val(data["append"]["cas"]);
            $("#sku").val(data["append"]["sku"]);
            $("#unit").html(data["append"]["unit"]);
            $("#nameEn").val(data["append"]["name_en"]);
            $("#staff_name").val(data["append"]["staff_name"]);
        }
    })

}
function putu(e)
{
    window.open($(e).attr("data"));
}

$("#submit").click(function(){
    var research_name=$("#use_name").val();
    var amount=$("#amount").val();
    var research_id = $.alle_getUrlParam("use_id");
    var product_id = $.alle_getUrlParam("product_id");
    if(!amount)
    {
        tip_msg("请填写申请入库量", "#amount");
        return;
    }
    $.ajax({
        type: 'POST',
        url: "/research/manage/researchModify",
        data: {
            research_name: research_name,
            amount:amount,
            research_id:research_id
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                //获取谱图
                var str='';
                $("a[name='putu']").each(function(){
                    if($(this).attr("datas")!=''){
                        str=str+$(this).attr("datas")+',';
                    }
                    else
                    {
                        layer.msg("操作成功");
                        setTimeout(function () {
                            //详情页面刷新
                            window.parent.location.reload();
                        }, 1000);
                        return false;
                    }
                });
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
                        layer.msg("操作成功");
                        setTimeout(function () {
                            //详情页面刷新
                            window.parent.location.reload();
                        }, 1000);
                    }
                })
            }
        }
    })
})
$("#cancle").click(function(){
    $.alle_dialog_close();
})

