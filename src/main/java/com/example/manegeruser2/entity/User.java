package com.example.manegeruser2.entity;

import javax.persistence.Entity;

import lombok.Data;

@Data
@Entity
public class User {
	
	public int id;
	public String username;
	public String password;
}
