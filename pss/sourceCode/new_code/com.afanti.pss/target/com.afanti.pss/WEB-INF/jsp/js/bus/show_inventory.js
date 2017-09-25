var enter_d_ids = ""
$(function () {
    enter_d_ids= $.alle_getUrlParam("enter_d_ids");
    doSearch(1);
    $("#query").click(function () {
        doSearch(1);
    })
    $("#back").click(function () {
        $.alle_dialog_close();
    })
})
function doSearch(p) {
    $.ajax({
        type: 'POST',
        url: "/inventory/productIn/show_inventory_detail",
        data: {
            enter_d_ids: enter_d_ids
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                var value = '';
                if (data["append"] == null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]);
                for (var i = 0; i < append.length; i++) {
                    value += '\
                    <div class="bg-primary add-info clearfix"><h3 class="text-center m10"><b>批次号：'+append[i]["batch_no"]+'</b></h3></div>\
                    <table class="table table-bordered">\
                        <tbody>\
                            <tr>\
                             <th scope="row" class="text-center">批次号</th>\
                              <td><span>'+append[i]["batch_no"]+'</span></td>\
                             <th scope="row" class="text-center">产品名称</th>\
                              <td><span>'+append[i]["product_name"]+'</span></td>\
                              <th scope="row" class="text-center">产品英文名称</th>\
                              <td><span>'+append[i]["product_name_en"]+'</span></td>\
                              </tr>\
                              \
                              <tr>\
                              <th scope="row" class="text-center">入库量</th>\
                              <td><span >'+append[i]["amount"]+'</span></td>\
                              <th scope="row" class="text-center">本批次剩余量</th>\
                              <td><span>'+append[i]["left_amount"]+'</span></td>\
                              <th scope="row" class="text-center">操作人</th>\
                              <td><span>'+append[i]["staff_name"]+'</span></td>\
                               </tr>\
                               \
                               <tr>\
                               <th scope="row" class="text-center">入库时间</th>\
                               <td ><span>'+$.alle_time2str_yymm_dd_hhmmss(append[i]["enter_date"])+'</span></td>\
                               <th class="text-center">入库描述</th>\
                               <td colspan="3"><span>'+append[i]["enter_desc"]+'</span></td>\
                               </tr>\
                               </tbody>\
                          </table>\
                    \
                    ';
                }
                $("#tbody").html(value);
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}