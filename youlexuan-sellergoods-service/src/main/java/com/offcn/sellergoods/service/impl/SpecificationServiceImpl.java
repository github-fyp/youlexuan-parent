package com.offcn.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.offcn.entity.PageResult;
import com.offcn.mapper.TbSpecificationMapper;
import com.offcn.pojo.TbSpecification;
import com.offcn.pojo.TbSpecificationExample;
import com.offcn.service.SpecificationService;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class SpecificationServiceImpl implements SpecificationService {

    @Autowired
    private TbSpecificationMapper tbSpecificationMapper;

    /**
     * 筛选查询品牌规格
     * @return
     */
    @Override
    public PageResult selectSpect(int pageNum,int pageSize,TbSpecification tbSpecification) {
        PageHelper.startPage(pageNum,pageSize);

        //条件
        TbSpecificationExample example = new TbSpecificationExample();
        TbSpecificationExample.Criteria criteria = example.createCriteria();
        if(tbSpecification != null){
            if(tbSpecification.getSpecName() != null && tbSpecification.getSpecName().length() > 0){
                criteria.andSpecNameLike("%"+tbSpecification.getSpecName()+"%");
            }
        }

        //分页
        Page<TbSpecification> page = (Page<TbSpecification>)tbSpecificationMapper.selectByExample(example);
        PageResult pageResult = new PageResult();
        pageResult.setRows(page.getResult());
        pageResult.setTotal(page.getTotal());
        return pageResult;
    }
}
