package com.sasza.lifestyle.repositories;

import org.springframework.data.repository.CrudRepository;

import com.sasza.lifestyle.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {	
	
}
