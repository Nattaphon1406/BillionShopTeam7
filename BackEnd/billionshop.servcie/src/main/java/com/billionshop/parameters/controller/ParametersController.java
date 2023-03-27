package com.billionshop.parameters.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.billionshop.parameters.service.ParametersService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping(value = "/parameters")
@Api(value = "parameters", description = "parameters Service", tags = { "parameters" })

public class ParametersController {
	@Autowired
	private ParametersService ParametersService;
}
