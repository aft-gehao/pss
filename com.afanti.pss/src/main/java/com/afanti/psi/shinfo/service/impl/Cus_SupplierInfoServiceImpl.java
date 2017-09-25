package com.afanti.psi.shinfo.service.impl;

import com.afanti.psi.shinfo.dao.Cus_SupplierInfoDao;
import com.afanti.psi.shinfo.service.Cus_SupplierInfoService;
import com.afanti.psi.shinfo.vo.Cus_Supplier_info;
import com.afanti.psi.shinfo.vo.Customer_delivery_address;
import com.afanti.psi.shinfo.vo.Linkman;
import com.afanti.psi.shinfo.vo.Supplier_product_rel;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/*import redis.clients.jedis.ShardedJedis;*/

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class Cus_SupplierInfoServiceImpl implements Cus_SupplierInfoService {

    @Autowired
    private Cus_SupplierInfoDao supplierInfoDao;
    /**
     * 供应商列表查询
     * Created by gehao on 2017/4/24 0013.
     */
    @Override
    public Page<Cus_Supplier_info> shinfoSelect(Map<String, Object> params) {
        Page<Cus_Supplier_info> pageInfo = new Page<Cus_Supplier_info>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Cus_Supplier_info> shinfoList = supplierInfoDao.shinfoSelectPageList(pageInfo);
        pageInfo.setResults(shinfoList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    /**
     * 供应商新增
     * Created by gehao on 2017/4/25 0013.
     */
    @Override
    public void shinfoAdd(Map<String, Object> params) {
        Cus_Supplier_info supplierInfo = new Cus_Supplier_info();
        supplierInfo.setCustomer_id(0);
        supplierInfo.setSupplier_id(1);
        supplierInfo.setName(String.valueOf(params.get("supplier_name")));
        supplierInfo.setType(Integer.valueOf(String.valueOf(params.get("supplier_type"))));
        supplierInfo.setTel(String.valueOf(params.get("supplier_tel")));
        supplierInfo.setAddress(String.valueOf(params.get("supplier_address")));
        supplierInfo.setEmail(String.valueOf(params.get("supplier_email")));
        supplierInfo.setCust_no(String.valueOf(params.get("cus_no")));
        supplierInfo.setShort_name(String.valueOf(params.get("short_name")));
        supplierInfo.setFax(String.valueOf(params.get("supplier_fax")));
        supplierInfo.setProfile(String.valueOf(params.get("profile")));
        supplierInfo.setCreate_oper(Integer.valueOf(String.valueOf(params.get("create_oper"))));
        supplierInfo.setCreate_time(new Date());
       /* supplierInfo.setModiify_time(new Date());
        supplierInfo.setModiify_oper(Integer.valueOf(String.valueOf(params.get("modify_oper"))));*/
        supplierInfo.setStatus(0);
        supplierInfoDao.addShInfo(supplierInfo);
    }
    /**
     * 供应商名称校验
     * Created by gehao on 2017/4/25 0013.
     */
    @Override
    public int shinfoNameSelect(Map<String, Object> params) {

        int count = supplierInfoDao.shinfoNameSelect(params);

        return count;
    }
    /**
     * 供应商最新id查询
     * Created by gehao on 2017/4/24 0013.
     */
    @Override
    public int shinfoIdSelect() {

       int id = supplierInfoDao.shinfoIdSelect();
        return id;
    }
    /**
     * 供应商详情查询
     * Created by gehao on 2017/4/24 0013.
     */
    @Override
   /* @CachePut(value="redis",key="'test'", unless="#result==null")*/
    public Cus_Supplier_info shinfoDetailSelect(int cs_sup_id) {
        Cus_Supplier_info info = supplierInfoDao.shinfoDetailSelect(cs_sup_id);
        return info;
    }
    /**
     * 供应商联系人新增
     * Created by gehao on 2017/4/26 0013.
     */
    @Override
    public void linkmanAdd(Map<String, Object> params) {
        Linkman supplier_linkman = new Linkman();
        supplier_linkman.setIs_owner(Integer.valueOf(String.valueOf(params.get("is_owner"))));
        supplier_linkman.setChinesename(String.valueOf(params.get("chinesename")));
        supplier_linkman.setEnglishname(String.valueOf(params.get("englishname")));
        supplier_linkman.setTtitle(String.valueOf(params.get("ttitle")));
        supplier_linkman.setFax(String.valueOf(params.get("fax")));
        supplier_linkman.setEmail(String.valueOf(params.get("email")));
        supplier_linkman.setMobilephone(String.valueOf(params.get("mobilephone")));
        supplier_linkman.setFixedphone(String.valueOf(params.get("fixedphone")));
        supplier_linkman.setAddress(String.valueOf(params.get("address")));
        supplier_linkman.setCreate_oper(Integer.valueOf(String.valueOf(params.get("create_oper"))));
        supplier_linkman.setCreate_time(new Date());
       /* supplierInfo.setModiify_time(new Date());
        supplierInfo.setModiify_oper(Integer.valueOf(String.valueOf(params.get("modify_oper"))));*/
        supplier_linkman.setStatus(0);
        if(params.get("flag")!="")
        {
            supplier_linkman.setCustomer_id(Integer.valueOf(String.valueOf(params.get("customer_id"))));
            supplier_linkman.setSupplier_id(0);
            supplierInfoDao.cuslinkmanAdd(supplier_linkman);
        }
        else {
            supplier_linkman.setSupplier_id(Integer.valueOf(String.valueOf(params.get("supplier_id"))));
            supplier_linkman.setCustomer_id(0);
            supplierInfoDao.linkmanAdd(supplier_linkman);
        }
    }
    /**
     * 联系人详情查询
     * Created by gehao on 2017/4/26 0013.
     */
    @Override
    public Linkman linkmanSelect(int s_linkman_id) {
        Linkman info = supplierInfoDao.linkmanSelect(s_linkman_id);
        return info;
    }
    /**
     * 供应商联系人修改
     * Created by gehao on 2017/4/26 0013.
     */
    @Override
    public void linkmanUpdate(Map<String, Object> params) {
        Linkman supplier_linkman = new Linkman();
        supplier_linkman.setLinkman_id(Integer.valueOf(String.valueOf(params.get("s_linkman_id"))));
        supplier_linkman.setSupplier_id(Integer.valueOf(String.valueOf(params.get("supplier_id"))));
        supplier_linkman.setIs_owner(Integer.valueOf(String.valueOf(params.get("is_owner"))));
        supplier_linkman.setChinesename(String.valueOf(params.get("chinesename")));
        supplier_linkman.setEnglishname(String.valueOf(params.get("englishname")));
        supplier_linkman.setTtitle(String.valueOf(params.get("ttitle")));
        supplier_linkman.setFax(String.valueOf(params.get("fax")));
        supplier_linkman.setEmail(String.valueOf(params.get("email")));
        supplier_linkman.setMobilephone(String.valueOf(params.get("mobilephone")));
        supplier_linkman.setFixedphone(String.valueOf(params.get("fixedphone")));
        supplier_linkman.setAddress(String.valueOf(params.get("address")));
        supplier_linkman.setModify_time(new Date());
        supplier_linkman.setModify_oper(Integer.valueOf(String.valueOf(params.get("modify_oper"))));
        supplier_linkman.setStatus(0);
        supplierInfoDao.linkmanUpdate(supplier_linkman);
    }
    /**
     * 供应商联系人删除
     * Created by gehao on 2017/4/26 0013.
     */
    @Override
    public void linkmanDelete(Map<String, Object> params) {
        Linkman supplier_linkman = new Linkman();
        supplier_linkman.setLinkman_id(Integer.valueOf(String.valueOf(params.get("s_linkman_id"))));
        supplierInfoDao.linkmanDelete(supplier_linkman);
    }
    /**
     * 供应商修改
     * Created by gehao on 2017/4/27 0013.
     */
    @Override
    public void shinfoUpdata(Map<String, Object> params) {
        Cus_Supplier_info supplierInfo = new Cus_Supplier_info();
        supplierInfo.setCs_sup_id(Integer.parseInt(String.valueOf(params.get("cs_sup_id"))));
        supplierInfo.setName(String.valueOf(params.get("name")));
        supplierInfo.setType(Integer.valueOf(String.valueOf(params.get("type"))));
        supplierInfo.setTel(String.valueOf(params.get("tel")));
        supplierInfo.setAddress(String.valueOf(params.get("address")));
        supplierInfo.setEmail(String.valueOf(params.get("email")));
        supplierInfo.setCust_no(String.valueOf(params.get("cust_no")));
        supplierInfo.setShort_name(String.valueOf(params.get("short_name")));
        supplierInfo.setFax(String.valueOf(params.get("fax")));
        supplierInfo.setProfile(String.valueOf(params.get("profile")));
        supplierInfo.setModify_time(new Date());
        supplierInfo.setModify_oper(Integer.valueOf(String.valueOf(params.get("modify_oper"))));
        supplierInfo.setStatus(0);
        supplierInfoDao.updataShInfo(supplierInfo);
    }
    /**
     * 供应商删除
     * Created by gehao on 2017/4/27 0013.
     */
    @Override
    public void shinfoDelete(Map<String, Object> params) {
        supplierInfoDao.shinfoDelete((Integer.valueOf(String.valueOf(params.get("cs_sup_id")))));
    }
    /**
     * 供应商产品列表查询
     * Created by gehao on 2017/4/28 0013.
     */
    @Override
    public Page<Supplier_product_rel> shinfoProductSelect(Map<String, Object> params) {
        Page<Supplier_product_rel> pageInfo = new Page<Supplier_product_rel>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Supplier_product_rel> shinfoList = supplierInfoDao.shinfoProductSelectPageList(pageInfo);
        pageInfo.setResults(shinfoList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    /**
     * 供应商产品新增
     * Created by gehao on 2017/4/27 0013.
     */
    @Override
    public void productAdd(Map<String, Object> params) {
        Supplier_product_rel supplier_product_rel=new Supplier_product_rel();
        //切割字符串
        String[] product_id=String.valueOf(params.get("product_id")).split("#");
        String[] p_price=String.valueOf(params.get("unit_price")).split("#");
        String[] p_purity=String.valueOf(params.get("purity")).split("#");
        String[] p_unit=String.valueOf(params.get("unit")).split("#");
        for(int i=0;i<product_id.length;i++)
        {
            supplier_product_rel.setSupplier_id((Integer.valueOf(String.valueOf(params.get("supplier_id")))));
            supplier_product_rel.setCreate_time(new Date());
            supplier_product_rel.setStatus(0);
            supplier_product_rel.setCreate_oper(Integer.valueOf(String.valueOf(params.get("create_oper"))));
            supplier_product_rel.setProduct_id(Integer.valueOf(product_id[i]));
            supplier_product_rel.setP_purity(p_purity[i]);
            /*supplier_product_rel.setP_unit(p_unit[i]);
            supplier_product_rel.setP_price(Float.valueOf(p_price[i]));*/
            supplierInfoDao.productAdd(supplier_product_rel);
        }
    }
    /**
     * 供应商产品是否重复校验
     * Created by gehao on 2017/5/02 0013.
     */
    @Override
    public int productAddJiaoYan(Map<String, Object> params) {
        Supplier_product_rel supplier_product_rel=new Supplier_product_rel();
        supplier_product_rel.setProduct_id((Integer.valueOf(String.valueOf(params.get("product_id")))));
        supplier_product_rel.setSupplier_id((Integer.valueOf(String.valueOf(params.get("supplier_id")))));
        int count = supplierInfoDao.productAddJiaoYan(supplier_product_rel);
        return count;
    }
    /**
     * 供应商产品修改回显
     * Created by gehao on 2017/5/02 0013.
     */
    @Override
    public Supplier_product_rel productUpDataSelect(Map<String, Object> params) {
        Supplier_product_rel supplier_product_rel=supplierInfoDao.productUpDataSelect(params);
        return supplier_product_rel;
    }
    /**
     * 供应商产品更新
     * Created by gehao on 2017/5/02 0013.
     */
    @Override
    public void shinfoProductUpData(Map<String, Object> params) {
        supplierInfoDao.shinfoProductUpData(params);
    }
    /**
     * 供应商产品删除
     * Created by gehao on 2017/5/02 0013.
     */
    @Override
    public void shinfoProductDelete(Map<String, Object> params) {
        supplierInfoDao.shinfoProductDelete(params);
    }
    /**
     * 客户列表查询
     * Created by gehao on 2017/5/03 0013.
     */
    @Override
    public Page<Cus_Supplier_info> cusinfoSelect(Map<String, Object> params) {
        Page<Cus_Supplier_info> pageInfo = new Page<Cus_Supplier_info>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
      /*  params.put("CUSTOMER_ID", 13);
        params.put("TEL","");
        supplierInfoDao.test(params);
        String tel = params.get("TEL").toString();*/
        List<Cus_Supplier_info> shinfoList = supplierInfoDao.cusinfoSelectPageList(pageInfo);
        pageInfo.setResults(shinfoList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    /**
     * 客户新增
     * Created by gehao on 2017/4/25 0013.
     */
    @Override
    public void cusinfoAdd(Map<String, Object> params) {
        Cus_Supplier_info supplierInfo = new Cus_Supplier_info();
        supplierInfo.setCustomer_id(1);
        supplierInfo.setSupplier_id(0);
        supplierInfo.setName(String.valueOf(params.get("supplier_name")));
        supplierInfo.setType(Integer.valueOf(String.valueOf(params.get("supplier_type"))));
        supplierInfo.setTel(String.valueOf(params.get("supplier_tel")));
        supplierInfo.setAddress(String.valueOf(params.get("supplier_address")));
        supplierInfo.setEmail(String.valueOf(params.get("supplier_email")));
        supplierInfo.setPayment_terms(Integer.valueOf(String.valueOf(params.get("payment_terms"))));
        supplierInfo.setShort_name(String.valueOf(params.get("short_name")));
        supplierInfo.setVat_number(String.valueOf(params.get("vat_number")));
        supplierInfo.setInvoice_title(String.valueOf(params.get("supplier_invoice")));
        supplierInfo.setProfile(String.valueOf(params.get("profile")));
        supplierInfo.setCreate_oper(Integer.valueOf(String.valueOf(params.get("create_oper"))));
        supplierInfo.setCreate_time(new Date());
       /* supplierInfo.setModiify_time(new Date());
        supplierInfo.setModiify_oper(Integer.valueOf(String.valueOf(params.get("modify_oper"))));*/
        supplierInfo.setStatus(0);
        supplierInfoDao.addcusInfo(supplierInfo);
    }
    /**
     * 客户新增
     * Created by gehao on 2017/4/25 0013.
     */
    @Override
    public void cusinfomodify(Map<String, Object> params) {
        Cus_Supplier_info supplierInfo = new Cus_Supplier_info();
        supplierInfo.setCs_sup_id(Integer.valueOf(String.valueOf(params.get("cs_sup_id"))));
        supplierInfo.setSupplier_id(0);
        supplierInfo.setName(String.valueOf(params.get("supplier_name")));
        supplierInfo.setType(Integer.valueOf(String.valueOf(params.get("supplier_type"))));
        supplierInfo.setTel(String.valueOf(params.get("supplier_tel")));
        supplierInfo.setAddress(String.valueOf(params.get("supplier_address")));
        supplierInfo.setEmail(String.valueOf(params.get("supplier_email")));
        supplierInfo.setPayment_terms(Integer.valueOf(String.valueOf(params.get("payment_terms"))));
        supplierInfo.setShort_name(String.valueOf(params.get("short_name")));
        supplierInfo.setVat_number(String.valueOf(params.get("vat_number")));
        supplierInfo.setInvoice_title(String.valueOf(params.get("supplier_invoice")));
        supplierInfo.setProfile(String.valueOf(params.get("profile")));
       /* supplierInfo.setCreate_oper(Integer.valueOf(String.valueOf(params.get("create_oper"))));
        supplierInfo.setCreate_time(new Date());*/
        supplierInfo.setModify_time(new Date());
        supplierInfo.setModify_oper(Integer.valueOf(String.valueOf(params.get("modify_oper"))));
        supplierInfo.setStatus(0);
        supplierInfoDao.modifycusInfo(supplierInfo);
    }
    /**
     * 客户新增
     * Created by gehao on 2017/4/25 0013.
     */
    @Override
    public void addressAdd(Map<String, Object> params) {
        Customer_delivery_address address = new Customer_delivery_address();
        address.setCustomer_id(Integer.valueOf(String.valueOf(params.get("customer_id"))));
        address.setAddress_type(Integer.valueOf(String.valueOf(params.get("address_type"))));
        address.setAddress(String.valueOf(params.get("oper_address")));
        address.setPostcode(String.valueOf(params.get("oper_code")));
        address.setOper_name(String.valueOf(params.get("oper_name")));
        address.setOper_tel(String.valueOf(params.get("oper_tel")));
        address.setStatus(0);
        address.setCreate_oper(Integer.valueOf(String.valueOf(params.get("create_oper"))));
        address.setCreate_time(new Date());
       /* supplierInfo.setModiify_time(new Date());
        supplierInfo.setModiify_oper(Integer.valueOf(String.valueOf(params.get("modify_oper"))));*/

        supplierInfoDao.addaddress(address);
    }
    /**
     * 客户地址查询
     * Created by gehao on 2017/4/25 0013.
     */
    @Override
    public List<Customer_delivery_address> getAddress(Map<String, Object> params) {

            return supplierInfoDao.getAddress(params);

    }
    /**
     * 客户地址查询
     * Created by gehao on 2017/4/25 0013.
     */
    @Override
    public Customer_delivery_address addressSelect(Map<String, Object> params) {
            return supplierInfoDao.addressSelect(params);
    }
    /**
     * 客户地址修改
     * Created by gehao on 2017/4/25 0013.
     */
    @Override
    public void addressModify(Map<String, Object> params) {
          params.put("modify_time",new Date());
         supplierInfoDao.addressModify(params);
    }
    /**
     * 客户地址删除
     * Created by gehao on 2017/4/25 0013.
     */
    @Override
    public void addressDelete(Map<String, Object> params) {

        supplierInfoDao.addressDelete(params);
    }
}
