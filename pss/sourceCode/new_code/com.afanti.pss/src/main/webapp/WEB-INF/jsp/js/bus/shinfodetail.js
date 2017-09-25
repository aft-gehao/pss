$(function () {
    $('#cancel,#cancel_1,#cancel-2').click(function(){
        var id = $("#id").val();
        window.location.href="/infomanager/shinfo/detail.html?cs_sup_id="+id;
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
    var type=1;
    $("#id").val(cs_sup_id);
    if(cs_sup_id==null)
    {
        return false;
    }
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/shinfoDetailSelect",
        data: {
            cs_sup_id: cs_sup_id,
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
                var appends = eval(data["appends"]);
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
                $("#supplier_tel").html(append["tel"]);
                $("#credit_level").html(append["s_level"]);
                $("#supplier_email").html(append["email"]);
                $("#supplier_address").html(append["address"]);
                $("#profile").html(append["profile"]);
            }
        }
    });
}
//获取需要删除的联系人id
function del(e)
{
    $("#del").val($(e).attr("data"));
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
//邮箱格式判断
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
            var supplier_id=$("#id").val();
           if($("#is_owner").val()=="是"){
               is_owner=0;
           }
           else{
               is_owner=1;
           }
    if(mobilephone!=''||mobilephone!=null)
    {
        if(!pat_phone.test(mobilephone))
        {
            tip_msg("您输入的联系方式有误,请重新核对后再输入!", "#mobilephone");
            return false;
        }
    }
    if(email!=''||email!=null)
    {
        if(!isEmail(email))
        {
            tip_msg("您输入的邮箱格式有误,请重新核对后再输入!", "#email");
            return false;
        }
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
    $.ajax({
        type: 'POST',
        url: "/cus/supplier/manager/linkmanAdd",
        data: {
            s_linkman_id: s_linkman_id,
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
                layer.msg("操作成功");
                setTimeout(function () {
                   //详情页面刷新
                    window.location.href="/infomanager/shinfo/detail.html?cs_sup_id="+id;
                }, 1000);
            }
        }
    });
})
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
    if($("#x_is_owner").val()=="是"){
        is_owner=0;
    }
    else{
        is_owner=1;
    }
    if(mobilephone!=''||mobilephone!=null)
    {
        if(!pat_phone.test(mobilephone))
        {
            tip_msg("您输入的联系方式有误,请重新核对后再输入!", "#x_mobilephone");
            return false;
        }
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
                    window.location.href="/infomanager/shinfo/detail.html?cs_sup_id="+id;
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
                    window.location.href="/infomanager/shinfo/detail.html?cs_sup_id="+id;
                }, 1000);
            }
        }
    });
})