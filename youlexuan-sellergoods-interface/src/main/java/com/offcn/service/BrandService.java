package com.offcn.service;

import com.offcn.entity.PageResult;
import com.offcn.entity.Result;
import com.offcn.pojo.TbBrand;

public interface BrandService {

    /**
     * 分页查询
     * @param pageNum 第几页
     * @param pageSize 每页显示多少条
     * @return
     */
    PageResult selectBrand(int pageNum,int pageSize);

    /**
     * 新增品牌
     */
    Result add(TbBrand brand);

    /**
     *  删除品牌
     */
    Result delete(Long[] ids);


}
