package com.example.demo.training.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.training.entity.AccountEntity;
import com.example.demo.training.service.AccountService;

@Controller
public class LoginController {
	@Autowired
	AccountService accountService;

	@GetMapping({ "/demo", "/" })
	public String displayDemo(Model model) {
		return "login";
	}

	@PostMapping({ "/" })
	public String LoginPost(@RequestParam(name = "uname") String userName, @RequestParam(name = "psw") String pass) {
		
		AccountEntity accountEntity = accountService.getAccount(userName, pass);
		if (accountEntity != null) {
			return "demo";
		} else {
			return "login";
		}
	}

}
