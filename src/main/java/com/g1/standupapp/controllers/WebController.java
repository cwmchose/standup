package com.g1.standupapp.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

	@PostMapping("/user/test")
	public User dummyUser() {
		User dummy = new User();
		dummy.setFirstName("Dummy");
		dummy.setLastName("User");
		dummy.setEmail("vim4life");
		dummy.setTeams(new HashSet<>());

		return userRepository.save(dummy);
		}

	@GetMapping("/user/id/{id}")
	public User getUserById(@PathVariable(value = "id") Long userId) {
		return userRepository.findById(userId).get();
	}

	@PutMapping("/user/{id}")
	public User updateUser(@PathVariable(value = "id") Long userId, @Valid @RequestBody User userDetails) {

		User user = userRepository.findById(userId).get();

		user.setFirstName(userDetails.getFirstName());
		user.setLastName(userDetails.getLastName());
		user.setTeams(userDetails.getTeams());
		user.setEmail(userDetails.getEmail());

		User updatedUser = userRepository.save(user);
		return updatedUser;
	}

	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) {
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
	public Team getTeamById(@PathVariable(value = "id") Long teamId) {
		return teamRepository.findById(teamId).get();
	}

	@PutMapping("team/{id}")
	public Team updateTeam(@PathVariable(value = "id") Long teamId, @Valid @RequestBody Team teamDetails) {

		Team team = teamRepository.findById(teamId).get();

		team.setTeamName(teamDetails.getTeamName());
		team.setScrumMasterUsername(teamDetails.getScrumMasterUsername());
		team.setUsers(teamDetails.getUsers());

		Team updatedTeam = teamRepository.save(team);
		return updatedTeam;
	}

	@DeleteMapping("/team/{id}")
	public ResponseEntity<?> deleteTeam(@PathVariable(value = "id") Long teamId) {
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
	public StandupEntry getStandupEntryById(@PathVariable(value = "id") Long standupEntryId) {
		return standupEntryRepository.findById(standupEntryId).get();
	}

	@PutMapping("entry/{id}")
	public StandupEntry updateStandupEntry(@PathVariable(value = "id") Long standupEntryId, @Valid @RequestBody StandupEntry standupEntryDetails) {

		StandupEntry standupEntry = standupEntryRepository.findById(standupEntryId).get();

		standupEntry.setUser(standupEntryDetails.getUser());
		standupEntry.setTeam(standupEntryDetails.getTeam());
		standupEntry.setData(standupEntryDetails.getData());
		standupEntry.setDate(standupEntryDetails.getDate());

		StandupEntry updatedStandupEntry = standupEntryRepository.save(standupEntry);
		return updatedStandupEntry;
	}

	@DeleteMapping("/entry/{id}")
	public ResponseEntity<?> deleteStandupEntry(@PathVariable(value = "id") Long standupEntryId) {
		StandupEntry standupEntry = standupEntryRepository.findById(standupEntryId).get();

		standupEntryRepository.delete(standupEntry);

		return ResponseEntity.ok().build();
	}

	//////////////////////////////// Non Basic Crud Stuff

	@GetMapping("user/email/{email}")
	public User getUserByEmail(@PathVariable(value = "email") String email){
		return userRepository.findByEmail(email).get();
	}

	@PostMapping("user/{email}/add/{teamName}")
	public User addUserToTeam(@PathVariable(value = "email") String email, @PathVariable(value = "teamName") String teamName){
		User user = getUserByEmail(email);
		Set<Team> teams = user.getTeams();
		teams.add(teamRepository.findByTeamName(teamName).get());
		user.setTeams(teams);
		userRepository.save(user);
		return user;

	}

	@DeleteMapping("user/{email}/add/{teamName}")
	public User deleteUserFromTeam(@PathVariable(value = "email") String email, @PathVariable(value = "teamName") String teamName){
		User user = getUserByEmail(email);
		Set<Team> teams = user.getTeams();
		teams.remove(teamRepository.findByTeamName(teamName).get());
		user.setTeams(teams);
		userRepository.save(user);
		return user;

	}

	
}
