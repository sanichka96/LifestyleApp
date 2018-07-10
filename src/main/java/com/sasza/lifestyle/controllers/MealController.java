package com.sasza.lifestyle.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sasza.lifestyle.entities.Meal;
import com.sasza.lifestyle.services.MealService;

@RestController
@RequestMapping("/api/meals")
public class MealController {

	@Autowired
	MealService mealService;
	
	@RequestMapping("/findall")
	public String findAll(Model model) {
		List<Meal> meals = mealService.findAll();
		model.addAttribute("meals", meals);

		return "show meals";
	}

	@RequestMapping("/findbyname/{name}")
	public Meal findById(@PathVariable("name") String name) {
		return mealService.findByName(name);
	}
}
