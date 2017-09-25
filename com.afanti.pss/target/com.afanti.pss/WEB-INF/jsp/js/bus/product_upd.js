var product_id = "";
$(function () {
    product_id = $.alle_getUrlParam("product_id");
    $("#submit").click(function () {
        upd_product_submit();
    })
    $("#cancel").click(function () {
        window.location.href = "/infomanager/product/index.html";
    })
    $("#back").click(function () {
        window.location.href = "/infomanager/product/index.html";
    })
    load_product_info();
})

function load_product_info() {
    $.ajax({
        type: 'POST',
        url: "/product/manager/load_product_info",
        data: {
            product_id: product_id,
        },
        dataType: "json",
        success: function (data) {
            if (data["result"] == "success") {
                $("#warning_amount").val(data["append"]["warning_amount"]);
                //清空库存预警线
                if($("#warning_amount").val()==0)
                {
                    $("#warning_amount").val("");
                }
                $("#purity_category").val(data["append"]["purity_category"]);
                $("#sku").val(data["append"]["sku"]);
                $("#cas").val(data["append"]["cas"]);
                $("#name_ch").val(data["append"]["name_ch"]);
                $("#name_en").val(data["append"]["name_en"]);
                $("#mol_weight").val(data["append"]["mol_weight"]);
                $("#mol_formula").val(data["append"]["mol_formula"]);
                $("#mol").val(data["append"]["mol"]);
                $("#smiles").val(data["append"]["smiles"]);
                $("#hazard").val(data["append"]["hazard"]);
                $("#precautionary").val(data["append"]["precautionary"]);
                $("#ghs_code").val(data["append"]["ghs_code"]);
                $("#msds").val(data["append"]["msds"]);
                $("#website_url").val(data["append"]["website_url"]);
                $("#form").val(data["append"]["form"]);
                $("#purity").val(data["append"]["purity"]);
                $("#mdl_number").val(data["append"]["mdl_number"]);
                $("#imghead").attr("src", data["append"]["imgage"]);
            } else {
                layer.msg(data["message"]);
            }
        }
    });
}

function load_product_type(product_type) {
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
                    if (append[i]["dict_id"] == product_type) {
                        html += "<option selected='selected' value='" + append[i]["dict_id"] + "'>" + append[i]["dict_name"] + "</option>"
                    } else {
                        html += "<option value='" + append[i]["dict_id"] + "'>" + append[i]["dict_name"] + "</option>"
                    }
                }
                $("#product_type").html(html);
            }
        }
    });
}

function upd_product_submit() {

    var warning_amount = $("#warning_amount").val();
    var name_ch = $("#name_ch").val();
    var name_en = $("#name_en").val();
    var mol_weight = $("#mol_weight").val();
    var mol_formula = $("#mol_formula").val();
    var mol = $("#mol").val();
    var smiles = $("#smiles").val();
    var cas = $("#cas").val();
    var product_type =$("#product_type").val();
    var src = JSON.stringify($("#imghead").attr("src"));
    var mdl_number = $("#mdl_number").val();
    var purity = $("#purity").val();
    var form = $("#form").val();
    var website_url = $("#website_url").val();
    var msds = $("#msds").val();
    var ghs_code = $("#ghs_code").val();
    var precautionary = $("#precautionary").val();
    var hazard = $("#hazard").val();
    var ghs_code = $("#ghs_code").val();
    var sku = $("#sku").val();

    $.ajax({
        type: 'POST',
        url: "/product/manager/product_upd",
        data: {
            warning_amount:warning_amount,
            product_id: product_id,
            name_ch: name_ch,
            name_en: name_en,
            mol_weight: mol_weight,
            mol_formula: mol_formula,
            mol: mol,
            smiles: smiles,
            cas: cas,
            product_type:product_type,
            imgage: src.replace('"', '').replace('"', ''),
            mdl_number:mdl_number,
            purity:purity,
            form:form,
            website_url:website_url,
            msds:msds,
            ghs_code:ghs_code,
            precautionary:precautionary,
            hazard:hazard,
            sku:sku,
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