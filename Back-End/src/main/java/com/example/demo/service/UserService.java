package com.example.demo.service;

import java.util.List;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.NICNotFoundException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;

@Service
public class UserService {

	@Autowired
	private UserRepo userRepo;

	public List<User> getAll() {
		return userRepo.findAll();
	}

	public User getUserById(Long id) {
		if(userRepo.findById(id).isEmpty())
			throw new UserNotFoundException("Requested User Not Found");
		return userRepo.findById(id).get();
	}

	public User saveuser(User user) {
	
		String nicNumber = user.getNic();

		// extract the birth year, days, and gender code from the NIC number
		int birthYear = 0;
		int days = 0;
		int genderCode = 0;

		var oldnic= Integer.parseInt( nicNumber.substring(2, 5));
		var newnic = Integer.parseInt( nicNumber.substring(4, 7));

		if (nicNumber.length() == 10 && (oldnic <= 366 || (oldnic >= 501 && oldnic <= 866))) {
		    birthYear = 1900 + Integer.parseInt(nicNumber.substring(0, 2));
		    days = Integer.parseInt(nicNumber.substring(2, 5));
		    genderCode = Integer.parseInt(nicNumber.substring(2, 5));
		} else if (nicNumber.length() == 12 && (newnic <= 366 || (newnic >= 501 && newnic <= 866))) {
		    birthYear = Integer.parseInt(nicNumber.substring(0, 4));
		    days = Integer.parseInt(nicNumber.substring(4, 7));
		    genderCode = Integer.parseInt(nicNumber.substring(4, 7));
		} else {
		    throw new NICNotFoundException("Invalid NIC Number: " + nicNumber);
		}

		// adjust the day value based on the birth year and the type of NIC number
		if (days > 500 && days < 1000) {
		    days -= 500;
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

		return userRepo.save(user);

	}

	public User updateUser(Long id, User user) {
		if(userRepo.findById(id).isEmpty())
			throw new UserNotFoundException("Requested User Not Found");
		User user2 = userRepo.findById(id).get();
		user2.setFull_name(user.getFull_name());
		user2.setAddress(user.getAddress());
		user2.setMobile(user.getMobile());
		user2.setNationality(user.getNationality());
		
		return userRepo.save(user2);
	}

	public void deleteUser(Long id) {
		if(userRepo.findById(id).isEmpty())
			throw new UserNotFoundException("Requested User Not Found");
		userRepo.deleteById(id);
	}
		

}
