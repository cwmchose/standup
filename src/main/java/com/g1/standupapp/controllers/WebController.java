package com.g1.standupapp.controllers;

import java.util.List;

import javax.validation.Valid;

import com.g1.standupapp.repositories.*;
import com.g1.standupapp.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web")
public class WebController{

	@Autowired
	UserRepository userRepository;

	@Autowired
	StandupEntryRepository standupEntryRepository;

	@Autowired
	TeamRepository teamRepository;

	@GetMapping("/user")
	public List<User> getAllUsers() {
    	return userRepository.findAll();
	}

	@PostMapping("/user")
	public User saveUser(@Valid @RequestBody User user) {
    return userRepository.save(user);
}

	@GetMapping("/user/{id}")
	public User getUserById(@PathVariable(value = "id") Integer userId) {
		return userRepository.findById(userId);
	}

	public User updateNote(@PathVariable(value = "id") Integer userId, @Valid @RequestBody User userDetails) {

		User user = userRepository.findById(userId);

		user.setFirstName(userDetails.getFirstName());
		user.setLastName(userDetails.getLastName());
		user.setPassword(userDetails.getPassword());
		user.setTeams(userDetails.getTeams());
		user.setUsername(userDetails.getUsername());

		User updatedUser = userRepository.save(user);
		return updatedUser;
	}

	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Integer userId) {
		User user = userRepository.findById(userId);

		userRepository.delete(user);

		return ResponseEntity.ok().build();
	}

}
