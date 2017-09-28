package com.afanti.psi.purchasing.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.consumable.vo.consumable_purchase;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.product.service.ProductMeterialInfoService;
import com.afanti.psi.purchasing.service.MaterialPurchaseService;
import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.purchasing.vo.Material_purchase_detail;
import com.afanti.psi.shinfo.service.Cus_SupplierInfoService;
import com.afanti.psi.shinfo.vo.Linkman;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.logging.Logger;

/**
 * 采购管理 》采购管理
 */
@Controller
@RequestMapping(value = "/meterialpurchease/manager")
public class MeterialPurcheaseController extends BaseController {

    @Autowired
    private MaterialPurchaseService materialPurchaseService;
    @Autowired
    private Cus_SupplierInfoService supplierInfoService;
    @Autowired
    private ProductMeterialInfoService productMeterialInfoService;

    @RequestMapping(value = "/material_purchase_page", method = RequestMethod.POST)
    @ResponseBody
    public JsonData material_purchase_page(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            DateTime dateTime = new DateTime();
            String start_time = this.getParameterString("start_time");
            String end_time = this.getParameterString("end_time");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("cas", this.getParameterString("cas"));
            params.put("time",this.getParameterString("time"));
            if(String.valueOf(this.getParameterString("status"))!=""){
                String[] statuss=String.valueOf(this.getParameterString("status")).split(",");
                String status ="(";
                for(int i=0;i<statuss.length;i++) {
                    if (i == statuss.length - 1) {
                        status += statuss[i].toString();

                    } else {
                        status +=statuss[i].toString() +",";
                    }
                }
                status +=")";
                params.put("status",status.toString());
            }
            params.put("start_time", start_time);
            params.put("end_time", end_time);
            params.put("p", getParameterString("p"));
            Page page = materialPurchaseService.getMaterialPurchasePageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("查询采购列表失败");
            e.printStackTrace();
        }
        return jsonData;
    }



    @RequestMapping(value = "/purchaseing_save", method = RequestMethod.POST)
    @ResponseBody
    public JsonData purchaseing_save() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("purchase_time", new Date());
            params.put("all_total", this.getParameterString("all_total"));
            params.put("purchase_name", this.getParameterString("purchase_name"));
            params.put("supplier_id", this.getParameterString("supplier_id"));
            params.put("s_linkman_id", this.getParameterString("s_linkman_id"));
            params.put("customer_id",this.getSessionData().getStaffInfo().getStaff_id());
            params.put("staff_id", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("desc", this.getParameterString("desc"));
            params.put("purchasing_detail_params", this.getParameterString("purchasing_detail_params"));
            materialPurchaseService.purchaseingSave(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_purchasing_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_purchasing_info() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> resultMap = materialPurchaseService.loadPurchasingInfo(this.getParameterString("purchase_id"));
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(resultMap);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/purchaseing_upd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData purchaseing_upd()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("purchase_id",this.getParameterString("purchase_id"));
            params.put("all_total", this.getParameterString("all_total"));
            params.put("purchase_name", this.getParameterString("purchase_name"));
            params.put("supplier_id", this.getParameterString("supplier_id"));
            params.put("s_linkman_id", this.getParameterString("s_linkman_id"));
            params.put("staff_id", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("desc", this.getParameterString("desc"));
            params.put("purchasing_detail_params", this.getParameterString("purchasing_detail_params"));
            materialPurchaseService.purchaseingUpd(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/material_purchase_del", method = RequestMethod.POST)
    @ResponseBody
    public JsonData material_purchase_del()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("purchase_id",this.getParameterString("purchase_id"));
            materialPurchaseService.purchaseingDel(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/supplier_product_page_list", method = RequestMethod.POST)
    @ResponseBody
    public JsonData supplier_product_page_list()
    {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("cas", getParameterString("cas"));
            params.put("supplier_id",getParameterString("supplier_id"));
            params.put("product_name", getParameterString("product_name"));
            params.put("product_type", getParameterString("product_type"));
            params.put("product_ids",getParameterString("product_ids"));
            params.put("supplier_id",getParameterString("supplier_id"));
            params.put("p", getParameterString("p"));
            Page page = productMeterialInfoService.getSupplierProductPageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/work_select", method = RequestMethod.POST)
    @ResponseBody
    public JsonData work_select(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("status",11001);
            params.put("is_all",this.getParameterInteger("is_all"));
          /*  params.put("limit",1);*/
            int conCount=materialPurchaseService.getPurchaseCount(params);
            int conPurCount=materialPurchaseService.getConsumablePurchaseCount(params);
            List<Material_purchase_detail> list =materialPurchaseService.getPurchase(params);
            List<consumable_purchase> list1 =materialPurchaseService.getConsumablePurchase(params);
            jsonData.setAppend(list);
            jsonData.setAppends(list1);
            jsonData.setAppend_ext("("+conCount+")");
            jsonData.setAppend_ext2("("+conPurCount+")");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("查询采购列表失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/fahuo", method = RequestMethod.POST)
    @ResponseBody
    public JsonData fahuo()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("use_id",this.getParameterString("use_id"));
            params.put("status",this.getParameterString("status"));
            params.put("kd_code",this.getParameterString("kd_code"));
            params.put("kd_num",this.getParameterString("kd_num"));
            materialPurchaseService.fahuo(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/add_pur_for_cg", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_pur_for_cg()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("cas",this.getParameterString("cas"));
            params.put("name_ch",this.getParameterString("name_ch"));
            params.put("purity",this.getParameterString("purity"));
            params.put("use_name","采购经理快速创建");
            params.put("staff_id",this.getSessionData().getStaffInfo().getStaff_id());
            params.put("supplier_name",this.getParameterString("supplier_name"));
            params.put("supplier_id",this.getParameterString("supplier_id"));
            params.put("amount",this.getParameterString("amount"));
            params.put("unit",this.getParameterString("unit"));
            params.put("unit_price",this.getParameterString("price"));
            params.put("desc",this.getParameterString("desc"));
            params.put("product_id",this.getParameterString("product_id"));
            materialPurchaseService.add_pur_for_cg(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/pur_upd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData pur_upd()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("purchase_d_id",this.getParameterString("purchase_d_id"));
            params.put("supplier_name",this.getParameterString("supplier_name"));
            params.put("purchase_id",this.getParameterString("purchase_id"));
            params.put("amount",this.getParameterString("amount"));
            params.put("desc",this.getParameterString("desc"));
            params.put("unit",this.getParameterString("unit"));
            params.put("unit_price",this.getParameterString("unit_price"));
            materialPurchaseService.pur_upd(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/select_enter_time", method = RequestMethod.POST)
    @ResponseBody
    public JsonData select_enter_time(HttpServletRequest request)
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("purchase_d_id",this.getParameterString("purchase_d_id"));
            Product_material_enter_detail info= materialPurchaseService.select_enter_time(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(info);
            jsonData.setMessage("操作成功");
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/selectProduct", method = RequestMethod.POST)
    @ResponseBody
    public JsonData selectProduct() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("sku",this.getParameterString("sku"));
            params.put("cas",this.getParameterString("cas"));
            int product_id= materialPurchaseService.selectProduct(params);
            jsonData.setAppend(product_id);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
     //采购原料所需要上传的合同以及付款材料记录
    @RequestMapping(value = "/add_doc", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_material() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("purchase_d_id",this.getParameterString("purchase_d_id"));
            params.put("doc_time",new Date());
            params.put("doc_staff",this.getSessionData().getStaffInfo().getStaff_id());
            if(this.getParameterString("hetong")!=null)
            {
                String[] hetong=this.getParameterString("hetong").split(",");
                for (int i=0;i<hetong.length;i++)
                {
                    params.put("hetong",hetong[i]);
                    materialPurchaseService.addhetong(params);
                }
            }
            if(this.getParameterString("material")!=null)
            {
                String[] material=this.getParameterString("material").split(",");
                for (int i=0;i<material.length;i++)
                {
                    params.put("material",material[i]);
                    materialPurchaseService.addmaterial(params);
                }
            }
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    /*@RequestMapping(value = "/material_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData material_info()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("cas",this.getParameterString("cas"));
            params.put("name_ch",this.getParameterString("name_ch"));
            params.put("sku",this.getParameterString("sku"));
            materialPurchaseService.fahuo(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }*/

}
