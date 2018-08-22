package com.sasza.lifestyle.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "C_USER", uniqueConstraints = { @UniqueConstraint(columnNames = { "email", "username" }) })
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "username", length = 50, nullable = false)
	@JsonIgnore
	private String username;
	
	@Column(name = "password", length = 100, nullable = false)
	@JsonIgnore
	private String password;

	@Column(name = "role", length = 50, nullable = false)
	private String role;

	@Column(name = "email", length = 50, nullable = false)
	private String email;

	@Column(name = "basic_weight", nullable = false)
	private Double basicWeight;

	@Column(name = "email_sent")
	private Boolean emailSent;

	public User() {
	}

	public User(String username, String password, String role, String email, Double basicWeight, Boolean emailSent) {
		this.username = username;
		this.password = password;
		this.role = role;
		this.email = email;
		this.basicWeight = basicWeight;
		this.emailSent = emailSent;
	}

	public User(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
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
