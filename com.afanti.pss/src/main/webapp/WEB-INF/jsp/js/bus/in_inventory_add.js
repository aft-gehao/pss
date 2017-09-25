var purchase_id = "";
var stock_status = 0;

$(function () {
    purchase_id = $.alle_getUrlParam("purchase_id");
    stock_status = $.alle_getUrlParam("stock_status");
    load_purchasing_inventory();
    $("#back").click(function () {
        window.location.href = "/promanager/inventory/add.html";
    })
    $("#detail").click(function () {
        window.location.href = "/promanager/purchasing/detail.html?type=inventory&purchase_id=" + purchase_id;
    })
    $("#checkAll").click(function () {
        if (this.checked) {
            $('input[name="checkbox"]').each(function () {
                this.checked = true;
            })
        } else {
            $('input[name="checkbox"]').each(function () {
                this.checked = false;
            })
        }
    });
    $(".Product_inventory").click(function(){
        // var checks = "";
        // $('input[name="checkbox"]').each(function () {
        //     if (this.checked) {
        //         checks += "true";
        //     }
        // });
        // if (checks == null || checks == "") {
        //     layer.msg("至少选择一个选项")
        //     return false;
        // }
        // var $father=$(this).parents("div").next().find("tr:not(:first)");
        // //alert($father.html());
        // var msg=true;
        // $father.each(function(){
        //     var status=$(this).find("[class='label label-danger']").html();
        //     alert(status);
        //    // alert(stock_status);
        //     if(status == '未入库'){
        //         layer.msg("未入库不能查看当前的库存量");
        //         msg=false;
        //     }else{
        //         $(this).find("[class='label label-danger']").html();//占时不采一个个拿值，采用预览
        //         var product_name_en=$(this).find("[class='product_name_en_']").html()
                //alert(purchase_id);

                // $.ajax({
                //     type: 'POST',
                //     url: "/inventory/productIn/report_forms",
                //     data: {
                //         purchase_id:purchase_id,
                //         stock_status:stock_status,
                //         product_name_en:product_name_en
                //     },
                //     dataType: "json",
                //     success: function (data) {
                //lert(product_name_en);
                      // window.location.href=encodeURI("/promanager/inventory/report_forms.html?purchase_id="+purchase_id+'&product_name_en='+product_name_en+'&stock_status='+stock_status);
                //     }
                // })
        //     }
        // })
        // $('input[name="checkbox"]').each(function () {
        //     if (this.checked) {
        //         var params = $(this).val();
        //         var params_sp = params.split(",");
        //         alert(params_sp[1]);
        //         }
        //     })
        //
        // alert(father.html());
        //var trSecond=father.find("tr:not(:first)");
        // var $second=father.find("input[name='checkbox']").parent();
        // $second.each(function(){
        //     alert(this.checked);
        // })

    })
    $("#batch_submit").click(function () {
        var checks = "";
        $('input[name="checkbox"]').each(function () {
            if (this.checked) {
                checks += "true";
            }
        });
        if (checks == null || checks == "") {
            layer.msg("至少选择一个选项")
            return false;
        }
        var params_value = "";
        var msg = true;
        layer.prompt({title: '请输入入库单名', formType: 0}, function (text, index) {
            $('input[name="checkbox"]').each(function () {
                if (this.checked) {
                    var params = $(this).val();
                    var params_sp = params.split(",");
                    var i = params_sp[7];
                    var product_id = params_sp[0];
                    var amount = params_sp[1];
                    var amount_used = params_sp[2];
                    var unit = params_sp[3];
                    var purchase_d_id = params_sp[4];
                    var purity = params_sp[5];
                    var out_amount = params_sp[6];
                    var desc = $("#desc_" + i).val();
                    var space_id = $("#space_id_" + i).val();
                    var new_amount = $("#new_amount_" + i).val();
                    var left_amount = parseFloat(amount) - parseFloat(amount_used) - parseFloat(new_amount)
                    if (new_amount == null || new_amount == "") {
                        tip_msg("请输入本次采购量", "#new_amount_" + i);
                        msg = false;
                        return false;
                    } else {
                            if (parseFloat(new_amount) > parseFloat(parseFloat(amount) - parseFloat(amount_used) - parseFloat(out_amount))) {
                                tip_msg("本次入库不能大于采购量-退货量", "#new_amount_" + product_id);
                                $("#new_amount_" + product_id).val(parseFloat(amount) - parseFloat(amount_used) - parseFloat(out_amount));
                                msg = false;
                                return false;
                            }
                    }
                    if (space_id == null || space_id == "" || space_id == 0) {
                        tip_msg("请选择仓位", "#space_name_" + i);
                        msg = false;
                        return false;
                    }
                    ;
                    params_value += purchase_id + "," + product_id + "," + new_amount + "," + left_amount + "," + unit + "," + purchase_d_id + "," + space_id + "," + purity + "," + desc + "," + text + "_";
                    return false;
                    layer.close(index);
                }
            });
            if (msg) {
                $.ajax({
                    type: 'POST',
                    url: "/inventory/productIn/purchasing_inventory_save",
                    data: {
                        params_value: params_value.substr(0, params_value.lastIndexOf("_"))
                    },
                    dataType: "json",
                    success: function (data) {
                        //alert(data)
                        window.location.href = "/promanager/inventory/add-detail.html?purchase_id=" + purchase_id;
                    }
                });
            }
        });
    })
})


