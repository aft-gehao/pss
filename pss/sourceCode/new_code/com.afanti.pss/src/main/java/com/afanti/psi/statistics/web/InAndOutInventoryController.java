package com.afanti.psi.statistics.web;

import com.afanti.psi.statistics.service.InAndOutInventoryService;
import com.afanti.psi.statistics.vo.PurchasingSale;
import com.afanti.psi.utils.JsonData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/23 0023.
 */
@Controller
@RequestMapping("/inAndOutInventory")
public class InAndOutInventoryController {
    @Autowired
    private InAndOutInventoryService inAndOutInventoryService;
    @RequestMapping(value="/inAndOutInventory_List",method = RequestMethod.POST)
    @ResponseBody
    public JsonData inAndOutInventory_List(){
        JsonData jsonData=new JsonData();
        Map<String,Object> params=new HashMap<String,Object>();
        List<PurchasingSale> list = inAndOutInventoryService.getinAndOutInventory_List(params);
        jsonData.setAppend(list);
        return jsonData;
    }
}
