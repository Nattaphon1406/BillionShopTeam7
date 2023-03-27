package com.billionshop.login.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billionshop.login.model.AccountUserRequest;
import com.billionshop.login.model.LoginResponse;
import com.billionshop.login.model.ShowUserResponse;
import com.billionshop.login.service.LoginService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value = "/log")
@Api(value = "log", description = "login Service", tags = { "Login" })
public class LoginController {

	@Autowired
	private LoginService loginService;

	@ApiOperation(value = "Create Account", response = AccountUserRequest.class)
	@PutMapping(value = "/CreateAccount", produces = { "application/json" })
	public boolean createAccount(HttpServletRequest request,
			@RequestBody AccountUserRequest accountUserRequest)
			throws ParseException {
		return loginService.createAccount(accountUserRequest);
	}

	@ApiOperation(value = "Find user pass", response = LoginResponse.class)
	@GetMapping(value = "/finduserpass", produces = { "application/json" })
	public List<Map<String, String>> finduserpass(@RequestParam String us_user_name, @RequestParam String us_pass_word)
			throws ParseException {
		return loginService.finduserpass(us_user_name, us_pass_word);
	}

	@ApiOperation(value = "Logout by Account", response = LoginResponse.class)
	@GetMapping(value = "/logoutAccount", produces = { "application/json" })
	public List<Map<String, String>> logoutAccount(@RequestParam String us_user_name, @RequestParam String us_pass_word)
			throws ParseException {
		return loginService.logoutAccount(us_user_name, us_pass_word);
	}
	
	@ApiOperation(value = "Find User by ShopId", response = ShowUserResponse.class)
	@GetMapping(value = "/findUserShopId", produces = {"application/json"})
	public List<Map<String, String>> findUserByShopId(HttpServletRequest request,
			@RequestParam Integer us_sh_id) throws ParseException
	{
		return loginService.findUserByShopId(us_sh_id);
	}
	
	@ApiOperation(value = "Delete User by Id", response = ShowUserResponse.class)
	@DeleteMapping(value = "/DeleteUserById", produces = {"application/json"})
	public void DeleteUserById(HttpServletRequest request,
			@RequestParam Integer us_id) throws ParseException
	{
		loginService.DeleteUserById(us_id);
	}
	
	@ApiOperation(value = "Delete All User by Id", response = ShowUserResponse.class)
	@DeleteMapping(value = "/DeleteAllUserId", produces = {"application/json"})
	public void DeleteUserAllById(HttpServletRequest request,
			@RequestParam Integer us_sh_id,@RequestParam Integer us_id) throws ParseException
	{
		loginService.DeleteAllUserById(us_sh_id,us_id);
	}
	
	@ApiOperation(value = "Find User by data", response = ShowUserResponse.class)
	@GetMapping(value = "/findUserByData", produces = {"application/json"})
	public List<Map<String, String>> findUserByData(HttpServletRequest request,
			@RequestParam String data,@RequestParam Integer us_sh_id) throws ParseException
	{
		return loginService.findUserByData(data,us_sh_id);
	}

}
