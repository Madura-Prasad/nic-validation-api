package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class NICExceptionHandler {
	@ExceptionHandler(value = { NICNotFoundException.class })
	public ResponseEntity<Object> handleNICNotFoundException(NICNotFoundException nicNotFoundException) {
		NICException nicException = new NICException(nicNotFoundException.getMessage(),
				nicNotFoundException.getCause(), HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(nicException, HttpStatus.NOT_FOUND);
	}
}
