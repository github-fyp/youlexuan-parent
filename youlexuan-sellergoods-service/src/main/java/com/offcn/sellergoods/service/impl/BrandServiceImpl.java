package com.offcn.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.offcn.entity.PageResult;
import com.offcn.entity.Result;
import com.offcn.mapper.TbBrandMapper;
import com.offcn.pojo.TbBrand;
import com.offcn.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private TbBrandMapper tbBrandMapper;

    /**
     * 查询商品信息服务
     */
    @Override
    public PageResult selectBrand(int pageNum,int pageSize) {

        PageHelper.startPage(pageNum,pageSize);
        Page<TbBrand> page =  (Page<TbBrand>) tbBrandMapper.selectByExample(null);

        PageResult pageResult = new PageResult();
        pageResult.setRows(page.getResult());
        pageResult.setTotal(page.getTotal());
        return pageResult;
    }

    /**
     *  增加品牌
     * @param brand
     * @return
     */
    @Override
    public Result add(TbBrand brand) {

        try {
            if(brand.getName() != null && brand.getName() != ""){
                if(brand.getFirstChar().length() == 1){
                    tbBrandMapper.insert(brand);
                    return new Result(true,"添加成功");
                }else{
                    return new Result(false,"首字母只能是一位数");
                }
            }//else{
            return new Result(false,"品牌名称不能为空");
            // }

        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"添加失败");
        }
    }

    /**
     * 删除品牌
     * @param ids 要删除的品牌数组
     * @return
     */
    @Override
    public Result delete(Long[] ids) {
        try {
            if(ids.length > 0){
                for (Long id:ids) {
                    tbBrandMapper.deleteByPrimaryKey(id);
                }
                return new Result(true,"删除成功");
            }else{
                return new Result(false,"请选择要删除的项");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"删除失败");
        }
    }


}
