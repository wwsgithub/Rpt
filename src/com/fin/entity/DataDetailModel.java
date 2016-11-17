package com.fin.entity;

import java.sql.Date;

/**
 * datadetail
 * @author Administrator
 *
 */
public class DataDetailModel {

	/**
	 * 自增长的Id
	 */
	private Integer id;
	/**
	 * 对应的项目编号
	 */
	private Integer itemno;
	/**
	 * 所属部门编号
	 */
	private Integer deptno;
	/**
	 * 预算值
	 */
	private Double budget;
	/**
	 * 财务凭证
	 */
	private Double finance_refer;
	/**
	 * 人工凭证
	 */
	private Double personal_refer;
	/**
	 * 记录日期
	 */
	private Date recordtime;
	/**
	 * 日期字符串
	 */
	private String recordtimestring;
	
	/**
	 * 部门名称
	 */
	private String deptname;
	/**
	 * 负责人名称
	 */
	private String empname;
	/**
	 * 项目名称
	 */
	private String itemname;
	
	
	public String getRecordtimestring() {
		return recordtimestring;
	}
	public void setRecordtimestring(String recordtimestring) {
		this.recordtimestring = recordtimestring;
	}
	public String getItemname() {
		return itemname;
	}
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	public String getDeptname() {
		return deptname;
	}
	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}
	public String getEmpname() {
		return empname;
	}
	public void setEmpname(String empname) {
		this.empname = empname;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getItemno() {
		return itemno;
	}
	public void setItemno(Integer itemno) {
		this.itemno = itemno;
	}
	public Integer getDeptno() {
		return deptno;
	}
	public void setDeptno(Integer deptno) {
		this.deptno = deptno;
	}
	public Double getBudget() {
		return budget;
	}
	public void setBudget(Double budget) {
		this.budget = budget;
	}
	public Double getFinance_refer() {
		return finance_refer;
	}
	public void setFinance_refer(Double finance_refer) {
		this.finance_refer = finance_refer;
	}
	public Double getPersonal_refer() {
		return personal_refer;
	}
	public void setPersonal_refer(Double personal_refer) {
		this.personal_refer = personal_refer;
	}
	public Date getRecordtime() {
		return recordtime;
	}
	public void setRecordtime(Date recordtime) {
		this.recordtime = recordtime;
	}
	@Override
	public String toString() {
		return "DataDetailModel [id=" + id + ", itemno=" + itemno + ", deptno="
				+ deptno + ", budget=" + budget + ", finance_refer="
				+ finance_refer + ", personal_refer=" + personal_refer
				+ ", recordtime=" + recordtime + ", recordtimestring="
				+ recordtimestring + ", deptname=" + deptname + ", empname="
				+ empname + ", itemname=" + itemname + "]";
	}
}
