package com.afanti.psi.product.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.commons.service.CommonsService;
import com.afanti.psi.commons.vo.Pss_dict;
import com.afanti.psi.consumable.vo.consumable_material_info;
import com.afanti.psi.consumable.vo.consumable_repair;
import com.afanti.psi.consumable.vo.consumable_use;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.inventory.vo.PurchaseInventoryInfo;
import com.afanti.psi.product.service.ProductMeterialInfoService;
import com.afanti.psi.product.vo.Product_material_info;
import com.afanti.psi.research.vo.product_research;
import com.afanti.psi.sms.service.impl.SmsService;
import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 产品管理 》产品管理列表
 */
@Controller
@RequestMapping(value = "/product/manager")
public class ProductMeterialInfoController extends BaseController {

    @Autowired
    private ProductMeterialInfoService productMeterialInfoService;
    @Autowired
    private CommonsService commonsService;
    @Autowired
    private SmsService smsService;

    @RequestMapping(value = "/product_page_list", method = RequestMethod.POST)
    @ResponseBody
    public JsonData product_page_list(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("sku", getParameterString("sku"));
            params.put("cas", getParameterString("cas"));
            params.put("supplier_id", getParameterString("supplier_id"));
            params.put("sku", getParameterString("sku"));
            params.put("product_name", getParameterString("product_name"));
            params.put("product_type", getParameterString("product_type"));
            params.put("p", getParameterString("p"));
            Page page = productMeterialInfoService.getProductPageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/product_add", method = RequestMethod.POST)
    @ResponseBody
    public JsonData product_add() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("warning_amount", this.getParameterString("warning_amount"));
            params.put("name_ch", this.getParameterString("name_ch"));
            params.put("name_en", this.getParameterString("name_en"));
            params.put("mol_weight", this.getParameterString("mol_weight"));
            params.put("mol_formula", this.getParameterString("mol_formula"));
            params.put("mol", this.getParameterString("mol"));
            params.put("smiles", this.getParameterString("smiles"));
            params.put("cas", this.getParameterString("cas"));
            params.put("imgage", this.getParameterString("imgage"));
            params.put("create_oper", String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            params.put("modify_oper", String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            params.put("product_type",this.getParameterString("product_type"));
            params.put("mdl_number", this.getParameterString("mdl_number"));
            params.put("purity", this.getParameterString("purity"));
            params.put("form", this.getParameterString("form"));
            params.put("website_url", this.getParameterString("website_url"));
            params.put("msds", this.getParameterString("msds"));
            params.put("hazard", this.getParameterString("hazard"));
            params.put("precautionary", this.getParameterString("precautionary"));
            params.put("ghs_code", this.getParameterString("ghs_code"));
            params.put("sku", this.getParameterString("sku"));
            params.put("purity_category", this.getParameterString("purity_category"));
            productMeterialInfoService.productAdd(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_product_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_product_info() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("product_id", this.getParameterString("product_id"));
            Product_material_info productMaterialInfo = productMeterialInfoService.getProductInfo(params);
            jsonData.setAppend(productMaterialInfo);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载产品信息失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_product_type", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_product_type() {
        JsonData jsonData = new JsonData();
        try {
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("p_dict_id", FunctionUtil.DIC_PRODUCT_TYPE_ID);
            List<Pss_dict> productTypeList =  commonsService.getDict(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(productTypeList);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载产品类型数据词典失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/product_upd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData product_upd() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("warning_amount", this.getParameterString("warning_amount"));
            params.put("product_id", this.getParameterString("product_id"));
            params.put("name_ch", this.getParameterString("name_ch"));
            params.put("name_en", this.getParameterString("name_en"));
            params.put("mol_weight", this.getParameterString("mol_weight"));
            params.put("mol_formula", this.getParameterString("mol_formula"));
            params.put("mol", this.getParameterString("mol"));
            params.put("smiles", this.getParameterString("smiles"));
            params.put("cas", this.getParameterString("cas"));
            params.put("imgage", this.getParameterString("imgage"));
            params.put("modify_oper", String.valueOf(this.getSessionData().getStaffInfo().getStaff_id()));
            params.put("modify_time", new Date());
            params.put("product_type",this.getParameterString("product_type"));
            params.put("mdl_number", this.getParameterString("mdl_number"));
            params.put("purity", this.getParameterString("purity"));
            params.put("form", this.getParameterString("form"));
            params.put("website_url", this.getParameterString("website_url"));
            params.put("msds", this.getParameterString("msds"));
            params.put("hazard", this.getParameterString("hazard"));
            params.put("precautionary", this.getParameterString("precautionary"));
            params.put("ghs_code", this.getParameterString("ghs_code"));
            params.put("sku", this.getParameterString("sku"));
            params.put("purity_category", this.getParameterString("purity_category"));
            productMeterialInfoService.updProductInfo(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/product_del", method = RequestMethod.POST)
    @ResponseBody
    public JsonData product_del() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("product_id", this.getParameterString("product_id"));
            productMeterialInfoService.delProduct(params);
            jsonData.setResult(this.SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_product_image", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_product_image() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("product_id", this.getParameterString("product_id"));
            String image = productMeterialInfoService.getProductImage(params);
            jsonData.setAppend(image);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载产品图片失败");
            e.printStackTrace();
        }
        return jsonData;
    }



    @RequestMapping(value = "/getProductMaterialPageList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData getProductMaterialPageList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",this.getParameterInteger("is_all"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            int conCount=productMeterialInfoService.getProductMaterialCount(params);
            List<product_use> list = productMeterialInfoService.getProductMaterialList(params);
            jsonData.setAppend(list);
            jsonData.setAppend_ext("("+conCount+")");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/use_material", method = RequestMethod.POST)
    @ResponseBody
    public JsonData use_material() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", getParameterInteger("use_id"));
            productMeterialInfoService.updProductMaterial(params);
            List<product_use> list = productMeterialInfoService.use_material(params);
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/add_Usematerial", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_Usematerial() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("product_id",getParameterString("product_id"));
            params.put("use_amount",getParameterString("use_amount"));
            params.put("use_unit",getParameterString("use_unit"));
            params.put("use_staff",getParameterInteger("use_staff"));
            params.put("purity",getParameterString("purity"));
            params.put("check_staff",getParameterInteger("check_staff"));
            params.put("use_desc",getParameterString("use_desc"));
            params.put("kd_code",getParameterString("kd_code"));
            params.put("kd_num",getParameterString("kd_num"));
            params.put("space_id",getParameterInteger("space_id"));
            params.put("use_time",new Date());
            params.put("status",8002);
            params.put("check_time",new Date());
            params.put("kd_status",getParameterInteger("kd_status"));
            params.put("identifying_code",getParameterInteger("identifying_code"));
            params.put("use_name",getParameterString("use_name"));
            params.put("use_batch_no",getParameterString("use_batch_no"));
            params.put("check_desc",getParameterString("check_desc"));
            params.put("use_is_del",0);
            params.put("is_usedel",0);
            productMeterialInfoService.add_Usematerial(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/material_history", method = RequestMethod.POST)
    @ResponseBody
    public JsonData material_history() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",this.getParameterInteger("is_all"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            int conCount=productMeterialInfoService.MaterialHistoryCount(params);
            List<product_use> list = productMeterialInfoService.MaterialHistoryList(params);
            jsonData.setAppend(list);
            jsonData.setAppend_ext("("+conCount+")");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/getProductSuppliesPageList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData getProductSuppliesPageList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",this.getParameterInteger("is_all"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            int conCount=productMeterialInfoService.getProductSuppliesCount(params);
            List<consumable_use> list = productMeterialInfoService.getProductSuppliesList(params);
            jsonData.setAppend(list);
            jsonData.setAppend_ext("("+conCount+")");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/use_supplies", method = RequestMethod.POST)
    @ResponseBody
    public JsonData use_supplies() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", getParameterInteger("use_id"));
            productMeterialInfoService.updProductSupplies(params);
            List<consumable_use> list = productMeterialInfoService.use_supplies(params);
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/add_Usesupplies", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_Usesupplies() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id",getParameterInteger("consumable_id"));
            params.put("amount",getParameterString("amount"));
            params.put("staff",getParameterInteger("staff"));
            params.put("use_time",new Date());
            params.put("is_del",0);
            params.put("status",8002);
            params.put("space_id",getParameterInteger("space_id"));
            params.put("desc",getParameterString("desc"));
            params.put("use_name",getParameterString("use_name"));
            params.put("check_staff",getParameterInteger("check_staff"));
            params.put("check_time",new Date());
            params.put("use_status",getParameterInteger("use_status"));
            params.put("stock_id",getParameterInteger("stock_id"));
            params.put("identifying_code",getParameterString("identifying_code"));
            params.put("kd_num",getParameterString("kd_num"));
            params.put("kd_code",getParameterString("kd_code"));
            params.put("is_use",0);
            productMeterialInfoService.add_Usesupplies(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/supplies_history", method = RequestMethod.POST)
    @ResponseBody
    public JsonData supplies_history() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",this.getParameterInteger("is_all"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            int conCount=productMeterialInfoService.SuppliesHistoryCount(params);
            List<consumable_use> list = productMeterialInfoService.SuppliesHistoryList(params);
            jsonData.setAppend(list);
            jsonData.setAppend_ext("("+conCount+")");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/getProductResearchPageList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData getProductResearchPageList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",this.getParameterInteger("is_all"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            int conCount=productMeterialInfoService.getProductResearchCount(params);
            List<product_research> list = productMeterialInfoService.getProductResearchList(params);
            jsonData.setAppend(list);
            jsonData.setAppend_ext("("+conCount+")");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/use_res", method = RequestMethod.POST)
    @ResponseBody
    public JsonData use_res() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_id", getParameterInteger("research_id"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            productMeterialInfoService.updProductRes(params);
            List<product_research> list = productMeterialInfoService.use_res(params);
            List<Staff_info> list1=productMeterialInfoService.moblieSelect(params);
            for(int i=0;i<list.size();i++)
            {
                StringBuffer str = new StringBuffer();
                str.append("cas:");
                str.append(list.get(i).getCas());
                str.append("sku:");
                str.append(list.get(i).getSku());
                str.append("申请量:");
                str.append(getParameterString("res_amount"));
                str.append(list.get(i).getUnit());
                str.append("申请人:");
                str.append(list.get(i).getStaff_name());
                str.append("【进销存】");
                for(int x=0;x<list1.size();x++)
                {
                    smsService.send(list1.get(x).getMobilephone(),str.toString());
                }
            }
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/add_Useres", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_Useres() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_staff",getParameterInteger("research_staff"));
            params.put("research_time",new Date());
            params.put("research_name",getParameterString("research_name"));
            params.put("product_id",getParameterInteger("product_id"));
            params.put("amount",getParameterString("amount"));
            params.put("unit",getParameterString("unit"));
            params.put("status",getParameterString("status"));
            params.put("research_is_del",0);
            params.put("research_batch_no",getParameterString("research_batch_no"));
            params.put("purity",getParameterString("purity"));
            params.put("sale_batch_no",getParameterString("sale_batch_no"));
            params.put("face",getParameterString("face"));
            params.put("is_waibao",getParameterInteger("is_waibao"));
            params.put("hours",getParameterInteger("hours"));
            params.put("is_dy",2);//区别与1和0 保存时便于历史记录查询
            productMeterialInfoService.add_Useres(params);

            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/research_history", method = RequestMethod.POST)
    @ResponseBody
    public JsonData research_history() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",this.getParameterInteger("is_all"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            int conCount=productMeterialInfoService.ResearchHistoryCount(params);
            List<product_research> list = productMeterialInfoService.ResearchHistoryList(params);
            jsonData.setAppend(list);
            jsonData.setAppend_ext("("+conCount+")");
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/stockSelectCas", method = RequestMethod.POST)
    @ResponseBody
    public JsonData stockSelectCas() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("cas",getParameterString("cas"));
            List<Product_material_enter_detail> list = productMeterialInfoService.stockSelectCas(params);
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/apply_purchasing", method = RequestMethod.POST)
    @ResponseBody
    public JsonData apply_purchasing() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("product_id",getParameterInteger("product_id"));
            params.put("amount",getParameterString("amount"));
            params.put("unit",getParameterString("unit"));
            params.put("enter_desc",getParameterString("enter_desc"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            productMeterialInfoService.apply_purchasing(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/use_purchasing", method = RequestMethod.POST)
    @ResponseBody
    public JsonData use_purchasing() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("enter_d_id",getParameterInteger("enter_d_id"));
            List<Product_material_enter_detail> list= productMeterialInfoService.use_purchasing(params);
            jsonData.setAppend(list);
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
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("product_id",getParameterInteger("product_id"));
            params.put("use_amount",getParameterString("use_amount"));
            params.put("use_unit",getParameterString("use_unit"));
            params.put("use_staff",getParameterInteger("use_staff"));
            params.put("use_time",new Date());
            params.put("status",8002);
            params.put("purity",getParameterString("purity"));
            params.put("space_id",getParameterInteger("space_id"));
            params.put("use_is_del",0);
            productMeterialInfoService.add_purchasing(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/suppliesSelectName", method = RequestMethod.POST)
    @ResponseBody
    public JsonData suppliesSelectName() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_name",getParameterString("consumable_name"));
            List<consumable_material_info> list= productMeterialInfoService.suppliesSelectName(params);
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/add_supplies", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_supplies() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("amount",getParameterString("amount"));
            params.put("consumable_id",getParameterInteger("consumable_id"));
            params.put("staff",getSessionData().getStaffInfo().getStaff_id());
            params.put("desc",getParameterString("desc"));
            productMeterialInfoService.add_supplies(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/add_consumable_use", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_consumable_use() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id",getParameterInteger("consumable_id"));
            params.put("space_id",getParameterInteger("space_id"));
            params.put("amount",getParameterInteger("amount"));
            params.put("staff",getSessionData().getStaffInfo().getStaff_id());
            params.put("is_del",0);
            params.put("status",8002);
            productMeterialInfoService.add_consumable_use(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/suppliesRepairList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData suppliesRepairList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",this.getParameterInteger("is_all"));
            params.put("repair_id",this.getParameterInteger("repair_id"));
            params.put("repair_staff",getSessionData().getStaffInfo().getStaff_id());
            int conCount=productMeterialInfoService.suppliesRepairCount(params);
            List<consumable_repair> list = productMeterialInfoService.suppliesRepairList(params);
            jsonData.setAppend_ext("("+conCount+")");
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/addRepairList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData addRepairList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id",this.getParameterInteger("consumable_id"));
            params.put("repair_staff",this.getParameterInteger("repair_staff"));
            params.put("repair_amount",this.getParameterString("repair_amount"));
            params.put("repair_time",new Date());
            params.put("status",14003);
            params.put("repair_is_del",0);
            params.put("repair_desc",this.getParameterString("repair_desc"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            params.put("is_all",1);
            params.put("repair_id",this.getParameterInteger("repair_id"));
            productMeterialInfoService.addRepairList(params);
            List<consumable_repair> list = productMeterialInfoService.suppliesRepairList(params);
            List<Staff_info> list1=productMeterialInfoService.moblieSelect(params);
            for(int i=0;i<list.size();i++)
            {
                StringBuffer str = new StringBuffer();
                str.append("耗材名:");
                str.append(list.get(i).getConsumable_name());
                str.append("申请量:");
                str.append(getParameterString("repair_amount"));
                str.append(list.get(i).getConsumable_unit());
                str.append("申请人:");
                str.append(list.get(i).getStaff_name());
                str.append("【进销存】");
                for(int x=0;x<list1.size();x++)
                {
                    smsService.send(list1.get(x).getMobilephone(),str.toString());
                }
            }
            productMeterialInfoService.updRepair(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/selectRepairName", method = RequestMethod.POST)
    @ResponseBody
    public JsonData selectRepairName() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_name",this.getParameterString("consumable_name"));
            List<consumable_repair> list = productMeterialInfoService.selectRepairName(params);
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/addRepairFanxiu", method = RequestMethod.POST)
    @ResponseBody
    public JsonData addRepairFanxiu() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("repair_id",this.getParameterInteger("repair_id"));
            List<consumable_repair> list = productMeterialInfoService.selectRepairFanxiu(params);
            for (int i=0;i<list.size();i++){
                consumable_repair consumable_repair=list.get(i);
                params.put("consumable_id",consumable_repair.getConsumable_id());
                params.put("status",consumable_repair.getStatus());
                params.put("repair_is_del",consumable_repair.getRepair_is_del());
                params.put("repair_desc",consumable_repair.getRepair_desc());
            }
            params.put("repair_time",new Date());
            params.put("repair_amount",getParameterString("repair_amount"));
            params.put("repair_staff",getSessionData().getStaffInfo().getStaff_id());
            params.put("is_usedel",1);
            productMeterialInfoService.addRepairFanxiu(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/no_addRepairFanxiu", method = RequestMethod.POST)
    @ResponseBody
    public JsonData no_addRepairFanxiu() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id",this.getParameterString("consumable_id"));
            params.put("repair_staff",getSessionData().getStaffInfo().getStaff_id());
            params.put("repair_amount",getParameterString("repair_amount"));
            params.put("status",14001);
            params.put("repair_time",new Date());
            params.put("repair_desc",getParameterString("repair_desc"));
            params.put("repair_is_del",0);
            params.put("is_usedel",0);
            productMeterialInfoService.no_addRepairFanxiu(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/fanxiu_add_select", method = RequestMethod.POST)
    @ResponseBody
    public JsonData fanxiu_add_select() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_name",this.getParameterString("fanxiu_name"));
            params.put("pack",getParameterString("guige_name"));
            params.put("consumable_unit",getParameterString("fanxiu_unit"));
            params.put("staff_id",getSessionData().getStaffInfo().getStaff_id());
            params.put("create_time",new Date());
            params.put("status",0);

            params.put("repair_staff",this.getSessionData().getStaffInfo().getStaff_id());
            params.put("repair_time",new Date());
            params.put("repair_amount",getParameterString("repair_amount"));

            params.put("repair_is_del",0);
            params.put("repair_desc",getParameterString("repair_desc"));

            List<consumable_material_info> list = productMeterialInfoService.fanxiu_add_select(params);
            if (list.size()==0){
                productMeterialInfoService.fanxiu_info_add(params);
                params.put("status",14001);
                productMeterialInfoService.addFanxiuRepair(params);
                jsonData.setResult("successforadd");
            }else {
                jsonData.setAppend(list);
            }
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/addFanxiuRepair", method = RequestMethod.POST)
    @ResponseBody
    public JsonData addFanxiuRepair() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("consumable_id",getParameterString("consumable_id"));
            params.put("repair_staff",getParameterInteger("repair_staff"));
            params.put("repair_time",new Date());
            params.put("repair_amount",getParameterString("repair_amount"));
            params.put("status",14001);
            params.put("repair_is_del",0);
            params.put("repair_desc",getParameterString("repair_desc"));
            productMeterialInfoService.addFanxiuRepair(params);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //原料请购审核首页查询
    @RequestMapping(value = "/MaterialRequisitionAuditList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData MaterialRequisitionAuditList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",this.getParameterString("is_all"));
            int count=productMeterialInfoService.MaterialRequisitionAuditCount(params);
            List<product_use> list = productMeterialInfoService.MaterialRequisitionAuditList(params);
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
    //原料审核确认
    @RequestMapping(value = "/ConfirmationAudit", method = RequestMethod.POST)
    @ResponseBody
    public JsonData ConfirmationAudit() {
        JsonData jsonData = new JsonData();
        try {
            product_use product_use = new product_use();
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("use_id", this.getParameterString("use_id"));
            params.put("status", this.getParameterString("status"));
            params.put("desc", this.getParameterString("desc"));
            params.put("check_time",new Date());
            params.put("check_staff",this.getSessionData().getStaffInfo().getStaff_id());
            productMeterialInfoService.ConfirmationAudit(params);
            product_use= productMeterialInfoService.Receive_Preview(Integer.valueOf(String.valueOf(this.getParameterString("use_id"))));
            List<Staff_info> list1=productMeterialInfoService.staff_mobilephone(params);
            if(Integer.valueOf(String.valueOf(this.getParameterString("status")))==11001)
            {
                StringBuffer str = new StringBuffer();
                str.append("您好,"+product_use.getStaff_name()+"申请的产品:");
                str.append(product_use.getCas()+"/"+product_use.getUse_amount()+product_use.getUse_unit()+"/");
                if(product_use.getPurity()!=null)
                {
                    str.append(product_use.getPurity()+"/");
                }
                str.append("已由"+product_use.getCheck_name()+"审核通过,");
                str.append("如需要采购，请进入后台生成采购订单,谢谢");
                str.append("【进销存】");
                for(int x=0;x<list1.size();x++)
                {
                    smsService.send(list1.get(x).getMobilephone(),str.toString());
                }
            }
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //耗材请购审核首页查询
    @RequestMapping(value = "/getConsumableList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData getConsumableList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all",this.getParameterString("is_all"));
            int count=productMeterialInfoService.getConsumableCount(params);
            List<consumable_use> list = productMeterialInfoService.getConsumableList(params);
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
    //耗材审核确认
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
            productMeterialInfoService.useUpdate(params);

            List<consumable_use> list=productMeterialInfoService.consumable_mobilephone(params);
            List<Staff_info> list1=productMeterialInfoService.staff_mobilephone(params);
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
    //入库审核
    @RequestMapping(value = "/getResearchList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData getResearchList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all", getParameterString("is_all"));
            int count=productMeterialInfoService.getResearchCount(params);
            List<product_research> list = productMeterialInfoService.getResearchList(params);
            jsonData.setAppend_ext("("+count+")");
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //入库审核确认
    @RequestMapping(value = "/check_tg", method = RequestMethod.POST)
    @ResponseBody
    public JsonData check_tg(){
        JsonData jsonData=new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_id",getParameterString("research_id"));
            params.put("status",5002);
            productMeterialInfoService.researchStatusUp(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //入库审核不同意  删除
    @RequestMapping(value = "/researchDel", method = RequestMethod.POST)
    @ResponseBody
    public JsonData researchDel() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_id", this.getParameterString("research_id"));
            productMeterialInfoService.researchDel(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }




    //库管代办原料首页加载
    @RequestMapping(value = "/warehouseMaterialList", method = RequestMethod.POST)
    @ResponseBody
    public JsonData warehouseMaterialList() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all", this.getParameterString("is_all"));
            int count = productMeterialInfoService.warehouseMaterialCount(params);
            List<PurchaseInventoryInfo> list = productMeterialInfoService.warehouseMaterialList(params);
            jsonData.setAppend_ext("("+count+")");
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    //库管代办原料历史首页加载
    @RequestMapping(value = "/warehouseMaterialList_history", method = RequestMethod.POST)
    @ResponseBody
    public JsonData warehouseMaterialList_history() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("is_all", this.getParameterString("is_all"));
            int count = productMeterialInfoService.warehouseMaterialCount_history(params);
            List<PurchaseInventoryInfo> list = productMeterialInfoService.warehouseMaterialList_history(params);
            jsonData.setAppend_ext("("+count+")");
            jsonData.setAppend(list);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
}
