package com.billionshop.login.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.billionshop.login.entity.UserEntity;

@Repository
@Transactional
public interface RegisterRepository extends JpaRepository<UserEntity, Integer> {
	
	
	@Query(value= RegisterRepoQuery.findUserById)
	public List<Map<String, String>> findUserById(@Param("us_user_name") String us_user_name);
	
	@Query(value= RegisterRepoQuery.finduserpass)
	public List<Map<String, String>> finduserpass(@Param("us_user_name") String us_user_name,@Param("us_pass_word") String us_pass_word);
	

}
