var pat_integer_zero = /^[0-9]*[1-9][0-9]*$/,//正整数(0)
    pat_proportion_2 = /^(([0]\d{0,6})|(0))(\.\d{1,2})?$/,//比例数值 0.22
    pat_proportion_4 = /^([0]+(?:\.\d{4,4})?)$/,//比例数值 0.2222
    pat_phone = /^0{0,1}(13[0-9]|15[0-9]|18[0-9]|14[0-9]|16[0-9]|17[0-9])[0-9]{8}$/,//手机号码
    pat_id_no = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,//身份证号
    pat_decimal_2 = /^([0-9]+(?:\.\d{1,2})?)$/,//小数 2.22
    pat_integer = /^([0-9]*[1-9][0-9]*|0)$/, //正整数
    pat_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    pat_integer_all = /^-?[1-9]\d*$/;//整数
var verify_interval, load_index_util, open_load = true, isFlag = true, append = "";
$(function () {
    check_login();
    (function ($) {
        auth_check();
        //备份jquery的ajax方法
        var _ajax = $.ajax;
        //重写jquery的ajax方法
        $.ajax = function (opt) {
            //备份opt中error和success方法
            var fn = {
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                },
                success: function (data, textStatus) {
                }
            }
            if (opt.error) {
                fn.error = opt.error;
            }
            if (opt.success) {
                fn.success = opt.success;
            }
            //扩展增强处理
            var _opt = $.extend(opt, {
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //错误方法增强处理
                    fn.error(XMLHttpRequest, textStatus, errorThrown);
                    layer.msg("提示:访问超时");
                    // setTimeout(function () {
                    //     top.location.href = '/passport/login.html';
                    // }, 2000);
                },
                success: function (data, textStatus) {
                    //成功回调方法增强处理
                    fn.success(data, textStatus);
                },
                beforeSend: function (XHR) {
                    //提交前回调方法
                    // $('body').append("<div id='ajaxInfo' style=''>正在请求数据,请稍等...</div>");
                    if (open_load) {
                        $.alle_loading_start();
                    }

                },
                complete: function (XHR, TS) {
                    //请求完成后回调函数 (请求成功或失败之后均调用)。
                    // $("#ajaxInfo").remove();;
                    if (open_load) {
                        $.alle_loading_finish();
                    }
                    for (var i = 0; i < append.length; i++) {
                        $("input[id*='" + append[i] + "']").each(function () {
                            $(this).removeAttr("disabled");
                        })
                    }
                }
            });
            _ajax(_opt);
        };
        $.alle_time2str_yymm_dd = function (timestamp) {
            if (timestamp == null || timestamp == "" || timestamp == "null")return "";
            if (timestamp.toString().length == 13) {
                timestamp = timestamp.toString().substr(0, 10);
            }
            var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
            var full_year = d.getFullYear();
            var date = (full_year) + "-" +
                (d.getMonth() + 1) + "-" +
                (d.getDate());
            return date;
        }

        $.alle_time2str_yymm_dd_hhmmss = function (timestamp) {
            if (timestamp == null || timestamp == "" || timestamp == "null")return "";
            if (timestamp.toString().length == 13) {
                timestamp = timestamp.toString().substr(0, 10);
            }
            var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
            var minutes = d.getMinutes() + "";
            if (minutes.length == 1) {
                minutes = "0" + minutes;
            }
            var month = d.getMonth() + 1 + "";
            if (month.length == 1) {
                month = "0" + month;
            }
            var days = d.getDate() + "";
            if (days.length == 1) {
                days = "0" + days;
            }
            var hours = d.getHours() + "";
            if (hours.length == 1) {
                hours = "0" + hours;
            }
            var seconds = d.getSeconds()
            if (seconds.length == 1) {
                seconds = "0" + hours;
            }
            var full_year = d.getFullYear();
            var date = (full_year) + "-" +
                (month) + "-" +
                (days) + " " + (hours) + ":" + (minutes);
            return date;
        }
        $.alle_time2str_yymm_dd_hhmm= function (timestamp) {
            if (timestamp == null || timestamp == "" || timestamp == "null")return "";
            if (timestamp.toString().length == 13) {
                timestamp = timestamp.toString().substr(0, 10);
            }
            var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
            var minutes = d.getMinutes() + "";
            if (minutes.length == 1) {
                minutes = "0" + minutes;
            }
            var month = d.getMonth() + 1 + "";
            if (month.length == 1) {
                month = "0" + month;
            }
            var days = d.getDate() + "";
            if (days.length == 1) {
                days = "0" + days;
            }
            var hours = d.getHours() + "";
            if (hours.length == 1) {
                hours = "0" + hours;
            }
            var seconds = d.getSeconds()
            if (seconds.length == 1) {
                seconds = "0" + hours;
            }
            var full_year = d.getFullYear();
            var date = (full_year) + "-" +
                (month) + "-" +
                (days) + " " + (hours) + ":" + (minutes) ;
            return date;
        }

        /**
         * 开始加载层
         */
        $.alle_loading_start = function () {
            // load_index_util =  layer.msg('加载中', {
            //     icon: 16
            //     ,shade: 0.1
        /*    // });
            load_index_util = layer.load(2, {shade: 0.1});*/
        }
        /**
         * 结束加载层
         */
        $.alle_loading_finish = function () {
            layer.close(load_index_util);
        }
        /**
         * 加载时间选择区间
         * @param select_start 开始时间控件id
         * @param select_end 结束时间控件id
         */
        $.alle_section_date = function (select_start, select_end, callback) {
            $.ajax({
                url: '/common/section_date',
                type: "POST",
                data: {type: 1},
                async: false,
                dataType: "json",
                success: function (data) {
                    if (data["result"] == "success") {
                        var params = eval(data["append"]);
                        $("#" + select_start).val(params["start_time"]);
                        $("#" + select_end).val(params["end_time"]);
                        typeof callback === 'function' && callback();
                    }
                    else {
                        layer.msg('提示:加载时间区间失败');
                    }
                }
            });
        };

        /**
         * 加载时间选择区间
         * @param select_start 开始时间控件id
         * @param select_end 结束时间控件id
         */
        $.alle_sysdate_date = function (id, callback) {
            $.ajax({
                url: '/common/section_date',
                type: "POST",
                data: {type: 2},
                async: false,
                dataType: "json",
                success: function (data) {
                    if (data["result"] == "success") {
                        var params = eval(data["append"]);
                        $("#" + id).val(params["sysdate"]);
                        typeof callback === 'function' && callback();
                    }
                    else {
                        layer.msg('提示:加载时间控件失败');
                    }
                }
            });
        };
        /**
         * 弹出编辑，详细，新增页面
         * @param url 页面url
         */
        $.alle_dialog = function (url, title, areas, callback) {
            title = (title) ? title : "&nbsp;";
            //if (title == undefined)title = "&nbsp;";
            areas = (areas) ? areas : ['93%', '90%'];
            var index = layer.open({
                type: 2,
                title: title,
                shadeClose: true,
                shade: [0.3, '#393D49'],
                maxmin: false,
                area: areas,
                offset: '20px',
                content: url,
                cancel: function () {
                    $("#rMenu").hide();
                    typeof callback === 'function' && callback();
                }
            });

            return index;
        };
        /**
         * 弹出编辑，详细，新增页面
         * @param url 页面url
         */
        $.alle_dialog_custom = function (url, title, areas, callback, width, heigth) {
            title = (title) ? title : "&nbsp;";
            //if (title == undefined)title = "&nbsp;";
            areas = (areas) ? areas : [width, heigth];
            var index = layer.open({
                type: 2,
                title: title,
                shadeClose: true,
                shade: [0.3, '#393D49'],
                maxmin: false,
                area: areas,
                content: url,
                cancel: function () {
                    typeof callback === 'function' && callback();
                }
            });
            return index;
        };
        $.alle_dialog_html = function (html, title, areas, callback) {
            title = (title) ? title : "&nbsp;";
            //if (title == undefined)title = "&nbsp;";
            areas = (areas) ? areas : ['60%', '70%'];
            var index = layer.open({
                type: 1,
                title: title,
                shadeClose: true,
                shade: [0.3, '#393D49'],
                maxmin: false,
                area: areas,
                content: html,
                cancel: function () {
                    typeof callback === 'function' && callback();
                }
            });
            return index;
        };
        /**
         * 弹出html
         * @param url 页面url
         */
        $.alle_dialog_mini = function (html) {
            layer.open({
                type: 1,
                title: "",
                shadeClose: true,
                maxmin: false,
                area: ['55%', '55%'],
                content: html
            });
        };
        $.alle_dialog_excel_mini = function (html) {
            layer.open({
                type: 1,
                title: "",
                shadeClose: true,
                maxmin: false,
                area: ['50px', '50px'],
                content: html
            });
        };
        /**
         * 弹出html
         * @param url 页面url
         */
        $.alle_dialog_img = function (url) {
            layer.open({
                type: 1,
                title: "",
                shadeClose: true,
                maxmin: false,
                area: ['640px', '400px'],
                content: "<img width='100%' height='100%' src='" + url + "'>"
            });
        };
        /**
         * 关闭dialog窗口
         */
        $.alle_dialog_close = function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        };
        /**
         * 提示信息并选中
         * @param message 提示信息
         * @param select 选择器
         * @param postion 提示位置 1上2右3下4左
         */
        $.alle_tips = function (select, message, postion, focus) {
            if (postion == undefined) {
                postion = 3;
            }
            layer.tips(message, select, {
                tips: [postion, '#F90'],
                time: 4000
            });
            if (focus) {
                $(select).focus();
            }
        };
        /**
         * 获取url中的参数
         * @param name
         * @returns {null}
         */
        $.alle_getUrlParam = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        };
        /**
         * 空对象转换
         * @param obj
         * @returns {string}
         */
        $.alle_null2Str = function (obj) {
            obj = (obj) ? obj.toString() : "";
            obj = obj.replace("undefined", "");
            obj = obj.replace("null", "");
            obj = obj.replace(undefined, "");
            obj = obj.replace(null, "");
            return (obj) ? obj.toString() : "";
        };
    })(jQuery);
});
function check_login() {
    $.ajax({
        type: 'POST',
        url: "/commons/check_login",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href = data['target'];
                }, 1000);
            }
        }
    });
}

