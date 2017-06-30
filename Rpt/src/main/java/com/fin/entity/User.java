package com.fin.entity;

/**
 * 用户（负责人）实体类
 * @author Administrator
 *
 */
public class User {

	/**
	 * 主键id
	 */
	private String id;
	/**
	 * 员工编号-唯一
	 */
	private String empno;
	/**
	 * 帐号
	 */
	private String username;
	/**
	 * 密码
	 */
	private String password;
	/**
	 * 责任人名字
	 */
	private String name;
	/**
	 * 责任人负责的部门编号
	 */
	private String departmentno;
	/**
	 * 管理员：1
	 * 责任人：0
	 */
	private String role;
	
	public String getEmpno() {
		return empno;
	}
	public void setEmpno(String empno) {
		this.empno = empno;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDepartmentno() {
		return departmentno;
	}
	public void setDepartmentno(String departmentno) {
		this.departmentno = departmentno;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
}
