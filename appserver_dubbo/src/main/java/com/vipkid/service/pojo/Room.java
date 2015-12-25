package com.vipkid.service.pojo;

import java.io.Serializable;

public class Room implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String url;

	public Room(){};
	
	public Room(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
}
