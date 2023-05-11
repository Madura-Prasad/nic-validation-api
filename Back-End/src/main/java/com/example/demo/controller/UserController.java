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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;
import com.example.demo.response.ResponseHandler;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private UserRepo userRepo;


	@GetMapping("/getUser")
	// Get User
	public ResponseEntity<Object> getUser() {
		return ResponseHandler.responseBuilder("Requested user details are here.", HttpStatus.OK, userService.getAll());
	}

	@GetMapping("/getUser/{id}")
	// Get User by ID
	public User getUserById(@PathVariable Long id) {
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
	public ResponseEntity<Object> getUser(@RequestBody User user) {
		return ResponseHandler.responseBuilder("User Saved Successfully!", HttpStatus.OK, userService.saveuser(user));
	}

	@PutMapping("/updateUser/{id}")
	public ResponseEntity<Object> updateUser(@PathVariable Long id, @RequestBody User user) {
		return ResponseHandler.responseBuilder("User Upadated Successfully!", HttpStatus.OK, userService.updateUser(id, user));
	}

	@DeleteMapping("/deleteUser/{id}")
	// Delete User by ID
	public String deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
		return "User Deleted Successfully!!!";
	}
	
	
//	@GetMapping("/nicCount")
//	public ResponseEntity<Object> getNic(User user) {
//		return ResponseHandler.responseBuilder("NIC Range Here!!!", HttpStatus.OK, userRepo.getCountNIC());
//	}
//	
//	
//	@GetMapping("/mobileCount")
//	public ResponseEntity<Object> getMobile(User user) {
//		return ResponseHandler.responseBuilder("Mobile Number Range Here!!!", HttpStatus.OK, userRepo.getCountMobile());
//	}
//	
//	@GetMapping("/genderCount")
//	public ResponseEntity<Object> getGender(User user) {
//		return ResponseHandler.responseBuilder("Gender Range Here!!!", HttpStatus.OK, userRepo.getCountGender());
//	}
//	
//	@GetMapping("/ageCount")
//	public ResponseEntity<Object> getAge(User user) {
//		return ResponseHandler.responseBuilder("Age Range Here!!!", HttpStatus.OK, userRepo.getCountAge());
//	}
//	
//	@GetMapping("/birthYearCount")
//	public ResponseEntity<Object> getBirthYear(User user) {
//		return ResponseHandler.responseBuilder("Birth Year Range Here!!!", HttpStatus.OK, userRepo.getCountBirthYear());
//	}
	
	
	
	
	 @GetMapping("/filter")
	    public ResponseEntity<List<User>> searchUsers(
	            @RequestParam(name = "full_name", required = false) String full_name,
	            @RequestParam(name = "address", required = false) String address,
	            @RequestParam(name = "mobile", required = false) String mobile,
	            @RequestParam(name = "nic", required = false) String nic,
	            @RequestParam(name = "nationality", required = false) String nationality,
	            @RequestParam(name = "birthday", required = false) String birthday,
	            @RequestParam(name = "age", required = false) Integer age,
	            @RequestParam(name = "gender", required = false) String gender){

	        List<User> filteredUsers = userRepo.searchUsers(birthday, address, mobile, nic, nationality, age, gender, age);

	        if (filteredUsers.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        } else {
	            return new ResponseEntity<>(filteredUsers, HttpStatus.OK);
	        }
	    }
	
	
	
	
	
	
	
}
