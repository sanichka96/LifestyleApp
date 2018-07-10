package com.sasza.lifestyle.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sasza.lifestyle.entities.Meal;
import com.sasza.lifestyle.repositories.MealRepository;

@Service
public class MealService implements IMealService {

	@Autowired
	private MealRepository mealRepository;

	@Override
	public List<Meal> findAll() {
		return (List<Meal>) mealRepository.findAll();
	}

	@Override
	public Meal findByName(String name) {
		return mealRepository.findByName(name);
	}

}
