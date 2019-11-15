package com.offcn.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.offcn.entity.PageResult;
import com.offcn.mapper.TbBrandMapper;
import com.offcn.mapper.TbSpecificationMapper;
import com.offcn.mapper.TbTypeTemplateMapper;
import com.offcn.pojo.TbTypeTemplate;
import com.offcn.pojo.TbTypeTemplateExample;
import com.offcn.service.TypeTemplateService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.github.pagehelper.PageHelper.startPage;

@Service
public class TypeTemplateServiceImpl implements TypeTemplateService {

    @Autowired
    TbTypeTemplateMapper typeTemplateMapper;

    /**
     * 查询模板数据
     * @return
     */
    @Override
    public List<TbTypeTemplate> findAll() {
        return typeTemplateMapper.selectByExample(null);
    }

    @Override
    public PageResult findPage(int pageNum, int pageSize, TbTypeTemplate typeTemplate) {

        //1.先来设置分页参数
        startPage(pageNum,pageSize);

        //2.条件
        TbTypeTemplateExample example = new TbTypeTemplateExample();
        TbTypeTemplateExample.Criteria criteria = example.createCriteria();

        //判断的顺序不能乱
        if(typeTemplate!=null && typeTemplate.getName()!=null && typeTemplate.getName().length()>0){
            criteria.andNameLike("%"+typeTemplate.getName()+"%");
        }

        Page<TbTypeTemplate> page = (Page<TbTypeTemplate>) typeTemplateMapper.selectByExample(example);
        PageResult pageResult = new PageResult();
        pageResult.setRows(page.getResult());
        pageResult.setTotal(page.getTotal());

        return pageResult;
    }

    @Autowired
    TbBrandMapper brandMapper;

    @Autowired
    TbSpecificationMapper specificationMapper;

   /* @Override
    public Map initAddTypeTempateData() {

        //品牌和规格

        List<Map> brandList = brandMapper.brandList();
        List<Map> specList = specificationMapper.specList();

        Map<String,Object> map = new HashMap<>();
        map.put("brandList",brandList);
        map.put("specList",specList);

        return map;*/
        /*
        *      {
        *               brandList:[ {} , {} , {} ],
        *               specList:[]
        *      }
        *
        * */
    //}

    @Override
    public void add(TbTypeTemplate typeTemplate) {
        typeTemplateMapper.insert(typeTemplate);
    }

    @Override
    public void update(TbTypeTemplate typeTemplate) {
        typeTemplateMapper.updateByPrimaryKey(typeTemplate);
    }

    @Override
    public TbTypeTemplate findOne(Long id) {
        return typeTemplateMapper.selectByPrimaryKey(id);
    }

    @Override
    public void delete(Long[] ids) {
        for(Long id : ids){
            typeTemplateMapper.deleteByPrimaryKey(id);
        }
    }
}
