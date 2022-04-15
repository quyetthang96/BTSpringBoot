package com.example.manegeruser2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.manegeruser2.entity.User;

public interface LoginRepository extends JpaRepository<User, String> {

	@Query("SELECT password FROM username WHERE username = ?1")
	public String getUser(String username);

}
