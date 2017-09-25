/**
 * Created by zhuxiang on 2015/10/8 0008.
 */
/**
 *
 * @param page_curr 当前页索引
 * @param page_count 总页数
 */
function PAGE_INIT(select, page_curr, page_count) {

    var html = " <ul class='pagination'>";
    if (page_count <= 0) {
        layer.msg("暂无数据");
    } else {
        html+="<li><a href=\"javascript:doSearch(1);\">首页</a></li>";
        if (page_curr <= 1) {
            page_curr == 1;
        }
        if (page_curr >= page_count) {
            page_curr = page_count;
        }

        if (page_curr > 1) {
            html += "<li><a href=\"javascript:doSearch(" + (page_curr - 1) + ");\">&laquo;</a></li>"
        }
        //分页处理
        if (page_count <= 8) {
            for (var i = 1; i <= page_count; i++) {
                if (page_curr == i) {
                    html += '<li  class="active"><a> <span class="sr-only">(current)</span>' + i + '</a></li>';
                } else {
                    html += '<li><a href=\"javascript:doSearch(' + i + ');\">' + i + '</a></li>';
                }
            }
        } else {
            if (page_curr <= 5) {
                for (var i = 1; i <= 7; i++) {
                    if (page_curr == i) {
                        html += '<li class="active"><a> <span class="sr-only">(current)</span>' + i + '</a></li>';
                    } else {
                        html += '<li><a href=\"javascript:doSearch(' + i + ');">' + i + '</a></li>';
                    }
                }
                html += "<li><a>...</a></li>";
            } else {
                html += '<li><a href=\"javascript:doSearch(1);\">1</a></li>';
                html += '<li><a href=\"javascript:doSearch(2);\">2</a></li>';
                html += "<li><a>...</a></li>";
                var begin = page_curr - 2;
                var end = page_curr + 2;
                if (end > page_count) {
                    end = page_count;
                    begin = end - 4;
                    if (page_curr - begin < 2) {
                        begin = begin - 1;
                    }
                } else if (end + 1 == page_count) {
                    end = page_count;
                }
                for (var i = begin; i <= end; i++) {
                    if (page_curr == i) {

                        html += '<li class="active"><a> <span class="sr-only">(current)</span>' + i + '</a></li>';
                    } else {
                        html += '<li><a href=\"javascript:doSearch(' + i + ');\">' + i + '</a></li>';
                    }
                }
                if (end != page_count) {
                    html += "<li><a>...</a></li>";
                }
            }
        }

        if (page_curr < page_count) {
            html += "<li><a href=\"javascript:doSearch(" + (page_curr + 1) + ");\">&raquo;</a></li>"
        }
        html += "<li><a>共" + page_count + "页</a></li><li><a href=\"javascript:doSearch("+page_count+");\">末页</a></li></ul>"
    }
    $("#pages").html(html);
    //$("#pages2").html(html);
    $(select).html(html)
}
function page_jump(page_count) {
    var page_jump = $("#page_jump").val();

    if (page_jump > 0 && page_jump <= page_count) {
        doSearch(page_jump);
    }
    else {
        layer.msg("页码错误");
    }
}

/**
 * 下一页或者上一页
 * @param PAGE_COUNT
 */
function GO_PAGE(PAGE_COUNT) {

    var NEXT_PAGE = $("#NEXT_PAGE").val();

    if (NEXT_PAGE > 0 && NEXT_PAGE <= PAGE_COUNT) {
        doSearch(NEXT_PAGE);
    }
    else {
        layer.msg("输入页数不符合规范，必须是1至" + PAGE_COUNT + "的正数");
    }
}