package br.com.myseries.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@EnableAutoConfiguration
public class SpringRest {

    @RequestMapping("/teste")
    @ResponseBody
    public String home() {
        return "index";
    }
    
    @RequestMapping("/cadastroLogin")
    @ResponseBody
    public String cadastroLogin(){
    	
    	return null;
    }
}