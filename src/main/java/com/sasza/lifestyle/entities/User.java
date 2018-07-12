package com.sasza.lifestyle.entities;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "C_USER",
uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
public class User {
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="name", length = 50, nullable = false)
	private String name;
	
	@Column(name="email", length = 50, nullable = false)
	private String email;
	
	@Column(name="basic_weight", nullable = false)
	private Double basicWeight;
	
	@Column(name="email_sent")
	private Boolean emailSent;
			
	public User() {}
	
	public User(String name, String email, Double basicWeight, Boolean emailSent) {		
		this.name = name;
		this.email = email;
		this.basicWeight = basicWeight;
		this.emailSent = emailSent;
	}
	
	public User(String name, String email, Double basicWeight) {		
		this.name = name;
		this.email = email;
		this.basicWeight = basicWeight;		
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
	
}
