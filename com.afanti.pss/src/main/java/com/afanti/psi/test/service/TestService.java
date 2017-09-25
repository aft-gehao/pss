package com.afanti.psi.test.service;

import com.afanti.psi.test.vo.TestVo;
import com.afanti.psi.utils.Page;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by Administrator on 2017/4/10 0010.
 */
@Service
public interface TestService {
    Page<TestVo> getTestVo(Map<String,Object> params);
}
