$(function () {
    doSearch(1);
    $.alle_section_date("start_time", "end_time");
    $("#check_query").click(function(){
        doSearch(1);
    })

})
function doSearch(p) {
    var start_time = $("#start_time").val();
    var end_time = $("#end_time").val();
    var cas = $("#cas").val();
    var status = $("#status").val();
    $.ajax({
        type: 'POST',
        url: "/research/manage/researchPage",
        data: {
            p: p,
            cas:cas,
            start_time: start_time,
            end_time:end_time,
            status:status

        },
        dataType: "json",
        success: function (data) {
            if ( data["result"] == "success") {
                var value = "";
                if (data["append"]== null) {
                    layer.msg('暂无数据');
                    return;
                }
                var append = eval(data["append"]["results"]);
                for (var i = 0; i < append.length; i++) {
                    var html = "";
                    var html2 = "";
                    if (append[i]["status"] == 5001) {
                        html2 += '<span class="label label-success" style="background-color: #5cb85c">已入库</span>';
                    } else if (append[i]["status"] == 5003) {
                        html2 += '<span class="label label-info" style="background-color: #5cb85c">部分入库</span>';
                    } else if (append[i]["status"] == 5002) {
                        html2 += '<span class="label label-danger">未入库</span>';
                    }  else if (append[i]["status"] == 11001) {
                        html2 += '<span class="label label-danger" style="background-color: #5cb85c">审核通过</span>';
                    } else if (append[i]["status"] == 11002) {
                        html2 += '<span class="label label-danger">审核不通过</span>';
                    }else if (append[i]["status"] == 11003) {
                        html2 += '<span class="label label-danger">暂不审核</span>';
                    }
                    else if (append[i]["status"] == 11004) {
                        html2 += '<span class="label label-danger" style="background-color: blue">待审核</span>';
                    }else  if (append[i]["status"] == 8001) {
                        html2 += '<span class="label label-success" style="background-color: #5cb85c">已出库</span>';
                    } else if (append[i]["status"] == 8003) {
                        html2 += '<span class="label label-info" style="background-color: #5cb85c">部分出库</span>';
                    } else if (append[i]["status"] == 8002) {
                        html2 += '<span class="label label-danger">未出库</span>';
                    }
                    else {
                        layer.msg("类型异常,联系管理员");
                    }
                    var htmls = ""
                    var str = append[i]["putu_url"];
                    if(str!=null) {
                        if (str.indexOf(",") >= 0) {
                            var strs = new Array();
                            strs = str.split(",");
                            for (var x = 0; x < strs.length; x++) {
                                htmls += '<a onclick="putu(this)" data="' + strs[x] + '" title="' + strs[x] + '" alt="' + strs[x] + '">';
                                htmls += '<img id="imghead" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png"  >'
                                htmls += '</a>';
                            }
                        }
                        else {
                            htmls += '<a onclick="putu(this)" data="' + str + '" title="' + str + '" alt="' + str + '">';
                            htmls += '<img id="imghead" width="50px;" height="50px;" src="/js/commons/fileinput/img/photo_icon.png"  >'
                            htmls += '</a>';
                        }
                    }
                    if (append[i]["status"] == '11004') {
                        value += '\
                    <tr >\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + append[i]["sku"] + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["unit"] + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                        <td>'+htmls+'</td>\
                        <td class="operation">\
                        <input type="button" data="' + append[i]["research_id"] + '" id="check_tg" class="btn btn-link btn-xs" value="同意"/>\
                        <input type="button" data="' + append[i]["research_id"] + '" id="check_btg" class="btn btn-link btn-xs" value="不同意"/>\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                    else {
                        value += '\
                    <tr >\
                        <td>' + append[i]["cas"] + '</td>\
                        <td>' + append[i]["sku"] + '</td>\
                        <td>' + append[i]["amount"] + '' + append[i]["unit"] + '</td>\
                        <td>' + $.alle_null2Str(html2) + '</td>\
                        <td>' + $.alle_null2Str(append[i]["staff_name"]) + '</td>\
                         <td>'+htmls+'</td>\
                        <td class="operation">\
                        </td>\
                        </tr>\
                    \
                    ';
                    }
                }
                $("#data_tbody").html(value);
                $("input[class*='btn btn-link btn-xs']").each(function () {
                    $(this).click(function(){
                        var use_id=$(this).attr("data");
                        var use_batch_no=$(this).attr("datass");
                        if($(this).attr("datas")=="11001") {
                            if (use_batch_no == "0") {
                                var status = $(this).attr("datas");
                            }
                            else {
                                var status = 8002;
                            }
                        }
                        else{
                            var status = $(this).attr("datas");

                        }
                    })
                });
                $("input[id*='check_tg']").each(function () {
                    var research_id=$(this).attr("data")
                    $(this).click(function(){
                        $.ajax({
                            type: 'POST',
                            url: "/research/manage/check_tg",
                            data: {
                                research_id:research_id
                            },
                            dataType: "json",
                            success: function (data) {
                                layer.msg("操作成功");
                                doSearch(p)
                            }
                        })
                    })
                });
                $("input[id*='check_btg']").each(function () {
                    var research_id=$(this).attr("data")
                    $(this).click(function(){
                        $.ajax({
                            type: 'POST',
                            url: "/research/manage/researchDel",
                            data: {
                                research_id:research_id
                            },
                            dataType: "json",
                            success: function (data) {
                                doSearch(p)
                            }
                        })
                    })
                });
                $("a[id*='putu']").each(function () {
                    var research_id=$(this).attr("data")
                    $(this).click(function(){
                        $.ajax({
                            type: 'POST',
                            url: "/research/manage/research_putu",
                            data: {
                                research_id:research_id
                            },
                            dataType: "json",
                            success: function (data) {
                                for (var i = 0; i < data.length; i++) {
                                    alert(data[i].putu_url)
                                    //window.location.href="/research/manage/research_putu"
                                }
                            }
                        })
                    })
                })
                //调用设置分页
                PAGE_INIT("#pages", data["append"].pageNo, data["append"].totalPage)
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

function isContains(str, substr) {
    return str.contain(substr);
}
function putu(e)
{
    window.open("http://source.tanyangnet.com/"+$(e).attr("data"));
}