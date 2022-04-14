package com.example.manegeruser2.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.manegeruser2.entity.TbUser;

@Service
public class LoginService {
	@Autowired
	TbUser tbUser = new TbUser();

	public String GetUserByUserName(String username) {
		
		Optional<TbUser> optional = tbUser.
	}

}
