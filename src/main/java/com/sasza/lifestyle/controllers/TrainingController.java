package com.sasza.lifestyle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sasza.lifestyle.entities.Training;
import com.sasza.lifestyle.services.TrainingService;

@RestController
@RequestMapping("/trainings")
public class TrainingController {

	@Autowired
	TrainingService trainingService;

	@RequestMapping("/add/{name}")
	public Training addTraining(@PathVariable("name") String name) {
		Training meal = new Training(name);
		return trainingService.save(meal);
	}

	@RequestMapping("/findbyname/{name}")
	public Training findById(@PathVariable("name") String name) {
		return trainingService.findByName(name);
	}

	@RequestMapping("/delete/{id}")
	public void findById(@PathVariable("id") Long id) {
		trainingService.deleteById(id);
		;
	}
}
