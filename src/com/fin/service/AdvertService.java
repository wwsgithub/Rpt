package com.fin.service;

import java.util.List;
import java.util.Map;

import com.fin.entity.AdvertModel;

/**
 * 公告通知service
 * @author Administrator
 *
 */
public interface AdvertService {

	/**
	 * 加载全部公告
	 * @return
	 */
	public List<AdvertModel> findAll();
	
	/**
	 * 新增
	 * @param map
	 */
	public void insert(Map<String, String> map);
}
