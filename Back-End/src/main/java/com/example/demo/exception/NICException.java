package com.example.demo.exception;

import org.springframework.http.HttpStatus;

public class NICException {
	private final String message;
	private final Throwable throwable;

	private final HttpStatus httpStatus;

	public NICException(String message, Throwable throwable, HttpStatus httpStatus) {
		super();
		this.message = message;
		this.throwable = throwable;
		this.httpStatus = httpStatus;
	}

	public String getMessage() {
		return message;
	}

	public Throwable getThrowable() {
		return throwable;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

}
