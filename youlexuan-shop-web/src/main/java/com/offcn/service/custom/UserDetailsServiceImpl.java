package com.offcn.service.custom;

import com.offcn.pojo.TbSeller;
import com.offcn.service.SellerService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class UserDetailsServiceImpl implements UserDetailsService {


    /*
     * 注入服务
     * */
    SellerService sellerService;

    public void setSellerService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    /*
     * 自定义认证
     * */
    @Override
    public UserDetails loadUserByUsername(String sellerId) throws UsernameNotFoundException {
        //sellerId 从表单中输入的账号

        //根据sellerId查询正确的密码，返回一个账号信息
        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
        list.add(new SimpleGrantedAuthority("ROLE_SELLER"));


        //查询sellerId正确的密码
        TbSeller one = sellerService.findOne(sellerId);

        if (one == null) {
            return null;//认证失败
        } else { //status=1 审核通过，可以登录
            if (one.getStatus().equals("1")) {
                String password = one.getPassword();
                return new User(sellerId, password, list);
            } else {
                return null;
            }

        }

    }

  /*  public static void main(String[] args) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        System.out.println(bCryptPasswordEncoder.encode("root"));
    }


/*    public static void main(String[] args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String pwd = "123456";
        String encode = passwordEncoder.encode(pwd);
        System.out.println(encode);
        //$2a$10$qJKWF64EbYmc8BOhZBUnCeLCQWbOjisdfmge4zumkC1BDHQoVmFHe
        //$2a$10$eF97szl.XhrT5PSv7.nrR.YJuTwu/tKYz1urf3MtjAZZXG6WSqCDG
        // pwd + ÑÎ£¨Ëæ»ú×Ö·û´® £©
        //比较
        boolean bol = passwordEncoder.matches(pwd, "$2a$10$eF97szl.XhrT5PSv7.nrR.YJuTwu/tKYz1urf3MtjAZZXG6WSqCDG");
        System.out.println(bol);
    }*/
}