package com.g1.standupapp.controllers;

import java.security.Principal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import com.g1.standupapp.models.Invite;
import com.g1.standupapp.models.Standup;
import com.g1.standupapp.models.StandupEntry;
import com.g1.standupapp.models.Team;
import com.g1.standupapp.models.User;
import com.g1.standupapp.repositories.InviteRepository;
import com.g1.standupapp.repositories.StandupEntryRepository;
import com.g1.standupapp.repositories.StandupRepository;
import com.g1.standupapp.repositories.TeamRepository;
import com.g1.standupapp.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController{

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

	@GetMapping("/")
	public String home(Model model, Principal principal){
		return "home";
	}
}

