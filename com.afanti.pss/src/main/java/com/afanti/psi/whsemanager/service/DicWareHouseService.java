package com.afanti.psi.whsemanager.service;

import com.afanti.psi.utils.Page;
import com.afanti.psi.whsemanager.vo.Dict_warehouse_space;

import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface DicWareHouseService {
    public Page<Dict_warehouse_space> wareHousePageList(Map<String,Object> params);

    public Dict_warehouse_space getWarehouseInfo(Map<String,Object> params);

    public void addWhsemanagerInfo(Map<String,Object> params);

    public void updWhsemanager(Map<String,Object> params);


    public String loadChildWarehouse(Map<String,Object> params);

    public void warehouseChildAdd(Map<String,Object> params);

    public void delChildWarehouse(Map<String,Object> params);

}
