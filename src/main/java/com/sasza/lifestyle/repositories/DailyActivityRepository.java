package com.sasza.lifestyle.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.sasza.lifestyle.entities.DailyActivity;

public interface DailyActivityRepository extends CrudRepository<DailyActivity, Long> {

	List<DailyActivity> findByDate(Date date);
}
