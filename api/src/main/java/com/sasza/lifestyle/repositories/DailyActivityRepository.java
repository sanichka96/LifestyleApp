package com.sasza.lifestyle.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sasza.lifestyle.entities.DailyActivity;

@Repository
public interface DailyActivityRepository extends CrudRepository<DailyActivity, Long> {

	List<DailyActivity> findByDate(Date date);

	DailyActivity findByDateAndUserId(Date date, Long id);
}
