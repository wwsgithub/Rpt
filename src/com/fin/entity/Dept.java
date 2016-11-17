package com.fin.entity;

/**
 * 部门表entity
 * @author Administrator
 *
 */
public class Dept {

	/**
	 * 主键id
	 */
	private String id;
	/**
	 * 部门编号
	 */
	private String deptno;
	/**
	 * 部门名称
	 */
	private String deptname;
	/**
	 * 责任人名称
	 */
	private String empname;
	
	public String getEmpname() {
		return empname;
	}
	public void setEmpname(String empname) {
		this.empname = empname;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDeptno() {
		return deptno;
	}
	public void setDeptno(String deptno) {
		this.deptno = deptno;
	}
	public String getDeptname() {
		return deptname;
	}
	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}
	
}
