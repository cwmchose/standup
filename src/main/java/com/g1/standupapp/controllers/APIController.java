package com.g1.standupapp.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;
import java.security.Principal;
import java.time.LocalDate;

import javax.validation.Valid;

import com.g1.standupapp.repositories.*;
import com.g1.standupapp.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
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
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

@Controller
@RequestMapping("/api")
public class APIController{

	@Autowired
	UserRepository userRepository;

	@Autowired
	StandupEntryRepository standupEntryRepository;

	@Autowired
	TeamRepository teamRepository;

	@Autowired
	StandupRepository standupRepository;

	@Autowired
	InviteRepository inviteRepository;

	@RequestMapping("/test")
	@ResponseBody
    public String test(String name, Model model) {
		System.out.println("swell");
		
        return "swell";
    } 

	@RequestMapping(value = "/principal", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String currentUserName(Principal principal) {
		OAuth2AuthenticationToken test = (OAuth2AuthenticationToken) principal;
    	return test.getPrincipal().getAttributes().toString();
	}
	


	//// Start of User CRUD
	@RequestMapping(value = "/user", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<User> getAllUsers() {
    	return userRepository.findAll();
	}

	@RequestMapping(value = "/user", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> saveUser(@Valid @RequestBody User user) {
		if(userRepository.findByEmail(user.getEmail()).isPresent()){
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User with that email is already present");
		}
		else{
			userRepository.save(user);
			return ResponseEntity.ok().build();
		}
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public User getUserById(@PathVariable(value = "id") Long userId) {
		if(userRepository.findById(userId).isPresent())
			return userRepository.findById(userId).get();
		else
			return null;
			
	}

	// fix
	@RequestMapping(value = "/user/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public User updateUser(@PathVariable(value = "id") Long userId, @Valid @RequestBody User userDetails) {
		User user = userRepository.findById(userId).get();

		user.setFirstName(userDetails.getFirstName());
		user.setLastName(userDetails.getLastName());
		user.setTeams(userDetails.getTeams());
		user.setEmail(userDetails.getEmail());
		user.setInvites(userDetails.getInvites());

		User updatedUser = userRepository.save(user);
		return updatedUser;
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long userId) {
		if(userRepository.findById(userId).isPresent()){
			User user = userRepository.findById(userId).get();
			List<StandupEntry> entries = standupEntryRepository.findByUser_UserID(user.getUserID());
			for(StandupEntry entry: entries){
				standupEntryRepository.delete(entry);
			}
			userRepository.delete(user);
			return ResponseEntity.ok().build();
		}
		else{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found");
		}
	}
	//// End of User CRUD

	//// Start of Invite CRUD
	@RequestMapping(value = "/invite", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Invite> getAllInvites() {
    	return inviteRepository.findAll();
	}

	@RequestMapping(value = "/invite", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> saveInvite(@Valid @RequestBody Invite invite) {
		if(inviteRepository.findByUser_UserIDAndTeamName(invite.getUser().getUserID(), invite.getTeamName()).isPresent()){
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invite already sent");
		}
		else{
			inviteRepository.save(invite);
			return ResponseEntity.ok().build();
		}
	}

	@RequestMapping(value = "/invite/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Invite getInviteById(@PathVariable(value = "id") Long inviteId) {
		if(inviteRepository.findById(inviteId).isPresent())
			return inviteRepository.findById(inviteId).get();
		else
			return null;
			
	}

	// fix
	@RequestMapping(value = "/invite/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Invite updateInvite(@PathVariable(value = "id") Long inviteId, @Valid @RequestBody Invite inviteDetails) {
		Invite invite = inviteRepository.findById(inviteId).get();

		invite.setTeamName(inviteDetails.getTeamName());
		invite.setUser(inviteDetails.getUser());

		Invite updatedInvite = inviteRepository.save(invite);
		return updatedInvite;
	}

	@RequestMapping(value = "/invite/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> deleteInvite(@PathVariable(value = "id") Long inviteId) {
		if(inviteRepository.findById(inviteId).isPresent()){
			Invite invite = inviteRepository.findById(inviteId).get();
			// User user = invite.getUser();
			// Set<Invite> invites = user.getInvites();
			// invites.remove(invite);
			// user.setInvites(invites);
			// userRepository.save(user);
			inviteRepository.delete(invite);
			return ResponseEntity.ok().build();
		}
		else{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invite not found");
		}
	}
	//// End of Invite CRUD

	//// Start of Team CRUD
	@RequestMapping(value = "/team", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Team> getAllTeams() {
    	return teamRepository.findAll();
	}

	@RequestMapping(value = "/team", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> saveTeam(@Valid @RequestBody Team team) {
		if(teamRepository.findByTeamName(team.getTeamName()).isPresent()){
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Team by that name is already present");
		}
		else{
			teamRepository.save(team);
			return ResponseEntity.ok().build();
		}
    	
	}

	@RequestMapping(value = "/team/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Team getTeamById(@PathVariable(value = "id") Long teamId) {
		if(teamRepository.findById(teamId).isPresent())
			return teamRepository.findById(teamId).get();
		return null;
	}

	// fix
	@RequestMapping(value = "/team/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Team updateTeam(@PathVariable(value = "id") Long teamId, @Valid @RequestBody Team teamDetails) {

		Team team = teamRepository.findById(teamId).get();

		team.setTeamName(teamDetails.getTeamName());
		team.setScrumMasterEmail(teamDetails.getScrumMasterEmail());
		team.setUsers(teamDetails.getUsers());

		Team updatedTeam = teamRepository.save(team);
		return updatedTeam;
	}

	@RequestMapping(value = "/team/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> deleteTeam(@PathVariable(value = "id") Long teamId) {
		if(teamRepository.findById(teamId).isPresent()){
			Team team = teamRepository.findById(teamId).get();
			List<Standup> standups = standupRepository.findByTeam_TeamName(team.getTeamName());
			for(Standup standup: standups){
				standupRepository.delete(standup);
			}
			teamRepository.delete(team);

			return ResponseEntity.ok().build();
		}
		else{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Team not found");
		}
	}
	//// End of Team CRUD



	//// Start of StandupEntry CRUD
	@RequestMapping(value = "/entry", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<StandupEntry> getAllEntries() {
    	return standupEntryRepository.findAll();
	}

	@RequestMapping(value = "/entry", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> saveStandupEntry(@Valid @RequestBody StandupEntry standupEntry) {
		if(!standupEntryRepository.findByDateAndTeam_TeamNameAndUser_Email(standupEntry.getDate(), standupEntry.getTeam().getTeamName(), standupEntry.getUser().getEmail()).isPresent()){
			if(standupRepository.findByDateAndTeam_TeamName(standupEntry.getDate(),standupEntry.getTeam().getTeamName()).isPresent()){	
				Standup standup = standupRepository.findByDateAndTeam_TeamName(standupEntry.getDate(),standupEntry.getTeam().getTeamName()).get();
				standupEntry.setStandup(standup);
				standupEntryRepository.save(standupEntry);
			}
			else{
				Standup standup = new Standup();
				standup.setDate(standupEntry.getDate());
				standup.setTeam(standupEntry.getTeam());
				Set <StandupEntry> entrySet = new HashSet<StandupEntry>();
				standup.setStandups(entrySet);
				standupRepository.save(standup);
				standupEntry.setStandup(standup);
				standupEntryRepository.save(standupEntry);
			}
			return ResponseEntity.ok().build();
		}
		else
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Entry for date already found");
	}

	@RequestMapping(value = "/entry/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public StandupEntry getStandupEntryById(@PathVariable(value = "id") Long standupEntryId) {
		if(standupEntryRepository.findById(standupEntryId).isPresent())
			return standupEntryRepository.findById(standupEntryId).get();
		else
			return null;
	}

	// fix
	@RequestMapping(value = "/entry/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public StandupEntry updateStandupEntry(@PathVariable(value = "id") Long standupEntryId, @Valid @RequestBody StandupEntry standupEntryDetails) {

		StandupEntry standupEntry = standupEntryRepository.findById(standupEntryId).get();

		standupEntry.setUser(standupEntryDetails.getUser());
		standupEntry.setTeam(standupEntryDetails.getTeam());
		standupEntry.setTodayText(standupEntryDetails.getTodayText());
		standupEntry.setTomorrowText(standupEntryDetails.getTomorrowText());
		standupEntry.setBlockingText(standupEntryDetails.getBlockingText());
		standupEntry.setDate(standupEntryDetails.getDate());

		StandupEntry updatedStandupEntry = standupEntryRepository.save(standupEntry);
		return updatedStandupEntry;
	}

	@RequestMapping(value = "/entry/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> deleteStandupEntry(@PathVariable(value = "id") Long standupEntryId) {
		if(standupEntryRepository.findById(standupEntryId).isPresent()){
			StandupEntry standupEntry = standupEntryRepository.findById(standupEntryId).get();
			standupEntryRepository.delete(standupEntry);
			return ResponseEntity.ok().build();
		}
		else{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Entry not found");
		}

	}
	//// End of StandupEntry CRUD



	//// Start of Standup CRUD
	@RequestMapping(value = "/standup", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Standup> getAllStandups() {
    	return standupRepository.findAll();
	}

	@RequestMapping(value = "/standup", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> saveStandup(@Valid @RequestBody Standup standup) {
		if(standupRepository.findByDateAndTeam_TeamName(standup.getDate(), standup.getTeam().getTeamName()).isPresent())
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Standup for date and team already found");
		else
			standupRepository.save(standup);
			return ResponseEntity.ok().build();
}

	@RequestMapping(value = "/standup/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Standup getStandupById(@PathVariable(value = "id") Long standupId) {
		if(standupRepository.findById(standupId).isPresent())
			return standupRepository.findById(standupId).get();
		else
			return null;
	}

	// fix
	@RequestMapping(value = "/standup/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Standup updateStandup(@PathVariable(value = "id") Long standupId, @Valid @RequestBody Standup standupDetails) {

		Standup standup = standupRepository.findById(standupId).get();

		standup.setDate(standupDetails.getDate());
		standup.setTeam(standupDetails.getTeam());
		standup.setStandups(standupDetails.getStandups());

		Standup updatedStandup = standupRepository.save(standup);
		return updatedStandup;
	}

	@RequestMapping(value = "/standup/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> deleteStandup(@PathVariable(value = "id") Long standupId) {
		if(standupRepository.findById(standupId).isPresent()){
			Standup standup = standupRepository.findById(standupId).get();
			standupRepository.delete(standup);
			return ResponseEntity.ok().build();
		}
		else{
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Standup not found");
		}
	}
	//// End of Standup CRUD



	//////////////////////////////// Non Basic Crud Stuff (It's a lawless land out there)
	@RequestMapping(value = "/fillmewithyourtestdata", method = RequestMethod.GET, produces = MediaType.TEXT_PLAIN_VALUE)
	@ResponseBody
	public String dummyUser() {
		
		User cole = new User();
		cole.setFirstName("Coleman");
		cole.setLastName("McHose");
		cole.setEmail("cole.mchose@gmail.com");
		cole.setTeams(new HashSet<>());
		cole.setInvites(new HashSet<>());
		userRepository.save(cole);

		Team dummyTeam = new Team();
		dummyTeam.setScrumMasterEmail("cole.mchose@gmail.com");
		dummyTeam.setTeamName("Alpha Team");
		dummyTeam.setDescription("Our goal is to build a working capstone.");
		Set<User> userSet = new HashSet<User>();
		userSet.add(cole);

		User ed = new User();
		ed.setFirstName("Edgar");
		ed.setLastName("Villarreal");
		ed.setEmail("eivillarreal@mix.wvu.edu");
		ed.setTeams(new HashSet<>());
		ed.setInvites(new HashSet<>());
		userRepository.save(ed);
		
		Invite invite = new Invite();
		invite.setTeamName("Alpha Team");
		invite.setUser(ed);
		inviteRepository.save(invite);

		User tony = new User();
		tony.setFirstName("Tony");
		tony.setLastName("Bag-O-Donuts");
		tony.setEmail("ajdt703@gmail.com");
		tony.setTeams(new HashSet<>());
		tony.setInvites(new HashSet<>());
		userRepository.save(tony);
		userSet.add(tony);

		for(int i = 0; i<5; i++){
			User dummy2 = new User();
			dummy2.setFirstName("First"+i);
			dummy2.setLastName("Last"+i);
			dummy2.setEmail("First"+i+".Last"+i+"@gmail.com");
			dummy2.setTeams(new HashSet<>());
			userRepository.save(dummy2);
			userSet.add(dummy2);
		}
		

		dummyTeam.setUsers(userSet);
		teamRepository.save(dummyTeam);

		Standup standup = new Standup();
		LocalDate localDate = LocalDate.now();
		standup.setDate(localDate);
		standup.setTeam(dummyTeam);
		Set<StandupEntry> standupSet = new HashSet<StandupEntry>();
		standup.setStandups(standupSet);
		standupRepository.save(standup);

		for(User user: userSet){
			StandupEntry standupEntry = new StandupEntry();
			standupEntry.setDate(localDate);
			standupEntry.setTeam(dummyTeam);
			standupEntry.setUser(user);
			String str = "I want to die";
			standupEntry.setTodayText(str);
			standupEntry.setTomorrowText(str);
			standupEntry.setBlockingText(str);
			standupEntry.setStandup(standup);
			standupEntryRepository.save(standupEntry);
		}

		return "OwO what's this";
	}

	@RequestMapping(value = "user/email/{email}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public User getUserByEmail(@PathVariable(value = "email") String email){
		if(userRepository.findByEmail(email).isPresent())
			return userRepository.findByEmail(email).get();
		else
			return null;
	}

	@RequestMapping(value = "user/{email}/add/{teamName}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> addUserToTeam(@PathVariable(value = "email") String email, @PathVariable(value = "teamName") String teamName){
		if(userRepository.findByEmail(email).isPresent()){
			User user = userRepository.findByEmail(email).get();
			if(teamRepository.findByTeamName(teamName).isPresent()){
				Team team = teamRepository.findByTeamName(teamName).get();
				if(!team.getUsers().contains(user)){
					Set<User> users = team.getUsers();
					users.add(user);
					team.setUsers(users);
					teamRepository.save(team);
					return ResponseEntity.ok().build();
				}
				else
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User already present");
			}
			else
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Team not found");
		}
		else
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found");
		
	}

	@RequestMapping(value = "user/{email}/remove/{teamName}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<?> deleteUserFromTeam(@PathVariable(value = "email") String email, @PathVariable(value = "teamName") String teamName){
		if(userRepository.findByEmail(email).isPresent()){
			User user = userRepository.findByEmail(email).get();
			if(teamRepository.findByTeamName(teamName).isPresent()){
				Team team = teamRepository.findByTeamName(teamName).get();
				if(team.getUsers().contains(user)){
				Set<User> users = team.getUsers();
					users.remove(user);
					team.setUsers(users);
					teamRepository.save(team);
					return ResponseEntity.ok().build();				
				}
				else
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not a member");
			}
			else
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Team not found");
		}
		else
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found");
	}

	//yyyy-mm-dd
	@RequestMapping(value = "standup/{date}/team/{teamName}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Standup  getStandupByDateAndTeamName(@PathVariable(value = "date")  @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date, @PathVariable(value = "teamName") String teamName){
		if(standupRepository.findByDateAndTeam_TeamName(date, teamName).isPresent())
			return standupRepository.findByDateAndTeam_TeamName(date, teamName).get();
		else
			return null;
	}

	
	@RequestMapping(value = "entry/{date}/{email}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<StandupEntry> getStandupEntryByDateAndEmail(@PathVariable(value = "date")  @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date, @PathVariable(value = "email") String email){
		return standupEntryRepository.findByDateAndUser_Email(date, email);
	}

	@RequestMapping(value = "standup/{date}/email/{email}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Standup> getStandupByDateAndEmail(@PathVariable(value = "date")  @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date, @PathVariable(value = "email") String email){
		User user = userRepository.findByEmail(email).get();
		Set<Team> teams = user.getTeams();
		List<Standup> list = new ArrayList<Standup>();
		for(Team t: teams){
			if(standupRepository.findByDateAndTeam_TeamName(date, t.getTeamName()).isPresent()){
				list.add(standupRepository.findByDateAndTeam_TeamName(date, t.getTeamName()).get());
			}
		}
		return list;
	}

	@RequestMapping(value = "team/user/{email}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Team> getTeamsByUser(@PathVariable(value = "email") String email){
		return teamRepository.findByUsers_Email(email);
	}
}
