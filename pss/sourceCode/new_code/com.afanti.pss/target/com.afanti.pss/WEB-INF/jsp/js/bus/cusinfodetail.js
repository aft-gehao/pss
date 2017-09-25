$(function () {
    $('#cancel,#cancel_1,#cancel_3,#cancel_4,#cancel-2').click(function(){

        var id = $("#id").val();
        window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+id;
    });
    $('#back-Cg').click(function(){

        window.location.href="index.html";
    });

    /*进页面默认执行dosearch函数*/

    doSearch();
})
function del(id) {

    if(confirm("确定要删除吗？"))
    {

        var url = "index.html";

        window.location.href=url;

    }

}
function doSearch() {
     var cs_sup_id = $.alle_getUrlParam("cs_sup_id");
     $("#id").val(cs_sup_id);
     var type=2;
   var flag=1;
    if(cs_sup_id==null)
    {
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoDetailSelect",
        data: {
            cs_sup_id: cs_sup_id,
            flag: flag,
            type:type
        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {

                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
               /* var appends=eval(data["appends"]["results"]);*/
                var append =data["append"];

                var value = "";
                var values = "";
                var appends = eval(data["appends"]);
                var append_ext = eval(data["append_ext"]);
                for(var i = 0; i < append_ext.length; i++)
                {
                    values += '\
                    <tr >\
                        <td>' + append_ext[i]["oper_name"] + '</td>\
                        <td>' + append_ext[i]["oper_tel"] + '</td>\
                        <td>' + append_ext[i]["postcode"] + '</td>\
                        <td>' + append_ext[i]["address"] + '</td>\
                        <td>' + append_ext[i]["type_name"] + '</td>\
                        <td class="operation">\
                        <a href="#" data-toggle="modal" onclick="huoqudizhi(this)" data=' + append_ext[i]["address_id"] + ' data-target="#myModal-4">修改</a>\
                        <a href="#" data-href="delete.php?id=23" onclick="deldizhi(this)" data=' + append_ext[i]["address_id"] + ' data-toggle="modal" data-target="#confirm-delete">删除</a>\
                        </td>\
                     </tr>\
                    \
                    ';
                }
                $("#datas").html(values);
                for (var i = 0; i < appends.length; i++) {
                    if(appends[i]["is_owner"]==0) {
                        value += '\
                    <tr >\
                        <td><span class="text-danger mr10">★</span>' + appends[i]["chinesename"] + '</td>\
                        <td>' + appends[i]["englishname"] + '</td>\
                        <td>' + appends[i]["ttitle"] + '</td>\
                        <td>' + appends[i]["mobilephone"] + '</td>\
                        <td>' + appends[i]["fixedphone"] + '</td>\
                        <td>' + appends[i]["fax"] + '</td>\
                        <td>' + appends[i]["email"] + '</td>\
                        <td class="operation">\
                        <a href="#" data-toggle="modal" onclick="huoqu(this)" id="href_xiugai" data=' + appends[i]["linkman_id"] + ' data-target="#myModal-2">修改</a>\
                        <a href="#" data-href="delete.php?id=23" onclick="del(this)" data=' + appends[i]["linkman_id"] + ' data-toggle="modal" data-target="#confirm-delete">删除</a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                    else{
                        value += '\
                    <tr >\
                        <td>' + appends[i]["chinesename"] + '</td>\
                        <td>' + appends[i]["englishname"] + '</td>\
                        <td>' + appends[i]["ttitle"] + '</td>\
                        <td>' + appends[i]["mobilephone"] + '</td>\
                        <td>' + appends[i]["fixedphone"] + '</td>\
                        <td>' + appends[i]["fax"] + '</td>\
                        <td>' + appends[i]["email"] + '</td>\
                        <td class="operation">\
                        <a href="javascript:;" data-toggle="modal" onclick="huoqu(this)" id="href_xiugai" data=' + appends[i]["linkman_id"] + ' data-target="#myModal-2">修改</a>\
                        <a href="#" data-href="delete.php?id=23" onclick="del(this)" data=' + appends[i]["linkman_id"] + ' data-toggle="modal" data-target="#confirm-delete">删除</a>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                $("#supplier_name").html(append["name"]);
                $("#supplier_type").html(append["s_type"]);
                $("#short_name").html(append["short_name"]);
                $("#credit_level").html(append["s_level"]);
                $("#supplier_email").html(append["email"]);
                $("#supplier_tel").html(append["tel"]);
                $("#supplier_address").html(append["address"]);
                $("#profile").html(append["profile"]);
                $("#invoice_title").html(append["invoice_title"]);
                $("#payment_terms").html(append["payment_terms"]);
            }
        }
    });
}
//获取需要删除的联系人id
function del(e)
{
    $("#del").val($(e).attr("data"));
}

//获取需要删除的地址id
function deldizhi(e)
{
    $("#deldizhi").val($(e).attr("data"));
}
//获取需要修改联系人的id，数据回显
function huoqu(e) {

      $("#xiugai").val($(e).attr("data"));
      var s_linkman_id=$("#xiugai").val();

    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/linkmanSelect",
        data: {
            s_linkman_id: s_linkman_id
        },
        dataType: "json",
        success: function (data) {
            var id = $("#id").val();
            var append =data["append"];
            if (data["result"] == "success") {
                var value;
                if(append["is_owner"]==0)
                {
                    value = '\
                    <select class="form-control input-sm" id="x_is_owner">\
                        <option>是</option>\
                        <option>否</option>\
                        </select>\
                    \
                    ';
                }
                else{
                    value = '\
                    <select class="form-control input-sm" id="x_is_owner">\
                        <option>否</option>\
                        <option>是</option>\
                        </select>\
                    \
                    ';
                }
                $("#x_chinesename").val(append["chinesename"]);
                $("#x_englishname").val(append["englishname"]);
                $("#x_ttitle").val(append["ttitle"]);
                $("#x_fax").val(append["fax"]);
                $("#x_email").val(append["email"]);
                $("#x_mobilephone").val(append["mobilephone"]);
                $("#x_fixedphone").val(append["fixedphone"]);
                $("#x_address").val(append["address"]);
                $("#x_is_owner").html(value);
            }
        }
    });
}
//获取需要修改地址的id，数据回显
function huoqudizhi(e) {

    var address_id=$(e).attr("data");
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/addressSelect",
        data: {
            address_id: address_id
        },
        dataType: "json",
        success: function (data) {

            var append =data["append"];
            if (data["result"] == "success") {
                var value;
                if(append["address_type"]==10001)
                {
                    value = '\
                    <select class="form-control input-sm" id="x_address_type">\
                        <option>发票地址</option>\
                        <option>收货地址</option>\
                        </select>\
                    \
                    ';
                }
                else{
                    value = '\
                    <select class="form-control input-sm" id="x_address_type">\
                        <option>收货地址</option>\
                        <option>发票地址</option>\
                        </select>\
                    \
                    ';
                }
                $("#x_address_id").val(append["address_id"]);
                $("#x_oper_tel").val(append["oper_tel"]);
                $("#x_oper_name").val(append["oper_name"]);
                $("#x_postcode").val(append["postcode"]);
                $("#x_c_address").val(append["address"]);
                $("#x_address_type").html(value);
            }
        }
    });
}
function isEmail(str){
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return reg.test(str);
}
//新增联系人方法
$("#lianxisubmit").click(function(){

            var s_linkman_id=$("#xiugai").val();
            var chinesename=$("#chinesename").val();
            var englishname=$("#englishname").val();
            var ttitle=$("#ttitle").val();
            var fax=$("#fax").val();
            var email=$("#email").val();
            var mobilephone=$("#mobilephone").val();
            var fixedphone=$("#fixedphone").val();
            var address=$("#address").val();
            var is_owner;
            var customer_id=$("#id").val();
            var flag=1;
    var customer_id=$("#id").val();
           if($("#is_owner").val()=="是"){
               is_owner=0;
           }
           else{
               is_owner=1;
           }
    if(chinesename==""||chinesename==null)
    {
        tip_msg("联系人中文名不能为空", "#chinesename");
        return false;
    }
    if(mobilephone==""||mobilephone==null)
    {
        tip_msg("联系人手机号码不能为空", "#mobilephone");
        return false;
    }
    if(email!='')
    {
        if(!isEmail(email))
        {
            tip_msg("您输入的邮箱格式有误,请重新核对后再输入!", "#email");
            return false;
        }
    }
    if(mobilephone!='')
    {
        if(!isCall(mobilephone))
        {
            tip_msg("您输入的联系方式有误,请重新核对后再输入!", "#mobilephone");
            return false;
        }
    }
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/linkmanAdd",
        data: {
            flag: flag,
            s_linkman_id: s_linkman_id,
            customer_id: customer_id,
            chinesename: chinesename,
            englishname: englishname,
            ttitle: ttitle,
            fax: fax,
            email: email,
            mobilephone: mobilephone,
            fixedphone: fixedphone,
            address: address,
            is_owner: is_owner
        },
        dataType: "json",
        success: function (data) {
            var id = $("#id").val();
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                   //详情页面刷新
                    window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+id;
                }, 1000);
            }
        }
    });
})

