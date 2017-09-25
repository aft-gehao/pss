$(function () {


    doSearch();
    $("#submit").click(function () {

        doSearch();
    })

})
function doSearch() {
    var cs_sup_id = $.alle_getUrlParam("cs_sup_id");

    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoUpdateSelect",
        data: {
            cs_sup_id: cs_sup_id
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var value="";
                var append = data["append"];

                if(append["s_type"]=="企业")
                {
                    value= '\
                     <select id="supplier_type" class="form-control input-sm">\
                        <option value="2001">企业</option>\
                        <option value="2002">个人</option>\
                        <option value="2003">其他</option>\
                       </select>\
                    \
                    ';
                }
                else if(append["s_type"]=="个人")
                {
                    value= '\
                     <select id="supplier_type" class="form-control input-sm">\
                        <option value="2002">个人</option>\
                        <option value="2201">企业</option>\
                        <option value="2003">其他</option>\
                       </select>\
                    \
                    ';
                }
                else{ value= '\
                     <select id="supplier_type" class="form-control input-sm">\
                        <option data="2003">其他</option>\
                        <option data="2001">企业</option>\
                        <option data="2002">个人</option>\
                       </select>\
                    \
                    ';
                }
                $("#supplier_id").val(append["cs_sup_id"]);
                $("#supplier_name").val(append["name"]);
                $("#supplier_email").val(append["email"]);
                $("#short_name").val(append["short_name"]);
                $("#supplier_tel").val(append["tel"]);
                $("#address").val(append["address"]);
                $("#profile").val(append["profile"]);
                $("#payment_terms").val(append["payment_terms"]);
                $("#vat_number").val(append["vat_number"]);
                $("#supplier_invoice").val(append["invoice_title"]);
                $("#supplier_type").html(value);
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}
$("#submit").click(function(){
    doSearch1();
})
//联系电话格式判断
function isCall(str){
    var reg =/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    return reg.test(str);
}
function doUpdata() {
    var cs_sup_id = $.alle_getUrlParam("cs_sup_id");
    var vat_number = $("#vat_number").val();
    var supplier_name = $("#supplier_name").val();
    var customer_id =1;
    var supplier_tel = $("#supplier_tel").val();
    if($("#supplier_type").val()=="企业") {
        var supplier_type = 2001;
    }
    if($("#supplier_type").val()=="个人") {
        var supplier_type = 2002;
    }
    if($("#supplier_type").val()=="其他") {
        var supplier_type = 2003;
    }
    var supplier_email = $("#supplier_email").val();
    var short_name = $("#short_name").val();
    var payment_terms = $("#payment_terms").val();
    var supplier_address = $("#address").val();
    var profile = $("#profile").val();
    var supplier_invoice = $("#supplier_invoice").val();
    if(supplier_tel!='')
    {
        if(!isCall(supplier_tel))
        {
            tip_msg("您输入的联系方式有误,请重新核对后再输入!", "#supplier_tel");
            return false;
        }
    }
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
        tip_msg("支付条件不能为空", "#payment_terms");
        return false;
    }
    if(vat_number==''||vat_number==null)
    {
        tip_msg("VAT number不能为空", "#vat_number");
        return false;
    }

    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/cusinfoUpdata",
        data: {
            cs_sup_id:cs_sup_id,
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
            layer.msg(data["message"]);

            if (data["result"] == "success") {

                setTimeout(function () {
                    window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+cs_sup_id;
                }, 1000);
            }

        }
    });
}
function doSearch1() {

    var supplier_name = $("#supplier_name").val();
    var supplier_id= $("#supplier_id").val();

    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoNameSelect",
        data: {
            supplier_name: supplier_name,
            supplier_id: supplier_id
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                doUpdata();
            }
            else {
                tip_msg("此名称已被使用，请更换！", "#supplier_name");
            }

        }
    });

}
