package com.fin.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fin.dao.DeptDAO;
import com.fin.entity.Dept;
import com.fin.service.DeptService;

@Service("deptService")
public class DeptServiceImpl implements DeptService{

	@Autowired
	private DeptDAO deptdao;
	
	public List<Dept> loadAllDepts() {
		return deptdao.findAll();
	}

	public Dept findByDeptno(Dept d) {
		return deptdao.findByDeptno(d);
	}

	public void update(Dept dept) {
		deptdao.update(dept);
	}

	public void insert(Dept dept) {
		deptdao.insert(dept);
	}
	
	public void remove(Dept dept){
		deptdao.remove(dept);
	}
}
