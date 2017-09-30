package com.afanti.psi.vendition.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.service.VenditionReturnService;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 销售管理 》销售退货
 */
@Controller
@RequestMapping(value = "/vendition/return")
public class VenditionReturnController extends BaseController {

    @Autowired
    private VenditionReturnService venditionReturnService;

    @RequestMapping(value = "/vendition_retun_page", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_retun_page(HttpServletRequest request) {
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
            Page page = venditionReturnService.getVenditionReturnPageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("查询采购列表失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_vendition_inventory", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_vendition_inventory() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> resultMap = venditionReturnService.loadVenditionInventory(this.getParameterString("sale_id"));
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(resultMap);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载销售退货失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/vendition_return_submit", method = RequestMethod.POST)
    @ResponseBody
    public JsonData vendition_return_submit() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("params_value",this.getParameterString("params_value"));
            params.put("P_SALE_ID", this.getParameterString("sale_id"));
            params.put("P_STAFF_ID", this.getSessionData().getStaffInfo().getStaff_id());
            venditionReturnService.venditionReturnSubmit(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/return_submit", method = RequestMethod.POST)
    @ResponseBody
    public JsonData return_submit() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("sale_d_id",this.getParameterString("sale_d_id"));
            params.put("sale_id",this.getParameterString("sale_id"));
            params.put("staff_id",this.getSessionData().getStaffInfo().getStaff_id());
            params.put("return_time",new Date());
            venditionReturnService.return_submit(params);
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
