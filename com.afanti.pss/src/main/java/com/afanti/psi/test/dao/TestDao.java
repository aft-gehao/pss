package com.afanti.psi.test.dao;

import com.afanti.psi.test.vo.TestVo;
import com.afanti.psi.utils.Page;

import java.util.List;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
public interface TestDao {
    List<TestVo> getTestVoList(Page page);
    int getTestVoCount(Page page);
}
