package com.afanti.psi.research.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.commons.service.CommonsService;
import com.afanti.psi.commons.vo.EncodeUtil;
import com.afanti.psi.research.service.ResearchService;
import com.afanti.psi.research.vo.product_research;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import com.afanti.psi.utils.SpringPropertiesHolder;
import org.apache.poi.hssf.usermodel.*;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lauya on 2015-10-11.
 */
@Controller
@RequestMapping(value = "/research/manage")
public class ResearchController extends BaseController {
    @Autowired
    private ResearchService ResearchService;
    @Autowired
    private CommonsService commonsService;

    //研发申请首页
    @RequestMapping(value = "/researchPage", method = RequestMethod.POST)
    @ResponseBody
    public JsonData usePage() {
        JsonData jsonData = new JsonData();
        try {
            DateTime dateTime = new DateTime();
            String start_time = getParameterString("start_time");
            String end_time = getParameterString("end_time");
            if (start_time == null || "".equals(start_time)) {
                start_time = dateTime.plusDays(-dateTime.getDayOfMonth() + 1).toString("yyyy-MM-dd");
            }
            if (end_time == null || "".equals(end_time)) {
                end_time = dateTime.toString("yyyy-MM-dd");
            }
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("flag", this.getParameterString("flag"));
            params.put("start_time", start_time);
            params.put("end_time", end_time);
            params.put("cas", getParameterString("cas"));
            params.put("sku", getParameterString("sku"));
            params.put("status",getParameterString("status"));
            params.put("p", getParameterString("p"));
            Page page = ResearchService.getResearchPage(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //研发产品查询
    @RequestMapping(value = "/researchProduct", method = RequestMethod.POST)
    @ResponseBody
    public JsonData researchProduct() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("p", getParameterString("p"));
            params.put("cas", getParameterString("cas"));
            params.put("sku", getParameterString("sku"));
            params.put("nameEn", getParameterString("nameEn"));
            Page page = ResearchService.researchProductPageList(params);
            jsonData.setAppend(page);
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //研发产品添加
    @RequestMapping(value = "/researchAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData researchAdd() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_time", this.getParameterString("research_time"));
            params.put("research_name", this.getParameterString("research_name"));
            params.put("staff_id", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("product_id", this.getParameterString("product_id"));
            params.put("amount", this.getParameterString("amount"));
            params.put("unit", this.getParameterString("unit"));
            params.put("purity", this.getParameterString("purity"));
            params.put("product_type", this.getParameterString("product_type"));
            params.put("is_waibao", this.getParameterString("is_waibao"));
            params.put("face", this.getParameterString("face"));
            params.put("hours", this.getParameterString("hours"));
            params.put("sale_batch_no", this.getParameterString("sale_batch_no"));
            int research_id=ResearchService.research_add(params);
            jsonData.setAppend(research_id);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //研发产品删除
    @RequestMapping(value = "/researchDel", method = RequestMethod.POST)
    @ResponseBody
    public JsonData researchDel() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_id", this.getParameterString("research_id"));
            ResearchService.researchDel(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //研发产品查询
    @RequestMapping(value = "/researchSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData researchSelect() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            String id=this.getParameterString("research_id");
            params.put("research_id", this.getParameterString("research_id"));
            product_research product_research=ResearchService.researchSelect(params);
            jsonData.setAppend(product_research);
            jsonData.setAppends(id);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //研发产品添加
    @RequestMapping(value = "/researchIn", method = RequestMethod.POST)
    @ResponseBody
    public JsonData researchIn() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_time",new Date());
            params.put("space_id", this.getParameterString("space_id"));
            params.put("research_name", this.getParameterString("research_name"));
            params.put("staff_id",this.getSessionData().getStaffInfo().getStaff_id());
            params.put("product_id", this.getParameterString("product_id"));
            params.put("amount", this.getParameterString("amount"));
            params.put("unit", this.getParameterString("unit"));
            params.put("research_id", this.getParameterString("research_id"));
            params.put("purity", this.getParameterString("purity"));
            params.put("batch_no", this.getParameterString("batch_no"));
            params.put("sale_batch_no", this.getParameterString("sale_batch_no"));
            params.put("face", this.getParameterString("face"));
            params.put("enter_type", 7003);
            params.put("enter_isdel", 0);
            ResearchService.research_in(params);
            ResearchService.venditionSelect(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/check_tg", method = RequestMethod.POST)
    @ResponseBody
    public JsonData check_tg(){
        JsonData jsonData=new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_id",getParameterString("research_id"));
            params.put("status",5002);
            ResearchService.researchStatusUp(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //研发产品添加
    @RequestMapping(value = "/putuAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData putuAdd() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_id", this.getParameterString("research_id"));
            params.put("str", this.getParameterString("str"));
            params.put("putu_staff", this.getSessionData().getStaffInfo().getStaff_id());
            params.put("product_id", this.getParameterString("product_id"));
            params.put("putu_time",new Date());
            if(this.getParameterString("str")!="") {
                String[] test = this.getParameterString("str").split(",");
                for (int i = 0; i < test.length; i++) {
                    params.put("putu_url", test[i]);
                    ResearchService.putuAdd(params);
                }
            }
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    @RequestMapping(value = "/researchModify", method = RequestMethod.POST)
    @ResponseBody
    public JsonData researchModify() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("research_id", this.getParameterString("research_id"));
            params.put("research_name", this.getParameterString("research_name"));
            params.put("amount", this.getParameterString("amount"));
            ResearchService.research_mod(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
        }
        return jsonData;
    }
    /**
     * 报表
     * 20170414 addby gehao
     */
    @RequestMapping(value = "/researchBaobiaoAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData baobiaoAdd(HttpServletRequest request) {

        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("start_time", getParameterString("start_time"));
            params.put("end_time", getParameterString("end_time"));
            //获取cas。sku。中文名。英文名
            params.put("cas", getParameterString("cas"));
            //获取cas。sku。中文名。英文名
            params.put("sku", getParameterString("sku"));
            params.put("flag", 1);
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            List<product_research> list = ResearchService.getResearchforbaobiao(params);
            // 第一步，创建一个webbook，对应一个Excel文件
            HSSFWorkbook wb = new HSSFWorkbook();
            // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
            HSSFSheet sheet = wb.createSheet(getParameterString("start_time")+"至"+getParameterString("end_time")+"项目生产报表");
            // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
            HSSFRow row = sheet.createRow((int) 0);
            // 第四步，创建单元格，并设置值表头 设置表头居中
            HSSFCellStyle style = wb.createCellStyle();
            style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
            HSSFCell cell = row.createCell((short) 0);
            cell.setCellValue("CAS");
            cell.setCellStyle(style);
            cell = row.createCell((short) 1);
            cell.setCellValue("SKU");
            cell.setCellStyle(style);
            cell = row.createCell((short) 2);
            cell.setCellValue("产出量");
            cell.setCellStyle(style);
            cell = row.createCell((short) 3);
            cell.setCellValue("时间");
            cell.setCellStyle(style);
            cell = row.createCell((short) 4);
            cell.setCellValue("研发人员");
            cell.setCellStyle(style);
            cell.setCellStyle(style);

            for(int i=0;i<list.size();i++)
            {
                {
                    row = sheet.createRow((int) i + 1);
                    product_research stock = list.get(i);
                    // 第四步，创建单元格，并设置值
                    row.createCell((short) 0).setCellValue(stock.getCas());
                    row.createCell((short) 1).setCellValue(stock.getSku());
                    row.createCell((short) 2).setCellValue(stock.getAmount()+stock.getUnit());
                    row.createCell((short) 3).setCellValue(formatter.format(stock.getResearch_time()));
                    row.createCell((short) 4).setCellValue(stock.getStaff_name());
                }
            }
            try
            {
                //定义文件输出文件夹
                File file=new File(SpringPropertiesHolder.getContextProperty("upload.base.path").toString()+"excel/");

                String url=request.getSession(true).getServletContext().getRealPath("")+"\\excel\\";
                // 若果不存在  则创建文件夹
                File file1 = new File(url);
                if(!file1.exists())
                {
                    file1.mkdir();
                }
                String filePath=getParameterString("start_time")+"至"+getParameterString("end_time")+"项目生产报表"+".xls";
                String outputFile=url+filePath;
               /* FileOutputStream fout = new FileOutputStream(getParameterString("Folder")+getParameterString("start_time")+"至"+getParameterString("end_time")+"库存报表"+".xls");*/
                FileOutputStream fout = new FileOutputStream(outputFile);
                //写入文件
                wb.write(fout);
                //七牛上传文件
                commonsService.uploadFileAllTypeNoWate(EncodeUtil.encodeBase64(getBytes(outputFile)),"excel/"+filePath);
                //返回路径
                String commonUrl = SpringPropertiesHolder.getContextProperty("qiniu.common").toString();
                jsonData.setResult(commonUrl+"excel/"+filePath);
                fout.close();
            }
            catch (Exception e)
            {
                e.printStackTrace();
            }
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //获得指定文件的byte数组
    public static byte[] getBytes(String filePath){
        byte[] buffer = null;
        try {
            File file = new File(filePath);
            FileInputStream fis = new FileInputStream(file);
            ByteArrayOutputStream bos = new ByteArrayOutputStream(1000);
            byte[] b = new byte[1000];
            int n;
            while ((n = fis.read(b)) != -1) {
                bos.write(b, 0, n);
            }
            fis.close();
            bos.close();
            buffer = bos.toByteArray();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return buffer;
    }
   /* @RequestMapping(value = "/research_putu", method = RequestMethod.POST)
    @ResponseBody
    public JsonData research_putu() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
           *//* pss_research_doc pss_research_doc=new pss_research_doc();
            pss_research_doc.setResearch_id(getParameterInteger("research_id"));*//*
            params.put("research_id",getParameterString("research_id"));
            ResearchService.research_putu(params);
            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }*/
}
