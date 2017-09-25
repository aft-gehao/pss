
/*删除弹出框*/
$('#confirm-delete').on('show.bs.modal', function(e) {

    $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

});

$(function () {

    $('#addnew').click(function(){

        window.location.href="add.html";
    });

    $('#cancel').click(function(){

        window.location.href="index.html";
    });
    $("#submit").click(function(){

        doSearch();

    });
    $("#supplier_name").blur(function(){
        $("#supplier_invoice").val( $("#supplier_name").val());
    })


})
//联系电话格式判断
function isCall(str){
    var reg =/^([0-9]{3,4}-)?[0-9]{7,8}$/;
    return reg.test(str);
}
//邮箱格式判断
function isEmail(str){
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(str);
}
function doSearch() {

    var supplier_name = $("#supplier_name").val();

    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoNameSelect",
        data: {
            supplier_name: supplier_name
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                doadd();
            }
            else {
                tip_msg("此名称已被使用，请更换！", "#supplier_name");
            }

        }
    });

}
function doadd() {
    var vat_number = $("#vat_number").val();
    var supplier_name = $("#supplier_name").val();
    var customer_id =1;
    var supplier_tel = $("#supplier_tel").val();
    var supplier_type = $("#supplier_type").val()
    var supplier_email = $("#supplier_email").val();
    var short_name = $("#short_name").val();
    var payment_terms = $("#payment_terms").val();
    var supplier_address = $("#address").val();
    var profile = $("#profile").val();
    var supplier_invoice = $("#supplier_invoice").val();
    /*if(supplier_tel!='')
     {
     if(!pat_phone.test(supplier_tel))
     {

     alert("您输入的联系方式有误,请重新核对后再输入!");

     return false;
     }
     }
     if(supplier_email!='')
     {
     if(!isEmail(supplier_email))
     {

     alert("您输入的邮箱有误,请重新核对后再输入!");

     return false;
     }
     }*/
    if(supplier_name==''||supplier_name==null)
    {
        tip_msg("客户名称不能为空", "#supplier_name");
        return false;
    }
   if(supplier_tel==''||supplier_tel==null)
    {
        tip_msg("客户电话不能为空", "#supplier_tel");
        return false;
    }
    if(payment_terms==''||payment_terms==null)
    {
        tip_msg("账期不能为空", "#payment_terms");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/cusinfoAdd",
        data: {
            supplier_invoice:supplier_invoice,
            customer_id: customer_id,
            supplier_name: supplier_name,
            supplier_tel: supplier_tel,
            supplier_type: supplier_type,
            supplier_email: supplier_email,
            short_name: short_name,
            payment_terms: payment_terms,
            supplier_address: supplier_address,
            profile: profile,
            vat_number:vat_number
        },
        dataType: "json",
        success: function (data) {
            var id = data["append"];
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+id;
                }, 1000);
            }
        }
    });
}