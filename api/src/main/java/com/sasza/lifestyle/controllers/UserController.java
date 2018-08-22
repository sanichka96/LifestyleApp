package com.sasza.lifestyle.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sasza.lifestyle.entities.User;
import com.sasza.lifestyle.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@GetMapping
	public List<User> getAll() {
		return userService.findAll();
	}

	@RequestMapping(value = "/add/{name}/{email}/{basicWeight}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@PostMapping
	public User addUser(@PathVariable("name") String name, @PathVariable("email") String email,
			@PathVariable("basicWeight") Double basicWeight) {

		return userService.save(new User());
	}

	@RequestMapping("/findbyemail/{email}")
	public User findByEmail(@PathVariable("email") String email) {
		return userService.findByEmail(email);
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	@DeleteMapping
	public void deleteById(@PathVariable("id") Long id) {
		userService.deleteById(id);
	}
}
