package com.task.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity

public class User {
	@Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long u_id;
	@NotBlank(message = "Name is required")
	private String u_name;
	@NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
	private String U_email;
	private String U_age;
	public long getU_id() {
		return u_id;
	}
	public void setU_id(int u_id) {
		this.u_id = u_id;
	}
	public String getU_name() {
		return u_name;
	}
	public void setU_name(String u_name) {
		this.u_name = u_name;
	}
	public String getU_email() {
		return U_email;
	}
	public void setU_email(String u_email) {
		U_email = u_email;
	}
	public String getAge() {
		return U_age;
	}
	public void setAge(String u_age) {
		this.U_age = u_age;
	}
	
	
}