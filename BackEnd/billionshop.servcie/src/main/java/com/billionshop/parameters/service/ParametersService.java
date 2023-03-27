package com.billionshop.parameters.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.billionshop.parameters.repository.ParametersRepository;
@Service
public class ParametersService {
	@Autowired
	ParametersRepository ParametersRepository;
}
