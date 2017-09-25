package com.afanti.psi.whsemanager.dao;

import com.afanti.psi.utils.Page;
import com.afanti.psi.whsemanager.vo.Dict_warehouse_space;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/13 0013.
 */
public interface DicWareHouseDao {
    public List<Dict_warehouse_space> wareHousePageList(Page<Dict_warehouse_space> pageInfo);
    public int wareHousePageCount(Page<Dict_warehouse_space> pageInfo);
    public Dict_warehouse_space getWarehouseInfo(Map<String, Object> params);
    public void addWhsemanagerInfo(Dict_warehouse_space dictWarehouseSpace);
    public void updWhsemanager(Map<String, Object> params);
    public List<Dict_warehouse_space> getChildWarehouseList(Map<String,Object> params);
    public String getWarehouseIds(Map<String,Object> params);
}
