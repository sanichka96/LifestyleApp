package com.sasza.lifestyle.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sasza.lifestyle.entities.Training;

@Repository
public interface TrainingRepository extends CrudRepository<Training, Long> {
	
	Training findByNameIgnoreCase(String name);
}
