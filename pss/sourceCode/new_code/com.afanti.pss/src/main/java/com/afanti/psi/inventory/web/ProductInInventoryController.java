package com.afanti.psi.inventory.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.commons.service.CommonsService;
import com.afanti.psi.commons.vo.Pss_dict;
import com.afanti.psi.inventory.service.ProductInInventoryService;
import com.afanti.psi.inventory.vo.Product_material_enter;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.purchasing.service.MaterialPurchaseService;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import com.afanti.psi.utils.SessionData;
import com.afanti.psi.whsemanager.service.DicWareHouseService;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 库存管理 》产品入库
 */
@Controller
@RequestMapping(value = "/inventory/productIn")
public class ProductInInventoryController extends BaseController {
    @Autowired
    private ProductInInventoryService productInInventoryService;
    @Autowired
    private MaterialPurchaseService materialPurchaseService;
    @Autowired
    private DicWareHouseService dicWareHouseService;
    @Autowired
    private CommonsService commonsService;


    @RequestMapping(value = "/inventory_productIn_list", method = RequestMethod.POST)
    @ResponseBody
    public JsonData inventory_productIn_list(HttpServletRequest request) {
        SessionData sessionData=new SessionData();
        JsonData jsonData = new JsonData();
        try {
            //时间
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
            //状态
            String stock_status=getParameterString("stock_status");
            if (stock_status==""){
                params.put("stock_status", stock_status);
            }
            else {
                String[] str=stock_status.split(",");
                String st="";
                if (str.length>1){
                    st=stock_status.substring(0,stock_status.indexOf(","));
                    for (int i=1;i<str.length;i++){
                        st+=" or t1.stock_status ="+str[i];
                    }
                }else if (str.length==1){
                    st=stock_status.substring(0,stock_status.indexOf(","));
                }
                params.put("stock_status", st);
            }

            params.put("search", getParameterString("search"));
            params.put("time",this.getParameterString("time"));
            params.put("start_time", start_time);
            params.put("end_time", end_time);
            params.put("in_type", getParameterString("in_type"));
            params.put("p", getParameterString("p"));
            Page page = productInInventoryService.getProductInInventoryPageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);

        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_inventory_type", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_inventory_type() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("p_dict_id", FunctionUtil.DIC_SUPPLER_TYPE);
            List<Pss_dict> productTypeList = commonsService.getDict(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(productTypeList);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载入库状态数据词典失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_purchasing_inventory", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_purchasing_inventory() {
        JsonData jsonData = new JsonData();
            try {
                String id=this.getParameterString("purchase_id");
                Map<String, Object> resultMap = productInInventoryService.loadPurchasingInventory(this.getParameterString("purchase_id"));
                jsonData.setResult(SUCCESS);
                jsonData.setAppend(resultMap);
                jsonData.setAppends(id);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载采购信息失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_warehouse", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_warehouse() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("f_space_id", "");
            String append = dicWareHouseService.loadChildWarehouse(null);
            jsonData.setAppend(append);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载仓位信息失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/show_inventory_detail", method = RequestMethod.POST)
    @ResponseBody
    public JsonData show_inventory_detail() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("enter_d_ids", this.getParameterString("enter_d_ids"));
            List<Product_material_enter_detail> productMaterialEnterDetailList = productInInventoryService.getProductMaterialEnterDetail(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(productMaterialEnterDetailList);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载入库详情表失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/purchasing_inventory_save", method = RequestMethod.POST)
    @ResponseBody
    public JsonData purchasing_inventory_save() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("params_value", this.getParameterString("params_value"));
            params.put("oper_id", this.getSessionData().getStaffInfo().getStaff_id());
            productInInventoryService.purchasingInventorySave(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    /**
     * 模板查询（预览）
     * @return
     */
    @RequestMapping(value ="/purchasing_inventory_Templatefind",method = RequestMethod.POST)
    @ResponseBody
    public JsonData purchasing_inventory_Templatefind(HttpServletRequest request){
        JsonData jsonData =new JsonData();
        int id =this.getParameterInteger("purchase_id");
        List<Product_material_enter> list=productInInventoryService.purchasingInventoryTemplateFind(id);
        String name=this.getSessionData().getStaffInfo().getStaff_name();
        jsonData.setResult(SUCCESS);
        jsonData.setAppend(list);
        jsonData.setAppends(name);
        return jsonData;
    }
    @RequestMapping(value = "/load_vendition_in_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_vendition_in_info() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> resultMap = productInInventoryService.loadVenditionOutInfo(this.getParameterString("sale_id"));
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(resultMap);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载销售退货产品入库信息失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/vendition_in_inventory", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_in_inventory() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("params_value",this.getParameterString("params_value"));
            params.put("P_SALE_ID", this.getParameterInteger("sale_id"));
            productInInventoryService.venditionInInventory(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载销售退货产品入库信息失败");
            e.printStackTrace();
        }
        return jsonData;
    }
//    @RequestMapping(value="/htmltopdf",method = RequestMethod.POST)
//    @ResponseBody
//    public JsonData htmltopdf( HttpServletRequest request){
//        JsonData jsonData=new JsonData();
//        String pathName=this.getParameterString("path");
////        pathName=pathName.replaceAll("/", "\\\\");
////        String path=pathName;
//        return jsonData;
//    }
    @RequestMapping(value="/report_forms",method = RequestMethod.POST)
    @ResponseBody
    public JsonData report_forms(){
        JsonData jsonData=new JsonData();
        return jsonData;
    }

}
