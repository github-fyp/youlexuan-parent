package com.offcn.controller;

import com.offcn.entity.Result;
import com.offcn.util.FastDFSClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class Upload {

    //图片上传
    @RequestMapping("/upload")
    @ResponseBody
    public Result uploadFile(MultipartFile file) {

        String originalFilename = file.getOriginalFilename();
        String substring = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);

        try {
            //2、创建一个 FastDFS 的客户端
            FastDFSClient fastDFSClient = new FastDFSClient("classpath:config/fdfs_client.conf");
            //3、执行上传处理
            String path = fastDFSClient.uploadFile(file.getBytes(), substring);
            //4、拼接返回的 url 和 ip 地址，拼装成完整的 url
            String url = "http://192.168.188.146/" + path;
            return new Result(true, url);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "上传失败");
        }
    }
}
