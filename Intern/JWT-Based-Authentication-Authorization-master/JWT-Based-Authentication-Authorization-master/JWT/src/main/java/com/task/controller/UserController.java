package com.task.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.model.User;
import com.task.service.UserService;

@RestController
@RequestMapping("/home")
public class UserController {

		@Autowired 
		private UserService usr;
		
		@GetMapping("/user")
		public List<User> getUser()
		{
			System.out.println("getting Users");
			return this.usr.getUser();
			
		}
		@GetMapping("/current-user")
		public String getCurrentLoggedInUser(Principal pricipal)
		{
			return pricipal.getName();
			
		}
		
	}
