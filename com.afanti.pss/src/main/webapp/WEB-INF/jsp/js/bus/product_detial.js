var product_id="",imgage="";
$(function () {
    product_id  = $.alle_getUrlParam("product_id");
    $("#back").click(function () {
        window.location.href = '/infomanager/product/index.html';
    })
    load_product_info();
    $("#imghead").click(function () {
        show_image();
    })
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

function show_image()
{
    layer.open({
        type: 1,
        title: "",
        shadeClose: true,
        maxmin: false,
        area: ['80%', '70%'],
        content: "<img width='100%' height='100%' src='" + imgage + "'>"
    });
}