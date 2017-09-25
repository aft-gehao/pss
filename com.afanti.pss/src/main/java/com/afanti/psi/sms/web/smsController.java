package com.afanti.psi.sms.web;

import com.afanti.psi.base.BaseController;
import com.afanti.psi.sms.service.impl.SmsService;
import com.afanti.psi.utils.JsonData;
import com.afanti.psi.utils.number;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * ClassName:
 * @Description: 进销存短信服务类
 * @author gehao
 * @date 2017-1-16
 */
@Controller
@RequestMapping(value = "/sms")//窄化请求映射
public class smsController extends BaseController {

	@Resource(name = "smsService")
	private SmsService smsService;
   //短信服务类
    @RequestMapping(value = "/sendFeedback")
	@ResponseBody
    public JsonData sendFeedback(HttpServletRequest request) {
		      JsonData jsonData = new JsonData();
	     try {
			 Map<String, Object> params = new HashMap<String, Object>();
		      StringBuffer str = new StringBuffer();
			 //传入领用产品参数
			  str.append(getParameterString("str"));
			  str.append("本次验证码为：");
			  //生成6位数验证码
			  String code=number.getRandomInt(6);
			  //传入str
			  str.append(code);
			  str.append(",打死都不能告诉别人");
		      str.append("【进销存】");
			  request.getSession().setAttribute("identifying_code", code);
			  //发送短信
		      smsService.send(getParameterString("mobilephone"),str.toString());
			  jsonData.setAppend(code);
			  jsonData.setResult(SUCCESS);
	         }
		 catch(Exception e) {
			jsonData.setResult(FAIL);
			jsonData.setMessage(e.toString());
			e.printStackTrace();
		}
		return jsonData;
   }
	//短信服务类
	@RequestMapping(value = "/getCode")
	@ResponseBody
	public JsonData getCode(HttpServletRequest request) {
		JsonData jsonData = new JsonData();
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			StringBuffer str = new StringBuffer();
            int a=Integer.parseInt(getParameterString("code"));
			int b=Integer.parseInt(String.valueOf(request.getSession().getAttribute("identifying_code")));
			if((Integer.parseInt(getParameterString("code")))==Integer.parseInt(String.valueOf(request.getSession().getAttribute("identifying_code"))))
			{
				jsonData.setAppend("success");
			}
			else{
				jsonData.setAppend("fail");
			}
		}
		catch(Exception e) {
			jsonData.setResult(FAIL);
			jsonData.setMessage(e.toString());
			e.printStackTrace();
		}
		return jsonData;
	}

}
