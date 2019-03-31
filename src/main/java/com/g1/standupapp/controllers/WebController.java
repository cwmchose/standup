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
import org.springframework.web.bind.annotation.PutMapping;
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
		return userRepository.findById(userId).get();
	}

	@PutMapping("/user/{id}")
	public User updateUser(@PathVariable(value = "id") Integer userId, @Valid @RequestBody User userDetails) {

		User user = userRepository.findById(userId).get();

		user.setFirstName(userDetails.getFirstName());
		user.setLastName(userDetails.getLastName());
		user.setPassword(userDetails.getPassword());
		user.setTeams(userDetails.getTeams());
		user.setUsername(userDetails.getUsername());

		User updatedUser = userRepository.save(user);
		return updatedUser;
	}

	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Integer userId) {
		User user = userRepository.findById(userId).get();

		userRepository.delete(user);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/team")
	public List<Team> getAllTeams() {
    	return teamRepository.findAll();
	}

	@PostMapping("/team")
	public Team saveTeam(@Valid @RequestBody Team team) {
    return teamRepository.save(team);
}

	@GetMapping("/team/{id}")
	public Team getTeamById(@PathVariable(value = "id") Integer teamId) {
		return teamRepository.findById(teamId).get();
	}

	@PutMapping("team/{id}")
	public Team updateTeam(@PathVariable(value = "id") Integer teamId, @Valid @RequestBody Team teamDetails) {

		Team team = teamRepository.findById(teamId).get();

		team.setTeamName(teamDetails.getTeamName());
		team.setScrumMasterUsername(teamDetails.getScrumMasterUsername());
		team.setUsers(teamDetails.getUsers());

		Team updatedTeam = teamRepository.save(team);
		return updatedTeam;
	}

	@DeleteMapping("/team/{id}")
	public ResponseEntity<?> deleteTeam(@PathVariable(value = "id") Integer teamId) {
		Team team = teamRepository.findById(teamId).get();

		teamRepository.delete(team);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/entry")
	public List<StandupEntry> getAllEntries() {
    	return standupEntryRepository.findAll();
	}

	@PostMapping("/entry")
	public StandupEntry saveStandupEntry(@Valid @RequestBody StandupEntry standupEntry) {
    return standupEntryRepository.save(standupEntry);
}

	@GetMapping("/entry/{id}")
	public StandupEntry getStandupEntryById(@PathVariable(value = "id") Integer standupEntryId) {
		return standupEntryRepository.findById(standupEntryId).get();
	}

	@PutMapping("entry/{id}")
	public StandupEntry updateStandupEntry(@PathVariable(value = "id") Integer standupEntryId, @Valid @RequestBody StandupEntry standupEntryDetails) {

		StandupEntry standupEntry = standupEntryRepository.findById(standupEntryId).get();

		StandupEntry updatedStandupEntry = standupEntryRepository.save(standupEntry);
		return updatedStandupEntry;
	}

	@DeleteMapping("/entry/{id}")
	public ResponseEntity<?> deleteStandupEntry(@PathVariable(value = "id") Integer standupEntryId) {
		StandupEntry standupEntry = standupEntryRepository.findById(standupEntryId).get();

		standupEntryRepository.delete(standupEntry);

		return ResponseEntity.ok().build();
	}

}
