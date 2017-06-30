package com.fin.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fin.dao.UserDAO;
import com.fin.entity.DataResult;
import com.fin.entity.User;
import com.fin.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{

	@Resource
	private UserDAO userdao;
	
	public DataResult checkLogin(String username, String password) {
		User user = userdao.findByUsername(username);
		DataResult result = new DataResult();
		if(user == null){
			result.setStatus(2);
			result.setMsg("用户不存在");
			return result;
		}
		if(!user.getPassword().equals(password)){
			result.setStatus(1);
			result.setMsg("密码不正确");
			return result;
		}
		result.setStatus(0);
		result.setMsg("登录成功");
		result.setData(user);
		return result;
	}

	public void modifyPwd(Map<String, String> map) {
		userdao.update(map);
	}
}
