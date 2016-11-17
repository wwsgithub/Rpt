package com.fin.dao;

import java.util.Map;

import com.fin.entity.User;

/**
 * 用来与数据库交互的DAO
 * @author Administrator
 *
 */
public interface UserDAO {

	/**
	 * 通过用户名查找用户
	 * @param username
	 * @return
	 */
	public User findByUsername(String username);
	
	/**
	 * 更新
	 * @param map
	 */
	public void update(Map<String, String> map);
}
