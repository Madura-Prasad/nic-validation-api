package com.example.demo.service;

import java.util.List;


import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;

@Service
public class UserService {

	@Autowired
	private UserRepo userRepo;
	
	
	public List<User> getAll(){
		return userRepo.findAll();
	}
	
	public User getUserById(Long id) {
		return userRepo.findById(id).orElseThrow(()->new 
				RuntimeException("User not Found."));
	}
	
	public User saveuser(User user) {
		
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
		
		
		return userRepo.save(user);
	}
	
	public User updateUser(Long id,User user) {
		User user2= userRepo.findById(id).orElseThrow(()->new 
				RuntimeException("User not Found."));
		user2.setFull_name(user.getFull_name());
		user2.setAddress(user.getAddress());
		user2.setMobile(user.getMobile());
		user2.setNationality(user.getNationality());
		user2.setNic(user.getNic());
		return userRepo.save(user2);
	}
	
	public void deleteUser(Long id) {
		userRepo.deleteById(id);
	}
	
	
	
}
