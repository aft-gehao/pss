package com.afanti.psi.test.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.test.service.TestService;
import com.afanti.psi.test.vo.TestVo;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
/**
 * Created by lauya on 2015-10-11.
 */
@Controller
@RequestMapping(value = "/test")
public class TestController extends BaseController {
    /**
     * @功能：手工构建一个简单格式的Excel
     */
    private static List<TestVo> getStudent() throws Exception
    {
        List list = new ArrayList();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");

        TestVo user1 = new TestVo(1, "张三", 16, df.parse("1997-03-12"));
        TestVo user2 = new TestVo(2, "李四", 17, df.parse("1996-08-12"));
        TestVo user3 = new TestVo(3, "王五", 26, df.parse("1985-11-12"));
        list.add(user1);
        list.add(user2);
        list.add(user3);

        return list;
    }

    public static void main(String[] args) throws Exception
    {
        // 第一步，创建一个webbook，对应一个Excel文件
        HSSFWorkbook wb = new HSSFWorkbook();
        // 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet("学生表一");
        // 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
        HSSFRow row = sheet.createRow((int) 0);
        // 第四步，创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        HSSFCell cell = row.createCell((short) 0);
        cell.setCellValue("学号");
        cell.setCellStyle(style);
        cell = row.createCell((short) 1);
        cell.setCellValue("姓名");
        cell.setCellStyle(style);
        cell = row.createCell((short) 2);
        cell.setCellValue("年龄");
        cell.setCellStyle(style);
        cell = row.createCell((short) 3);
        cell.setCellValue("生日");
        cell.setCellStyle(style);

        // 第五步，写入实体数据 实际应用中这些数据从数据库得到，
        List list = TestController.getStudent();

        for (int i = 0; i < list.size(); i++)

        {
            row = sheet.createRow((int) i + 1);
            TestVo stu = (TestVo) list.get(i);
            // 第四步，创建单元格，并设置值
            row.createCell((short) 0).setCellValue((double) stu.getId());
            row.createCell((short) 1).setCellValue(stu.getName());
            row.createCell((short) 2).setCellValue((double) stu.getAge());
            cell = row.createCell((short) 3);
            cell.setCellValue(new SimpleDateFormat("yyyy-mm-dd").format(stu
                    .getBirth()));
        }
        // 第六步，将文件存到指定位置
        try
        {
            FileOutputStream fout = new FileOutputStream("E:/students.xls");
            wb.write(fout);
            fout.close();
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}