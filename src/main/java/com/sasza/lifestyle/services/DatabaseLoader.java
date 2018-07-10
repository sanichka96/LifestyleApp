package com.sasza.lifestyle.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.sasza.lifestyle.entities.User;
import com.sasza.lifestyle.repositories.UserRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {
	
	private final UserRepository userRepository;
	
	@Autowired
	public DatabaseLoader(UserRepository repository) {
		this.userRepository = repository;
	}

	@Override
	public void run(String... args) throws Exception {
		List<User> users = new ArrayList<>();
		users.add(new User("Sasza", "bla@gmail.com", 64.8, true));
		users.add(new User("Tomek", "blabla@gmail.com", 86.0, true));
		this.userRepository.saveAll(users);
		
	}

}
