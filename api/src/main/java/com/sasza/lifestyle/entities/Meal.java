package com.sasza.lifestyle.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	
	public Meal() {}
	
 	public Meal(String name) {		
		this.name = name;
	}
 	
 	public Meal(Long id) {		
		this.id = id;
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
}
