package com.sasza.lifestyle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sasza.lifestyle.entities.User;
import com.sasza.lifestyle.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping("/add/{name}/{email}/{basicWeight}")
	public User addUser(@PathVariable("name") String name, @PathVariable("email") String email,
			@PathVariable("basicWeight") Double basicWeight) {

		return userService.save(new User(name, email, basicWeight));
	}

	@RequestMapping("/findbyemail/{email}")
	public User findByEmail(@PathVariable("email") String email) {
		return userService.findByEmail(email);
	}

	@RequestMapping("/delete/{id}")
	public void deleteById(@PathVariable("id") Long id) {
		userService.deleteById(id);
	}
}
