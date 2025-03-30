package com.task.crud.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.crud.model.User;
import com.task.crud.repository.UserRepo;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class HomeController {
	@Autowired
	UserRepo usr;
	
	@GetMapping("/read")
	public List<User> getUser() {
	    return usr.findAll();
	}

	@PostMapping("/create")
	public ResponseEntity<User> createUser (@Valid @RequestBody User user)
	{
		usr.save(user);
		return ResponseEntity.ok(usr.save(user));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<User> updateUser(@PathVariable int id, @Valid @RequestBody User user) {
        Optional<User> existingUser = usr.findById(id);
        if (existingUser.isPresent()) {
            User us = existingUser.get();
            us.setU_name(user.getU_name());
            us.setU_email(user.getU_email());
            us.setAge(user.getAge());
            return ResponseEntity.ok(usr.save(us));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable int id) {
        Optional<User> existingUser = usr.findById(id);
        if (existingUser.isPresent()) {
            usr.delete(existingUser.get());
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
}