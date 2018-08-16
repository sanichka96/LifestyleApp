package com.sasza.lifestyle.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sasza.lifestyle.entities.User;
import com.sasza.lifestyle.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User findById(Long id) {
		Optional<User> users = userRepository.findById(id);
		return users.isPresent() ? users.get() : null;
	}

	public User save(User user) {
		User foundUser = userRepository.findByEmail(user.getEmail());
		if (foundUser == null) {
			return userRepository.save(user);
		}
		return foundUser;
	}

	public void deleteById(Long id) {
		if (userRepository.existsById(id)) {
			userRepository.deleteById(id);
		} else {
			System.out.println("Brak użytkownika o podanym id");
		}		
	}

	public List<User> findAll() {
		return (List<User>) userRepository.findAll();
	}
	
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
}
