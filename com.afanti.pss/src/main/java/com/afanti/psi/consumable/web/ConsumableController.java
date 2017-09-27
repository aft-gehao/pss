package com.afanti.psi.consumable.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.consumable.service.ConsumableService;
import com.afanti.psi.consumable.vo.consumable_purchase;
import com.afanti.psi.consumable.vo.consumable_repair;
import com.afanti.psi.consumable.vo.consumable_use;
import com.afanti.psi.kuaidi.vo.kudi_info;
import com.afanti.psi.sms.service.impl.SmsService;
import com.afanti.psi.use.service.UseService;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lauya on 2015-10-11.
 */
@Controller
@RequestMapping(value = "/consumable/manager")
public class ConsumableController extends BaseController {

    @Autowired
    private ConsumableService consumableService;
    @Autowired
    private UseService UseService;
    @Autowired
    private SmsService smsService;
    /*首页查询  gehao*/
    @RequestMapping(value = "/consumablePage", method = RequestMethod.POST)
    @ResponseBody
    public JsonData usePage() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_name", getParameterString("consumable_name"));
            params.put("status", getParameterString("status"));
            params.put("p", getParameterString("p"));
            Page page = consumableService.getConsumablePage(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /*耗材列表*/
    @RequestMapping(value = "/consumableInfoPage", method = RequestMethod.POST)
    @ResponseBody
    public JsonData consumableInfoPage() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_name", getParameterString("consumable_name"));
            params.put("p", getParameterString("p"));
            Page page = consumableService.getConsumableInfoPage(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/consumable_add", method = RequestMethod.POST)
    @ResponseBody
    public JsonData consumable_add() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("staff_name", this.getParameterString("staff_name"));
            //判断是否属于库管代领，如果是 则不取当前登录人的id，再加上验证码
            if(String.valueOf(params.get("staff_name"))!="")
            {
                Staff_info staffInfo = UseService.getStaffInfo(params);
                params.put("staff_id", staffInfo.getStaff_id());
                params.put("identifying_code", getParameterString("code"));
            }
            else{
                params.put("staff_id", String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            }
            //取申请人id
            params.put("consumable_id", getParameterString("consumable_id"));
            params.put("use_name", getParameterString("use_name"));
            params.put("use_time", getParameterString("use_time"));
            params.put("amount", getParameterString("new_amount"));
            params.put("stock_id", getParameterString("stock_id"));
            params.put("space_id", getParameterString("space_id"));
            params.put("desc", getParameterString("desc"));
            params.put("use_time", new Date());

            params.put("is_del", "0");
            params.put("status", "11004");
            params.put("p", getParameterString("p"));
            consumableService.consumable_add(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/stockPage", method = RequestMethod.POST)
    @ResponseBody
    public JsonData stockPage() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_name", getParameterString("consumable_name"));
            params.put("flag", getParameterString("flag"));
            params.put("p", getParameterString("p"));
            Page page = consumableService.getStockPage(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/useSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData useSelect() {
        JsonData jsonData = new JsonData();
        try {
            String id=this.getParameterString("use_id");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            consumable_use consumable_use= consumableService.useSelect(params);
            jsonData.setAppend(consumable_use);
            jsonData.setAppends(id);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/useModify", method = RequestMethod.POST)
    @ResponseBody
    public JsonData useModify() {
        JsonData jsonData = new JsonData();
        try {
            String id=this.getParameterString("use_id");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            params.put("use_name", this.getParameterString("use_name"));
            params.put("status", this.getParameterString("status"));
            params.put("use_amount", this.getParameterString("use_amount"));
            params.put("check_time", new Date());
            params.put("check_staff", String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            consumableService.useUpdate(params);

            List<consumable_use> list=consumableService.consumable_mobilephone(params);
            List<Staff_info> list1=consumableService.staff_mobilephone(params);
            for(int i=0;i<list.size();i++)
            {
                if(list.get(i).getStatus()==11001)
                {
                    StringBuffer str = new StringBuffer();
                    str.append("您有新的订单需要采购:");
                    str.append(getParameterString("con_name")+"/"+this.getParameterString("pack")+"/"+this.getParameterString("amount")+this.getParameterString("unit"));
                    str.append("请至后台处理，谢谢");
                    str.append("【进销存】");
                    for(int x=0;x<list1.size();x++)
                    {
                        smsService.send(list1.get(x).getMobilephone(),str.toString());
                    }
                }
            }

            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/useDel", method = RequestMethod.POST)
    @ResponseBody
    public JsonData useDel() {
        JsonData jsonData = new JsonData();
        try {
            String id=this.getParameterString("use_id");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            consumableService.useDel(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

    /*添加耗材*/
    @RequestMapping(value = "/consumableAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData consumableAdd() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("warning_amount", getParameterString("warning_amount"));
            params.put("consumable_name", getParameterString("consumable_name"));
            params.put("pack", getParameterString("pack"));
            params.put("consumable_unit", getParameterString("consumable_unit"));
            //登录人
            params.put("staff_id", String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            //当前时间
            DateTime dateTime = new DateTime();
            params.put("create_time", dateTime.toString("yyyy-MM-dd HH:mm:ss"));
            params.put("status", 0);
            consumableService.ConsumableAdd(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    /*删除耗材-改变耗材状态*/
    @RequestMapping(value = "/consumable_del", method = RequestMethod.POST)
    @ResponseBody
    public JsonData consumable_del() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id", getParameterString("consumable_id"));
            consumableService.ConsumableUpd(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("删除成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /*根据id查询耗材信息*/
    @RequestMapping(value = "/consumable_upd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData consumable_upd() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id", getParameterString("consumable_id"));
            Page page = consumableService.getConsumable(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    /*修改耗材信息*/
    @RequestMapping(value = "/consumableUpdate", method = RequestMethod.POST)
    @ResponseBody
    public JsonData consumableUpdate() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id", getParameterString("consumable_id"));
            params.put("consumable_name", getParameterString("consumable_name"));
            params.put("warning_amount", getParameterString("warning_amount"));
            params.put("pack", getParameterString("pack"));
            params.put("consumable_unit", getParameterString("consumable_unit"));
            consumableService.consumableUpdate(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("修改成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/add_purchasing", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_purchasing() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", getParameterString("use_id"));
            params.put("amount", getParameterString("amount"));
            params.put("consumable_id", getParameterString("consumable_id"));
            params.put("desc", getParameterString("desc"));
            params.put("purchase_money", getParameterString("purchase_money"));
            //未发货状态
            params.put("status", 5004);
            params.put("purchase_is_del",0);
            params.put("purchase_time", new Date());
            params.put("staff_id", String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            consumableService.add_purchasing(params);
            consumableService.useStatusUpdate(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /*首页查询  gehao*/
    @RequestMapping(value = "/PurchasingPage", method = RequestMethod.POST)
    @ResponseBody
    public JsonData Purchasing() {
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
            params.put("consumable_name", this.getParameterString("consumable_name"));
            params.put("stock_status", this.getParameterString("stock_status"));
            params.put("p", this.getParameterString("p"));
            params.put("search", getParameterString("search"));
            params.put("time",this.getParameterString("time"));
            params.put("start_time", start_time);
            params.put("end_time", end_time);
            /*if(String.valueOf(params.get("stock_status"))!="") {
                if (Integer.valueOf(String.valueOf(params.get("stock_status"))) == 5002)
                {
                    params.put("stock_status", "(5002,14003)");
                }
                else
                if ( Integer.valueOf(String.valueOf(params.get("stock_status"))) == 5004) {

                    params.put("stock_status", "(5002,5001,5004)");
                }
            }*/
            Page page = consumableService.getPurchasingPage(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/consumableInventory", method = RequestMethod.POST)
    @ResponseBody
    public JsonData consumableInventory() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("flag", getParameterString("flag"));
            params.put("amount", getParameterString("amount"));
            params.put("space_id", getParameterString("space_id"));
            params.put("new_amount", getParameterString("new_amount"));
            params.put("purchase_id", getParameterString("purchase_id"));
            params.put("consumable_id",  getParameterString("consumable_id"));
            params.put("enter_is_del",0);
            params.put("enter_time", new Date());
            params.put("enter_staff", String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            consumableService.consumableInventory(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /*首页查询  gehao*/
    @RequestMapping(value = "/UsePage", method = RequestMethod.POST)
    @ResponseBody
    public JsonData UsePage() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_name", getParameterString("consumable_name"));
            params.put("stock_status", getParameterString("stock_status"));
            params.put("p", getParameterString("p"));
            Page page = consumableService.getUsePage(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/out_use", method = RequestMethod.POST)
    @ResponseBody
    public JsonData out_use() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("amount", getParameterString("amount"));
            params.put("stock_id", getParameterString("stock_id"));
            params.put("use_id", getParameterString("use_id"));
            params.put("consumable_id",  getParameterString("consumable_id"));
            //已出库状态
            params.put("status",8001);
            params.put("out_time", new Date());
            params.put("out_staff", String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            consumableService.out_stock(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /*首页查询  gehao*/
    @RequestMapping(value = "/selectInventoryDetail", method = RequestMethod.POST)
    @ResponseBody
    public JsonData selectInventoryDetail() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id", getParameterString("consumable_id"));
            params.put("p", getParameterString("p"));
            Page page = consumableService.getStockDetailPage(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    /*首页查询  gehao*/
    @RequestMapping(value = "/consumableRepairPage", method = RequestMethod.POST)
    @ResponseBody
    public JsonData consumableRepairPage() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            DateTime dateTime = new DateTime();
            String start_time = getParameterString("start_time");
            String end_time = getParameterString("end_time");
            if (start_time == null || "".equals(start_time)) {
                start_time = dateTime.plusDays(-dateTime.getDayOfMonth() + 1).toString("yyyy-MM-dd");
            }
            if (end_time == null || "".equals(end_time)) {
                end_time = dateTime.toString("yyyy-MM-dd");
            }
            params.put("start_time",start_time);
            params.put("end_time",end_time);
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
            params.put("consumable_name", getParameterString("consumable_name"));
            params.put("p", getParameterString("p"));
            Page page = consumableService.getConsumableRepairPage(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //新增-耗材返修-取消
    @RequestMapping(value = "/repairCancel",method =RequestMethod.POST )
    @ResponseBody
    public JsonData repairCancel() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("repair_id", getParameterString("repair_id"));
            params.put("repair_is_del", 1);
            consumableService.consumable_repair_cancel(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return  jsonData;
    }
    @RequestMapping(value = "/consumableCl",method =RequestMethod.POST )
    @ResponseBody
    public JsonData consumableCl() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", getParameterString("use_id"));
            params.put("is_del", 1);
            consumableService.consumable_pur_cancel(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return  jsonData;
    }
    //新增耗材返修申请
    @RequestMapping(value = "/consumable_repair_add", method = RequestMethod.POST)
    @ResponseBody
    public JsonData consumable_repair_add() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id", getParameterString("consumable_id"));
            params.put("repair_amount", getParameterString("new_amount"));
            params.put("repair_staff", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("repair_desc", getParameterString("desc"));
            params.put("repair_time", new Date());
            params.put("repair_is_del", "0");
            //初始状态设为未审核
            params.put("status", "14001");
            consumableService.consumable_repair_add(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //新增耗材返修申请
    @RequestMapping(value = "/repairDel", method = RequestMethod.POST)
    @ResponseBody
    public JsonData repairDel() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();

            params.put("repair_id", getParameterString("repair_id"));
            params.put("repair_is_del", "1");
            consumableService.consumable_repair_del(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //新增耗材返修申请
    @RequestMapping(value = "/repairModify", method = RequestMethod.POST)
    @ResponseBody
    public JsonData repairModify() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("checking_staff", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("amount", getParameterString("amount"));
            params.put("status", getParameterString("status"));
            params.put("repair_desc", getParameterString("repair_desc"));
            params.put("repair_id", getParameterString("repair_id"));
            params.put("repair_amount", getParameterString("repair_amount"));
            consumableService.consumable_repair_upd(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //新增耗材返修申请
    @RequestMapping(value = "/repairSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData repairSelect() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("repair_id", getParameterString("repair_id"));
            consumable_repair consumable_repair=consumableService.repairSelect(params);
            jsonData.setAppend(consumable_repair);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/con_purchase_modify", method = RequestMethod.POST)
    @ResponseBody
    public JsonData con_purchase_modify() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("purchase_id", getParameterString("purchase_id"));
            params.put("amount", getParameterString("amount"));
            params.put("purchase_money", getParameterString("purchase_money"));
            params.put("is_del", getParameterString("is_del"));

            consumableService.con_purchase_modify(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
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
            params.put("status",this.getParameterString("status"));
            params.put("kd_code",this.getParameterString("kd_code"));
            params.put("kd_num",this.getParameterString("kd_num"));
            params.put("use_id",this.getParameterString("use_id"));
            //将采购状态由未发货状态改为发货状态
            consumableService.fahuo(params);
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
    @RequestMapping(value = "/kuaisu_pur", method = RequestMethod.POST)
    @ResponseBody
    public JsonData kuaisu_pur() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("staff",this.getSessionData().getStaffInfo().getStaff_id());
            params.put("staff_id",this.getSessionData().getStaffInfo().getStaff_id());
            params.put("purchase_time",new Date());
            DateTime dateTime = new DateTime();
            params.put("create_time", dateTime.toString("yyyy-MM-dd HH:mm:ss"));
            params.put("purchase_is_del",0);
            params.put("use_time",new Date());
            params.put("status",0);
            params.put("pack","无");
            params.put("consumable_name", this.getParameterString("consumable_name"));
            params.put("amount", this.getParameterString("amount"));
            params.put("consumable_unit", this.getParameterString("unit"));
            params.put("desc", this.getParameterString("desc"));
            params.put("purchase_money", this.getParameterString("price"));
            consumableService.kuaisu_pur(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/kd_info_select", method = RequestMethod.POST)
    @ResponseBody
    public JsonData kd_info_select()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("kd_name",this.getParameterString("kd_name"));
            //将采购状态由未发货状态改为发货状态
            kudi_info info= consumableService.kd_info_select(params);
            jsonData.setAppend(info);
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
    //新增耗材返修申请
    @RequestMapping(value = "/check_repair", method = RequestMethod.POST)
    @ResponseBody
    public JsonData check_repair() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("checking_staff", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("amount", this.getParameterString("amount"));
            params.put("check_time", new Date());
            params.put("status", this.getParameterString("status"));
            params.put("company", this.getParameterString("company"));
            params.put("repair_id", this.getParameterString("repair_id"));
            params.put("price", this.getParameterString("price"));
            consumableService.check_repair(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //新增耗材返修申请
    @RequestMapping(value = "/fahuo_repair", method = RequestMethod.POST)
    @ResponseBody
    public JsonData fahuo_repair() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("kd_code", this.getParameterString("kd_code"));
            params.put("kd_num", this.getParameterString("kd_num"));
            params.put("status", this.getParameterString("status"));
            params.put("repair_id", getParameterString("repair_id"));
            consumableService.fahuo_repair(params);
            jsonData.setMessage("操作成功");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/PurchasingList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData PurchasingList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all", this.getParameterString("is_all"));
            int count=consumableService.getPurchasingCount(params);
            List<consumable_purchase> list = consumableService.getPurchasingList(params);
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
    @RequestMapping(value = "/PurchasingList_history", method = RequestMethod.POST)
    @ResponseBody
    public JsonData PurchasingList_history() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all", this.getParameterString("is_all"));
            int count=consumableService.getPurchasingCount_history(params);
            List<consumable_purchase> list = consumableService.getPurchasingList_history(params);
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
    @RequestMapping(value = "/UseList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData UseList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all", getParameterString("is_all"));
            int count = consumableService.getUseCount(params);
            List<consumable_use> list = consumableService.getUseList(params);
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

    @RequestMapping(value = "/UseList_history", method = RequestMethod.POST)
    @ResponseBody
    public JsonData UseList_history() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all", getParameterString("is_all"));
            int count = consumableService.getUseCount_history(params);
            List<consumable_use> list = consumableService.getUseList_history(params);
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
}
