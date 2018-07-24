package com.sasza.lifestyle.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import com.sasza.lifestyle.entities.DailyActivity;
import com.sasza.lifestyle.entities.Meal;
import com.sasza.lifestyle.entities.Training;
import com.sasza.lifestyle.entities.User;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
    @Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Meal.class);
        config.exposeIdsFor(Training.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(DailyActivity.class);
    }
}
