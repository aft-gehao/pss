package com.afanti.psi.purchasing.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.purchasing.service.MaterialPurchaseReturnService;
import com.afanti.psi.purchasing.service.MaterialPurchaseService;
import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
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
 * 采购管理 》采购退货
 */
@Controller
@RequestMapping(value = "/meterialpurchease/return")
public class MeterialPurcheaseReturnController extends BaseController {
    @Autowired
    private MaterialPurchaseService materialPurchaseService;
    @Autowired
    private MaterialPurchaseReturnService materialPurchaseReturnService;
    @RequestMapping(value = "/material_purchase_return_page", method = RequestMethod.POST)
    @ResponseBody
    public JsonData material_purchase_return_page(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            DateTime dateTime = new DateTime();
            String start_time = getParameterString("start_time");
            String end_time = getParameterString("end_time");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("cas", getParameterString("cas"));
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
            if(String.valueOf(params.get("status")).equals("(5001)")){
                Page page = materialPurchaseService.getMaterialPurchasePageList(params);
                jsonData.setAppend(page);
            }
            else{
                Page page = materialPurchaseReturnService.getMaterialPurchaseReturnPageList(params);
                jsonData.setAppend(page);
            }
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("查询采购列表失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/load_purchasing_inventory_return_list", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_purchasing_inventory_return_list() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("purchase_id", this.getParameterInteger("purchase_id"));
            Map<String, Object> resultMap = materialPurchaseReturnService.loadInventoryReturnList(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(resultMap);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载采购信息失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/purchansing_return_sumbit", method = RequestMethod.POST)
    @ResponseBody
    public JsonData purchansing_return_sumbit() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("PR_STAFF_ID", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("params_value",this.getParameterString("params_value"));
            materialPurchaseReturnService.purchansingReturnSumbit(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/PurchaseReturn_detail", method = RequestMethod.POST)
    @ResponseBody
    public JsonData PurchaseReturn_detail() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("purchase_id",this.getParameterInteger("purchase_id"));
            List<Material_purchase> list = materialPurchaseReturnService.PurchaseReturn_detail(params);
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
}
