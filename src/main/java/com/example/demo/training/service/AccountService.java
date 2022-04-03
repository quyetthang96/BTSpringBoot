package com.example.demo.training.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.training.entity.AccountEntity;
import com.example.demo.training.repository.AccountRepository;


@Service
public class AccountService {
	@Autowired
	AccountRepository repository;

	public AccountEntity getAccount(String username, String pass) {
		AccountEntity result = repository.getAccountByUserNameAndPass(username, pass).orElse(null);
	 return result;
 }
}
