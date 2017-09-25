package com.afanti.psi.htmltopdf.pdf;

import java.util.HashMap;
import java.util.Map;

import com.afanti.psi.htmltopdf.utils.JacksonBinder;

/**
 * 模板中需要的数据视图 抽象类
 * @ClassName: AbstractDocumentVo
 * @Description: 模板中需要的数据视图 抽象类
 * @author yangsy
 * 修改时间： 2016年12月5日 上午11:19:29
 * 修改内容：新建
 */
public abstract class AbstractDocumentVo implements DocumentVo{
	/**
	 * ,填充模板中数据,获取模板数据map
	 * @Title: fillDataMap
	 * @Description:  获取模板数据map
	 * @return
	 * @author yangsy
	 * 修改时间： 2016年12月5日 上午11:19:29
	 * 修改内容：新建
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Object> fillDataMap(){
		Map<String, Object> map = new HashMap<String, Object>();
		
		DocumentVo vo = this.getDocumentVo();
		map = JacksonBinder.buildNonDefaultBinder().convertValue(vo, HashMap.class);
		
		return map;
	}
	
	private DocumentVo getDocumentVo() {
		return this;
	}

}
