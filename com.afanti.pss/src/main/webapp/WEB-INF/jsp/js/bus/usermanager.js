$(function () {
    load_juese();
    doSearch(1);
    $("#query").click(function () {
        doSearch(1);
    })
    $("#add_user").click(function () {
        window.location.href="/infomanager/usermanager/user_add.html";
    })
})
function load_juese()
{
    $.ajax({
        type: 'POST',
        url: "/user/manager/load_juese",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var html="<option value=''>全部</option>";
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    html+="<option value='"+append[i]["role_id"]+"'>"+append[i]["role_name"]+"</option>"
                }
                $("#juese_id").html(html)
            }else{
                layer.msg(data["message"]);
            }
        }
    });
}
function doSearch(p) {
    var staff_name = $("#staff_name").val();
    var juese_id =$("#juese_id").val();
    $.ajax({
        type: 'POST',
        url: "/user/manager/user_page_list",
        data: {
            staff_name: staff_name,
            juese_id:juese_id,
            p: p
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var value = "";
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                for (var i = 0; i < append.length; i++) {
                    value += '\
                    <tr >\
                        <td>' + append[i]["staff_name"] + '</td>\
                        <td>' + append[i]["mobilephone"] + '</td>\
                        \<td>' + append[i]["role_name"] + '</td>\
                         <td class="operation"><a href="javascript:to_modify_user('+append[i]["staff_id"]+')" class="modify">修改</a><a href="javascript:del_user(' + append[i]["staff_id"] + ')">删除</a></td>\
                        </tr>\
                    \
                    ';
                }
                $("#data_tbody").html(value);
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}
function to_modify_user(staff_id)
{
    window.location.href="/infomanager/usermanager/user_upd.html?staff_id="+staff_id;
}

function del_user(staff_id)
{
    var index = layer.confirm('确认删除？', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        layer.close(index);
        $.ajax({
            type: 'POST',
            url: "/user/manager/del_user",
            data: {
                staff_id: staff_id
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    setTimeout(function () {
                        doSearch(1);
                    }, 1000);
                }
            }
        });
    }, function () {
        layer.close(index);
    });
}