package com.billionshop.login.service;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.billionshop.login.entity.ShopEntity;
import com.billionshop.login.entity.UserEntity;
import com.billionshop.login.model.AccountUserRequest;
import com.billionshop.login.repository.RegisterRepository;
import com.billionshop.login.repository.ShopRepository;
import com.billionshop.parameters.repository.ParametersRepository;
import com.billionshop.login.repository.ManageUserRepository;

@Service
public class LoginService {

	@Autowired
	RegisterRepository registerRepository;
	@Autowired
	ShopRepository shopRepository;
	@Autowired
	ManageUserRepository manageUserRepository;
	@Autowired
	ParametersRepository parametersRepository;
	

	public boolean createAccount(AccountUserRequest accountUserRequest) throws ParseException {
		UserEntity reg = new UserEntity();
		ShopEntity shp = new ShopEntity();
		List<Map<String, String>> status = registerRepository.findUserById(accountUserRequest.getUserName());

		if(status.isEmpty()) //ว่างทุกตัว
		{
			if(accountUserRequest.getSh_id() == null) {
				shp.setSh_name(accountUserRequest.getSh_name());
				//id ล่าสุด
				//ตัวแปร String รับค่า id
				//sh000001 + id set shopCode
				Long findShopId =  parametersRepository.findLastCode("1", 700);
				Integer digit = parametersRepository.findCodeDigit("1", 700);
				
				if(findShopId != null) {
					findShopId += 1;
				}else {
					findShopId =(long) 1;
				}
				
				parametersRepository.updateLastCode("1", 700,findShopId);
				String stringShopId = String.valueOf(findShopId);
				String shopCode ;
				Integer num = (digit-stringShopId.length());
				
				for(int i=1;i <= num ;i++) {
					stringShopId = "0"+stringShopId;
				}
				
				shopCode =  parametersRepository.findPrefix("1", 700)+stringShopId;
				shp.setSh_code(shopCode);
				shp.setSh_create_by(accountUserRequest.getUserName());
				shp.setSh_create_date(LocalDateTime.now());
				shp.setUs_update_by(accountUserRequest.getUserName());
				shp.setSh_update_date(LocalDateTime.now());
				shopRepository.save(shp);
			}
			
			reg.setUs_user_name(accountUserRequest.getUserName());
			reg.setUs_pass_word(accountUserRequest.getUs_pass_word()); //เข้ารหัส
			reg.setUs_first_name(accountUserRequest.getUs_first_name());
			reg.setUs_last_name(accountUserRequest.getUs_last_name());
			reg.setUs_email(accountUserRequest.getUs_email());
			reg.setUs_tel(accountUserRequest.getUs_tel());
			reg.setUs_permission(accountUserRequest.getUs_permission());
			reg.setUs_create_by(accountUserRequest.getUserName());
			reg.setUs_create_date(LocalDateTime.now());
			reg.setUs_update_by(accountUserRequest.getUserName());
			reg.setUs_update_date(LocalDateTime.now());
			
			if(accountUserRequest.getSh_id() != null) {
				Integer UserShopId = accountUserRequest.getSh_id();
				reg.setUs_sh_id(UserShopId);
			} else {
				Integer shopId = shopRepository.findShopId(shp.getSh_code());
				reg.setUs_sh_id(shopId);
			}			
			registerRepository.save(reg);
			return true;
			
		}
		return false;
	}
	

	public List<Map<String, String>> finduserpass(String us_user_name, String us_pass_word) throws ParseException {
		List<Map<String, String>> results = registerRepository.finduserpass(us_user_name, us_pass_word);
		if(results.isEmpty()) {
            return null;
        }else {
            return results;
        }
	}

	public List<Map<String, String>> logoutAccount(String us_user_name, String us_pass_word) throws ParseException {
		List<Map<String, String>> results = registerRepository.finduserpass(us_user_name, us_pass_word);
		return results;
	}
	
	public List<Map<String, String>> findUserByShopId(Integer us_sh_id) throws ParseException {
		List<Map<String, String>> results = manageUserRepository.findUserByShopId(us_sh_id);
		return results;
	}

	public void DeleteUserById(Integer us_id) throws ParseException {
		 manageUserRepository.DeleteUserById(us_id);
	}
	
	public void DeleteAllUserById(Integer us_sh_id,Integer us_id) throws ParseException {
		manageUserRepository.DeleteAllUserById(us_sh_id,us_id);
	}

	public List<Map<String, String>> findUserByData(String data ,Integer us_sh_id) throws ParseException {
		List<Map<String, String>> results = manageUserRepository.findUserByData(data,us_sh_id);
		return results;
	}

}
