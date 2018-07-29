package com.sasza.lifestyle.controllers;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

	@RequestMapping(value = "/add", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@PostMapping
	public DailyActivity addDailyActivity(@RequestBody DailyActivity activity) {

		User user = userService.findById(activity.getUser().getId());
		Set<Training> trainingsSet = trainingService
				.findByIds(activity.getTrainings().stream().mapToLong(train -> train.getId()).boxed().collect(Collectors.toSet()));
		Set<Meal> mealsSet = mealService.findAllByIds(
				activity.getMeals().stream().mapToLong(meal -> meal.getId()).boxed().collect(Collectors.toSet()));
		//Date formattedDate = StringParseHelper.parseDate(activity.getDate().toString());
		DailyActivity dailyActivity = null;
		if (dailyActivityService.findByDateAndUserId(activity.getDate(), activity.getUser().getId()).isEmpty()) {
			dailyActivity = new DailyActivity(user, trainingsSet, mealsSet, activity.getWeight(), activity.getDate());
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
