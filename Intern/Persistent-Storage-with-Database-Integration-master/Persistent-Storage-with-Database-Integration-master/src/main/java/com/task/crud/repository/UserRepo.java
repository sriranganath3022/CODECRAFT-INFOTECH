package com.task.crud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.crud.model.User;

public interface UserRepo extends JpaRepository<User, Integer>{

	List<User> findAll();


}