function load_purchasing_inventory() {
    $.ajax({
        type: 'POST',
        url: "/inventory/productIn/load_purchasing_inventory",
        data: {
            purchase_id: purchase_id
        },
        dataType: "json",
        success: function (data) {
            var a=data["appends"];
            // alert("a"+a);
            if (data["result"] == "success") {
                var append1 = data["append"]["materialPurchase"];
                $("#purchase_name").html(append1["purchase_name"]);
                $("#staff_name").html(append1["staff_name"]);
                $("#supplier_name").html(append1["supplier_name"]);
                $("#all_total").html(append1["all_total"]);
                $("#linkman_name").html(append1["linkman_name"]);
                $("#purchase_time").html($.alle_time2str_yymm_dd_hhmmss(append1["purchase_time"]));
                $("#desc").html(append1["desc"]);
                var append2 = data["append"]["purchaseInventoryList"];
                for (var i = 0; i < append2.length; i++) {
                    var product_id = append2[i]["product_id"];
                    var product_name = "'" + append2[i]["product_name"] + "'";
                    var amount = append2[i]["amount"];
                    var unit = append2[i]["unit"];
                    var purity = append2[i]["purity"];
                    var unit_price = append2[i]["unit_price"];
                    var pro_type_name = append2[i]["product_type_name"];
                    var amount_used = append2[i]["amount_used"];
                    var product_name_en = append2[i]["product_name_en"];
                    var space_id = append2[i]["space_id"];
                    var space_name = append2[i]["space_name"];
                    if (space_name != null && space_name != "") {
                        space_name = space_name.replace(new RegExp(/(,)/g), '');
                    }
                    var in_count = append2[i]["in_count"];
                    var enter_d_ids = append2[i]["enter_d_ids"];
                    var purchase_d_id = append2[i]["purchase_d_id"];
                    var out_amount = append2[i]["out_amount"];
                    var use_id= append2[i]["use_id"];
                    load_product(product_id, product_name, product_name_en, pro_type_name, amount, unit, purity, unit_price, amount_used, space_id, space_name, in_count, enter_d_ids, purchase_d_id, out_amount,use_id,a,i);
                }
            } else {
                layer.msg(data["message"])
            }
        }
    });
}


