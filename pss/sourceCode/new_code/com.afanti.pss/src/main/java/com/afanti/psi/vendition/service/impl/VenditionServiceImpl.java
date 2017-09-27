package com.afanti.psi.vendition.service.impl;

import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.product.vo.Product_material_info;
import com.afanti.psi.shinfo.vo.Cus_Supplier_info;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import com.afanti.psi.vendition.dao.VenditionDao;
import com.afanti.psi.vendition.service.VenditionService;
import com.afanti.psi.vendition.vo.Material_quotation;
import com.afanti.psi.vendition.vo.Product_sale;
import com.afanti.psi.vendition.vo.Product_sale_detail;
import com.afanti.psi.vendition.vo.SelectProductInventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class VenditionServiceImpl implements VenditionService {

    @Autowired
    private VenditionDao venditionDao;

    @Override
    public Page<Product_sale> getVenditionPageList(Map<String, Object> params) {
        Page<Product_sale> pageInfo = new Page<Product_sale>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Product_sale> productSaleList = venditionDao.getVenditionPageList(pageInfo);
        pageInfo.setResults(productSaleList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public Page<SelectProductInventory> getProductInventoryList(Map<String, Object> params) {
        Page<SelectProductInventory> pageInfo = new Page<SelectProductInventory>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<SelectProductInventory> productInventoryList = venditionDao.getProductInventoryPageList(pageInfo);
        pageInfo.setResults(productInventoryList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;

    }

    @Override
    public void venditionSumbit(Map<String, Object> params) {
        //插入销售主表数据
        Product_sale productSale = new Product_sale();
        productSale.setSale_name(String.valueOf(params.get("sale_name")));
        productSale.setAll_total(Float.valueOf(String.valueOf(params.get("all_total"))));
        productSale.setStaff_id(Integer.valueOf(String.valueOf(params.get("staff_id"))));
        try {
            productSale.setSale_time(FunctionUtil.simpleDateFormat.parse(params.get("sale_time").toString()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        productSale.setDesc(String.valueOf(params.get("desc")));
        productSale.setCustomer_id(Integer.valueOf(String.valueOf(params.get("customer_id"))));
        productSale.setC_linkman_id(Integer.valueOf(String.valueOf(params.get("c_linkman_id"))));
        productSale.setSupplier_id(1);
        productSale.setStatus(FunctionUtil.PRODUCT_SALE_TYPE_NOOUT);
        venditionDao.addProductSale(productSale);
        //新增销售明细表
        addProductSaleDetial(String.valueOf(productSale.getSale_id()), String.valueOf(params.get("vendition_detail_params")));
    }

    @Override
    public Product_sale venditionSumbit_quoation(Map<String, Object> params) {
        //插入销售主表数据
        Product_sale productSale = new Product_sale();
        productSale.setSale_name(String.valueOf(params.get("sale_name")));
        productSale.setAll_total(Float.valueOf(String.valueOf(params.get("all_total"))));
        productSale.setStaff_id(Integer.valueOf(String.valueOf(params.get("staff_id"))));
        productSale.setSale_isdel(Integer.valueOf(String.valueOf(params.get("sale_isdel"))));
        productSale.setSale_time(new Date());
        productSale.setDesc(String.valueOf(params.get("desc")));
        productSale.setCustomer_id(Integer.valueOf(String.valueOf(params.get("customer_id"))));
        productSale.setC_linkman_id(Integer.valueOf(String.valueOf(params.get("c_linkman_id"))));
        productSale.setSupplier_id(1);
        productSale.setStatus(FunctionUtil.PRODUCT_SALE_TYPE_NOOUT);
        venditionDao.addProductSale_quoation(productSale);
        //新增销售明细表
        productSale.setSale_d_id(Integer.valueOf(String.valueOf(addProductSaleDetialForQuoation(String.valueOf(productSale.getSale_id()), String.valueOf(params.get("vendition_detail_params")),String.valueOf(params.get("sale_way"))).get("sale_d_id"))));
        return productSale;
    }

    @Override
    public void venditionUpdSubmit(Map<String, Object> params) {
        //更新销售主表
        venditionDao.updProductSal(params);
        //删除销售详情表
        venditionDao.delProductSalDetail(params);
        //新增详情表
        addProductSaleDetial(String.valueOf(params.get("sale_id")), String.valueOf(params.get("vendition_detail_params")));
    }

    @Override
    public Map<String, Object> loadVenditionInfo(String sale_id) {
        //查询销售主表数据
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("sale_id", sale_id);
        Product_sale productSaleInfo = venditionDao.getProductSaleInfo(params);
        //查询销售产品列表
        List<Product_sale_detail> productSaleDetailList = venditionDao.getProductSaleDetialList(params);
        params = new HashMap<String, Object>();
        params.put("productSaleInfo", productSaleInfo);
        params.put("productSaleDetailList", productSaleDetailList);
        return params;
    }

    @Override
    public void delVendition(Map<String, Object> params) {
        //删除销售主表
        params.put("sale_isdel", "1");
        venditionDao.updProductSal(params);
        //删除销售产品
        venditionDao.delProductSalDetail(params);
    }

    private void addProductSaleDetial(String sale_id, String vendition_detail_params) {
        if (vendition_detail_params != null && !"".equals(vendition_detail_params)) {
            Map<String, Object> addParams = null;
            String[] vendition_detail_sp = vendition_detail_params.split("_");
            for (String params1 : vendition_detail_sp) {
                addParams = new HashMap<String, Object>();
                String[] params2 = params1.split(",");
                addParams.put("sale_id", sale_id);
                addParams.put("batch_no", params2[0]);
                addParams.put("product_id", params2[1]);
                addParams.put("amount", params2[2]);
                addParams.put("unit", params2[3]);
                addParams.put("purity", params2[4]);
                addParams.put("unit_price", params2[5]);
                addParams.put("total", "1");
                addParams.put("space_id", params2[6]);
                addParams.put("sale_status", FunctionUtil.PRODUCT_SALE_TYPE_NOOUT);
                if (params2.length == 8) {
                    addParams.put("desc", params2[7]);
                } else {
                    addParams.put("desc", "");
                }
                venditionDao.addProductSaleDetail(addParams);
            }
        }
    }
    private Map<String, Object> addProductSaleDetialForQuoation(String sale_id, String vendition_detail_params,String sale_way) {
        Map<String, Object> addParams = null;
        if (vendition_detail_params != null && !"".equals(vendition_detail_params)) {
                addParams = new HashMap<String, Object>();
                String[] params2 = vendition_detail_params.split("#");
                addParams.put("sale_id", sale_id);
                addParams.put("product_id", params2[0]);
                addParams.put("amount", params2[1]);
                addParams.put("unit", params2[2]);
                addParams.put("purity", params2[3]);
                addParams.put("unit_price", params2[4]);
                addParams.put("total", "1");
                addParams.put("quotation_id",params2[5]);
                addParams.put("sale_way",sale_way);
                //add by gehao  获取此次销售单需求量查找库存量，若有符合条件的数据则获取并更新至销售单中
                Product_material_enter_detail info = venditionDao.kucun_info_select(addParams);
              /* if(info!=null)
                {
                    addParams.put("sale_d_isdel",0);
                    addParams.put("space_id",info.getSpace_id());
                    addParams.put("sale_batch_no",info.getSale_batch_no());
                    addParams.put("batch_no",info.getBatch_no());
                }
               else{
                    addParams.put("sale_d_isdel",1);
                }
                addParams.put("sale_status", FunctionUtil.PRODUCT_SALE_TYPE_NOOUT);*/
                if (params2.length == 7) {
                    addParams.put("desc", params2[6]);
                } else {
                    addParams.put("desc", "");
                }
                venditionDao.quoationStatusUpdate(addParams);
                venditionDao.addProductSaleDetailForQuoation(addParams);
            }
        return addParams;
        }



    public Page<Material_quotation> materialQuotationSelect(Map<String, Object> params) {
        Page<Material_quotation> pageInfo = new Page<Material_quotation>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Material_quotation> materialQuList = venditionDao.materialQuotationSelectPageList(pageInfo);
        pageInfo.setResults(materialQuList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }


    public void add_xunjia(Map<String, Object> params) {
        venditionDao.add_xunjia(params);
    }

    public List<Product_material_info> select_cas(Map<String, Object> params) {
        return venditionDao.select_cas(params);
    }

    public List<Product_material_info> select_sku(Map<String, Object> params) {
        return venditionDao.select_sku(params);
    }

    public int add_product(Product_material_info product_material_info) {
        return venditionDao.add_product(product_material_info);
    }

    public List<Cus_Supplier_info> select_customer(Map<String, Object> params) {
        return venditionDao.select_customer(params);
    }

    public int add_customer(Cus_Supplier_info cus_supplier_info) {
        return venditionDao.add_customer(cus_supplier_info);
    }
    public  List<Product_material_enter_detail> select_amount(Map<String,Object> params){
        return venditionDao.select_amount(params);
    }

    public void add_task(Map<String,Object> params){
        venditionDao.add_task(params);
    }

    public int select_hetong_no(Map<String, Object> params){
        return venditionDao.select_hetong_no(params);
    }
    @Override
    public void sale_doc_add(Map<String, Object> params) {

        venditionDao.sale_doc_add(params);

    }
//查找是否有产品数据（首选有库存的）没有新增
    @Override
    public int select_id_cas(Map<String, Object> params) {
        //更新采购主表返回主键ID
        if(venditionDao.select_count_cas(params)>0)
        {
            List<Integer> list=venditionDao.select_id_cas(params);
            for(int i=0;i<list.size();i++)
            {
                List<Product_material_enter_detail> info=venditionDao.kucun_select(list.get(i));
                for(int x=0;x<info.size();x++) {
                    if (info.get(x).getAmount() >= Float.valueOf(String.valueOf(params.get("amount")))) ;
                    {
                        return list.get(i);
                    }
                }
            }
            return list.get(0);
        }
        else{
            venditionDao.insert_product(params);
            return Integer.valueOf(String.valueOf(params.get("product_id")));
        }
    }
//查找是否有客户数据如果没有新增
    @Override
    public int selec_id_cus(Map<String, Object> params) {

        if(venditionDao.select_count_cus(params)>0)
        {
            List<Integer> list=venditionDao.select_id_cus(params);
            for(int i=0;i<list.size();i++)
            {
                    return list.get(0);
            }
        }
        else{
            venditionDao.insert_cus(params);
            return Integer.valueOf(String.valueOf(params.get("cs_sup_id")));
        }
        return 0;
    }
    @Override
    public  Product_sale_detail select_vendition(Map<String, Object> params) {
           return venditionDao.select_vendition(params);
    }
    @Override
    public  void vendition_updata(Map<String, Object> params) {
         venditionDao.vendition_updata(params);
    }


}
