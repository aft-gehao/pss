package com.afanti.psi.use.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.sms.service.impl.SmsService;
import com.afanti.psi.use.service.UseService;
import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.usermanager.service.UserManagerService;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;
import java.util.logging.Logger;

/**
 * Created by lauya on 2015-10-11.
 */
@Controller
@RequestMapping(value = "/product_use/manage")
public class UseController extends BaseController {
    @Autowired
    private UseService UseService;
    @Autowired
    private UserManagerService userManagerService;
    @Autowired
    private SmsService smsService;
   /*首页查询  gehao*/
    @RequestMapping(value = "/usePage", method = RequestMethod.POST)
    @ResponseBody
    public JsonData usePage() {
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
            params.put("start_time", start_time);
            params.put("cas",getParameterString("cas"));
            params.put("sku",getParameterString("sku"));

            params.put("end_time", end_time);
            params.put("use_name", getParameterString("use_name"));
            params.put("p", getParameterString("p"));
            Page page = UseService.getUsePage(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/useAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData useAdd() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_time", this.getParameterString("use_time"));
            params.put("use_name", this.getParameterString("use_name"));
            params.put("staff_name", this.getParameterString("staff_name"));
            //取申请人id
            Staff_info staffInfo = UseService.getStaffInfo(params);
            params.put("staff_id", staffInfo.getStaff_id());
            params.put("batch_no", this.getParameterString("batch_no"));
            params.put("identifying_code", this.getParameterString("code"));
            params.put("product_id", this.getParameterString("product_id"));
            params.put("amount", this.getParameterString("new_amount"));
            params.put("unit", this.getParameterString("unit"));
            params.put("space_id", this.getParameterString("space_id"));
            params.put("purity", this.getParameterString("purity"));
            params.put("use_desc", this.getParameterString("use_desc"));
            UseService.use_add(params);
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
            product_use product_use = new product_use();
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            UseService.use_del(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/useSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData useSelect() {//产品出库
        JsonData jsonData = new JsonData();
        try {
            String id=this.getParameterString("use_id");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));

            product_use product_use=UseService.useSelect(params);
            jsonData.setAppend(product_use);
            jsonData.setAppends(id);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/useOut", method = RequestMethod.POST)
    @ResponseBody
    public JsonData useOut() {
        DateTime dateTime=new DateTime();
        JsonData jsonData = new JsonData();
        try {

            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            product_use product_use=UseService.useSelect(params);
            params.put("out_name",null);
            params.put("out_type",9003);
            params.put("oper_id",this.getSessionData().getStaffInfo().getStaff_id());
            params.put("out_type_billno",product_use.getUse_id());//研发id
            params.put("amount",product_use.getUse_amount());
            params.put("space_id",product_use.getSpace_id());
            UseService.addProduct_material_out(params);
            int out_id=UseService.orderByOutID();
            params.put("out_id",out_id);
            params.put("product_id",product_use.getProduct_id());
            Map<String, Object> params2 = new HashMap<String, Object>();
            params2.put("product_id",product_use.getProduct_id());
            params2.put("batch_no",product_use.getUse_batch_no());
            params2.put("amount",product_use.getUse_amount());
            params2.put("space_id",product_use.getSpace_id());
            int enter_d_id=UseService.orderByEnter_d_id(params2);
            params.put("enter_d_id",enter_d_id);
            params.put("unit",product_use.getUse_unit());
            params.put("out_type_d_billno",product_use.getUse_id());
            params.put("batch_no",product_use.getUse_batch_no());
            params.put("staff_id",this.getSessionData().getStaffInfo().getStaff_id());

            UseService.addProduct_material_out_detail(params);
            UseService.useOut(product_use);


            Map<String, Object> params3 = new HashMap<String, Object>();
            Map<String, Object> params4 = new HashMap<String, Object>();
            params4.put("sale_d_id",getParameterInteger("supplier_id"));
            int is_sale=getParameterInteger("is_sale");
            if (is_sale==0){//销售领用
                List<product_use> list = UseService.select_product_useStatus(params4);
                for (int i=0;i<list.size();i++){
                    params3.put(""+list.get(i).getStatus()+"",i);
                }
                if (params3.size()==1){
                    for(String key : params3.keySet()){//遍历key
                        if (key.equals("8001")){//已出库8001
                            params4.put("status",8001);
                        }else if (key.equals("8002")){//未出库8002 。。。。
                            params4.put("status",8002);
                        }
                    }
                }else if (params3.size()>1){//部分出库8003
                    params4.put("status",8003);
                }
                UseService.update_status(params4);
            }


            jsonData.setAppend(product_use);
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
            product_use product_use = new product_use();
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            params.put("use_name", this.getParameterString("use_name"));
            params.put("use_amount", this.getParameterString("use_amount"));
            UseService.use_mod(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    Logger logger=Logger.getLogger(UseController.class.getName());
    @RequestMapping(value = "/useAdd_yanfa", method = RequestMethod.POST)
    @ResponseBody
    public JsonData useAdd_yanfa() {//原料引用
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_time", this.getParameterString("use_time"));
            params.put("use_name", this.getParameterString("use_name"));
            params.put("staff_id", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("batch_no", this.getParameterString("batch_no"));
            params.put("product_id", this.getParameterInteger("product_id"));
            params.put("amount", this.getParameterString("new_amount"));
            params.put("unit", this.getParameterString("unit"));
            params.put("space_id", this.getParameterString("space_id"));
            params.put("purity", this.getParameterString("purity"));
            params.put("use_desc", this.getParameterString("use_desc"));
            params.put("sale_d_id",this.getParameterInteger("sale_d_id"));

            //logger.info(getParameterString("----"+"sale_d_id"+"----"));

            int type_sale=getParameterInteger("type_sale");
            if (type_sale==1){
                params.put("is_sale",0);
            } else {
                params.put("is_sale",1);
            }

            UseService.use_add_yanfa(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value="/Receive_Preview",method = RequestMethod.POST)
    @ResponseBody
    public JsonData Receive_Preview(){//出库领用预览
        int use_id=this.getParameterInteger("use_id");
        JsonData jsonData = new JsonData();
        product_use p = UseService.Receive_Preview(use_id);
        return jsonData;
    }
    @RequestMapping(value = "/useShenhe", method = RequestMethod.POST)
    @ResponseBody
    public JsonData useShenhe() {
        JsonData jsonData = new JsonData();
        try {
            product_use product_use = new product_use();
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            params.put("status", this.getParameterString("status"));
            params.put("desc", this.getParameterString("desc"));
            params.put("check_time",new Date());
            params.put("check_staff",this.getSessionData().getStaffInfo().getStaff_id());
             UseService.useShenhe(params);
            product_use= UseService.Receive_Preview(Integer.valueOf(String.valueOf(this.getParameterString("use_id"))));
           /* List<product_use> list=UseService.use_mobilephone(params);*/
            List<Staff_info> list1=UseService.staff_mobilephone(params);
            if(Integer.valueOf(String.valueOf(this.getParameterString("status")))==11001)
            {
                StringBuffer str = new StringBuffer();
                str.append("您好,"+product_use.getStaff_name()+"申请的产品:");

                str.append(product_use.getCas()+"/"+product_use.getUse_amount()+product_use.getUse_unit()+"/");
                if(product_use.getPurity()!=null)
                {
                    str.append(product_use.getPurity()+"/");
                }
                /*str.append(getParameterString("datac"));*/
                str.append("已由"+product_use.getCheck_name()+"审核通过,");
                str.append("如需要采购，请进入后台生成采购订单,谢谢");
                str.append("【进销存】");
                for(int x=0;x<list1.size();x++)
                {
                    smsService.send(list1.get(x).getMobilephone(),str.toString());
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
    @RequestMapping(value = "/usePurchasing", method = RequestMethod.POST)
    @ResponseBody
    public JsonData usePurchasing() {
        JsonData jsonData = new JsonData();
        try {
            product_use product_use = new product_use();
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
            else {
                params.put("status","(11001,11002,11003,11004)");
            }
            params.put("staff_id", this.getParameterString("staff_id"));
            params.put("p", getParameterString("p"));
            params.put("start_time",getParameterString("start_time"));
            params.put("end_time",getParameterString("end_time"));
            Page page = UseService.usePurchasing(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/purCl",method = RequestMethod.POST)
    @ResponseBody
    public JsonData purCl() {
        JsonData jsonData = new JsonData();
        try {
            //product_use product_use=new product_use();
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", getParameterString("use_id"));
            params.put("use_is_del", 1);
            UseService.user_purCancel(params);
            jsonData.setResult(SUCCESS);
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
            product_use product_use = new product_use();
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            params.put("product_id", this.getParameterString("product_id"));
            params.put("purchasing_name", this.getParameterString("purchasing_name"));
            params.put("supplier_name", this.getParameterString("supplier_name"));
            params.put("price", this.getParameterString("price"));
            params.put("desc", this.getParameterString("desc"));
            params.put("unit", this.getParameterString("unit"));
            params.put("univalence", this.getParameterString("univalence"));
            params.put("amount", this.getParameterString("amount"));
            params.put("staff_id",this.getSessionData().getStaffInfo().getStaff_id());
            params.put("purchase_time", new Date());
            UseService.purchase_add(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    @RequestMapping(value = "/useUpdate", method = RequestMethod.POST)
    @ResponseBody
    public JsonData useUpdate() {
        JsonData jsonData = new JsonData();
        try {
            product_use product_use = new product_use();
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            params.put("status", this.getParameterString("status"));
            UseService.useUpdate(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }

}
