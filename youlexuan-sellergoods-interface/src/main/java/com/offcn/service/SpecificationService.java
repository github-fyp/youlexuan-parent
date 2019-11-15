package com.offcn.service;

import com.offcn.entity.PageResult;
import com.offcn.pojo.TbSpecification;

public interface SpecificationService {

    /**
     *  条件查询品牌规格
     * @return
     */
    PageResult selectSpect(int pageNum,int pageSize,TbSpecification tbSpecification);
}
