package com.sasza.lifestyle.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sasza.lifestyle.entities.Meal;

@Repository
public interface MealRepository extends CrudRepository<Meal, Long> {
	
	Meal findByNameIgnoreCase(String name);
}
