package com.afanti.psi.inventory.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.commons.vo.Pss_dict;
import com.afanti.psi.inventory.service.ProductOutInventoryService;
import com.afanti.psi.inventory.vo.Product_material_out;
import com.afanti.psi.inventory.vo.Product_material_out_detail;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * 库存管理 》产品出库
 */
@Controller
@RequestMapping(value = "/inventory/productOut")
public class ProductOutInventoryController extends BaseController {

    @Autowired
    private ProductOutInventoryService productInOutInventoryService;

    @RequestMapping(value = "/load_inventory_type", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_inventory_type() {
        JsonData jsonData = new JsonData();
        try {
            List<Pss_dict> inventoryTypeList = productInOutInventoryService.getInventoryTypeList();
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(inventoryTypeList);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载产品出库类型失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/inventory_out_page", method = RequestMethod.POST)
    @ResponseBody
    public JsonData inventory_out_page() {
        JsonData jsonData = new JsonData();
        try {

            DateTime dateTime = new DateTime();
            String start_time = getParameterString("start_time");
            String end_time = getParameterString("end_time");
            if (start_time == null || "".equals(start_time)) {
                start_time = dateTime.plusDays(-dateTime.getDayOfMonth() + 1).toString("yyyy-MM-dd");
            }
            if (end_time == null || "".equals(end_time)) {
                end_time = dateTime.toString("yyyy-MM-dd");
            }


            Map<String, Object> params = new HashMap<String, Object>();
            params.put("cas", getParameterString("cas"));
            params.put("sku", getParameterString("sku"));
            params.put("inventory_type", getParameterString("inventory_type"));
            params.put("out_type",getParameterString("out_type"));
            params.put("status_id",getParameterString("status_id"));
            params.put("p", getParameterString("p"));
            String time=getParameterString("time");
            time=time.replaceAll("use_time","return_time");
            params.put("time",getParameterString("time"));

            params.put("search", getParameterString("search"));
            params.put("start_time", start_time);
            params.put("end_time", end_time);
            Page page = productInOutInventoryService.getInventoryOutPageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/inventory_out_list", method = RequestMethod.POST)
    @ResponseBody
    public JsonData inventory_out_list() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("inventory_type", getParameterString("inventory_type"));
            params.put("is_all",getParameterString("is_all"));
            List<Product_material_out> list = productInOutInventoryService.getInventoryOutList(params);
            int count=productInOutInventoryService.getInventoryOutCount(params);
            jsonData.setAppend(list);
            jsonData.setAppend_ext("("+count+")");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/inventory_out_list_history", method = RequestMethod.POST)
    @ResponseBody
    public JsonData inventory_out_list_history() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",getParameterString("is_all"));
            List<Product_material_out> list = productInOutInventoryService.getInventoryOutList_history(params);
            int count=productInOutInventoryService.getInventoryOutCount_history(params);
            jsonData.setAppend(list);
            jsonData.setAppend_ext("("+count+")");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_out_inventory", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_out_inventory() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> resultMap = productInOutInventoryService.loadOutInventory(this.getParameterString("purchase_id"));
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(resultMap);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载采购信息失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/out_inventory_sbmit", method = RequestMethod.POST)
    @ResponseBody
    public JsonData out_inventory_sbmit() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("params_value",this.getParameterString("params_value"));
            params.put("POUT_STAFF_ID", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("POUT_OUT_TYPE", FunctionUtil.INVENTORY_OUT_TYPE_CGTH);
            params.put("POUT_OUT_NAME", this.getParameterString("out_name"));
            productInOutInventoryService.outInventorySubmit(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
Logger logger=Logger.getLogger(ProductInInventoryController.class.getName());
    @RequestMapping(value = "/vendition_out_inventory", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_out_inventory() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("params_value",this.getParameterString("params_value"));
            params.put("P_OUT_NAME", this.getParameterString("out_name"));
            params.put("P_OPER_ID", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("P_SALE_ID", this.getParameterString("sale_id"));
            String resultMsg = productInOutInventoryService.venditionOutinventory(params);
            logger.info(resultMsg);
            if ("A0000".equals(resultMsg)) {
                jsonData.setResult(SUCCESS);
                jsonData.setMessage("操作成功");
            } else if ("A0004".equals(resultMsg)) {
                resultMsg = "当前产品库存不足，请查看库存";
                jsonData.setResult(FAIL);
                jsonData.setMessage(resultMsg);
            } else {
                resultMsg = "操作失败";
                jsonData.setResult(FAIL);
                jsonData.setMessage(resultMsg);
            }
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/out_inventory_detail", method = RequestMethod.POST)
    @ResponseBody
    public JsonData out_inventory_detail() {//采退
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("purchase_d_id", this.getParameterString("purchase_d_id"));
            Product_material_out_detail  productMaterialOutDetail = productInOutInventoryService.getInventoryDetail(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(productMaterialOutDetail);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/out_inventory_FeedBackPreview",method = RequestMethod.POST)
    @ResponseBody
    public JsonData out_inventory_FeedBackPreview(){
        int purchase_id=this.getParameterInteger("purchase_id");
        JsonData jsonData=new JsonData();
        List<Product_material_out> list = productInOutInventoryService.out_inventory_FeedBackPreview(this.getParameterInteger("purchase_id"));
        String name=this.getSessionData().getStaffInfo().getStaff_name();
        jsonData.setResult(SUCCESS);
        jsonData.setAppend(list);
        jsonData.setAppends(name);
        return jsonData;
    }
}
