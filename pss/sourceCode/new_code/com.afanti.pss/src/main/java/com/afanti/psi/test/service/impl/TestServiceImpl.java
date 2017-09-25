package com.afanti.psi.test.service.impl;

import com.afanti.psi.test.dao.TestDao;
import com.afanti.psi.test.service.TestService;
import com.afanti.psi.test.vo.TestVo;
import com.afanti.psi.utils.FunctionUtil;
import com.afanti.psi.utils.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
@Service
public class TestServiceImpl implements TestService {
    @Autowired
    private TestDao testDao;

    @Override
    public Page<TestVo> getTestVo(Map<String, Object> params) {
        Page<TestVo> pageInfo = new Page<TestVo>(FunctionUtil.PAGE_SIZE);
        pageInfo.setPageNo(Integer.valueOf(params.get("p").toString()));
        pageInfo.setParams(params);
        List<TestVo> testVoList = testDao.getTestVoList(pageInfo);
        pageInfo.setResults(testVoList);
        FunctionUtil.pageInit(pageInfo);
        return pageInfo;
    }
}
