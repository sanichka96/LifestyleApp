package com.sasza.lifestyle.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sasza.lifestyle.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {	
	
	User findByEmail(String email);
	
	User findByUsername(String username);
	
}
