package com.example.manegeruser2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.manegeruser2.entity.TbUser;

public interface LoginRepository extends JpaRepository<TbUser, String> {

	@Query("SELECT password TABLE username WHERE username = ?1")
	public String GetUser(String ussername);

}
