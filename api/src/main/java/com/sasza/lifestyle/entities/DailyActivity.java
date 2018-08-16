package com.sasza.lifestyle.entities;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "DAILY_ACTIVITY")
public class DailyActivity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "DAILY_ACTIVITY_TRAINING", joinColumns = @JoinColumn(name = "daily_activity_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "training_id", referencedColumnName = "id"))
	private Set<Training> trainings;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "DAILY_ACTIVITY_MEAL", joinColumns = @JoinColumn(name = "daily_activity_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "meal_id", referencedColumnName = "id"))
	private Set<Meal> meals;

	@Column(name = "weight", nullable = false)
	private Double weight;

	@Temporal(TemporalType.DATE)
	@Column(name = "date", nullable = false)
	@JsonFormat(pattern = "dd.MM.yyyy")
	private Date date;

	public DailyActivity() {
	}

	public DailyActivity(User user, Set<Training> trainings, Set<Meal> meals, Double weight, Date date) {

		this.user = user;
		this.trainings = trainings;
		this.meals = meals;
		this.weight = weight;
		this.date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Training> getTrainings() {
		return trainings;
	}

	public void setTrainings(Set<Training> trainings) {
		this.trainings = trainings;
	}

	public Set<Meal> getMeals() {
		return meals;
	}

	public void setMeals(Set<Meal> meals) {
		this.meals = meals;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
}
