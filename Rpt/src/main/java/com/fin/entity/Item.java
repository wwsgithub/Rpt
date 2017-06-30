package com.fin.entity;

/**
 * 项目表的实体类
 * @author Administrator
 *
 */
public class Item {

	/**
	 * 主键id
	 */
	private String id;
	/**
	 * 项目编号
	 */
	private String itemno;
	/**
	 * 项目名称
	 */
	private String itemname;
	/**
	 * 所属部门编号
	 */
	private Integer deptno;
	/**
	 * 费用类型：0 变动费用；1 固定费用
	 */
	private String costtype;
	
	public String getCosttype() {
		return costtype;
	}
	public void setCosttype(String costtype) {
		this.costtype = costtype;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getItemno() {
		return itemno;
	}
	public void setItemno(String itemno) {
		this.itemno = itemno;
	}
	public String getItemname() {
		return itemname;
	}
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	public Integer getDeptno() {
		return deptno;
	}
	public void setDeptno(Integer deptno) {
		this.deptno = deptno;
	}
}
