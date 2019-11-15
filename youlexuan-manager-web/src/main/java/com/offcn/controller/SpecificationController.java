package com.offcn.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.offcn.entity.PageResult;
import com.offcn.pojo.TbSpecification;
import com.offcn.service.SpecificationService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/specifcation")
public class SpecificationController {

    @Reference
    private SpecificationService specification;

    /**
     *  筛选查询品牌规格
     */
    @RequestMapping("/specPage")
    @ResponseBody
    public PageResult selectpage(@RequestBody TbSpecification tbSpecification, int pageNum, int pageSize){
        return specification.selectSpect(pageNum,pageSize,tbSpecification);
    }
}