//联系电话格式判断
function isCall(str){
    var reg =/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    return reg.test(str);
}
//更新联系人方法
$("#xiugaisubmit").click(function(){
    var s_linkman_id=$("#xiugai").val();
    var englishname=$("#x_englishname").val();
    var chinesename=$("#x_chinesename").val();
    var ttitle=$("#x_ttitle").val();
    var fax=$("#x_fax").val();
    var email=$("#x_email").val();
    var mobilephone=$("#x_mobilephone").val();
    var fixedphone=$("#x_fixedphone").val();
    var address=$("#x_address").val();
    var is_owner;
    var supplier_id=$("#id").val();
    if(mobilephone!='')
    {
        if(!isCall(mobilephone))
        {
            tip_msg("您输入的联系方式有误,请重新核对后再输入!", "#x_mobilephone");
            return false;
        }
    }
    if(email!='')
    {
        if(!isCall(email))
        {
            tip_msg("您输入的邮箱格式有误,请重新核对后再输入!", "#x_email");
            return false;
        }
    }
    if($("#x_is_owner").val()=="是"){
        is_owner=0;
    }
    else{
        is_owner=1;
    }
    if(chinesename==""||chinesename==null)
    {
        tip_msg("联系人中文名不能为空", "#x_chinesename");
        return false;
    }
    if(mobilephone==""||mobilephone==null)
    {
        tip_msg("联系人手机号码不能为空", "#x_mobilephone");
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/linkmanUpdate",
        data: {
            s_linkman_id:s_linkman_id,
            supplier_id: supplier_id,
            chinesename: chinesename,
            englishname: englishname,
            ttitle: ttitle,
            fax: fax,
            email: email,
            mobilephone: mobilephone,
            fixedphone: fixedphone,
            address: address,
            is_owner: is_owner
        },
        dataType: "json",
        success: function (data) {
            var id = $("#id").val();
            if (data["result"] == "success") {
                layer.msg("修改成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+id;
                }, 1000);
            }
        }
    });
})
//删除联系人方法
$("#shanchusubmit").click(function(){
    var s_linkman_id=$("#del").val();
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/linkmanDelete",
        data: {
            s_linkman_id:s_linkman_id
        },
        dataType: "json",
        success: function (data) {
            var id = $("#id").val();
            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+id;
                }, 1000);
            }
        }
    });
})

