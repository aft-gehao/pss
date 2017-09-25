package com.afanti.psi.inventory.service.impl;

import com.afanti.psi.commons.dao.CommonsDao;
import com.afanti.psi.inventory.dao.ProductInInventoryDao;
import com.afanti.psi.inventory.service.ProductInInventoryService;
import com.afanti.psi.inventory.vo.Product_material_enter;
import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.inventory.vo.PurchaseInventoryInfo;
import com.afanti.psi.purchasing.dao.MaterialPurchaseDao;
import com.afanti.psi.purchasing.vo.Material_purchase;
import com.afanti.psi.purchasing.vo.Material_purchase_detail;
import com.afanti.psi.sms.service.impl.SmsService;
import com.afanti.psi.use.vo.product_use;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.dao.VenditionDao;
import com.afanti.psi.vendition.vo.Product_sale;
import com.afanti.psi.vendition.vo.Product_sale_detail;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class ProductInInventoryServiceImpl implements ProductInInventoryService {
    @Autowired
    private ProductInInventoryDao productInInventoryDao;
    @Autowired
    private MaterialPurchaseDao materialPurchaseDao;
    @Autowired
    private VenditionDao venditionDao;
    @Autowired
    private CommonsDao commonsDao;
    @Autowired
    private SmsService smsService;
    @Override
    public Page<PurchaseInventoryInfo> getProductInInventoryPageList(Map<String, Object> params) {
        Page<PurchaseInventoryInfo> pageInfo = new Page<PurchaseInventoryInfo>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<PurchaseInventoryInfo> purchaseInventoryInfoList = productInInventoryDao.getProductInInventoryPageList(pageInfo);
        pageInfo.setResults(purchaseInventoryInfoList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public Map<String, Object> loadPurchasingInventory(String purchase_id) {
        //获取采购主表信息
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("purchase_id", purchase_id);
        Material_purchase materialPurchase = materialPurchaseDao.getMaterialPurchaseInfo(params);
        //获取产品信息
        List<Material_purchase_detail> purchaseInventoryList = productInInventoryDao.getPurchaseInventoryList(params);
        params = new HashMap<String, Object>();
        params.put("materialPurchase", materialPurchase);
        params.put("purchaseInventoryList", purchaseInventoryList);
        return params;
    }

    @Override
    public List<Product_material_enter_detail> getProductMaterialEnterDetail(Map<String, Object> params) {
        List<Product_material_enter_detail> productMaterialEnterDetailList = productInInventoryDao.getProductMaterialEnterDetail(params);
        return productMaterialEnterDetailList;
    }
//Logger logger=Logger.getLogger(ProductInInventoryService.class.getName());
    @Override
    public void purchasingInventorySave(Map<String, Object> params) throws Exception {
        //生成批次号

        String params_value = params.get("params_value").toString();
        String[] params_value_sp = params_value.split("_");
        for (String value : params_value_sp) {
            DateTime dateTime = new DateTime();
            params.put("BATCH_NO", FunctionUtil.CGI_BATCH_NO + dateTime.toString("yyyyMMdd"));
            params.put("o_ret", "");
            String[] args = value.split(",");
            params.put("purchase_id", args[0]);
            //logger.info(args[0]);
            params.put("PRODUCT_ID", args[1]);
            params.put("new_amount", args[2]);
            params.put("left_amount", args[3]);
            params.put("unit", args[4]);
          /*  params.put("new_unit", "g");*/
           /* Pss_util_dict data=commonsDao.getRatio(params);*/
           /* params.put("new_amount",Float.parseFloat(args[2]) * data.getRatio());*/
           /* params.put("unit",data.getNew_unit());*/
            params.put("purchase_d_id", args[5]);
            params.put("space_id", args[6]);
            params.put("purity", args[7]);
            params.put("DETAIL_TEXT", args[8]);
            params.put("ENTER_NAME", args[9]);
            productInInventoryDao.purchasingInventorySave(params);


            List<Staff_info> list=productInInventoryDao.moblieSelect(params);
            List<product_use> list1=productInInventoryDao.productSelect(params);
            for(int i=0;i<list1.size();i++){
                StringBuffer str = new StringBuffer();
                str.append("亲,您于");
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                str.append(formatter.format(list1.get(i).getUse_time())+"日");
                str.append("申请的"+list1.get(i).getCas()+"共计"+list1.get(i).getUse_amount()+list1.get(i).getUse_unit()+",");
                str.append("目前已完成入库，如需领用，请去后台生成领用申请,谢谢");
                str.append("【进销存】");
                for(int x=0;x<list.size();x++)
                {
                    smsService.send(list.get(x).getMobilephone(),str.toString());
                }
            }
        }
        String o_ret = params.get("o_ret").toString();
        if (!"A0000".equals(o_ret)) {
            throw new Exception("执行存储过程失败：" + o_ret);
        }
    }

    @Override
    public Map<String, Object> loadVenditionOutInfo(String sale_id) throws Exception {
        //查询销售主表数据
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("sale_id", sale_id);
        Product_sale productSaleInfo = venditionDao.getProductSaleInfo(params);
        //查询销售产品列表
        List<Product_sale_detail> productSaleDetailList = productInInventoryDao.getVenditionProductList(params);
        //venditionReturnDao.getVenditionReturnProductList(params);
        params = new HashMap<String, Object>();
        params.put("productSaleInfo", productSaleInfo);
        params.put("productSaleDetailList", productSaleDetailList);
        return params;
    }

    @Override
    public void venditionInInventory(Map<String, Object> params) throws Exception {
        String params_value = params.get("params_value").toString();
        String[] params_value_sp = params_value.split("_");
        for (String values : params_value_sp) {
            String[] args = values.split(",");
            params.put("P_BATCH_NO", args[0]);
            params.put("P_DESC",  args[1]);
            params.put("P_AMOUNT",  args[2]);
            productInInventoryDao.venditionInInventory(params);
        }
    }
    @Override
    public List<Product_material_enter> purchasingInventoryTemplateFind(int enter_type_billno){
      //  Map<String, Object> params = new HashMap<String, Object>();
        List<Product_material_enter> list = productInInventoryDao.purchasingInventoryTemplateFind(enter_type_billno);
     //   params.put("list",list);
        return list;
    }
   //库存预警查询
    @Override
    public List<Product_material_enter> warning_select( ){

        List<Product_material_enter> list = productInInventoryDao.warning_select();
        return list;
    }

    public  void inventory_check(Map<String,Object> params) throws Exception{

        productInInventoryDao.inventory_check(params);
    }
}