function auth_check() {
    $.ajax({
        type: 'POST',
        url: "/common/auth_check",
        async: true,
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                append = data["append"];
                for (var i = 0; i < append.length; i++) {
                    $("#" + append[i]).removeAttr("disabled");
                    $("#" + append[i]).show();
                }
            } else {
                layer.msg(data["message"])
            }
        }
    });
}

function tip_msg(msg, id) {
    layer.tips(msg, id, {
        tips: [1, '#3595CC'],
        time: 3000
    });
}
function changeMoneyToChinese(money){
    var cnNums = new Array("零","壹","贰","叁","肆","伍","陆","柒","捌","玖"); //汉字的数字
    var cnIntRadice = new Array("","拾","佰","仟"); //基本单位
    var cnIntUnits = new Array("","万","亿","兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("角","分","毫","厘"); //对应小数部分单位
    //var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字

    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr=""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义
    if( money == "" ){
        return "";
    }
    money = parseFloat(money);
    if( money >= maxNum ){
        $.alert('超出最大处理数字');
        return "";
    }
    if( money == 0 ){
        //ChineseStr = cnNums[0]+cnIntLast+cnInteger;
        ChineseStr = cnNums[0]+cnIntLast
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
    }
    money = money.toString(); //转换为字符串
    if( money.indexOf(".") == -1 ){
        IntegerNum = money;
        DecimalNum = '';
    }else{
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0,4);
    }
    if( parseInt(IntegerNum,10) > 0 ){//获取整型部分转换
        zeroCount = 0;
        IntLen = IntegerNum.length;
        for( i=0;i<IntLen;i++ ){
            n = IntegerNum.substr(i,1);
            p = IntLen - i - 1;
            q = p / 4;
            m = p % 4;
            if( n == "0" ){
                zeroCount++;
            }else{
                if( zeroCount > 0 ){
                    ChineseStr += cnNums[0];
                }
                zeroCount = 0; //归零
                ChineseStr += cnNums[parseInt(n)]+cnIntRadice[m];
            }
            if( m==0 && zeroCount<4 ){
                ChineseStr += cnIntUnits[q];
            }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
    }
    if( DecimalNum!= '' ){//小数部分
        decLen = DecimalNum.length;
        for( i=0; i<decLen; i++ ){
            n = DecimalNum.substr(i,1);
            if( n != '0' ){
                ChineseStr += cnNums[Number(n)]+cnDecUnits[i];
            }
        }
    }
    if( ChineseStr == '' ){
        //ChineseStr += cnNums[0]+cnIntLast+cnInteger;
        ChineseStr += cnNums[0]+cnIntLast;
    }/* else if( DecimalNum == '' ){
     ChineseStr += cnInteger;
     ChineseStr += cnInteger;
     } */
    return ChineseStr;
}  