$("#dizhisubmit").click(function(){

    if($("#address_type").val()=="收货地址")
    {
        var address_type=10002;
    }
    else if($("#address_type").val()=="发票地址"){
        var address_type=10001;
    }
    var customer_id=$("#id").val();
    var oper_name=$("#oper_name").val();
    var oper_tel=$("#oper_tel").val();
    var oper_code=$("#oper_code").val();
    var oper_address=$("#oper_address").val();
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/addressAdd",
        data: {
            customer_id: customer_id,
            address_type: address_type,
            oper_name: oper_name,
            oper_tel: oper_tel,
            oper_code: oper_code,
            oper_address: oper_address
        },
        dataType: "json",
        success: function (data) {

            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+customer_id;
                }, 1000);
            }
        }
    });
})
$("#xiugaidizhi").click(function(){

    if($("#x_address_type").val()=="收货地址")
    {
        var address_type=10002;
    }
    else if($("#x_address_type").val()=="发票地址"){
        var address_type=10001;
    }
    var address_id=$("#x_address_id").val();
    var customer_id=$("#id").val();
    var oper_name=$("#x_oper_name").val();
    var oper_tel=$("#x_oper_tel").val();
    var oper_code=$("#x_postcode").val();
    var oper_address=$("#x_c_address").val();
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/addressModify",
        data: {
            address_id:address_id,
            customer_id: customer_id,
            address_type: address_type,
            oper_name: oper_name,
            oper_tel: oper_tel,
            oper_code: oper_code,
            oper_address: oper_address
        },
        dataType: "json",
        success: function (data) {

            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+customer_id;
                }, 1000);
            }
        }
    });
})
$("#shanchusubmit").click(function(){

    var address_id=$("#deldizhi").val();
    var customer_id=$("#id").val();
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/addressDelete",
        data: {
            address_id:address_id
        },
        dataType: "json",
        success: function (data) {

            if (data["result"] == "success") {
                layer.msg("操作成功");
                setTimeout(function () {
                    //详情页面刷新
                    window.location.href="/infomanager/csrmanager/detail.html?cs_sup_id="+customer_id;
                }, 1000);
            }
        }
    });
})