package com.afanti.psi.warning.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.consumable.service.ConsumableService;
import com.afanti.psi.consumable.vo.consumable_material_info;
import com.afanti.psi.inventory.service.ProductInInventoryService;
import com.afanti.psi.inventory.vo.Product_material_enter;
import com.afanti.psi.sms.service.impl.SmsService;
import com.afanti.psi.usermanager.service.UserManagerService;
import com.afanti.psi.usermanager.vo.Staff_info;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2017/7/20 0020.
 */

public class stockWarning extends BaseController {


    @Autowired
    private ConsumableService consumableService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private UserManagerService userManagerService;
    @Autowired
    private ProductInInventoryService productInInventoryService;

    public void warningSelect() throws Exception {
        //耗材表查询
        List<consumable_material_info> List=consumableService.warningSelect();
        //产品表查询
        List<Product_material_enter> List2=productInInventoryService.warning_select();
        //人员表查询
        List<Staff_info> List1=userManagerService.moblieSelect();
        for(int i=0;i<List.size();i++)
        {
            if(List.get(i).getConsumable_name()!=null)
            {
                StringBuffer str = new StringBuffer();
                str.append(List.get(i).getPack());
                str.append("规格的");
                str.append(List.get(i).getConsumable_name());
                str.append("已经低于库存预警线，当前库存量为");
                str.append(List.get(i).getAmount());
                str.append(",请补充库存");
                str.append("【进销存】");
                //发送短信给库管 采购经理
                for(int x=0;x<List1.size();x++)
                {
                    smsService.send(List1.get(x).getMobilephone(),str.toString());
                }
            }
        }
        for(int q=0;q<List2.size();q++)
        {
            if(Integer.valueOf(List2.get(q).getAmount())> 0)
            {
                StringBuffer str = new StringBuffer();
                str.append("原料库存预警!");
                if(List2.get(q).getCas()!=null)
                {
                    str.append("Cas:");
                    str.append(List2.get(q).getCas());
                    str.append(",");
                }
                if(List2.get(q).getSku()!=null)
                {
                    str.append("Sku:");
                    str.append(List2.get(q).getSku());
                    str.append(",");
                }
                if(List2.get(q).getName_ch()!=null)
                {
                    str.append("中文名:");
                    str.append(List2.get(q).getName_ch());
                    str.append(",");
                }
                if(List2.get(q).getName_en()!=null)
                {
                    str.append("英文名:");
                    str.append(List2.get(q).getName_en());
                    str.append(",");
                }
                str.append("此产品当前总库存为:");
                str.append(List2.get(q).getAmount());
                str.append("已经低于库存预警线,请及时补充库存,【进销存】");
                for(int x=0;x<List1.size();x++)
                {
                    smsService.send(List1.get(x).getMobilephone(),str.toString());
                }
            }


        }


    }

}


