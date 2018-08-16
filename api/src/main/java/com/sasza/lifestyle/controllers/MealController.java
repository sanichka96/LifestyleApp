package com.sasza.lifestyle.controllers;

import java.util.List;

import org.hibernate.exception.ConstraintViolationException;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sasza.lifestyle.entities.Meal;
import com.sasza.lifestyle.services.MealService;

@RestController
@RequestMapping("/meals")
public class MealController {

	@Autowired
	MealService mealService;

	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@GetMapping
	public List<Meal> findAll(Model model) {
		return mealService.findAll();
	}

	@RequestMapping(value = "/add/{name}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@PostMapping
	public Meal addMeal(@PathVariable("name") String name) {
		Meal meal = new Meal(name);
		return mealService.save(meal);
	}

	@RequestMapping("/findbyname/{name}")
	public Meal findById(@PathVariable("name") String name) {
		return mealService.findByName(name);
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	@DeleteMapping
	public void deleteById(@PathVariable("id") Long id) throws ConstraintViolationException, PSQLException {
		mealService.deleteById(id);
	}
}
