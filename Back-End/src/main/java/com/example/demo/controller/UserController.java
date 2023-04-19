package com.example.demo.controller;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.response.ResponseHandler;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("/getUsers")
	// Get All Users
	public List<User> getAllUser() {
		return userService.getAll();
	}

	@GetMapping("/getUser/{id}")
	// Get User by ID
	public User getUserById(@PathVariable Long id) {
		// return ResponseHandler.responseBuilder("Requested user details are here.",
		/// HttpStatus.OK, userService.getUserById(id));
		return userService.getUserById(id);
	}

	@GetMapping("/getUserCustom/{id}")
	// Get User by ID
	public ResponseEntity<Object> getUserByIdCustom(@PathVariable Long id) {
		return ResponseHandler.responseBuilder("Requested user details are here.", HttpStatus.OK,
				userService.getUserById(id));
	}

	@PostMapping("/saveUser")
	// Save User
	public String saveUser(@RequestBody User user) {

		String nicNumber = user.getNic();

		// extract the birth year, days, and gender code from the NIC number
		int birthYear = 0;
		int days = 0;
		int genderCode = 0;
		if (nicNumber.length() == 10) {
			birthYear = 1900 + Integer.parseInt(nicNumber.substring(0, 2));
			days = Integer.parseInt(nicNumber.substring(2, 5));
			genderCode = Integer.parseInt(nicNumber.substring(2,5));
		} else if (nicNumber.length() == 12) {
			birthYear = Integer.parseInt(nicNumber.substring(0, 4));
			days = Integer.parseInt(nicNumber.substring(4, 7));
			genderCode = Integer.parseInt(nicNumber.substring(4,7));
		} else {
			throw new IllegalArgumentException("Invalid NIC number: " + nicNumber);
		}

		// calculate the birth date based on the days code
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyDDD");
		LocalDate birthDate = LocalDate.parse(String.format("%04d%03d", birthYear, days), formatter);

		// calculate the age
		int age = Period.between(birthDate, LocalDate.now()).getYears();

		// determine the gender
		String gender = genderCode > 500 ? "Female" : "Male";

		// set the birthday, age, and gender on the NIC object
		user.setBirthday(birthDate);
		user.setAge(age);
		user.setGender(gender);

		userService.saveuser(user);
		return "User Saved Successfully!";
	}

	@PutMapping("/updateUser/{id}")
	// Update User by ID
	public String updateUser(@PathVariable Long id, @RequestBody User user) {
		userService.updateUser(id, user);
		return "User Updated Successfully!!!";
	}

	@DeleteMapping("/deleteUser/{id}")
	// Delete User by ID
	public String deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return "User Deleted Successfully!!!";
	}

}
