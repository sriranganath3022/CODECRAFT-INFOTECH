package com.task.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.task.model.User;
@Service
public class UserService {

private List<User> li=new ArrayList<>();
	
	public UserService ()
	{
		li.add(new User(UUID.randomUUID().toString(),"Harshad Sirpurkar", "harshad@gmail.com"));
		li.add(new User(UUID.randomUUID().toString(),"Rohit Sirpurkar", "rohit@gmail.com"));
		li.add(new User(UUID.randomUUID().toString(),"Aditya Pawar", "aditya@gmail.com"));

}
	
	public List<User> getUser()
	{
		return this.li;
		
	}
}
