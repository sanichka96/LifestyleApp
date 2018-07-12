package com.sasza.lifestyle.services;

import java.util.List;
import java.util.Set;

import com.sasza.lifestyle.entities.Meal;

public interface IMealService {

	public List<Meal> findAll();

	public Meal findByName(String name);
	
	public Meal save(Meal meal);
	
	public Set<Meal> findAllByIds(Set<Long> ids);
	
	public void deleteById(Long id);
}
