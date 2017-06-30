package com.fin.entity;

import java.sql.Date;

/**
 * 公告通知model
 * @author Administrator
 *
 */
public class AdvertModel {

	/**
	 * 自增长的id
	 */
	private Integer id;
	/**
	 * 公告标题
	 */
	private String title;
	/**
	 * 公告内容
	 */
	private String content;
	/**
	 * 发布时间
	 */
	private Date starttime;
	/**
	 * 是否置顶
	 */
	private String istop;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getStarttime() {
		return starttime;
	}
	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}
	public String getIstop() {
		return istop;
	}
	public void setIstop(String istop) {
		this.istop = istop;
	}
	
}
