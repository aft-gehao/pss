
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
    var supplier_name = $("#supplier_name").val();
    var supplier_id =1;
    var supplier_tel = $("#supplier_tel").val();
    var supplier_type = $("#supplier_type").val()
    var supplier_email = $("#supplier_email").val();
    var short_name = $("#short_name").val();
    var supplier_fax = $("#supplier_fax").val();
    var supplier_address = $("#supplier_address").val();
    var profile = $("#profile").val();
    var cus_no = $("#cus_no").val();
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
        url: "/cus/supplier/manager/shinfoAdd",
        data: {

            supplier_id: supplier_id,
            supplier_name: supplier_name,
            supplier_tel: supplier_tel,
            supplier_type: supplier_type,
            supplier_email: supplier_email,
            short_name: short_name,
            supplier_fax: supplier_fax,
            supplier_address: supplier_address,
            profile: profile,
            cus_no:cus_no
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