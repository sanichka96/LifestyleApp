package com.sasza.lifestyle.errors;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

class ApiError {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy hh:mm:ss")
	private Date date;
	private String message;
	private String details;

	public ApiError(Date date, String message, String details) {
		this.date = date;
		this.message = message;
		this.details = details;
	}
	
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}
}