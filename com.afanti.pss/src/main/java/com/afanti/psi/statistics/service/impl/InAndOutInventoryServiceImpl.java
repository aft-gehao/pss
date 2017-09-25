package com.afanti.psi.statistics.service.impl;

import com.afanti.psi.statistics.dao.InAndOutInventoryDao;
import com.afanti.psi.statistics.service.InAndOutInventoryService;
import com.afanti.psi.statistics.vo.PurchasingSale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/23 0023.
 */
@Service
public class InAndOutInventoryServiceImpl implements InAndOutInventoryService {
    @Autowired
    private InAndOutInventoryDao inAndOutInventoryDao;

    @Override
    public List<PurchasingSale> getinAndOutInventory_List(Map<String, Object> params) {
        List<PurchasingSale> list = inAndOutInventoryDao.getinAndOutInventory_List(params);
        return list;
    }
}
