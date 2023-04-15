package com.example.demo.controller;

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
	//Get All Users
	public List<User> getAllUser() {
		return userService.getAll();
	}

	@GetMapping("/getUser/{id}")
	//Get User by ID
	public User getUserById(@PathVariable Long id) {
		//return ResponseHandler.responseBuilder("Requested user details are here.", 
				///HttpStatus.OK, userService.getUserById(id));
		return userService.getUserById(id);
	}
	
	
	@GetMapping("/getUserCustom/{id}")
	//Get User by ID
	public ResponseEntity<Object> getUserByIdCustom(@PathVariable Long id) {
		return ResponseHandler.responseBuilder("Requested user details are here.", 
				HttpStatus.OK, userService.getUserById(id));
	}
	
	
	@PostMapping("/saveUser")
	//Save User
	public String saveUser(@RequestBody User user) {
		 userService.saveuser(user);
		 return "User Saved Successfully!";
	}

	@PutMapping("/updateUser/{id}")
	//Update User by ID
	public String updateUser(@PathVariable Long id, @RequestBody User user) {
		 userService.updateUser(id, user);
		 return "User Updated Successfully!!!";
	}

	@DeleteMapping("/deleteUser/{id}")
	//Delete User by ID
	public String deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return "User Deleted Successfully!!!";
	}

}
