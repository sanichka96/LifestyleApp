package com.sasza.lifestyle.controllers;

import java.util.List;

import org.hibernate.exception.ConstraintViolationException;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sasza.lifestyle.entities.Training;
import com.sasza.lifestyle.services.TrainingService;

@RestController
@RequestMapping("/trainings")
public class TrainingController {

	@Autowired
	TrainingService trainingService;

	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@GetMapping
	public List<Training> getAll() {
		return trainingService.findAll();
	}

	@RequestMapping(value = "/add/{name}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@PostMapping
	public Training addTraining(@PathVariable("name") String name) {
		Training meal = new Training(name);
		return trainingService.save(meal);
	}

	@RequestMapping("/findbyname/{name}")
	public Training findById(@PathVariable("name") String name) {
		return trainingService.findByName(name);
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	@DeleteMapping
	public void deleteById(@PathVariable("id") Long id) throws ConstraintViolationException, PSQLException {
		System.out.println(id);
		trainingService.deleteById(id);
	}
}
