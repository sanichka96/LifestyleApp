package com.sasza.lifestyle.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "MEAL",
uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
public class Meal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name="name", length = 50, nullable = false)
	private String name;	
	
	@ManyToMany(mappedBy = "meals")
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
