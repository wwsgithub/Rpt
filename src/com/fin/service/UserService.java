package com.fin.service;

import java.util.Map;

import com.fin.entity.DataResult;

/**
 * 用户service接口
 * @author Administrator
 *
 */
public interface UserService {

	/**
	 * 检查登录方法
	 * @param username
	 * @param password
	 * @return
	 */
	public DataResult checkLogin(String username,String password);
	
	/**
	 * 修改密码
	 * @param map
	 */
	public void modifyPwd(Map<String, String> map);
}
