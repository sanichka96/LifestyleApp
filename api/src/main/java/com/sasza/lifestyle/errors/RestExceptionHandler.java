package com.sasza.lifestyle.errors;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.exception.ConstraintViolationException;
import org.postgresql.util.PSQLException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(ConstraintViolationException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody ApiError handleConstraintViolation(final ConstraintViolationException exception,
			final HttpServletRequest request) {
		ApiError error = new ApiError(new Date(), "Nie można tego usunąć!", "Constraint violation exception");
		return error;
	}

	@ExceptionHandler(PSQLException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public @ResponseBody ApiError handlePSQLRxception(final PSQLException exception, final HttpServletRequest request) {
		ApiError error = new ApiError(new Date(), "Nie można tego usunąć!", "PLSQL exception");
		return error;
	}
}
