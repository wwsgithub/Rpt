package com.fin.dao;

import java.util.List;
import java.util.Map;

import com.fin.entity.AdvertModel;

/**
 * 公告通知DAO
 * @author Administrator
 *
 */
public interface AdvertDAO {

	/**
	 * 查询所有公告通知
	 * @return
	 */
	public List<AdvertModel> findAll();
	
	/**
	 * 插入
	 * @param map
	 */
	public void insert(Map<String, String> map);
}
