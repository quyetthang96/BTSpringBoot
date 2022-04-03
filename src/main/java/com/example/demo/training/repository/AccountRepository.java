package com.example.demo.training.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.training.entity.AccountEntity;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, String> {
	
	@Query("From AccountEntity accountEntity Where accountEntity.userName =:name and accountEntity.encrytedPassword=:pass")
	Optional<AccountEntity> getAccountByUserNameAndPass(String name , String pass);
}
