package com.example.demo.service;

import java.util.List;


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
