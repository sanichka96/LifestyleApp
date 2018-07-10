package com.sasza.lifestyle.entities;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class User {
	
	private @Id @GeneratedValue Long id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="email")
	private String email;
	
	@Column(name="basic_weight")
	private Double basicWeight;
	
	@Column(name="email_sent")
	private Boolean emailSent;
	
	@ManyToMany(targetEntity=DailyActivity.class)
	@JoinTable(name="DAILY_ACTIVITIES", 
	joinColumns=@JoinColumn(name="user_id", referencedColumnName="id"))
	private Set<DailyActivity> dailyActivities;
		
	public User() {}
	
	public User(String name, String email, Double basicWeight, Boolean emailSent) {		
		this.name = name;
		this.email = email;
		this.basicWeight = basicWeight;
		this.emailSent = emailSent;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Double getBasicWeight() {
		return basicWeight;
	}

	public void setBasicWeight(Double basicWeight) {
		this.basicWeight = basicWeight;
	}

	public Boolean getEmailSent() {
		return emailSent;
	}

	public void setEmailSent(Boolean emailSent) {
		this.emailSent = emailSent;
	}
	
	public Set<DailyActivity> getDailyActivities() {
		return dailyActivities;
	}

	public void setDailyActivities(Set<DailyActivity> dailyActivities) {
		this.dailyActivities = dailyActivities;
	}
}
