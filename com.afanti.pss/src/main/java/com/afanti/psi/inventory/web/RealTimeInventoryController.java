package com.afanti.psi.inventory.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.commons.service.CommonsService;
import com.afanti.psi.commons.vo.EncodeUtil;
import com.afanti.psi.inventory.service.ProductInInventoryService;
import com.afanti.psi.inventory.service.RealTimeInventoryService;
import com.afanti.psi.inventory.vo.Product_material_stock;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import com.afanti.psi.utils.SpringPropertiesHolder;
import org.apache.poi.hssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**

/**
 * 库存管理 》实时库存.
 */
@Controller
@RequestMapping(value = "/inventory/realtimeInventory")
public class RealTimeInventoryController extends BaseController {
    @Autowired
    private RealTimeInventoryService realTimeInventoryService;

    @Autowired
    private ProductInInventoryService productInInventoryService;
    @Autowired
    private CommonsService commonsService;
    /**
     * 产品实时库存查询
     * 20170414 addby gehao
     */
    @RequestMapping(value = "/stockSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData stockSelect(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取cas。sku。中文名。英文名
            params.put("cas", getParameterString("cas"));
            params.put("sku", getParameterString("sku"));
            params.put("nameCh", getParameterString("nameCh"));
            params.put("nameEn", getParameterString("nameEn"));
            //页码
            params.put("p", getParameterString("p"));
            params.put("material",getParameterInteger("material"));
            params.put("product_type",getParameterString("product_type"));
            params.put("search",getParameterString("search"));
            Page page = realTimeInventoryService.stockSelect(params);
            //在append中塞入page数据
            jsonData.setAppend(page);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 查询产品实时库存详情
     * 20170416 addby gehao
     */
    @RequestMapping(value = "/selectInventoryDetail", method = RequestMethod.POST)
    @ResponseBody
    public JsonData selectInventoryDetail(HttpServletRequest request) {

        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //获取产品id
            params.put("productId", getParameterString("productId"));
            params.put("flag", getParameterString("flag"));
            //页码
            params.put("p", getParameterString("p"));
            Page page = realTimeInventoryService.selectInventoryDetail(params);
            //在append中塞入page数据
            jsonData.setAppend(page);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    //库存盘点 gehao 2017-07-26
    @RequestMapping(value = "/inventory_check", method = RequestMethod.POST)
    @ResponseBody
    public JsonData inventory_check() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("amount",this.getParameterString("amount"));
            params.put("reason",this.getParameterString("reason"));
            params.put("enter_d_id", this.getParameterInteger("enter_d_id"));
            //库存盘点
            productInInventoryService.inventory_check(params);
            StringBuffer str=new StringBuffer();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            str.append(formatter.format(new Date()));
            str.append(formatter.format(new Date())+","+this.getSessionData().getStaffInfo().getStaff_name()+"修改了id为"
                    +this.getParameterInteger("enter_d_id")+"的库存,"+"修改后的库存量为"+this.getParameterString("amount")+"!"
            +"原因为:"+this.getParameterString("reason")+"。");
            //日志
            params.put("log_info",str.toString());
            //时间
            params.put("log_time",new Date());
            //操作人
            params.put("log_staff",this.getSessionData().getStaffInfo().getStaff_id());

            jsonData.setResult(SUCCESS);
            jsonData.setMessage("操作成功");
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("操作失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 报表
     * 20170414 addby gehao
     */
    @RequestMapping(value = "/baobiaoSelect", method = RequestMethod.POST)
    @ResponseBody
    public JsonData baobiaoSelect(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("start_time", getParameterString("start_time"));
            params.put("end_time", getParameterString("end_time"));
            //获取cas。sku。中文名。英文名
            String cas=getParameterString("cas");
            if (("").equals(cas)){
                params.put("cas",cas);
            }else {
                if (cas.indexOf(",")>-1){

                    String[] list = cas.split(",");
                    String str = "";
                    for (int i = 0; i < list.length; i++) {
                        //如果属于最后一个查询条件则不加or  否则加or
                        if (i == list.length - 1) {
                            str += list[i].toString();

                        } else {
                            str +=list[i].toString() +"|";
                        }
                    }
                    params.put("cas",str.toString());
                }else {
                    params.put("cas",cas);
                }

            }
            //获取cas。sku。中文名。英文名
            //params.put("cas", getParameterString("cas"));
            params.put("sku", getParameterString("sku"));
            //页码
            params.put("p", getParameterString("p"));
            params.put("unit",getParameterString("unit"));
            Page page = realTimeInventoryService.baobiaoSelect(params);
            //在append中塞入page数据
            jsonData.setAppend(page);
            //在result中塞入字符串
            jsonData.setResult(SUCCESS);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage(e.toString());
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * 报表
     * 20170414 addby gehao
     */
    @RequestMapping(value = "/baobiaoAdd", method = RequestMethod.POST)
    @ResponseBody
    public JsonData baobiaoAdd(HttpServletRequest request) {

        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("Folder", getParameterString("Folder"));
            params.put("start_time", getParameterString("start_time"));
            params.put("end_time", getParameterString("end_time"));
            //获取cas。sku。中文名。英文名
            params.put("cas", getParameterString("cas"));
            //获取cas。sku。中文名。英文名
            params.put("sku", getParameterString("sku"));
            //是否按照g统计数据
            params.put("unit",getParameterString("unit"));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            String cas=getParameterString("cas");
            if (("").equals(cas)){
                params.put("cas",cas);
            }else {
                if (cas.indexOf(",")>-1){
                    String[] list = cas.split(",");
                    String str =  "";
                    for (int i = 0; i < list.length; i++) {
                        //如果属于最后一个查询条件则不加or  否则加or
                        if (i == list.length - 1) {
                            str += list[i].toString();
                        } else {
                            str +=list[i].toString() +"|";
                        }
                    }
                    params.put("cas",str.toString());
                }else {
                    params.put("cas",cas);
                }
            }
            List<Product_material_stock> list = realTimeInventoryService.baobiaoSelectforExcel(params);
            // 第一步，创建一个webbook，对应一个Excel文件
            HSSFWorkbook wb = new HSSFWorkbook();
            // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
            HSSFSheet sheet = wb.createSheet(getParameterString("start_time")+"至"+getParameterString("end_time")+"库存报表");
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
            cell.setCellValue("出库量");
            cell.setCellStyle(style);
            cell = row.createCell((short) 3);
            cell.setCellValue("入库量");
            cell.setCellStyle(style);
            cell = row.createCell((short) 4);
            cell.setCellValue("当前剩余库存");
            cell.setCellStyle(style);

            for(int i=0;i<list.size();i++)
            {
                {
                    row = sheet.createRow((int) i + 1);
                    Product_material_stock stock = list.get(i);
                    // 第四步，创建单元格，并设置值
                    row.createCell((short) 0).setCellValue(stock.getCas());
                    row.createCell((short) 1).setCellValue(stock.getSku());
                    row.createCell((short) 2).setCellValue(stock.getA_out()+stock.getUnit());
                    row.createCell((short) 3).setCellValue(stock.getA_in()+stock.getUnit());
                    row.createCell((short) 4).setCellValue(stock.getAmount_leave()+stock.getUnit());
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
                String filePath=getParameterString("start_time")+"至"+getParameterString("end_time")+"库存报表"+".xls";
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
}
