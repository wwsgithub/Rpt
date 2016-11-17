package com.fin.service;

import java.util.List;

import com.fin.entity.Dept;

/**
 * 部门表service
 * @author Administrator
 *
 */
public interface DeptService {

	/**
	 * 加载所有部门
	 * @return
	 */
	public List<Dept> loadAllDepts();
	
	/**
	 * 根据部门号查找部门信息
	 * @param deptno
	 * @return
	 */
	public Dept findByDeptno(Dept d);
	
	/**
	 * 更新
	 * @param dept
	 */
	public void update(Dept dept);
	
	/**
	 * 新增
	 * @param dept
	 */
	public void insert(Dept dept);
	
	/**
	 * 删除
	 * @param dept
	 */
	public void remove(Dept dept);
}
