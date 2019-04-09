package com.g1.standupapp.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestController {



   	@GetMapping("/greeting")
    public String greeting(Model model) {
		System.out.println("swell");	
        return "test";
    } 

}
