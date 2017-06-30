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
	
	public List<DataDetailModel> queryByMonth(Map<String, String> map) {
		return datadetaildao.queryByMonth(map);
	}

	public List<DataDetailModel> queryByDeptnoAndMonth(Map<String, String> map) {
		return datadetaildao.getByDeptnoAndMonth(map);
	}

	public List<DataDetailModel> queryByYear(Map<String, String> map) {
		return datadetaildao.queryByYear(map);
	}

	public List<DataDetailModel> queryByDeptnoAndDate(Map<String, String> map) {
		return datadetaildao.getByDeptnoAndDate(map);
	}

	public DataDetailModel findByItemnoAndDate(DataDetailModel data) {
		return datadetaildao.getByItemnoAndDate(data);
	}

	public void save(DataDetailModel model) {
		datadetaildao.insert(model);
	}

	public void update(DataDetailModel model) {
		datadetaildao.update(model);
	}
}
