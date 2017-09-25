/**
 * Created by zhuxiang on 2015/10/8 0008.
 */


/**
 *
 * @param page_curr 当前页索引
 * @param page_count 总页数
 */
function PAGE_INIT(select, page_curr, page_count) {
    var html = "";
    if (page_count <= 0) {
        html += "<a class=\"lab\">没有查到相关结果</a>";
    } else {
        if (page_curr <= 1) {
            page_curr == 1;
        }
        if (page_curr >= page_count) {
            page_curr = page_count;
        }

        if (page_curr > 1) {
            html += "<a href=\"javascript:doSearch(" + (page_curr - 1) + ")\">上一页</a>"
        }

        //分页处理
        if (page_count <= 8) {
            for (var i = 1; i <= page_count; i++) {
                if (page_curr == i) {
                    html += '<a href="" class="curr">' + i + '</a>';
                } else {
                    html += '<a>' + i + '</a>';
                }
            }
        } else {
            if (page_curr <= 5) {
                for (var i = 1; i <= 7; i++) {
                    if (page_curr == i) {
                        html += '<a class="curr">' + i + '</a>';
                    } else {
                        html += '<a href=\"javascript:doSearch(' + i + ');\">' + i + '</a>';
                    }
                }
                html += "...";
            } else {
                html += '<a href=\"javascript:doSearch(1);\">1</a>';
                html += '<a href=\"javascript:doSearch(2);\">2</a>';
                html += "...";

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
                        html += '<a class="curr">' + i + '</a>';
                    } else {
                        html += '<a href=\"javascript:doSearch(' + i + ');\">' + i + '</a>';
                    }
                }
                if (end != page_count) {
                    html += "...";
                }
            }
        }

        if (page_curr < page_count) {
            html += "<a href=\"javascript:doSearch(" + (page_curr + 1) + ")\">下一页</a>"
        }
        
        html += "<a class=\"lab\">共" + page_count + "页,到第</a><input id=\"page_jump\" type=\"text\"><a class=\"lab\">页</a><a href=\"javascript:page_jump(" + page_count + ");\">确定</a>"
    }
    $(select).attr("class", "alle_page").html(html);
}

function page_jump(page_count) {
    var page_jump = $("#page_jump").val();

    if (page_jump > 0 && page_jump <= page_count) {
        doSearch(page_jump);
    }
    else {
        layer.msg("输入页数不符合规范");
    }
}

/**
 * 封装Ajax分页
 * @param CURRENT_PAGE 当前页码
 * @param BEGIN_INDEX 开始页码
 * @param END_INDEX  结束页码
 * @param PAGE_COUNT 总页数
 * @param PAGE_SIZE  页面条数
 * @constructor
 */
function PAGE_HELP(CURRENT_PAGE, BEGIN_INDEX, END_INDEX, PAGE_COUNT, PAGE_SIZE) {

    var htmlStr = '';

    var C_PAGE = CURRENT_PAGE;

    //当前页
    var CURRENT_PAGE_Z = 1;

    if (C_PAGE) {
        CURRENT_PAGE_Z = C_PAGE;
    }

    var BEGIN_INDEX_Z = BEGIN_INDEX;

    var END_INDEX_Z = END_INDEX;

    var BACK_PAGE = CURRENT_PAGE_Z - 1;

    var NEXT_PAGE = CURRENT_PAGE_Z + 1;

    if (PAGE_COUNT > 0) {
        htmlStr += '<div><a  href="javascript:doSearch(1)">[首页]</a>';
        <!-- 上一页显示 -->
        if (BACK_PAGE > 0) {
            htmlStr += '<a  href="javascript:doSearch(' + BACK_PAGE + ')" >[上页]</a>';
        }
        <!-- 中部页显示 -->
        var P_P = 0;

        var PAGE_NUM = 20;
        if (END_INDEX_Z >= PAGE_NUM) {
            var PAGE_NOW = parseInt(CURRENT_PAGE_Z / PAGE_NUM);
            if (PAGE_NOW <= 0) {
                BEGIN_INDEX_Z = 1;
            } else {
                BEGIN_INDEX_Z = PAGE_NOW * PAGE_NUM;
            }

            END_INDEX_Z = (PAGE_NOW + 1) * PAGE_NUM;
            if (END_INDEX_Z > PAGE_COUNT) {
                END_INDEX_Z = PAGE_COUNT;
            }
        }

        for (var i = BEGIN_INDEX_Z; i <= END_INDEX_Z; i++) {
            if (i == CURRENT_PAGE_Z) {
                htmlStr += '<span  onclick="javascript:doSearch(' + i + ')">[' + i + ']</span>';
            } else {
                htmlStr += '<a   href="javascript:doSearch(' + i + ')">[' + i + ']</a>';
            }
            P_P++;
        }

        <!-- 下一页显示 -->
        if (NEXT_PAGE <= PAGE_COUNT) {
            htmlStr += '<a  href="javascript:doSearch(' + NEXT_PAGE + ')">[下页]</a>';
        }

        htmlStr += '<a  href="javascript:doSearch(' + PAGE_COUNT + ')">[尾页]</a>';

        htmlStr += '<input  style="width: 30px;" type="text"   id="NEXT_PAGE" size="1" />';

        htmlStr += '<a  href="javascript:GO_PAGE(' + PAGE_COUNT + ')">[跳转]</a>';
    }
    else {
        htmlStr += '<div><h3>抱歉没有查到相关结果.</h3></div>';
    }
    if (PAGE_COUNT > 0) {
        htmlStr += '<a>共' + PAGE_COUNT + '页</a></div>';
    }
    $("#pages").html(htmlStr);
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