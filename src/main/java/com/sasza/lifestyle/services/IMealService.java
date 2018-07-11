package com.sasza.lifestyle.services;

import java.util.List;

import com.sasza.lifestyle.entities.Meal;

public interface IMealService {

	public List<Meal> findAll();

	public Meal findByName(String name);
	
	public Meal save(Meal meal);
}
