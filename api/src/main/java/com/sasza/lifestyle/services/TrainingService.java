package com.sasza.lifestyle.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sasza.lifestyle.entities.Training;
import com.sasza.lifestyle.repositories.TrainingRepository;

@Service
public class TrainingService {
	
	@Autowired
	private TrainingRepository trainingRepository;
	
	public List<Training> findAll() {
		return (List<Training>) trainingRepository.findAll();
	}
	
	public Training findByName(String name) {
		return trainingRepository.findByNameIgnoreCase(name);
	}

	public Training save(Training training) {	
		Training foundTraining = trainingRepository.findByNameIgnoreCase(training.getName());
		if(foundTraining == null) {
			return trainingRepository.save(training);
		}
		return foundTraining;		
	}
	
	public Set<Training> findByIds(Set<Long> trainingIds) {
		List<Training> trainings = (List<Training>) trainingRepository.findAllById(trainingIds);
		Set<Training> trainingSet = trainings.stream().collect(Collectors.toSet());
		return trainingSet;
	}
	
	public void deleteById(Long id) {
		if (trainingRepository.existsById(id)) {
			trainingRepository.deleteById(id);
		} 
		else {
			System.out.println("Brak posiłku o podanym id");
		}		
	}
}
