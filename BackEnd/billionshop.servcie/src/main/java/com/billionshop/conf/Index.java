package com.billionshop.conf;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import springfox.documentation.annotations.ApiIgnore;

@Controller
@ApiIgnore
@Profile({"dev","test", "local"})
public class Index {
	@RequestMapping ("/")
    public String home() {
	return "redirect:/swagger-ui/index.html";
    }
}