function load_product(product_id, pro_name, product_name_en, pro_type_name, amount, unit, purity, unit_price, amount_used, space_id, space_name, in_count, enter_d_ids, purchase_d_id, out_amount,use_id,a,i) {

    var $html = '';
    var enter_d_ids = "'" + enter_d_ids + "'"
    var new_amout = parseFloat(amount) - parseFloat(amount_used) - parseFloat(out_amount);
    new_amout = new_amout.toFixed(2);
    var purity2 = "'" + purity + "'";
    var $product_table = $('#product_table');
    $html += '<tr id="tr_' + i + '">'
    if (stock_status == 5001) {
        $html += '<td></td>'
    } else {
        if (new_amout != 0) {
            $html += '<td><input type="checkbox" name="checkbox" value="' + product_id + ',' + amount + ',' + amount_used + ',' + unit + ',' + purchase_d_id + ',' + purity + ',' + out_amount + ',' + i + '"/> </td>'
        } else {
            $html += '<td></td>';
        }
    }

    $html += '<td><span id="product_name_en_" class="product_name_en_"' + i + '>' + product_name_en + '</span><input id="product_id_' + i + '" value="' + product_id + '" type="hidden"/></td>';
    $html += '<td><span id="purity_"' + i + '>>' + purity + '</span></td>';
    $html += '<td><span id="amount_"' + i + '>' + amount;
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "kg") {
        $html += 'kg';
    }
    if (unit == "g") {
        $html += 'g';
    }
    if (unit == "ml") {
        $html += 'ml';
    }
    if (unit == "L") {
        $html += 'L';
    }
    if (unit == "l") {
        $html += 'L';
    }
    $html += '</span></td>';

    $html += "";

    $html += '<td><span id="amount_used"' + i + '>' + amount_used;
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "kg") {
        $html += 'kg';
    }
    if (unit == "g") {
        $html += 'g';
    }
    if (unit == "ml") {
        $html += 'ml';
    }
    if (unit == "L") {
        $html += 'L';
    }
    if (unit == "l") {
        $html += 'L';
    }
    $html += '</span></td>';
    $html += '<td><span id="amount_used"' + i + '>' + out_amount;
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "kg") {
        $html += 'kg';
    }
    if (unit == "g") {
        $html += 'g';
    }
    if (unit == "ml") {
        $html += 'ml';
    }
    if (unit == "L") {
        $html += 'L';
    }
    if (unit == "l") {
        $html += 'L';
    }
    $html += '</span></td>';

    $html += '<td><span id="in_count_"' + i + '><a onclick="javascript:showInventory(' + enter_d_ids + ',' + pro_name + ')">' + in_count + '</a></span></td>';
    var count = parseFloat(amount) - parseFloat(amount_used);
    if (stock_status == 5001) {
        $html += '<td><span class="label label-success">已入库</span></td>';
    } else {
        if (count == 0) {
            $html += '<td><span class="label label-success">已入库</span></td>';
        } else if (count != 0 && count != parseFloat(amount)) {
            if (amount_used != 0 && new_amout == 0) {
                $html += '<td><span class="label label-success">已入库</span></span></td>';
            } else {
                $html += '<td><span class="label label-info">部分入库</span></td>';
            }
        } else if (count == parseFloat(amount)) {
            if (out_amount != 0) {
                if (new_amout == 0) {
                    $html += '<td><span class="label label-default">全部退货</span></td>';
                } else {
                    $html += '<td><span class="label label-success">已入库</span>&nbsp;<span  class="label label-primary">退</span></td>';
                }
            } else {
                $html += '<td><span class="label label-danger">未入库</span></span></td>';
            }
        }
    }
    if (stock_status == 5001) {
        $html += '<td><input style="width: 60px" readonly="readonly" id="new_amount_' + i + '" type="text" value="' + new_amout + '" class="form-control input-sm"/>';
    } else {
        if (new_amout == 0) {
            $html += '<td><input style="width: 60px" readonly="readonly" id="new_amount_' + i + '" type="text" value="' + new_amout + '" class="form-control input-sm"/>';
        } else {
            $html += '<td><input style="width: 60px"  id="new_amount_' + i + '" onchange="checkNewAmount(' + product_id + ',' + amount + ',' + amount_used + ',' + i + ')" type="text" value="' + new_amout + '" class="form-control input-sm"/>';
        }
    }
    if (unit == "mg") {
        $html += 'mg';
    }
    if (unit == "kg") {
        $html += 'kg';
    }
    if (unit == "g") {
        $html += 'g';
    }
    if (unit == "ml") {
        $html += 'ml';
    }
    if (unit == "L") {
        $html += 'L';
    }
    if (unit == "l") {
        $html += 'L';
    }
    $html += '</td>';
    if (space_name != null && space_name != '') {
        $html += '<td><input  type="hidden" id="space_id_' + i + '" value="' + space_id + '"/> <textarea readonly="readonly" id="space_name_' + i + '" title="' + $.alle_null2Str(space_name) + '" class="form-control left" rows="1" cols="6">' + $.alle_null2Str(space_name) + '</textarea></td>';
    } else {
        $html += '<td><input type="hidden" id="use_id_' + i + '" value="' + use_id + '"/><input type="hidden" id="space_id_' + i + '" value="' + space_id + '"/> <textarea readonly="readonly"  onclick="select_dictWarehouseSpace(' + i + ')" id="space_name_' + i + '" title="' + $.alle_null2Str(space_name) + '" class="form-control left" rows="1" cols="6">' + $.alle_null2Str(space_name) + '</textarea></td>';
    }
    if (stock_status == 5001) {
        $html += '<td><textarea readonly="readonly" id="desc_' + i + '" class="form-control left" rows="1" cols="6"></textarea></td>';
    } else {
        if (count == 0) {
            $html += '<td><textarea readonly="readonly" id="desc_' + i + '" class="form-control left" rows="1" cols="6"></textarea></td>';
        } else {
            $html += '<td><textarea id="desc_' + i + '" class="form-control left" rows="1" cols="6"></textarea></td>';
        }
    }
    $html += '<td>';
    if (stock_status == 5001) {
            $html += '<a href="/promanager/inventory/Template.html?purchase_id='+a+'&product_name_en='+product_name_en+'&stock_status='+stock_status+'">预览</a>';//跳转模板生成pdf
    } else if(stock_status == 5003){
        if (new_amout != 0) {
            $html += '<a href="/promanager/inventory/Template.html?purchase_id='+a+'&product_name_en='+product_name_en+'&stock_status='+stock_status+'">预览</a>';//跳转模板生成pdf
        }
    }else if(stock_status == 5002){
        // alert(3);
    } else if(stock_status==""||stock_status==null){
        $html += '<a href="/promanager/inventory/Template.html?purchase_id='+a+'&product_name_en='+product_name_en+'&stock_status='+stock_status+'">预览</a>';
    }
    else{
        //     alert(1)
            //$html += '<a href="/promanager/inventory/Template.html?purchase_id='+a+'&product_name_en='+product_name_en+'&stock_status='+stock_status+'">预览</a>';
         //}// else if (count != 0 && count != parseFloat(amount)) {
         //     if (amount_used != 0 && new_amout == 0) {
         //         alert(2)
         //         $html += '<a href="/promanager/inventory/Template.html?purchase_id='+a+'&product_name_en='+product_name_en+'&stock_status='+stock_status+'">预览</a>';
         //     } else {
         //         alert(3);
              //   $html += '<a href="/promanager/inventory/Template.html?purchase_id='+a+'&product_name_en='+product_name_en+'&stock_status='+stock_status+'">预览</a>';
             // }
         // } else if (count == parseFloat(amount)) {
         //     if (out_amount != 0) {
         //         if (new_amout == 0) {
         //             $html += '<td><span class="label label-default">全部退货</span></td>';
        //         } else {
        //             $html += '<td><span class="label label-success">已入库</span>&nbsp;<span  class="label label-primary">退</span></td>';
        //         }
        //     } else {
        //         $html += '<td><span class="label label-danger">未入库</span></span></td>';
        //     }
       // }
        // if (new_amout != 0) {
        //     // $html += '<a href="javascript:purchasing_inventory_save(' + product_id + ',' + amount + ',' + amount_used + ',' + unit + ',' + purchase_d_id + ',' + purity2 + ',' + out_amount + ',' + i + ','+use_id+')">入库</a>';
        // }
    }
    $html+='<input type="hidden" id="purchase_id" value="'+a+'"/>';//影藏的采购单编号purchase_id
    $html += '</td>';
    $html += '</tr>';
    $product_table.prepend($html);
}
function showInventory(enter_d_ids, pro_name) {
    if (enter_d_ids == null || enter_d_ids == "" || enter_d_ids == "null") {
        return false;
    }
    // $.alle_dialog('/promanager/inventory/show_inventory_detail.html?enter_d_ids=' + enter_d_ids, pro_name + "：入库记录", ["640px", "94%"]);

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
                var showDetial = "";
                for (var i = 0; i < append.length; i++) {
                    showDetial += '<div style="width: 98%;margin-top: 10px;margin-left: 5px"><p class="lead">批次号：' + append[i]["batch_no"] + '</p> ' +
                        '<table class="table" style="margin-top: -10px"> <tbody>' +
                        '<tr> ' +
                        '<th style="width:40%">批次号:</th>' +
                        '<td>' + append[i]["batch_no"] + '</td> ' +
                        '</tr>' +
                        '<tr> ' +
                        '<th>产品名称</th>' +
                        '<td>' + append[i]["product_name"] + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th>产品英文名称</th>' +
                        '<td>' + append[i]["product_name_en"] + '</td>' +
                        '</tr>' +
                        '<tr><th>入库量</th>' +
                        '<td>' + append[i]["amount"] + '</td>' +
                        '</tr>' +
                        '<tr><th>操作人</th><td>' + append[i]["staff_name"] + '</td></tr>' +
                        '<tr><th>入库时间</th><td>' + $.alle_time2str_yymm_dd_hhmmss(append[i]["enter_date"]) + '</td></tr>' +
                        '<tr><th>入库描述</th><td>' + append[i]["enter_desc"] + '</td></tr></tbody></table></div>';
                }
                $.alle_dialog_mini(showDetial);
            } else {
                layer.msg(data["message"]);
            }
        }
    });


}

