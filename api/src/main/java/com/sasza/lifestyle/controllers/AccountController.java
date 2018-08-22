package com.sasza.lifestyle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sasza.lifestyle.security.LoginForm;
import com.sasza.lifestyle.services.UserService;

@RestController
public class AccountController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@PostMapping
	public boolean login(@RequestBody LoginForm loginForm) {
		return userService.findByUsername(loginForm.getUsername()) != null ? true : false;
	}

}
