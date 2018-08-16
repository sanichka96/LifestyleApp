package com.sasza.lifestyle.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sasza.lifestyle.entities.DailyActivity;
import com.sasza.lifestyle.repositories.DailyActivityRepository;

@Service
public class DailyActivityService {

	@Autowired
	private DailyActivityRepository dailyActivityRepository;

	public List<DailyActivity> findByDate(Date date) {
		return dailyActivityRepository.findByDate(date);
	}

	public DailyActivity findByDateAndUserId(Date date, Long id) {
		return dailyActivityRepository.findByDateAndUserId(date, id);
	}

	public DailyActivity save(DailyActivity dailyActivity) {
		return dailyActivityRepository.save(dailyActivity);
	}

	public List<DailyActivity> findAll() {
		return (List<DailyActivity>) dailyActivityRepository.findAll();
	}

	public void deleteById(Long id) {
		if (dailyActivityRepository.existsById(id)) {
			dailyActivityRepository.deleteById(id);
		} else {
			System.out.println("Brak aktywności o podanym id");
		}
	}
}
