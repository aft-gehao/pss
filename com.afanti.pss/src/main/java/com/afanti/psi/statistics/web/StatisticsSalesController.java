package com.afanti.psi.statistics.web;

import com.afanti.psi.statistics.service.StatisticsSalesService;
import com.afanti.psi.statistics.vo.PurchasingSale;
import com.afanti.psi.use.web.UseController;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
/*import net.sf.json.JSONObject;*/
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/6/29 0029.
 */
@Controller
@RequestMapping(value="/Statistics/sale")
public class StatisticsSalesController extends UseController {
    @Autowired
    private StatisticsSalesService statisticsSalesService;
    @RequestMapping(value = "/sale_Chart_Show",method = RequestMethod.POST)
    public JsonData sale_Chart_Show(HttpServletResponse response){
        JsonData jsonData=new JsonData();
        try {
            Map<String,Object> map=new HashMap<String, Object>();
            map.put("p", getParameterString("p"));
            map.put("cas", getParameterString("cas"));
            map.put("number",getParameterString("number"));
            StringBuffer sb=new StringBuffer();
            if(getParameterInteger("month")<10){
                sb.append(0);
                sb.append(getParameterInteger("month"));
            }else{
                sb.append(getParameterInteger("month"));
            }
            map.put("month", sb);
            Page<PurchasingSale> list = statisticsSalesService.sales_ChartPageList(map);
            Map<String, Object> params = new HashMap<String, Object>();
            String[] cas=new String[list.getResults().size()];//产品
            String[] dayTime=new String[list.getResults().size()];//产品
            float[] amount=new float[list.getResults().size()];//产品数量
            String[] legend=new String[1];//legend
            int a=0;
            List<PurchasingSale> list2 =list.getResults();
            for(int i=0;i<list2.size();i++){
                cas[i]=list2.get(i).getCas();
                amount[i]=list2.get(i).getAmount();
                dayTime[i]=list2.get(i).getDayTime();
                legend[0]="销售量";
                params.put("i",++a);
            }
            params.put("categories",dayTime);//类别-->产品--》X//还有一个疑问
            params.put("values",amount);//销售量--Z
            params.put("legend",legend);//legend--top
            params.put("page",list);
            JSONObject json=JSONObject.fromObject(params);
            response.setCharacterEncoding("utf-8");
            PrintWriter out = response.getWriter();
            out.print(json.toString());
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/sale_Chart_Show2",method = RequestMethod.POST)
    @ResponseBody
    public JsonData sale_Chart_Show2(HttpServletResponse response){
        JsonData jsonData=new JsonData();
        try {
            Map<String,Object> map=new HashMap<String, Object>();
            map.put("p", getParameterString("p"));
            map.put("cas", getParameterString("cas"));
            map.put("number",getParameterString("number"));
            StringBuffer sb=new StringBuffer();
            if(getParameterInteger("month")<10){
                sb.append(0);
                sb.append(getParameterInteger("month"));
            }else{
                sb.append(getParameterInteger("month"));
            }
            map.put("month", sb);
            Page<PurchasingSale> list = statisticsSalesService.sales_ChartPageList(map);
            Map<String, Object> params = new HashMap<String, Object>();
            String[] cas=new String[list.getResults().size()];//产品
            String[] dayTime=new String[list.getResults().size()];//产品
            float[] money=new float[list.getResults().size()];//产品数量
            String[] legend=new String[1];//legend
            int a=0;
            List<PurchasingSale> list2 =list.getResults();
            for(int i=0;i<list2.size();i++){
                cas[i]=list2.get(i).getCas();
                money[i]=list2.get(i).getUnit_price();
                dayTime[i]=list2.get(i).getDayTime();
                legend[0]="销售金额";
                params.put("i",++a);
            }
            params.put("categories",dayTime);//类别-->产品--》X//还有一个疑问
            params.put("values",money);//销售量--Z
            params.put("legend",legend);//legend--top
            params.put("page",list);
            JSONObject json=JSONObject.fromObject(params);
            response.setCharacterEncoding("utf-8");
            PrintWriter out = response.getWriter();
            out.print(json.toString());
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonData;
    }

    /**
     * 查询每月的销售报表
     * @return
     */
    @RequestMapping(value="/showEnterDetailYear",method = RequestMethod.POST)
    @ResponseBody
    public JsonData showEnterDetailYear(){
        JsonData jsonData=new JsonData();
        List list=statisticsSalesService.showEnterDetailYear();
        jsonData.setAppend(list);
        return jsonData;
    }


    /**
     * 查询一年的销售报表
     * @return
     */
    @RequestMapping(value="/sale_Chart_ShowAll",method = RequestMethod.POST)
    @ResponseBody
    public JsonData sale_Chart_ShowAll(){
        JsonData jsonData=new JsonData();
        Map<String,Object> map=new HashMap<String, Object>();
        map.put("p", getParameterString("p"));
        map.put("cas",getParameterString("cas"));
        map.put("year",getParameterString("year"));
        Page casList =statisticsSalesService.sale_ChartAllCASPageList(map);//cas 34
        jsonData.setAppend(casList);
        return jsonData;
    }

    @RequestMapping(value="/sale_Chart_MonthShowAll",method = RequestMethod.POST)
    @ResponseBody
    public JsonData sale_Chart_MonthShowAll(){
        JsonData jsonData=new JsonData();
        try {
            Map<String,Object> map=new HashMap<String, Object>();
            map.put("p", getParameterString("p"));
            map.put("cas", getParameterString("cas"));

            StringBuffer sb=new StringBuffer();
            if(getParameterInteger("month")<10){
                sb.append(0);
                sb.append(getParameterInteger("month"));
            }else{
                sb.append(getParameterInteger("month"));
            }
            map.put("month", sb);
            List<PurchasingSale> page =statisticsSalesService.sale_Chart_MonthShowAll(map);
            jsonData.setAppend(page);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonData;
    }
}
