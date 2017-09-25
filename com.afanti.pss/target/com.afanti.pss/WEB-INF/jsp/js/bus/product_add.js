$(function () {
    $("#submit").click(function () {
        add_product_submit();
    })
    $("#cancel").click(function () {
        window.location.href = "/infomanager/product/index.html";
    })
    //加载产品类型
    load_product_type();
})

function load_product_type() {
    $.ajax({
        type: 'POST',
        url: "/product/manager/load_product_type",
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#product_type").html("");
                var html = "<option value=''>请选择</option>";
                var append = data["append"];
                for (var i = 0; i < append.length; i++) {
                    html += "<option value='" + append[i]["dict_id"] + "'>" + append[i]["dict_name"] + "</option>"
                }
                $("#product_type").html(html);
            }
        }
    });
}
function add_product_submit() {
    var warning_amount = $("#warning_amount").val();
    var name_ch = $("#name_ch").val();
    var name_en = $("#name_en").val();
    var mol_weight = $("#mol_weight").val();
    var mol_formula = $("#mol_formula").val();
    var mol = $("#mol").val();
    var sku = $("#sku").val();
    var smiles = $("#smiles").val();
    var cas = $("#cas").val();
    var product_type = $("#product_type").val();
    var src = JSON.stringify($("#imghead").attr("src"));
    var mdl_number = $("#mdl_number").val();
    var purity = $("#purity").val();
    var form = $("#form").val();
    var website_url = $("#website_url").val();
    var msds = $("#msds").val();
    var ghs_code = $("#ghs_code").val();
    var purity_category = $("#purity_category").val();
    var precautionary = $("#precautionary").val();
    var mol_weight = $("#mol_weight").val();
    var hazard = $("#hazard").val();
    var ghs_code = $("#ghs_code").val();

    var image = src.substring(src.lastIndexOf("/") + 1, src.length - 1);
    $.ajax({
        type: 'POST',
        url: "/product/manager/product_add",
        data: {
            warning_amount:warning_amount,
            purity_category:purity_category,
            mol_weight:mol_weight,
            name_ch: name_ch,
            sku:sku,
            name_en: name_en,
            mol_weight: mol_weight,
            mol_formula: mol_formula,
            mol: mol,
            smiles: smiles,
            cas: cas,
            product_type: product_type,
            imgage: src.replace('"', '').replace('"', ''),
            mdl_number:mdl_number,
            purity:purity,
            form:form,
            website_url:website_url,
            msds:msds,
            ghs_code:ghs_code,
            precautionary:precautionary,
            hazard:hazard,
            ghs_code:ghs_code
        },
        dataType: "json",
        success: function (data) {
            layer.msg(data["message"]);
            if (data["result"] == "success") {
                setTimeout(function () {
                    window.location.href = "/infomanager/product/index.html";
                }, 1000);
            }
        }
    });


}
$("#view").click(function(){

    window.location.href = $("#msds").val();
})