package com.sasza.lifestyle.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Meal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name="name")
	private String name;	
	
	@ManyToMany(targetEntity=DailyActivity.class)
	@JoinTable(name="DAILY_ACTIVITIES", 
	joinColumns=@JoinColumn(name="meal_id", referencedColumnName="id"))
	private Set<DailyActivity> dailyActivities;
	
	public Meal() {}
	
 	public Meal(String name) {		
		this.name = name;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Set<DailyActivity> getDailyActivities() {
		return dailyActivities;
	}

	public void setDailyActivities(Set<DailyActivity> dailyActivities) {
		this.dailyActivities = dailyActivities;
	}
}
