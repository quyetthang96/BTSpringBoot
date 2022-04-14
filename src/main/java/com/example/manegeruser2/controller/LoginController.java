package com.example.manegeruser2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
	
	@GetMapping({ "/demo", "/" })
	public String displayDemo(Model model) {
		return "Login";
	}
	
}
