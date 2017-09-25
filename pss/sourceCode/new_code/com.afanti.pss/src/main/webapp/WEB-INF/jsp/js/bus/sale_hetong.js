$(function () {
    var amount=$.alle_getUrlParam("amount");
    var sale_d_id=$.alle_getUrlParam("sale_d_id");
    $("#sale_d_id").val(sale_d_id);
    var price=$.alle_getUrlParam("price");
    var unit=$.alle_getUrlParam("unit");
    var cas=$.alle_getUrlParam("cas");
    var flag=$.alle_getUrlParam("flag");
    var name_en=decodeURI($.alle_getUrlParam("name_en","UTF-8"));
    var sale_way=$.alle_getUrlParam("sale_way");
    var customer=decodeURI($.alle_getUrlParam("customer"));
    $("#customer").val(decodeURI($.alle_getUrlParam("customer"),"UTF-8"));
    var d = new Date();
    var str = d.getFullYear()+"年"+(d.getMonth()+1)+"月"+d.getDate()+"日";
    $("#time").html(str);
    $("#name_en").html(name_en);
    $("#cas").html(cas)
    $("#amount").val(amount);
    $("#unit").val(unit);
    $("#price").val(price);
    $("#price_2").html(price);
    $("#price_daxie").html(changeMoneyToChinese($("#price").val()));
    dosearch(sale_way);
})
$("#price").blur(function(){
    $("#price_daxie").html(changeMoneyToChinese($("#price").val()));
    $("#price_2").html($("#price").val());
})
function dosearch(sale_way){
$.ajax({
    type: 'POST',
    url: "/vendition/manager/select_hetong_no",
    data: {

    },
    dataType: "json",
    success: function (data) {
              $("#hetong_no").html("KNKS"+sale_way+data["append"]);
    }}

)}
$("#hetong_sure").click(function(){
      $("#hetong_sure").css("display","none");
        var flag=$.alle_getUrlParam("flag");
        var company=$("#company").val();
        var shuihao=$("#shuihao").val();
        var bank=$("#bank").val();
        var bank_number=$("#bank_number").val();
        var company_people=$("#company_people").val();
        var telephone=$("#telephone").val();
        var hetong_no=$("#hetong_no").html();
        var customer= $("#customer").val();
        var time=$("#time").html();
        var cas=$("#cas").html();
        var name_en=$("#name_en").html();
        var amount=$("#amount").val();
        var unit=$("#unit").val();
        var price=$("#price").val();
        var desc=$("#desc").val();
        var price_daxie=$("#price_daxie").html();
        var zhil_biaozhun=$("#zhil_biaozhun").val();
        var jiaohuo_time=$("#jiaohuo_time").val();
        var jiaohuo_address=$("#jiaohuo_address").val();
        var sale_d_id=$("#sale_d_id").val();
         layer.msg("正在生成，请稍候......");
    $.ajax({
        type: 'POST',
        url: "/common/add_sale_hetong",
        data: {
            company:company,
            shuihao:shuihao,
            bank:bank,
            bank_number:bank_number,
            company_people:company_people,
            telephone:telephone,
            sale_d_id: sale_d_id,
            hetong_no: hetong_no,
            customer: customer,
            time: time,
            cas: cas,
            name_en: name_en,
            amount: amount,
            unit: unit,
            price: price,
            desc: desc,
            price_daxie: price_daxie,
            zhil_biaozhun: zhil_biaozhun,
            jiaohuo_time: jiaohuo_time,
            jiaohuo_address: jiaohuo_address
        },
        dataType: "json",
        success: function (data) {
            layer.msg("生成成功！")
            setTimeout(function () {
                window.open("http://source.tanyangnet.com/" + data["append"]);
            }, 1500)
        }
    })

})