package com.offcn.service;

import com.offcn.entity.PageResult;
import com.offcn.pojo.TbTypeTemplate;

import java.util.List;

public interface TypeTemplateService {

    /**
     *  查询模板数据
     * @return
     */
    public List<TbTypeTemplate> findAll();


    public PageResult findPage(int pageNum, int pageSize, TbTypeTemplate typeTemplate);

    /**
     * 查询 品牌和规格  的两个集合，存入到同一个map中
     * @return
     */
    //public Map initAddTypeTempateData();

    /**
     *添加模板
     * @param typeTemplate
     */
    public void add(TbTypeTemplate typeTemplate);

    /**
     * 更新
     * @param typeTemplate
     */
    public void update(TbTypeTemplate typeTemplate);

    /**
     * 根据id主键查询
     * @param id
     * @return
     */
    public TbTypeTemplate findOne(Long id);

    /**
     * 批量删除
     * @param ids
     */
    public void delete(Long[] ids);
}
