package com.example.demo.exception;

public class NICNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public NICNotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public NICNotFoundException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

}
