package com.offcn.shop.controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/login")
public class LoginController {

    @Resource
    RedisTemplate redisTemplate;

    @RequestMapping("/name")
    public Map getName(){
        String sellerId = SecurityContextHolder.getContext().getAuthentication().getName();
        Map map = new HashMap();
        map.put("sellerId",sellerId);

        //显示当前登录时间

        Object logintime = redisTemplate.boundHashOps("hashlogintime").get(sellerId);
        if(logintime==null){
            Date date = new Date();
            SimpleDateFormat fo = new SimpleDateFormat("HH:mm:ss");
            String time = fo.format(date);
            map.put("logintime",time);
            redisTemplate.boundHashOps("hashlogintime").put(sellerId,time);
        }else{
            Date date = new Date();
            SimpleDateFormat fo = new SimpleDateFormat("HH:mm:ss");
            String time = fo.format(date);
            redisTemplate.boundHashOps("hashlogintime").put(sellerId,time);
            map.put("logintime",logintime);
        }
        return map;
    }
}
