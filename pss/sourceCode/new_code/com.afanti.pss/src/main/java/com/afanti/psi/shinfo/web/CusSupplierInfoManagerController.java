package com.afanti.psi.shinfo.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.commons.service.CommonsService;
import com.afanti.psi.shinfo.service.Cus_SupplierInfoService;
import com.afanti.psi.shinfo.vo.Cus_Supplier_info;
import com.afanti.psi.shinfo.vo.Customer_delivery_address;
import com.afanti.psi.shinfo.vo.Linkman;
import com.afanti.psi.shinfo.vo.Supplier_product_rel;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
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
 * 供应商管理 》供应商管理列表
 */
@Controller
@RequestMapping(value = "/cus/supplier/manager")
public class CusSupplierInfoManagerController extends BaseController {
    @Autowired
    private Cus_SupplierInfoService supplierInfoService;

    @Autowired
    private CommonsService commonsService;
    /**
     * 供应商列表查询
     * 201704124 addby gehao
     */
    @RequestMapping(value = "/shinfoSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoSelect(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取cas。中文名。英文名
            params.put("supplier_name", getParameterString("supplier_name"));
            params.put("credit_level", getParameterString("credit_level"));
            //页码
            params.put("p", getParameterString("p"));
            Page page = supplierInfoService.shinfoSelect(params);
            //在append中塞入page数据
            jsonData.setAppend(page);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商名称校验
     * 201704124 addby gehao
     */
    @RequestMapping(value = "/shinfoNameSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoNameSelect(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Cus_Supplier_info supplierInfo = new Cus_Supplier_info();
            Map<String, Object> params = new HashMap<String, Object>();
            //获取当前输入的供应商名称
            params.put("supplier_name", getParameterString("supplier_name"));
            params.put("cs_sup_id", getParameterString("supplier_id"));
            int count = supplierInfoService.shinfoNameSelect(params);
            if (count==0) {
                jsonData.setResult(SUCCESS);
            }
            else{jsonData.setResult(FAIL);}
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    /**
     * 供应商新增
     * 201704125 addby gehao
     */
    @RequestMapping(value = "/shinfoAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoAdd()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("cus_no",this.getParameterString("cus_no"));

            params.put("supplier_id",this.getParameterString("supplier_id"));
            params.put("supplier_name",this.getParameterString("supplier_name"));
            params.put("supplier_tel",this.getParameterString("supplier_tel"));
            params.put("supplier_type",this.getParameterString("supplier_type"));
            params.put("supplier_email",this.getParameterString("supplier_email"));
            params.put("short_name",this.getParameterString("short_name"));
            params.put("supplier_fax",this.getParameterString("supplier_fax"));
            params.put("profile",this.getParameterString("profile"));
            params.put("supplier_address",this.getParameterString("supplier_address"));
            params.put("create_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            params.put("modify_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            supplierInfoService.shinfoAdd(params);
            int id=supplierInfoService.shinfoIdSelect();
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
            jsonData.setAppend(id);
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商详情查询
     * 201704126 addby gehao
     */
    @RequestMapping(value = "/shinfoDetailSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoDetailSelect(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            String cs_sup_id = getParameterString("cs_sup_id");
            //获取供应商id
            params.put("cs_sup_id", cs_sup_id);
            params.put("flag", getParameterString("flag"));

            //供应商详情
            Cus_Supplier_info info = supplierInfoService.shinfoDetailSelect(Integer.parseInt(getParameterString("cs_sup_id")));
            //供应商联系人详情
            params = new HashMap<String, Object>();
            params.put("type", getParameterString("type"));
            params.put("id",cs_sup_id);
            List<Linkman> infos=commonsService.getLinkmanList(params);
            //客户地址
            List<Customer_delivery_address> address=supplierInfoService.getAddress(params);
            jsonData.setAppend_ext(address);
            //在append中塞入info数据
            jsonData.setAppend(info);
            jsonData.setAppends(infos);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商联系人详情查询
     * 201704126 addby gehao
     */
    @RequestMapping(value = "/linkmanSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData linkmanSelect(HttpServletRequest request) {
              JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //联系人详情
            Linkman info = supplierInfoService.linkmanSelect(Integer.parseInt(getParameterString("s_linkman_id")));
            //在append中塞入info数据
            jsonData.setAppend(info);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商联系人新增
     * 201704126 addby gehao
     */
    @RequestMapping(value = "/linkmanAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData linkmanAdd()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("flag",this.getParameterString("flag"));
            if(this.getParameterString("customer_id")!="") {
                params.put("customer_id", this.getParameterString("customer_id"));
            }
            else{
            params.put("supplier_id",this.getParameterString("supplier_id"));
            }
            params.put("chinesename",this.getParameterString("chinesename"));
            params.put("englishname",this.getParameterString("englishname"));
            params.put("ttitle",this.getParameterString("ttitle"));
            params.put("fax",this.getParameterString("fax"));
            params.put("email",this.getParameterString("email"));
            params.put("mobilephone",this.getParameterString("mobilephone"));
            params.put("fixedphone",this.getParameterString("fixedphone"));
            params.put("address",this.getParameterString("address"));
            params.put("is_owner",this.getParameterString("is_owner"));
            params.put("create_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            params.put("modify_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            supplierInfoService.linkmanAdd(params);
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
    /**
     * 供应商联系人修改
     * 201704126 addby gehao
     */
    @RequestMapping(value = "/linkmanUpdate", method = RequestMethod.POST)
    @ResponseBody
    public JsonData linkmanUpdate()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("s_linkman_id",this.getParameterString("s_linkman_id"));
            params.put("supplier_id",this.getParameterString("supplier_id"));
            params.put("chinesename",this.getParameterString("chinesename"));
            params.put("englishname",this.getParameterString("englishname"));
            params.put("ttitle",this.getParameterString("ttitle"));
            params.put("fax",this.getParameterString("fax"));
            params.put("email",this.getParameterString("email"));
            params.put("mobilephone",this.getParameterString("mobilephone"));
            params.put("fixedphone",this.getParameterString("fixedphone"));
            params.put("address",this.getParameterString("address"));
            params.put("is_owner",this.getParameterString("is_owner"));
            params.put("modify_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            supplierInfoService.linkmanUpdate(params);
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
    /**
     * 供应商联系人删除
     * 201704126 addby gehao
     */
    @RequestMapping(value = "/linkmanDelete", method = RequestMethod.POST)
    @ResponseBody
    public JsonData linkmanDelete()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("s_linkman_id",this.getParameterString("s_linkman_id"));
            supplierInfoService.linkmanDelete(params);
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
    /**
     * 供应商详情查询
     * 201704126 addby gehao
     */
    @RequestMapping(value = "/shinfoUpdateSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoUpdateSelect(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取供应商id
            params.put("supplier_id", getParameterString("cs_sup_id"));
            //供应商详情
            Cus_Supplier_info info = supplierInfoService.shinfoDetailSelect(Integer.parseInt(getParameterString("cs_sup_id")));
            //在append中塞入info数据
            jsonData.setAppend(info);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商修改
     * 201704127 addby gehao
     */
    @RequestMapping(value = "/shinfoUpdata", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoUpdata()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("cs_sup_id",this.getParameterString("cs_sup_id"));
            params.put("cust_no",this.getParameterString("cust_no"));
            params.put("name",this.getParameterString("name"));
            params.put("tel",this.getParameterString("tel"));
            params.put("type",this.getParameterString("type"));
            params.put("email",this.getParameterString("email"));
            params.put("short_name",this.getParameterString("short_name"));
            params.put("fax",this.getParameterString("fax"));
            params.put("profile",this.getParameterString("profile"));
            params.put("address",this.getParameterString("address"));
            params.put("modify_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            supplierInfoService.shinfoUpdata(params);
            jsonData.setAppend(getParameterString("cs_sup_id"));
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
    /**
     * 供应商删除
     * 201704127 addby gehao
     */
    @RequestMapping(value = "/shinfoDelete", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoDelete()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("cs_sup_id",this.getParameterString("cs_sup_id"));
            supplierInfoService.shinfoDelete(params);
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
    /**
     * 供应商产品列表查询
     * 201704128 addby gehao
     */
    @RequestMapping(value = "/shinfoProductSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoProductSelect(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取供应商id/产品cas/中文名/英文名/
            params.put("cs_sup_id", getParameterString("cs_sup_id"));
            params.put("cas", getParameterString("cas"));
            params.put("name_en", getParameterString("name_en"));
            params.put("name_ch", getParameterString("name_ch"));
            //页码
            params.put("p", getParameterString("p"));
            Page page = supplierInfoService.shinfoProductSelect(params);
            //在append中塞入page数据
            jsonData.setAppend(page);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商产品新增
     * 20170502 addby gehao
     */
    @RequestMapping(value = "/shinfoProductAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoProductAdd(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取供应商id/产品cas/中文名/英文名/
            params.put("supplier_id", getParameterString("supplier_id"));
            params.put("product_id", getParameterString("product_id"));
            params.put("pro_name", getParameterString("pro_name"));
            params.put("unit", getParameterString("unit"));
            params.put("purity", getParameterString("purity"));
            params.put("unit_price", getParameterString("unit_price"));
            params.put("create_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            supplierInfoService.productAdd(params);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商产品新增校验
     * 20170502 addby gehao
     */
    @RequestMapping(value = "/productAddJiaoYan", method = RequestMethod.POST)
    @ResponseBody
    public JsonData productAddJiaoYan(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取供应商id/产品cas/中文名/英文名/
            params.put("supplier_id", getParameterString("supplier_id"));
            params.put("product_id", getParameterString("product_id"));
            int count=supplierInfoService.productAddJiaoYan(params);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(count);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商产品修改回显
     * 20170502 addby gehao
     */
    @RequestMapping(value = "/ProductUpDataSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData ProductUpDataSelect(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取供应商id/产品cas/中文名/英文名/
            params.put("supplier_id", getParameterString("supplier_id"));
            params.put("product_id", getParameterString("product_id"));
            Supplier_product_rel supplier_product_rel=supplierInfoService.productUpDataSelect(params);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(supplier_product_rel);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商产品修改
     * 20170502 addby gehao
     */
    @RequestMapping(value = "/shinfoProductUpData", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoProductUpData(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取供应商id/产品cas/中文名/英文名/
            params.put("supplier_id", getParameterString("supplier_id"));
            params.put("product_id", getParameterString("product_id"));
            params.put("p_pack", getParameterString("p_pack"));
            params.put("p_price", getParameterString("p_price"));
            params.put("p_purity", getParameterString("p_purity"));
            supplierInfoService.shinfoProductUpData(params);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 供应商产品修改
     * 20170502 addby gehao
     */
    @RequestMapping(value = "/shinfoProductDelete", method = RequestMethod.POST)
    @ResponseBody
    public JsonData shinfoProductDelete(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取供应商id/产品cas/中文名/英文名/
            params.put("supplier_id", getParameterString("supplier_id"));
            params.put("product_id", getParameterString("product_id"));
            supplierInfoService.shinfoProductDelete(params);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 客户列表查询
     * 201704124 addby gehao
     */
    @RequestMapping(value = "/cusinfoSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData cusinfoSelect(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取cas。中文名。英文名
            params.put("supplier_name", getParameterString("customer_name"));
            params.put("credit_level", getParameterString("credit_level"));
            //页码
            params.put("p", getParameterString("p"));
            Page page = supplierInfoService.cusinfoSelect(params);
            //在append中塞入page数据
            jsonData.setAppend(page);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 客户新增
     * 201704125 addby gehao
     */
    @RequestMapping(value = "/cusinfoAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData cusinfoAdd()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("supplier_invoice",this.getParameterString("supplier_invoice"));
            params.put("customer_id",this.getParameterString("customer_id"));
            params.put("supplier_name",this.getParameterString("supplier_name"));
            params.put("supplier_tel",this.getParameterString("supplier_tel"));
            params.put("supplier_type",this.getParameterString("supplier_type"));
            params.put("supplier_email",this.getParameterString("supplier_email"));
            params.put("short_name",this.getParameterString("short_name"));
            params.put("payment_terms",this.getParameterString("payment_terms"));
            params.put("supplier_invoice",this.getParameterString("supplier_invoice"));
            params.put("vat_number",this.getParameterString("vat_number"));
            params.put("profile",this.getParameterString("profile"));
            params.put("supplier_address",this.getParameterString("supplier_address"));
            params.put("create_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            params.put("modify_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            supplierInfoService.cusinfoAdd(params);
            int id=supplierInfoService.shinfoIdSelect();
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
            jsonData.setAppend(id);
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 客户修改
     * 201704125 addby gehao
     */
    @RequestMapping(value = "/cusinfoUpdata", method = RequestMethod.POST)
    @ResponseBody
    public JsonData cusinfoUpdata()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("cs_sup_id",this.getParameterString("cs_sup_id"));
            params.put("customer_id",this.getParameterString("customer_id"));
            params.put("supplier_invoice",this.getParameterString("supplier_invoice"));
            params.put("supplier_name",this.getParameterString("supplier_name"));
            params.put("supplier_tel",this.getParameterString("supplier_tel"));
            params.put("supplier_type",this.getParameterString("supplier_type"));
            params.put("supplier_email",this.getParameterString("supplier_email"));
            params.put("short_name",this.getParameterString("short_name"));
            params.put("payment_terms",this.getParameterString("payment_terms"));
            params.put("supplier_invoice",this.getParameterString("supplier_invoice"));
            params.put("vat_number",this.getParameterString("vat_number"));
            params.put("profile",this.getParameterString("profile"));
            params.put("supplier_address",this.getParameterString("supplier_address"));
            params.put("create_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            params.put("modify_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            supplierInfoService.cusinfomodify(params);
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
    /**
     * 客户地址新增
     * 20170504 addby gehao
     */
    @RequestMapping(value = "/addressAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData addressAdd()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("customer_id",this.getParameterString("customer_id"));
            params.put("address_type",this.getParameterString("address_type"));
            params.put("oper_name",this.getParameterString("oper_name"));
            params.put("oper_tel",this.getParameterString("oper_tel"));
            params.put("oper_code",this.getParameterString("oper_code"));
            params.put("oper_address",this.getParameterString("oper_address"));
            params.put("create_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            params.put("modify_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            supplierInfoService.addressAdd(params);
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
    /**
     * 客户地址查询
     * 20170504 addby gehao
     */
    @RequestMapping(value = "/addressSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData addressSelect()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("address_id",this.getParameterString("address_id"));
            Customer_delivery_address info=supplierInfoService.addressSelect(params);
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
    /**
     * 客户地址修改
     * 20170504 addby gehao
     */
    @RequestMapping(value = "/addressModify", method = RequestMethod.POST)
    @ResponseBody
    public JsonData addressModify()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("address_id",this.getParameterString("address_id"));
            params.put("customer_id",this.getParameterString("customer_id"));
            params.put("address_type",this.getParameterString("address_type"));
            params.put("oper_name",this.getParameterString("oper_name"));
            params.put("oper_tel",this.getParameterString("oper_tel"));
            params.put("oper_code",this.getParameterString("oper_code"));
            params.put("oper_address",this.getParameterString("oper_address"));
            params.put("create_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            params.put("modify_oper",String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            supplierInfoService.addressModify(params);
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
    /**
     * 客户地址删除
     * 20170504 addby gehao
     */
    @RequestMapping(value = "/addressDelete", method = RequestMethod.POST)
    @ResponseBody
    public JsonData addressDelete()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("address_id",this.getParameterString("address_id"));
            supplierInfoService.addressDelete(params);
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
}
