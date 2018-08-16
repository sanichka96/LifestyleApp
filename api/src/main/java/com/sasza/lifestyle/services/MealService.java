package com.sasza.lifestyle.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.hibernate.exception.ConstraintViolationException;
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
		return mealRepository.findByNameIgnoreCase(name);
	}

	@Override
	public Meal save(Meal meal) {
		Meal foundMeal = mealRepository.findByNameIgnoreCase(meal.getName());
		if (foundMeal == null) {
			return mealRepository.save(meal);
		}
		return foundMeal;
	}

	@Override
	public Set<Meal> findAllByIds(Set<Long> mealIds) {
		List<Meal> meals = (List<Meal>) mealRepository.findAllById(mealIds);
		Set<Meal> mealSet = meals.stream().collect(Collectors.toSet());
		return mealSet;
	}

	@Override
	public void deleteById(Long id) throws ConstraintViolationException {
		if (mealRepository.existsById(id)) {

			mealRepository.deleteById(id);

		} else {
			System.out.println("Brak posiłku o podanym id");
		}
	}
}
