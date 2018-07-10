package com.sasza.lifestyle.repositories;

import org.springframework.data.repository.CrudRepository;

import com.sasza.lifestyle.entities.Meal;

public interface MealRepository extends CrudRepository<Meal, Long> {
	
	Meal findByName(String name);		

}
