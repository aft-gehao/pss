package com.afanti.psi.consumable.service.impl;

import com.afanti.psi.consumable.dao.ConsumableDao;
import com.afanti.psi.consumable.service.ConsumableService;
import com.afanti.psi.consumable.vo.*;
import com.afanti.psi.kuaidi.vo.kudi_info;
import com.afanti.psi.usermanager.vo.Staff_info;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
@Service
public class ConsumableServiceImpl implements ConsumableService {
    @Autowired
    private ConsumableDao consumableDao;



    @Override
    public Page<consumable_use> getConsumablePage(Map<String,Object> params) {
        Page<consumable_use> pageInfo = new Page<consumable_use>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<consumable_use> List = consumableDao.getConsumablePageList(pageInfo);
        pageInfo.setResults(List);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    /*耗材列表*/
    @Override
    public Page<consumable_material_info> getConsumableInfoPage(Map<String, Object> params){
        Page<consumable_material_info> pageInfo = new Page<consumable_material_info>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<consumable_material_info> List = consumableDao.getConsumableInfoPageList(pageInfo);
        pageInfo.setResults(List);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }


    @Override
    public void consumable_add(Map<String, Object> params){

        if(String.valueOf(params.get("space_id"))!="")
        {
            params.put("status","8002");
        }
        else {
            params.put("space_id", 0);
            params.put("stock_id", 0);
        }
        consumableDao.consumable_add(params);
    }
    @Override
    public consumable_use useSelect(Map<String, Object> params){
        consumable_use consumable_use=consumableDao.useSelect(params);
         return  consumable_use;
    }
    @Override
    public void useUpdate(Map<String, Object> params){

        if(params.get("status")!=null)
        {
            consumableDao.useStatusUpdate(params);
        }
        else {
            consumableDao.useUpdate(params);
        }
    }
    @Override
    public void useDel(Map<String, Object> params){
        consumableDao.useDel(params);
    }
    @Override
    public Page<consumable_out_stock> getStockPage(Map<String,Object> params) {
        Page<consumable_out_stock> pageInfo = new Page<consumable_out_stock>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<consumable_out_stock> List = consumableDao.getStockPageList(pageInfo);
        pageInfo.setResults(List);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    /*新增耗材*/
    @Override
    public void ConsumableAdd(Map<String, Object> params){
        consumableDao.consumableAdd(params);
    }
    /**删除耗材*/
    @Override
    public void ConsumableUpd(Map<String, Object> params){
        consumableDao.upd_consumable(params);
    }

    /**更改耗材*/
    @Override
    public Page<consumable_material_info> getConsumable(Map<String,Object> params){
        Page<consumable_material_info> pageInfo = new Page<consumable_material_info>();
        List<consumable_material_info> List = consumableDao.getConsumable(params);
        pageInfo.setResults(List);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public void consumableUpdate(Map<String, Object> params){
        consumableDao.update_consumable(params);

    }
    /*新增采购*/
    @Override
    public void add_purchasing(Map<String, Object> params){
        consumableDao.add_purchasing(params);
    }
    @Override
    public void useStatusUpdate(Map<String, Object> params){ consumableDao.useStatusUpdateForPurchase(params);}
    @Override
    public Page<consumable_purchase> getPurchasingPage(Map<String,Object> params) {
        Page<consumable_purchase> pageInfo = new Page<consumable_purchase>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<consumable_purchase> List = consumableDao.getPurchasingPageList(pageInfo);
        pageInfo.setResults(List);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
   //耗材入库  gehao 201707 26 mod
    @Override
    public void consumableInventory(Map<String, Object> params){
        // 返修入库   //20170831  葛昊修改  不管是否属于全部还是部分，都为已入库
        if(String.valueOf(params.get("flag"))!="")
        {
           /* //是否属于全部入库
                if(Integer.parseInt(String.valueOf(params.get("amount")))-Integer.parseInt(String.valueOf(params.get("new_amount")))!=0)
                {
                    consumableDao.consumableInventory(params);

                }*/
                //若果不是则不改状态，如果全部入库，则改为一入库状态
              /*  else
                {*/
                    params.put("status",5001);
                    consumableDao.consumableInventory(params);
                    consumableDao.repairStatusUpdate(params);
                /*}*/
        }
        else{
                //获取申请表主键 与采购表主键 准备更新入库状态
                int use_id=consumableDao.getUseId(params);
                //如果是按照采购量入库 则全部入库 否则部分入库
                if(Integer.parseInt(String.valueOf(params.get("amount")))-Integer.parseInt(String.valueOf(params.get("new_amount")))!=0)
                {
                    //0831  葛昊修改  不管是否属于全部还是部分，都为已入库
                    params.put("status",5001);
                    params.put("use_id",use_id);
                    consumableDao.useStatusUpdateForPurchase(params);
                    consumableDao.purchaseStatusUpdate(params);
                    consumableDao.consumableInventory(params);
                }
                else{
                    params.put("status",5001);
                    params.put("use_id",use_id);
                    consumableDao.useStatusUpdateForPurchase(params);
                    consumableDao.purchaseStatusUpdate(params);
                    consumableDao.consumableInventory(params);
                }

       ;}
    }
    @Override
    public Page<consumable_use> getUsePage(Map<String,Object> params) {
        Page<consumable_use> pageInfo = new Page<consumable_use>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<consumable_use> List = consumableDao.getUseforconPageList(pageInfo);
        pageInfo.setResults(List);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    //耗材出库  gehao
    @Override
    public void out_stock(Map<String, Object> params){
        //往耗材库里插一条出库记录
        consumableDao.insert_out_stock(params);
        //更新库存表里的库存数据
        consumableDao.update_stock_amount(params);
        //更新use表的状态
        consumableDao.useStatusUpdateForPurchase(params);
    }
    //查询库存详情
    @Override
    public Page<consumable_stock> getStockDetailPage(Map<String,Object> params) {
        Page<consumable_stock> pageInfo = new Page<consumable_stock>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<consumable_stock> List = consumableDao.getStockDetailPageList(pageInfo);
        pageInfo.setResults(List);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    //查询库存详情
    @Override
    public List<consumable_material_info> warningSelect() {

        List<consumable_material_info> List = consumableDao.warningSelect();
        return List;

    }
    @Override
    public Page<consumable_repair> getConsumableRepairPage(Map<String,Object> params) {
        Page<consumable_repair> pageInfo = new Page<consumable_repair>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<consumable_repair> List = consumableDao.getConsumableRepairPageList(pageInfo);
        pageInfo.setResults(List);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
    //耗材返修新增申请 gehao
    @Override
    public void consumable_repair_add(Map<String, Object> params){
        //往耗材返修库里插一条申请记录
        consumableDao.consumable_repair_add(params);
    }
    //耗材返修新增申请 gehao
    @Override
    public void consumable_repair_del(Map<String, Object> params){
        //往耗材返修库里插一条申请记录
        consumableDao.consumable_repair_del(params);
    }
    //耗材返修新增申请 gehao
    @Override
    public void consumable_repair_upd(Map<String, Object> params){
        //往耗材返修库里插一条申请记录
        consumableDao.consumable_repair_upd(params);
    }
    //耗材返修新增申请 gehao
    @Override
    public consumable_repair repairSelect(Map<String, Object> params){
        //往耗材返修库里插一条申请记录
        return (consumableDao.repairSelect(params));
    }

    //耗材返修-取消
    @Override
    public void consumable_repair_cancel(Map<String, Object> params){
        consumableDao.consumable_repair_cl(params);
    }
    public void consumable_pur_cancel(Map<String, Object> params){
        consumableDao.consumable_pur_cancel(params);
    }


    public List<Staff_info> staff_mobilephone(Map<String, Object> params){
        List<Staff_info> list= consumableDao.staff_mobilephone(params);
        return  list;
    }
    public List<consumable_use> consumable_mobilephone(Map<String, Object> params){
        List<consumable_use> list= consumableDao.consumable_mobilephone(params);
        return  list;
    }
    @Override
    public void con_purchase_modify(Map<String, Object> params){

         if(Integer.valueOf(String.valueOf(params.get("is_del")))==0)
         {
             consumableDao.con_purchase_modify(params);
         }
    else{
        consumableDao.con_purchase_modify_del(params);
         }
    }
    @Override
    public void fahuo(Map<String, Object> params){
            //更新use表
            consumableDao.fahuo(params);
           //更新采购表
            consumableDao.pur_fahuo(params);
    }
    //采购经理快速生成采购单
    @Override
    public void kuaisu_pur(Map<String, Object> params){

        if(consumableDao.consumable_name_select(params)==0)
        {
            //如果不存在就新增
            consumableDao.consumableAdd(params);
            params.put("consumable_id",consumableDao.getConsumableId(params));
        }
        else{
            params.put("consumable_id",String.valueOf(consumableDao.consumable_id_select(params)));
        }
        params.put("stock_id",0);
        params.put("space_id",0);
        params.put("is_del",0);
        params.put("check_time",new Date());
        params.put("status",5004);
        params.put("desc","采购经理快速创建");
        //创建申请单
        consumableDao.consumable_add(params);
        params.put("use_id",consumableDao.getConsumableUseId(params));
        //创建采购单
        consumableDao.add_purchasing(params);
    }
    public kudi_info kd_info_select(Map<String, Object> params)
    {
        return  consumableDao.kd_info_select(params);
    }
    @Override
    public void check_repair(Map<String, Object> params){

      consumableDao.check_repair(params);

    }
    @Override
    public void fahuo_repair(Map<String, Object> params){

        consumableDao.fahuo_repair(params);

    }

    public List<consumable_purchase> getPurchasingList(Map<String, Object> params){
        List<consumable_purchase> list = consumableDao.getPurchasingList(params);
        return list;
    }
    public int getPurchasingCount(Map<String, Object> params){
        int count=consumableDao.getPurchasingCount(params);
        return count;
    }

    public List<consumable_purchase> getPurchasingList_history(Map<String, Object> params){
        List<consumable_purchase> list = consumableDao.getPurchasingList_history(params);
        return list;
    }
    public int getPurchasingCount_history(Map<String, Object> params){
        int count=consumableDao.getPurchasingCount_history(params);
        return count;
    }

    public List<consumable_use> getUseList(Map<String, Object> params){
        List<consumable_use> list = consumableDao.getUseList(params);
        return list;
    }
    public int getUseCount(Map<String, Object> params){
        int count = consumableDao.getUseCount(params);
        return count;
    }

    public List<consumable_use> getUseList_history(Map<String, Object> params){
        List<consumable_use> list = consumableDao.getUseList_history(params);
        return list;
    }
    public int getUseCount_history(Map<String, Object> params){
        int count = consumableDao.getUseCount_history(params);
        return count;
    }
}
