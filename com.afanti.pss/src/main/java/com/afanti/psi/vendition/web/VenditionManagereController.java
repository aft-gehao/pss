package com.afanti.psi.vendition.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.product.vo.Product_material_info;
import com.afanti.psi.shinfo.vo.Cus_Supplier_info;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.service.VenditionService;
import com.afanti.psi.vendition.vo.SelectProductInventory;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 销售管理 》销售退货
 */
@Controller
@RequestMapping(value = "/vendition/manager")
public class VenditionManagereController extends BaseController {

    @Autowired
    private VenditionService venditionService;

    @RequestMapping(value = "/vendition_purchase_page", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_purchase_page(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            DateTime dateTime = new DateTime();
            String start_time = getParameterString("start_time");
            String end_time = getParameterString("end_time");

            Map<String, Object> params = new HashMap<String, Object>();
            params.put("cas", getParameterString("cas"));
            params.put("sku", getParameterString("sku"));
            params.put("start_time", start_time);
            params.put("end_time", end_time);
            params.put("status",getParameterString("status"));
            params.put("search",getParameterString("search"));
            params.put("time",getParameterString("time"));
            params.put("p", getParameterString("p"));
            Page page = venditionService.getVenditionPageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("查询采购列表失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/vendition_product_page_list", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_product_page_list() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("sku", this.getParameterString("sku"));
            params.put("cas", this.getParameterString("cas"));
            params.put("product_name", this.getParameterString("product_name"));
            params.put("batch_nos",this.getParameterString("batch_nos"));
            params.put("product_type", "");
            params.put("p", this.getParameterInteger("p"));
            Page<SelectProductInventory> productInventoryList = venditionService.getProductInventoryList(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(productInventoryList);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载销售选择产品库存列表失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/vendition_sumbit", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_sumbit() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("all_total", this.getParameterInteger("all_total"));
            params.put("sale_time", new Date());
            params.put("sale_name", this.getParameterString("sale_name"));
            params.put("customer_id", this.getParameterInteger("customer_id"));
            params.put("c_linkman_id", this.getParameterInteger("c_linkman_id"));
            params.put("staff_id", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("desc", this.getParameterString("desc"));
            params.put("sale_isdel",getParameterString("sale_isdel"));
            params.put("vendition_detail_params", this.getParameterString("vendition_detail_params"));
            venditionService.venditionSumbit(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/vendition_quoation", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_quoation() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("all_total", this.getParameterInteger("all_total"));
            params.put("sale_time", new Date());
            params.put("sale_way", this.getParameterString("sale_way"));
            params.put("sale_name", this.getParameterString("sale_name"));
            params.put("customer_id", this.getParameterInteger("customer_id"));
            params.put("c_linkman_id", this.getParameterInteger("c_linkman_id"));
            params.put("staff_id", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("desc", this.getParameterString("desc"));
            params.put("sale_isdel",getParameterString("sale_isdel"));
            params.put("vendition_detail_params", this.getParameterString("vendition_detail_params"));
            jsonData.setAppend(venditionService.venditionSumbit_quoation(params).getSale_d_id());
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/vendition_upd_submit", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_upd_submit() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("sale_id", this.getParameterInteger("sale_id"));
            params.put("all_total", this.getParameterInteger("all_total"));
            params.put("sale_name", this.getParameterString("sale_name"));
            params.put("customer_id", this.getParameterInteger("customer_id"));
            params.put("c_linkman_id", this.getParameterInteger("c_linkman_id"));
            params.put("staff_id", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("desc", this.getParameterString("desc"));
            params.put("vendition_detail_params", this.getParameterString("vendition_detail_params"));
            venditionService.venditionUpdSubmit(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_vendition_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_vendition_info() {
        JsonData jsonData = new JsonData();
        try {
            String id=this.getParameterString("sale_id");
            Map<String, Object> resultMap = venditionService.loadVenditionInfo(this.getParameterString("sale_id"));
            jsonData.setAppend(resultMap);
            jsonData.setAppends(id);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载销售信息失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/del_vendition", method = RequestMethod.POST)
    @ResponseBody
    public JsonData del_vendition() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("sale_id", this.getParameterString("sale_id"));
            venditionService.delVendition(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/materialQuotationSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData materialQuotationSelect() {
        JsonData jsonData = new JsonData();
        try {
            DateTime dateTime = new DateTime();
            String start_time = getParameterString("start_time");
            String end_time = getParameterString("end_time");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("sku", this.getParameterString("sku"));
            params.put("cas", this.getParameterString("cas"));
            params.put("start_time", start_time);
            params.put("end_time", end_time);
            params.put("search",getParameterString("search"));
            params.put("time",getParameterString("time"));
            //页码
            params.put("p", getParameterString("p"));
            Page page = venditionService.materialQuotationSelect(params);
            //在append中塞入page数据
            jsonData.setAppend(page);
            jsonData.setAppends(getSessionData().getStaffInfo().getStaff_name());
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/add_xunjia", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_xunjia() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("purity", getParameterString("purity"));
            params.put("amount", getParameterString("amount"));
            params.put("unit", getParameterString("unit"));
            params.put("price", getParameterString("price"));
            params.put("lead_start", getParameterString("lead_start"));
            params.put("lead_end", getParameterString("lead_end"));
            params.put("custom", getParameterInteger("custom_id"));
            params.put("create_time", new Date());
            params.put("time", new Date());
            params.put("product_id", getParameterString("product_id"));
            params.put("staff_id", getSessionData().getStaffInfo().getStaff_id());
            params.put("status",0);//暂定
            params.put("rate",getParameterString("add_rate"));
            venditionService.add_xunjia(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    //根据cas查询
    @RequestMapping(value = "/select_cas", method = RequestMethod.POST)
    @ResponseBody
    public JsonData select_cas() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("cas", getParameterString("cas"));
            List<Product_material_info> list= venditionService.select_cas(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(list);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    //根据sku查询
    @RequestMapping(value = "/select_sku", method = RequestMethod.POST)
    @ResponseBody
    public JsonData select_sku() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("sku", getParameterString("sku"));
            List<Product_material_info> list= venditionService.select_sku(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(list);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    //根据customer_name查询
    @RequestMapping(value = "/select_customer", method = RequestMethod.POST)
    @ResponseBody
    public JsonData select_customer() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("name", getParameterString("customer_name"));
            List<Cus_Supplier_info> list= venditionService.select_customer(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(list);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/add_customer", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_customer() {
        JsonData jsonData = new JsonData();
        try {
            Cus_Supplier_info cus_supplier_info=new Cus_Supplier_info();
            cus_supplier_info.setStatus(0);
            cus_supplier_info.setName(getParameterString("customer_name"));
            cus_supplier_info.setCustomer_id(0);
            cus_supplier_info.setSupplier_id(1);
            cus_supplier_info.setType(0);
            cus_supplier_info.setCreate_oper(this.getSessionData().getStaffInfo().getStaff_id());
            cus_supplier_info.setCreate_time(new Date());
            int cs_sup_id= venditionService.add_customer(cus_supplier_info);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(cus_supplier_info.getCs_sup_id());
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/add_product", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_product() {
        JsonData jsonData = new JsonData();
        try {
           Product_material_info product_material_info=new Product_material_info();
            product_material_info.setCas(getParameterString("cas"));
            product_material_info.setSku(getParameterString("sku"));
            product_material_info.setName_en(getParameterString("name_en"));
            product_material_info.setProduct_type(getParameterInteger("product_type"));
            product_material_info.setImgage(getParameterString("imgage"));
            product_material_info.setCreate_oper(this.getSessionData().getStaffInfo().getStaff_id());
            product_material_info.setModify_oper(this.getSessionData().getStaffInfo().getStaff_id());
            product_material_info.setCreate_time(new Date());
            product_material_info.setModify_time(new Date());
            product_material_info.setStatus(0);
            int product_id= venditionService.add_product(product_material_info);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(product_material_info.getProduct_id());
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/select_amount", method = RequestMethod.POST)
    @ResponseBody
    public JsonData select_amount() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("product_id", getParameterString("product_id"));
            params.put("unit", getParameterString("unit"));
            List<Product_material_enter_detail> list= venditionService.select_amount(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(list);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/add_task", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_task() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("product_id", getParameterString("product_id"));
            params.put("unit", getParameterString("unit"));
            params.put("amount",getParameterString("amount"));
            params.put("create_staff",getSessionData().getStaffInfo().getStaff_id());
            params.put("create_time",new Date());
            params.put("status",0);
            params.put("quotation_id",getParameterString("quotation_id"));
            venditionService.add_task(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/select_hetong_no", method = RequestMethod.POST)
    @ResponseBody
    public JsonData select_hetong_no() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            DateTime dateTime=new DateTime();
            int count=venditionService.select_hetong_no(params);
            if(count>=10)
            {
                String str= dateTime.toString("yyyyMMdd")+String.valueOf(count);
                jsonData.setAppend(str);
            }
            else {
                String str = dateTime.toString("yyyyMMdd") + "0" + String.valueOf(count);
                jsonData.setAppend(str);
            }
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/info_select", method = RequestMethod.POST)
    @ResponseBody
    public JsonData info_select() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("cas", getParameterString("cas"));
            params.put("sku", getParameterString("sku"));
            params.put("name_en", getParameterString("name_en"));
            params.put("customer_name",getParameterString("customer_name"));
            params.put("amount",getParameterString("add_amount"));
            int product_id=venditionService.select_id_cas(params);
            int cus_id=venditionService.selec_id_cus(params);
            params.put("create_time",new Date());
            params.put("create_oper",this.getSessionData().getStaffInfo().getStaff_id());
            jsonData.setAppend(product_id);
            jsonData.setAppend_ext(cus_id);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/select_vendition", method = RequestMethod.POST)
    @ResponseBody
    public JsonData select_vendition() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("sale_d_id", this.getParameterInteger("sale_d_id"));
            jsonData.setAppend(venditionService.select_vendition(params));
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/vendition_updata", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_updata() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("amount", this.getParameterString("amount"));
            params.put("purity", this.getParameterString("purity"));
            params.put("unit", this.getParameterString("unit"));
            params.put("unit_price", this.getParameterString("unit_price"));
            params.put("sale_d_id", this.getParameterString("sale_d_id"));
            venditionService.vendition_updata(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
}
