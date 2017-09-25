package com.afanti.psi.whsemanager.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import com.afanti.psi.whsemanager.service.DicWareHouseService;
import com.afanti.psi.whsemanager.vo.Dict_warehouse_space;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * 仓位管理 》仓位管理列表
 */
@Controller
@RequestMapping(value = "/dicwarehouse/manager")
public class DicWareHouseController extends BaseController {

    @Autowired
    private DicWareHouseService dicWareHouseService;

    @RequestMapping(value = "/warehouse_list_page", method = RequestMethod.POST)
    @ResponseBody
    public JsonData warehouse_list_page() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("space_name", getParameterString("space_name"));
            params.put("p", getParameterString("p"));
            Page page = dicWareHouseService.wareHousePageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }


    @RequestMapping(value = "/add_whsemanager", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_whsemanager() {
        JsonData jsonData = new JsonData();
        try
        {
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("space_name",this.getParameterString("space_name"));
            params.put("desc",this.getParameterString("desc"));
            dicWareHouseService.addWhsemanagerInfo(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/upd_whsemanager", method = RequestMethod.POST)
    @ResponseBody
    public JsonData upd_whsemanager()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("space_id",this.getParameterString("space_id"));
            params.put("space_name",this.getParameterString("space_name"));
            params.put("desc",this.getParameterString("desc"));
            dicWareHouseService.updWhsemanager(params);
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
    @RequestMapping(value = "/del_warehouse", method = RequestMethod.POST)
    @ResponseBody
    public JsonData del_warehouse()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("space_id",this.getParameterString("space_id"));
            params.put("status","1");
            dicWareHouseService.delChildWarehouse(params);
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
    @RequestMapping(value = "/load_warehouse_info", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_warehouse_info()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("space_id",this.getParameterString("space_id"));
            Dict_warehouse_space dictWarehouseSpace = dicWareHouseService.getWarehouseInfo(params);
            jsonData.setAppend(dictWarehouseSpace);
            jsonData.setResult(SUCCESS);
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载仓位信息失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/load_child_warehouse", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_child_warehouse()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("f_space_id",this.getParameterString("space_id"));
            String append = dicWareHouseService.loadChildWarehouse(params);
            jsonData.setAppend(append);
            jsonData.setResult(SUCCESS);
        }catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载仓位树形菜单失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/warehouse_child_add", method = RequestMethod.POST)
    @ResponseBody
    public JsonData warehouse_child_add()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("space_id",this.getParameterString("space_id"));
            params.put("space_name",this.getParameterString("space_name"));
            params.put("desc",this.getParameterString("desc"));
            dicWareHouseService.warehouseChildAdd(params);
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
    @RequestMapping(value = "/del_child_warehouse", method = RequestMethod.POST)
    @ResponseBody
    public JsonData del_child_warehouse()
    {
        JsonData jsonData = new JsonData();
        try{
            Map<String,Object> params = new HashMap<String, Object>();
            params.put("space_id",this.getParameterString("space_id"));
            dicWareHouseService.delChildWarehouse(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        }
        catch (Exception e)
        {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
}
