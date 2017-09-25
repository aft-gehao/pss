package com.afanti.psi.commons.dao;

import com.afanti.psi.commons.vo.AutoCompleteItem;
import com.afanti.psi.commons.vo.Pss_dict;
import com.afanti.psi.commons.vo.Pss_util_dict;
import com.afanti.psi.shinfo.vo.Linkman;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/18 0018.
 */
public interface CommonsDao {
    List<AutoCompleteItem> getAutoCompleteList(Map<String, Object> params);
    List<Pss_dict> getDict(Map<String, Object> params);
    List<Linkman> getLinkmanList(Map<String, Object> params);
    /*Pss_util_dict getRatio(Map<String, Object> params);*/
}
