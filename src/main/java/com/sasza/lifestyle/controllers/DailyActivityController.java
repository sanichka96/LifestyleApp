package com.sasza.lifestyle.controllers;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sasza.lifestyle.entities.DailyActivity;
import com.sasza.lifestyle.entities.Meal;
import com.sasza.lifestyle.entities.Training;
import com.sasza.lifestyle.entities.User;
import com.sasza.lifestyle.helpers.StringParseHelper;
import com.sasza.lifestyle.services.DailyActivityService;
import com.sasza.lifestyle.services.MealService;
import com.sasza.lifestyle.services.TrainingService;
import com.sasza.lifestyle.services.UserService;

@RestController
@RequestMapping("/dailyActivities")
public class DailyActivityController {

	@Autowired
	private DailyActivityService dailyActivityService;
	@Autowired
	private UserService userService;
	@Autowired
	private MealService mealService;
	@Autowired
	private TrainingService trainingService;

	@RequestMapping("/add/{userId}/{trainingIds}/{mealIds}/{weight}/{date}")
	public DailyActivity addDailyActivity(@PathVariable("userId") Long userId,
			@PathVariable("trainingIds") Set<Long> trainingIds, @PathVariable("mealIds") Set<Long> mealIds,
			@PathVariable("weight") Double weight, @PathVariable("date") String date) {

		User user = userService.findById(userId);
		Set<Training> trainingsSet = trainingService.findByIds(trainingIds);
		Set<Meal> mealsSet = mealService.findAllByIds(mealIds);
		Date formattedDate = StringParseHelper.parseDate(date);
		DailyActivity dailyActivity = null;
		if (dailyActivityService.findByDateAndUserId(formattedDate, userId).isEmpty()) {
			dailyActivity = new DailyActivity(user, trainingsSet, mealsSet, weight, formattedDate);
			return dailyActivityService.save(dailyActivity);
		}
		return null;		
	}

	@RequestMapping("/findbydate/{date}")
	public List<DailyActivity> findById(@PathVariable("date") String date) {
		Date formattedDate = StringParseHelper.parseDate(date);
		return dailyActivityService.findByDate(formattedDate);
	}

}
