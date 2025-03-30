package com.task.repo;

import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.task.model.User;

import jakarta.validation.Valid;
@Repository
public class UserRepo {

	public User save(@Valid User user) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object findById(UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean existsById(UUID id) {
		// TODO Auto-generated method stub
		return false;
	}

	public void deleteById(UUID id) {
		// TODO Auto-generated method stub
		
	}

}
