package com.offcn.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.offcn.entity.PageResult;
import com.offcn.entity.Result;
import com.offcn.pojo.TbBrand;
import com.offcn.service.BrandService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/brand")
public class BrandController {

    @Reference
    private BrandService brandService;

    /**
     * 分页查询
     * @param pageNum 第几页
     * @param pageSize 每页显示多少条
     * @return
     */
    @RequestMapping("/findPage")
    @ResponseBody
    public PageResult select(int pageNum,int pageSize){
        return brandService.selectBrand(pageNum,pageSize);
    }

    /**
     *  增加品牌
     */
    @RequestMapping("/addBrand")
    @ResponseBody
    public Result addBrand(@RequestBody TbBrand brand){

           return brandService.add(brand);
    }

    /**
     *  删除品牌
     */
    @RequestMapping("/deleteBrand")
    @ResponseBody
    public Result delete(Long[] deleteIds){

        return brandService.delete(deleteIds);
    }

}
