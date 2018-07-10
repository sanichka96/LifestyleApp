package com.sasza.lifestyle.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sasza.lifestyle.entities.Meal;
import com.sasza.lifestyle.repositories.MealRepository;

@RestController
public class MealController {

	@Autowired
	MealRepository mealRepository;
	
	@RequestMapping("/save")
	public String saveMeals() {
		List<Meal> meals = Arrays.asList(new Meal[] {new Meal("jablko"), new Meal("precel"), new Meal("salatka")});
		mealRepository.saveAll(meals);
		
		return "Success";
	}
	
	@RequestMapping("/findAll")
	public String findAll() {
		String result = "";
		
		for(Meal meal : mealRepository.findAll()){
			result += "Id: " + meal.getId() + ", nazwa: " + meal.getName() + "<br>";
		}
		
		return result;
	}
	
	@RequestMapping("/findbyid")
	public Meal findById(@RequestParam("id") Long id) {		
		return mealRepository.findById(id).orElse(null);
	}
	
	@RequestMapping("/findbyname")
	public Meal findById(@RequestParam("name") String name) {		
		return mealRepository.findByName(name);
	}
}
