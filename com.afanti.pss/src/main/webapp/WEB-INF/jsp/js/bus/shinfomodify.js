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
                $("#supplier_fax").val(append["fax"]);
                $("#supplier_address").val(append["address"]);
                $("#profile").val(append["profile"]);
                $("#cus_no").val(append["cust_no"]);
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
function doUpdata() {
    var cs_sup_id = $.alle_getUrlParam("cs_sup_id");

    var supplier_name = $("#supplier_name").val();

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
    var supplier_fax = $("#supplier_fax").val();
    var supplier_address = $("#supplier_address").val();
    var profile = $("#profile").val();
    var cust_no = $("#cus_no").val();
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
    if(supplier_tel!='')
    {
        if(!pat_phone.test(supplier_tel))
        {
            tip_msg("您输入的联系方式有误,请重新核对后再输入!", "#supplier_tel");
            return false;
        }
    }
    if(supplier_name==''||supplier_name==null)
    {
        tip_msg("供应商名称不能为空", "#supplier_name");
        return false;
    }
    if(supplier_tel==''||supplier_tel==null)
    {
        tip_msg("供应商电话不能为空", "#supplier_tel");
        return false;
    }
    if(supplier_address==''||supplier_address==null)
    {
        tip_msg("供应商地址不能为空", "#supplier_address");
        return false;
    }

    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoUpdata",
        data: {
            cust_no:cust_no,
            cs_sup_id:cs_sup_id,
            name: supplier_name,
            tel: supplier_tel,
            type: supplier_type,
            email: supplier_email,
            short_name: short_name,
            fax: supplier_fax,
            address: supplier_address,
            profile: profile
        },
        dataType: "json",
        success: function (data) {
            var id = data["append"];

            layer.msg(data["message"]);

            if (data["result"] == "success") {

                setTimeout(function () {

                    window.location.href="/infomanager/shinfo/detail.html?cs_sup_id="+id;

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
                tip_msg("供应商名称不能为空", "#supplier_name");
            }

        }
    });

}