function checkNewAmount(product_id, amount, amount_used, i) {
    var new_amount = $("#new_amount_" + i).val();
    if (new_amount != 0) {
        if (amount < (parseFloat(new_amount) + parseFloat(amount_used))) {
            tip_msg("本次入库量不能大于采购量", "#new_amount_" + i);
            $("#new_amount_" + product_id).val(parseFloat(amount - amount_used));
        }
    }
}

function select_dictWarehouseSpace(i) {
    $.alle_dialog('/promanager/inventory/select_warehouse.html?i=' + i, "选择仓位", ["350px", "80%"]);
}

function purchasing_inventory_save(product_id, amount, amount_used, unit, purchase_d_id, purity, out_amount, i,use_id) {
    if(stock_status!=5002) {//未入库，什么都不做

    var desc = $("#desc_" + i).val();
    var space_id = $("#space_id_" + i).val();

    var new_amount = $("#new_amount_" + i).val();
    if (new_amount == null || new_amount == "") {
        tip_msg("请输入本次采购量", "#new_amount_" + i);
        return false;
    } else {

            if (parseFloat(new_amount) > (parseFloat(parseFloat(amount) - parseFloat(amount_used) - parseFloat(out_amount))).toFixed(2)) {
                tip_msg("本次入库不能大于采购量-已入库量", "#new_amount_" + i);
                $("#new_amount_" + product_id).val(parseFloat(amount) - parseFloat(amount_used) - parseFloat(out_amount));

                return false;
            }
    }
    if (space_id == null || space_id == "" || space_id == 0) {
        tip_msg("请选择仓位", "#space_name_" + i);
        return false;
    }
    var left_amount = parseFloat(amount) - parseFloat(amount_used) - parseFloat(new_amount)
    var status;
    if(left_amount!=0)
    {
        status=5003;
    }
    else{
        status=5001;
    }
    if(use_id)
    {


        $.ajax({
            type: 'POST',
            url: "/product_use/manage/useUpdate",
            data: {
                use_id: use_id,
                status:status
            },
            dataType: "json",
            success: function (data) {

            }
        })
    }
    layer.prompt({title: '请输入入库单' +
    '名', formType: 0}, function (text, index) {
        layer.close(index);
        var params_value = purchase_id + "," + product_id + "," + new_amount + "," + left_amount + "," + unit + "," + purchase_d_id + "," + space_id + "," + purity + "," + desc + "," + text + "_";
        $.ajax({
            type: 'POST',
            url: "/inventory/productIn/purchasing_inventory_save",
            data: {
                params_value: params_value
            },
            dataType: "json",
            success: function (data) {
                layer.msg(data["message"]);
                if (data["result"] == "success") {
                    //入库单点击生成

                    setTimeout(function () {
                        window.location.href = "/promanager/inventory/add-detail.html?purchase_id=" + purchase_id;
                    }, 100);
                }
            }
        });
    });
    }
}
function report_forms_Show(){
    // //alert(1);
    // $.ajax({
    //     type: 'POST',
    //     url: "/promanager/inventory/report_forms.html",
    //     data: {
    //         params_value: params_value
    //     },
    //     dataType: "json",
    //     success: function (data) {
    //
    //     }
    // })

}
