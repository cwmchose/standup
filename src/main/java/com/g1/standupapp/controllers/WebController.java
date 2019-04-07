package com.g1.standupapp.controllers;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.security.Principal;

import javax.validation.Valid;

import com.g1.standupapp.repositories.*;
import com.g1.standupapp.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@RestController
public class WebController{

	@Autowired
	UserRepository userRepository;

	@Autowired
	StandupEntryRepository standupEntryRepository;

	@Autowired
	TeamRepository teamRepository;

	@Autowired
	StandupRepository standupRepository;

	@RequestMapping("/test")
	@ResponseBody
    public String test(String name, Model model) {
		System.out.println("swell");
		
        return "swell";
    } 


	@GetMapping("/user")
	public List<User> getAllUsers() {
    	return userRepository.findAll();
	}

	@RequestMapping(value = "/username", method = RequestMethod.GET)
    @ResponseBody
    public String currentUserName(Principal principal) {
		System.out.println(principal);
        return principal.getName();
    }

	@PostMapping("/user")
	public User saveUser(@Valid @RequestBody User user) {
    	return userRepository.save(user);
	}

	@GetMapping("/fillmewithyourtestdata")
	public void dummyUser() {
		User dummy = new User();
		dummy.setFirstName("Dummy");
		dummy.setLastName("User");
		dummy.setEmail("dummy@gmail.com");
		dummy.setTeams(new HashSet<>());
		userRepository.save(dummy);

		Team dummyTeam = new Team();
		dummyTeam.setScrumMasterEmail("dummy@gmail.com");
		dummyTeam.setTeamName("Alpha Team");
		Set<User> userSet = new HashSet<User>();
		userSet.add(dummy);
		dummyTeam.setUsers(userSet);
		teamRepository.save(dummyTeam);


		StandupEntry standupEntry = new StandupEntry();
		standupEntry.setDate(new Date());
		standupEntry.setTeam(dummyTeam);
		standupEntry.setUser(dummy);
		standupEntryRepository.save(standupEntry);

		Standup standup = new Standup();
		standup.setDate(new Date());
		standup.setTeam(dummyTeam);
		Set<StandupEntry> standupSet = new HashSet<StandupEntry>();
		standupSet.add(standupEntry);
		standup.setStandups(standupSet);
		
		standupRepository.save(standup);


		}

	@GetMapping("/user/id/{id}")
	public User getUserById(@PathVariable(value = "id") Long userId) {
		if(userRepository.findById(userId).isPresent())
			return userRepository.findById(userId).get();
		else
			return null;
			
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
		if(teamRepository.findById(teamId).isPresent())
			return teamRepository.findById(teamId).get();
		return null;
	}

	@PutMapping("team/{id}")
	public Team updateTeam(@PathVariable(value = "id") Long teamId, @Valid @RequestBody Team teamDetails) {

		Team team = teamRepository.findById(teamId).get();

		team.setTeamName(teamDetails.getTeamName());
		team.setScrumMasterEmail(teamDetails.getScrumMasterEmail());
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
		if(standupEntryRepository.findById(standupEntryId).isPresent())
			return standupEntryRepository.findById(standupEntryId).get();
		else
			return null;
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

	@GetMapping("/standup")
	public List<StandupEntry> getAllStandups() {
    	return standupEntryRepository.findAll();
	}

	@PostMapping("/standup")
	public Standup saveStandup(@Valid @RequestBody Standup standup) {
    return standupRepository.save(standup);
}

	@GetMapping("/standup/{id}")
	public Standup getStandupById(@PathVariable(value = "id") Long standupId) {
		if(standupRepository.findById(standupId).isPresent())
			return standupRepository.findById(standupId).get();
		else
			return null;
	}

	@PutMapping("standup/{id}")
	public Standup updateStandup(@PathVariable(value = "id") Long standupId, @Valid @RequestBody Standup standupDetails) {

		Standup standup = standupRepository.findById(standupId).get();

		standup.setDate(standupDetails.getDate());
		standup.setTeam(standupDetails.getTeam());
		standup.setStandups(standupDetails.getStandups());

		Standup updatedStandup = standupRepository.save(standup);
		return updatedStandup;
	}

	@DeleteMapping("/standup/{id}")
	public ResponseEntity<?> deleteStandup(@PathVariable(value = "id") Long standupId) {
		Standup standup = standupRepository.findById(standupId).get();

		standupRepository.delete(standup);

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

	@GetMapping("standup/{date}/{teamName}")
	public Standup  getStandupByDateAndTeam(@PathVariable(value = "date")  @DateTimeFormat(iso = ISO.DATE_TIME) Date date, @PathVariable(value = "teamName") String teamName){
		return standupRepository.findByDateAndTeam_TeamName(date, teamName).get();
	}
	
}
