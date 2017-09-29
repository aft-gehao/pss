/**
 * Created with JetBrains PhpStorm.
 * User: kk
 * Date: 13-8-28
 * Time: 下午4:44
 */
function U() {
    var url = arguments[0] || [];
    var param = arguments[1] || {};
    var url_arr = url.split('/');

    if (!$.isArray(url_arr) || url_arr.length < 2 || url_arr.length > 3) {
        return '';
    }

    if (url_arr.length == 2)
        url_arr.unshift(_GROUP_);

    var pre_arr = ['g', 'm', 'a'];

    var arr = [];
    for (d in pre_arr)
        arr.push(pre_arr[d] + '=' + url_arr[d]);

    for (d in param)
        arr.push(d + '=' + param[d]);

    return _APP_+'?'+arr.join('&');
}


 $(function () {
//页面刷选条件内容隐藏显示
   $(".filter-down").click(function(){
    if($(".filter-box").attr("class")=='filter-box switch-close')
        {
               $(".switch-hide").show();
               $(".filter-box").addClass("switch-open");
        }
    else{
               $(".switch-hide").hide();
               $(".filter-box").removeClass("switch-open");
        }
    })
});
//页面刷选条件多选
function test(e)
{
         if($(e).attr("class")=='info active')
        {
              $(e).removeClass("info active").attr("class","info");     
        
        }
        else if($(e).attr("class")=='info'){
        
              $(e).removeClass("info").attr("class","info active"); 
        
        
        }


}

/*删除弹出框*/
function del(id) {

if(confirm("确定要删除吗？"))
    {

        var url = "index.html";
        
        window.location.href=url;       

    }

}