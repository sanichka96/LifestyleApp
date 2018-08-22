package com.sasza.lifestyle.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sasza.lifestyle.entities.User;
import com.sasza.lifestyle.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	public User findById(Long id) {
		Optional<User> users = userRepository.findById(id);
		return users.isPresent() ? users.get() : null;
	}

	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
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

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("USER"));

		return new org.springframework.security.core.userdetails.User(user.getUsername(), 
				user.getPassword(),	authorities);
	}

}
