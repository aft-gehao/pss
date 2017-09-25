package com.afanti.psi.whsemanager.service.impl;

import com.afanti.psi.inventory.vo.Product_material_enter_detail;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import com.afanti.psi.whsemanager.dao.DicWareHouseDao;
import com.afanti.psi.whsemanager.service.DicWareHouseService;
import com.afanti.psi.whsemanager.vo.Dict_warehouse_space;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
@Service
public class DicWareHouseServiceImpl implements DicWareHouseService {
    @Autowired
    private DicWareHouseDao dicWareHouseDao;

    @Override
    public Page<Dict_warehouse_space> wareHousePageList(Map<String, Object> params) {
        Page<Dict_warehouse_space> pageInfo = new Page<Dict_warehouse_space>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<Dict_warehouse_space> warehouseSpaceList = dicWareHouseDao.wareHousePageList(pageInfo);
        pageInfo.setResults(warehouseSpaceList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }

    @Override
    public Dict_warehouse_space getWarehouseInfo(Map<String, Object> params) {
        return dicWareHouseDao.getWarehouseInfo(params);
    }

    @Override
    public void addWhsemanagerInfo(Map<String, Object> params) {
        Dict_warehouse_space dictWarehouseSpace = new Dict_warehouse_space();
        dictWarehouseSpace.setF_space_id(0);
        dictWarehouseSpace.setSpace_name(String.valueOf(params.get("space_name")));
        dictWarehouseSpace.setDesc(String.valueOf(params.get("desc")));
        dictWarehouseSpace.setStatus(0);
        dicWareHouseDao.addWhsemanagerInfo(dictWarehouseSpace);
    }

    @Override
    public void updWhsemanager(Map<String, Object> params) {
        dicWareHouseDao.updWhsemanager(params);
    }

    @Override
    public String loadChildWarehouse(Map<String, Object> params) {
        StringBuffer stringBuffer = new StringBuffer();
        List<Dict_warehouse_space> dictWarehouseSpaceList = dicWareHouseDao.getChildWarehouseList(params);
        for (Dict_warehouse_space space : dictWarehouseSpaceList) {
            stringBuffer.append("{ id:"+space.getSpace_id()+", pId:"+space.getF_space_id()+", name:\""+space.getSpace_name()+"\",open:true},");
        }
        return stringBuffer.toString();
    }

    @Override
    public void warehouseChildAdd(Map<String, Object> params) {
        Dict_warehouse_space dictWarehouseSpace = new Dict_warehouse_space();
        dictWarehouseSpace.setF_space_id(Integer.valueOf(String.valueOf(params.get("space_id"))));
        dictWarehouseSpace.setSpace_name(String.valueOf(params.get("space_name")));
        dictWarehouseSpace.setDesc(String.valueOf(params.get("desc")));
        dictWarehouseSpace.setStatus(0);
        dicWareHouseDao.addWhsemanagerInfo(dictWarehouseSpace);
    }

    @Override
    public void delChildWarehouse(Map<String, Object> params) {
        //查询当前菜单和当前菜单下所有子菜单ID
        String ids = dicWareHouseDao.getWarehouseIds(params);
        params = new HashMap<String, Object>();
        params.put("ids",ids);
        params.put("status","1");
        dicWareHouseDao.updWhsemanager(params);
    }

}
