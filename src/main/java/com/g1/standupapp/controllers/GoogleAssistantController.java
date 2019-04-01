package com.g1.standupapp.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


import com.google.actions.api.ActionRequest;
import com.google.actions.api.ActionResponse;
import com.google.actions.api.DialogflowApp;
import com.google.actions.api.ForIntent;
import com.google.actions.api.response.ResponseBuilder;
import com.google.actions.api.App;
import com.google.actions.api.DialogflowApp;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import com.google.api.services.actions_fulfillment.v2.model.User;
import java.util.ResourceBundle;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
public class GoogleAssistantController extends DialogflowApp {
   	
	@RequestMapping("/gatest")
    public String gatest(ActionRequest request) {
		ResponseBuilder responseBuilder = getResponseBuilder(request);
		responseBuilder.add("welcome");
		
		System.out.println(responseBuilder.build());
  		//return responseBuilder.build();
  		return "swell";
    } 

}
