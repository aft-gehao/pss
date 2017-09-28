package com.afanti.psi.commons.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.commons.service.CommonsService;
import com.afanti.psi.commons.vo.AutoCompleteItem;
import com.afanti.psi.commons.vo.EncodeUtil;
import com.afanti.psi.htmltopdf.pdf.PdfDocumentGenerator;
import com.afanti.psi.htmltopdf.pdf.bean.SdDocumentsCoaData;
import com.afanti.psi.htmltopdf.pdf.bean.SdDocumentsCoaDataODO;
import com.afanti.psi.shinfo.vo.Linkman;
import com.afanti.psi.utils.DateUtil;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.ResourceLoader;
import com.afanti.psi.vendition.service.VenditionService;
import com.afanti.psi.vendition.vo.sale_hetong;
import org.apache.commons.lang.StringUtils;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Logger;

/**
 * 产品管理 》产品管理列表
 */
@Controller
@RequestMapping(value = "/common")
public class CommonController extends BaseController {

    @Autowired
    private CommonsService commonsService;
    @Autowired
    private VenditionService venditionService;
    Logger logger=Logger.getLogger(CommonController.class.getName());
    @RequestMapping(value = "/section_date", method = RequestMethod.POST)
    @ResponseBody
    public JsonData section_date(HttpServletRequest request) {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            String type = request.getParameter("type");
            DateTime dateTime = new DateTime();
            String start_time;
            String end_time;
            //页面查询条件开始结束时间
            if ("1".equals(type)) {
                start_time = dateTime.plusDays(-dateTime.getDayOfMonth() + 1).toString("yyyy-MM-dd");
                end_time = dateTime.toString("yyyy-MM-dd");
                params.put("start_time", start_time);
                params.put("end_time", end_time);
                jsonData.setResult(this.SUCCESS);
                jsonData.setAppend(params);
            }
            //获取当前系统时间
            else if ("2".equals(type)) {
                params.put("sysdate", dateTime.toString("yyyy-MM-dd hh:mm:ss"));
                jsonData.setResult(this.SUCCESS);
                jsonData.setAppend(params);
            } else {

            }
        } catch (Exception e) {
            jsonData.setResult(this.FAIL);
            jsonData.setMessage("加载时间控件失败");
        }
        return jsonData;
    }

    @RequestMapping(value = "/load_auto", method = RequestMethod.GET)
    @ResponseBody
    public void load_auto(HttpServletRequest request, HttpServletResponse response) {
        StringBuffer retData = new StringBuffer();
        try {
            String query = request.getParameter("q");
            byte b[] = query.getBytes("UTF-8");
            query = new String(b, "UTF-8");
            String type = request.getParameter("t");
            Map<String, Object> params = new HashMap<String, Object>();
            params.put("query", query);
            params.put("type", type);
            List<AutoCompleteItem> list = commonsService.getAutoCompleteList(params);
            for (int i = 0; i < list.size(); i++) {
                retData.append("{text:'" + list.get(i).getValue() + "', value:'" + list.get(i).getData() + "'}");
                retData.append("\n");
            }
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            //输出
            response.getWriter().println(retData.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/load_lxr", method = RequestMethod.POST)
    @ResponseBody
    public JsonData load_lxr() {
        JsonData jsonData = new JsonData();
        try {
            Map<String, Object> params = new HashMap<String, Object>();
            //1供应商2,客户
            params.put("type", this.getParameterInteger("type"));
            params.put("id", this.getParameterString("id"));
            List<Linkman> supplierLinkmanList = commonsService.getLinkmanList(params);
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(supplierLinkmanList);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("加载供应商联系人");
            e.printStackTrace();
        }
        return jsonData;
    }

    @RequestMapping(value = "/auth_check", method = RequestMethod.POST)
    @ResponseBody
    public JsonData auth_check() {
        JsonData jsonData = new JsonData();
        try {
            List<String> permissions = this.getSessionData().getPermissions();
            jsonData.setResult(SUCCESS);
            jsonData.setAppend(permissions);
        } catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("校验权限方法失败");
            e.printStackTrace();
        }
        return jsonData;
    }
    /**
     * MethodName: 入库单模板打印
     *
     * @param request
     * @return Map<String,Object>
     * @throws Exception
     * @Description: 在线编辑合同-保存
     * @author yangsy
     * @version:0.1
     * @date 2016-11-7 下午5:17:50
     */
    @SuppressWarnings({"static-access", "unchecked"})
    @RequestMapping(value = "/add")
    @ResponseBody
    public int queryDictList(SdDocumentsCoaData sdDocumentsCoaData,HttpServletRequest request) throws Exception {
        String batch_no=this.getParameterString("batch_no");//编号
        String product_name_en=this.getParameterString("product_name_en");//成品名称
        String p_pack=this.getParameterString("p_pack");//规格
        String p_unit=this.getParameterString("p_unit");//单位
        int amount=this.getParameterInteger("amount");//单位
        String create_oper=this.getParameterString("appends");//经手人：当前用户
        sdDocumentsCoaData.setBatch_no(batch_no);
        sdDocumentsCoaData.setProduct_name_en(product_name_en);
        sdDocumentsCoaData.setP_pack(p_pack);
        sdDocumentsCoaData.setP_unit(p_unit);
        sdDocumentsCoaData.setAmount(amount);
        sdDocumentsCoaData.setCreate_oper(create_oper);
        Map<String, Object> map = new HashMap<String, Object>();
        JsonData jsonData=new JsonData();
        jsonData.setAppend(sdDocumentsCoaData);
        //图谱等其他要求，需要每个10个字符增加一个<br/>换行
        // classpath 中合同模板路径
        //"config/templates/hetong.html";
        String template ="config/templates/hetong.html";

        //文件名称
        //String fileName = "111.pdf";
        // 生成pdf路径
        Date date=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss");
        String d=sdf.format(date);
        String filePath = "/contract/" + batch_no+d+".pdf";
        String outputFile ="D:/test/" + filePath;
        sdDocumentsCoaData.setImagePath("config/images");
        PdfDocumentGenerator pdfGenerator = new PdfDocumentGenerator();
        // 生成pdf
        pdfGenerator.generate(template, sdDocumentsCoaData, outputFile);
        System.err.println(" \n pdf生成成功  IS OK path=\n" + outputFile);
        System.err.println("耗时time=" + (111)
                / 1000);
        return 1;//需要弹框，还未设置返回jsonData
    }
    /**
     * MethodName: 出库单模板打印
     *
     * @param request
     * @return Map<String,Object>
     * @throws Exception
     * @Description: 在线编辑合同-保存
     * @author yangsy
     * @version:0.1
     * @date 2016-11-7 下午5:17:50
     */
    @SuppressWarnings({"static-access", "unchecked"})
    @RequestMapping(value = "/addOut")
    @ResponseBody
    public int queryDictListOut(SdDocumentsCoaDataODO sdDocumentsCoaDatadao, HttpServletRequest request) throws Exception {
        String batch_no=this.getParameterString("batch_no");//入库批次号
        int amount=this.getParameterInteger("amount");//出库量
        String unit=this.getParameterString("unit");//单位
        sdDocumentsCoaDatadao.setBatchNo(batch_no);
        sdDocumentsCoaDatadao.setAmount(amount);
        sdDocumentsCoaDatadao.setUnit(unit);
        Map<String, Object> map = new HashMap<String, Object>();
        JsonData jsonData=new JsonData();
        jsonData.setAppend(sdDocumentsCoaDatadao);
        //图谱等其他要求，需要每个10个字符增加一个<br/>换行
        // classpath 中合同模板路径
        //"config/templates/hetong.html";
        String template ="config/templates/msds.html";
        //文件名称
        // 生成pdf路径
        Date date=new Date();
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMddHHmmss");
        String d=sdf.format(date);
        String filePath = "/contract/11.pdf";
        String outputFile ="D:/test/" + filePath;
        sdDocumentsCoaDatadao.setImagePath("config/images");
        PdfDocumentGenerator pdfGenerator = new PdfDocumentGenerator();
        // 生成pdf
        pdfGenerator.generate(template, sdDocumentsCoaDatadao, outputFile);
        System.err.println(" \n pdf生成成功  IS OK path=\n" + outputFile);
        System.err.println("耗时time=" + (111)
                / 1000);
        return 1;//需要弹框，还未设置返回jsonData
    }
    @RequestMapping("/upload")
    @ResponseBody
    public Map<String, Object> upload(HttpServletRequest request,HttpServletResponse response) throws IllegalStateException, IOException {
        Map<String, Object> returnMap = new HashMap<String, Object>();
        //本地目录 主路径
        //String localUrl = "H:";
        //String localUrl = "/aft/webapp/application/file/";
        //七牛主路径
        String commonUrl = "http://source.tanyangnet.com/";
        //七牛相对路径
        String pString = request.getParameter("path");
        if(StringUtils.isBlank(pString)){
            pString = "upload.comp.aft";
        }
        String logoUrl = "aft/upload";
        String path = "";
        //创建一个通用的多部分解析器
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        //判断 request 是否有文件上传,即多部分请求
        if(multipartResolver.isMultipart(request)){
            //转换成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
            //取得request中的所有文件名
            Iterator<String> iter = multiRequest.getFileNames();
            while(iter.hasNext()){
                //记录上传过程起始时的时间，用来计算上传时间
                int pre = (int) System.currentTimeMillis();
                //取得上传文件
                MultipartFile file = multiRequest.getFile(iter.next());
                if(file != null){
                    //取得当前上传文件的文件名称
                    String myFileName = file.getOriginalFilename();
                    //后缀名
                    String ext = getFileExt(file.getOriginalFilename());
                    //如果名称不为“”,说明该文件存在，否则说明该文件不存在
                    if(myFileName.trim() !=""){
                        System.out.println(myFileName);
                        //重命名上传后的文件名
                        //定义上传路径
                        String fileName = myFileName;
                        path ="webapp/application/file/" +fileName;
                        File localFile = new File(path);
                        if(!localFile.getParentFile().exists())
                            localFile.getParentFile().mkdirs();
                        //上传至七牛服务器：
                        try {
                            commonsService.uploadFileAllTypeNoWate(EncodeUtil.encodeBase64(file.getBytes()), fileName);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        file.transferTo(localFile);
                        path =  fileName;
                        returnMap.put("code", 1);
                        returnMap.put("url", path);
                        returnMap.put("commonUrl", commonUrl);
                    }
                }
                //记录上传该文件后的时间
                int finaltime = (int) System.currentTimeMillis();
                System.out.println(finaltime - pre);
            }
        }
        return returnMap;
    }
    @RequestMapping("/uploadputu")
    @ResponseBody
    public Map<String, Object> uploadputu(HttpServletRequest request,HttpServletResponse response) throws IllegalStateException, IOException {
        Map<String, Object> returnMap = new HashMap<String, Object>();
        //本地目录 主路径
        //String localUrl = "H:";
        //String localUrl = "/aft/webapp/application/file/";
        //七牛主路径
        String commonUrl = "http://source.tanyangnet.com/";
        //七牛相对路径
        String pString = request.getParameter("path");
        if(StringUtils.isBlank(pString)){
            pString = "upload.comp.aft";
        }
        String logoUrl = "aft/upload";
        String path = "";
        //创建一个通用的多部分解析器
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        //判断 request 是否有文件上传,即多部分请求
        if(multipartResolver.isMultipart(request)){
            //转换成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
            //取得request中的所有文件名
            Iterator<String> iter = multiRequest.getFileNames();
            while(iter.hasNext()){
                //记录上传过程起始时的时间，用来计算上传时间
                int pre = (int) System.currentTimeMillis();
                //取得上传文件
                MultipartFile file = multiRequest.getFile(iter.next());
                if(file != null){
                    //取得当前上传文件的文件名称
                    String myFileName = file.getOriginalFilename();
                    //后缀名
                    String ext = getFileExt(file.getOriginalFilename());
                    //如果名称不为“”,说明该文件存在，否则说明该文件不存在
                    if(myFileName.trim() !=""){
                        System.out.println(myFileName);
                        //重命名上传后的文件名
                        //定义上传路径
                        String fileName = "/putu/"+new Date().getTime()  + "."+ext;
                        path ="webapp/application/file/" +fileName;
                        File localFile = new File(path);
                        if(!localFile.getParentFile().exists())
                            localFile.getParentFile().mkdirs();
                        //上传至七牛服务器：
                        try {
                            commonsService.uploadFileAllTypeNoWate(EncodeUtil.encodeBase64(file.getBytes()), fileName);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        file.transferTo(localFile);
                        path =  fileName;
                        returnMap.put("myFileName", myFileName);
                        returnMap.put("time", (int) System.currentTimeMillis());
                        returnMap.put("code", 1);
                        returnMap.put("url", path);
                        returnMap.put("commonUrl", commonUrl);
                    }
                }
                //记录上传该文件后的时间
                int finaltime = (int) System.currentTimeMillis();
                System.out.println(finaltime - pre);
            }
        }
        return returnMap;
    }
    @RequestMapping("/uploadhetong")
    @ResponseBody
    public Map<String, Object> uploadhetong(HttpServletRequest request,HttpServletResponse response) throws IllegalStateException, IOException {
        Map<String, Object> returnMap = new HashMap<String, Object>();
        //本地目录 主路径
        //String localUrl = "H:";
        //String localUrl = "/aft/webapp/application/file/";
        //七牛主路径
        String commonUrl = "http://source.tanyangnet.com/";
        //七牛相对路径
        String pString = request.getParameter("path");
        if(StringUtils.isBlank(pString)){
            pString = "upload.comp.aft";
        }
        String logoUrl = "aft/upload";
        String path = "";
        //创建一个通用的多部分解析器
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        //判断 request 是否有文件上传,即多部分请求
        if(multipartResolver.isMultipart(request)){
            //转换成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
            //取得request中的所有文件名
            Iterator<String> iter = multiRequest.getFileNames();
            while(iter.hasNext()){
                //记录上传过程起始时的时间，用来计算上传时间
                int pre = (int) System.currentTimeMillis();
                //取得上传文件
                MultipartFile file = multiRequest.getFile(iter.next());
                if(file != null){
                    //取得当前上传文件的文件名称
                    String myFileName = file.getOriginalFilename();
                    //后缀名
                    String ext = getFileExt(file.getOriginalFilename());
                    //如果名称不为“”,说明该文件存在，否则说明该文件不存在
                    if(myFileName.trim() !=""){
                        System.out.println(myFileName);
                        //重命名上传后的文件名
                        //定义上传路径
                        String fileName = "/cghetong/"+new Date().getTime()  + "."+ext;
                        path ="webapp/application/file/" +fileName;
                        File localFile = new File(path);
                        if(!localFile.getParentFile().exists())
                            localFile.getParentFile().mkdirs();
                        //上传至七牛服务器：
                        try {
                            commonsService.uploadFileAllTypeNoWate(EncodeUtil.encodeBase64(file.getBytes()), fileName);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        file.transferTo(localFile);
                        path =  fileName;
                        returnMap.put("myFileName", myFileName);
                        returnMap.put("time", (int) System.currentTimeMillis());
                        returnMap.put("code", 1);
                        returnMap.put("url", path);
                        returnMap.put("commonUrl", commonUrl);
                    }
                }
                //记录上传该文件后的时间
                int finaltime = (int) System.currentTimeMillis();
                System.out.println(finaltime - pre);
            }
        }
        return returnMap;
    }

    @RequestMapping("/uploadmaterial")
    @ResponseBody
    public Map<String, Object> uploadmaterial(HttpServletRequest request,HttpServletResponse response) throws IllegalStateException, IOException {
        Map<String, Object> returnMap = new HashMap<String, Object>();
        //本地目录 主路径
        //String localUrl = "H:";
        //String localUrl = "/aft/webapp/application/file/";
        //七牛主路径
        String commonUrl = "http://source.tanyangnet.com/";
        //七牛相对路径
        String pString = request.getParameter("path");
        if(StringUtils.isBlank(pString)){
            pString = "upload.comp.aft";
        }
        String logoUrl = "aft/upload";
        String path = "";
        //创建一个通用的多部分解析器
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        //判断 request 是否有文件上传,即多部分请求
        if(multipartResolver.isMultipart(request)){
            //转换成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
            //取得request中的所有文件名
            Iterator<String> iter = multiRequest.getFileNames();
            while(iter.hasNext()){
                //记录上传过程起始时的时间，用来计算上传时间
                int pre = (int) System.currentTimeMillis();
                //取得上传文件
                MultipartFile file = multiRequest.getFile(iter.next());
                if(file != null){
                    //取得当前上传文件的文件名称
                    String myFileName = file.getOriginalFilename();
                    //后缀名
                    String ext = getFileExt(file.getOriginalFilename());
                    //如果名称不为“”,说明该文件存在，否则说明该文件不存在
                    if(myFileName.trim() !=""){
                        System.out.println(myFileName);
                        //重命名上传后的文件名
                        //定义上传路径
                        String fileName = "/cgmaterial/"+new Date().getTime()  + "."+ext;
                        path ="webapp/application/file/" +fileName;
                        File localFile = new File(path);
                        if(!localFile.getParentFile().exists())
                            localFile.getParentFile().mkdirs();
                        //上传至七牛服务器：
                        try {
                            commonsService.uploadFileAllTypeNoWate(EncodeUtil.encodeBase64(file.getBytes()), fileName);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        file.transferTo(localFile);
                        path =  fileName;
                        returnMap.put("myFileName", myFileName);
                        returnMap.put("time", (int) System.currentTimeMillis());
                        returnMap.put("code", 1);
                        returnMap.put("url", path);
                        returnMap.put("commonUrl", commonUrl);
                    }
                }
                //记录上传该文件后的时间
                int finaltime = (int) System.currentTimeMillis();
                System.out.println(finaltime - pre);
            }
        }
        return returnMap;
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
    /**
     * @Title: getFileExt
     * @Description: 获取文件后缀名
     * @param fileName 全部文件名
     * @return 文件后缀名
     */
    private String getFileExt(String fileName) {
        String value = "";
        int start = 0;
        int end = 0;
        final int charDot = 46;
        if (fileName == null) {
            return null;
        }
        start = fileName.lastIndexOf(charDot) + 1;
        end = fileName.length();
        value = fileName.substring(start, end);
        if (fileName.lastIndexOf(charDot) > 0) {
            return value;
        } else {
            return "";
        }
    }
    /**
     * MethodName: 销售合同pdf生成
     *
     * @param request
     * @return Map<String,Object>
     * @throws Exception
     * @Description: 在线编辑合同-保存
     * @author gehao
     * @version:0.1
     * @date 2017-09-06 下午5:17:50
     */
    @RequestMapping(value = "/add_sale_hetong", method = RequestMethod.POST)
    @ResponseBody
    public JsonData add_sale_hetong(HttpServletRequest request) throws Exception {
        JsonData jsonData = new JsonData();
        try {
            sale_hetong hetong = new sale_hetong();
            //买方信息包括账号税号 法人等
            hetong.setCompany_people(this.getParameterString("company_people"));
            hetong.setCompany(this.getParameterString("company"));
            hetong.setBank(this.getParameterString("bank"));
            hetong.setShuihao(this.getParameterString("shuihao"));
            hetong.setBank_number(this.getParameterString("bank_number"));
            hetong.setTelephone(this.getParameterString("telephone"));
            hetong.setSale_d_id(Integer.parseInt(this.getParameterString("sale_d_id")));
            //产品英文名
            hetong.setName_en(this.getParameterString("name_en"));
            //数量
            hetong.setAmount(Float.parseFloat(this.getParameterString("amount")));
            //cas
            hetong.setCas(this.getParameterString("cas"));
            //买方
            hetong.setCustomer(this.getParameterString("customer"));
            //单位
            hetong.setUnit(this.getParameterString("unit"));
            hetong.setDesc(this.getParameterString("desc"));
            hetong.setHetong_no(this.getParameterString("hetong_no"));
            hetong.setHetong_time(this.getParameterString("time"));
            hetong.setJiaohuo_address(this.getParameterString("jiaohuo_address"));
            hetong.setJiaohuo_time(this.getParameterString("jiaohuo_time"));
            hetong.setMoney(this.getParameterInteger("price"));
            hetong.setMoney_daxie(this.getParameterString("price_daxie"));
            hetong.setZhil_biaozhun(this.getParameterString("zhil_biaozhun"));
            Map<String, Object> map = new HashMap<String, Object>();
            //图谱等其他要求，需要每个10个字符增加一个<br/>换行
            // classpath 中合同模板路径
            //"config/templates/hetong.html";
            // classpath 中合同模板路径
            String template = "config/templates/sale_hetong.html";
            String img_path = ResourceLoader.getPath("config/images");
           /* String template1 =  ResourceLoader.getPath("config/templates/")+"sale_hetong.html";*/
            hetong.setImg_path(img_path);
            //文件名称
            // 生成pdf路径
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
            String d = sdf.format(date);
            String filePath = "/saleContract/" + DateUtil.getCurrentTimeSSSAsNumber() + ".pdf";
            String path=request.getSession(true).getServletContext().getRealPath("")+"\\sale_hetong\\";
            // 若果不存在  则创建文件夹
            File file1 = new File(path);
            if(!file1.exists())
            {
                file1.mkdir();
            }
            String outputFile = path + filePath;
   /*     sdDocumentsCoaDatadao.setImagePath("config/images");*/
            PdfDocumentGenerator pdfGenerator = new PdfDocumentGenerator();
            // 生成pdf
            pdfGenerator.generate(template, hetong, outputFile);
            //上传至七牛
            commonsService.uploadFileAllTypeNoWate(EncodeUtil.encodeBase64(getBytes(outputFile)), filePath);
            map.put("hetong_doc", filePath);
            map.put("sale_d_id", hetong.getSale_d_id());
            venditionService.sale_doc_add(map);
            jsonData.setAppend(filePath);
        }
        catch (Exception e) {
            jsonData.setResult(FAIL);
            jsonData.setMessage("程序错误");
            e.printStackTrace();
        }
        return jsonData;
    }

}
