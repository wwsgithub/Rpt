package com.fin.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fin.dao.AdvertDAO;
import com.fin.entity.AdvertModel;
import com.fin.service.AdvertService;

/**
 * AdvertService实现类
 * @author Administrator
 *
 */
@Service("advertservice")
public class AdvertServiceImpl implements AdvertService{

	@Autowired
	public AdvertDAO advertdao;
	
	public List<AdvertModel> findAll() {
		return advertdao.findAll();
	}

	public void insert(Map<String, String> map) {
		advertdao.insert(map);
	}
}
