package com.afanti.psi.kuaidi.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.kuaidi.vo.Order;
import com.afanti.psi.kuaidi.service.impl.KdServiceImpl;
import com.afanti.psi.utils.JsonData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * 产品管理 》产品管理列表
 */
@Controller
@RequestMapping(value = "/kd")
public class KdController extends BaseController {



    @Autowired
    private KdServiceImpl kdService;


    /**
     * MethodName: queryKuaidi
     * @Description: 即时查询快递服务(查询快递公司编码)
     * @param
     * @return ResponseEntity
     * @author gehao
     * @version:0.1
     * @date 2017-08-25 上午11:45:50
     */

    @RequestMapping(value = "/queryKdCode", method = RequestMethod.POST)
    @ResponseBody
    public JsonData queryKuaidi() {
        JsonData jsonData = new JsonData();
        //实时调用快递鸟接口查询
        Map<String, String> params = new HashMap<String, String>();
        String code=this.getParameterString("num");

               /* info.setShipperCode(this.getParameterString("com"));
                info.setLogisticCode(this.getParameterString("num"));*/
        Order order = null;
        try {

            jsonData.setAppend( kdService.getOrderTracesByJson(code));
        }
        catch (Exception e) {
            jsonData.setResult(FAIL);
        }
       /* if(order!=null){
            info.setOrderStatus(GloubFunc.initInt(order.getState(), -1));
        }*/


        return  jsonData;
    }
    /**
     * MethodName: queryKdInfo
     * @Description: 即时查询快递服务(查询物流信息)
     * @param
     * @return ResponseEntity
     * @author gehao
     * @version:0.1
     * @date 2017-08-25 上午11:45:50
     */

    @RequestMapping(value = "/queryKdInfo", method = RequestMethod.POST)
    @ResponseBody
    public JsonData queryKdInfo() {
        JsonData jsonData = new JsonData();
        //实时调用快递鸟接口查询
        Map<String, String> params = new HashMap<String, String>();
        String num=this.getParameterString("kd_num");
        String code=this.getParameterString("kd_code");
        try {
            jsonData.setAppend(kdService.getKdInfoByJson(code,num));
        }
        catch (Exception e) {
            jsonData.setResult(FAIL);
        }
        return  jsonData;
    }

}
