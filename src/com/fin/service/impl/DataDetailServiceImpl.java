package com.fin.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fin.dao.DataDetailDAO;
import com.fin.entity.DataDetailModel;
import com.fin.service.DataDetailService;

/**
 * datadetailservice实现类
 * @author Administrator
 *
 */
@Service("dataDetailService")
public class DataDetailServiceImpl implements DataDetailService{

	@Autowired
	private DataDetailDAO datadetaildao;
	
	@Override
	public List<DataDetailModel> queryByMonth(Map<String, String> map) {
		return datadetaildao.queryByMonth(map);
	}

	@Override
	public List<DataDetailModel> queryByDeptnoAndMonth(Map<String, String> map) {
		return datadetaildao.getByDeptnoAndMonth(map);
	}

	@Override
	public List<DataDetailModel> queryByYear(Map<String, String> map) {
		return datadetaildao.queryByYear(map);
	}

	@Override
	public List<DataDetailModel> queryByDeptnoAndDate(Map<String, String> map) {
		return datadetaildao.getByDeptnoAndDate(map);
	}

	@Override
	public DataDetailModel findByItemnoAndDate(DataDetailModel data) {
		return datadetaildao.getByItemnoAndDate(data);
	}

	@Override
	public void save(DataDetailModel model) {
		datadetaildao.insert(model);
	}

	@Override
	public void update(DataDetailModel model) {
		datadetaildao.update(model);
	}
}
