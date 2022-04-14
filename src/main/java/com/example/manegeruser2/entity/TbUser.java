package com.example.manegeruser2.entity;

import javax.persistence.Entity;

@Entity
public class TbUser {
	
	public int id;
	public String username;
	public String password;
	public int getId() {
		return id;
	}
	public void setId(int id) {
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
	public TbUser() {
		
	}
	

}
