package com.billionshop.login.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.billionshop.login.entity.UserEntity;

@Repository
@Transactional
public interface ManageUserRepository extends JpaRepository<UserEntity, Integer> {
	
	@Query(value= ManageUserRepoQuery.findUserByShopId,nativeQuery = true)
	public List<Map<String, String>> findUserByShopId(@Param("shId") Integer shId); 
	
	@Query(value= ManageUserRepoQuery.findUserByData,nativeQuery = true)
	public List<Map<String, String>> findUserByData(@Param("data")String data,@Param("shId") Integer shId); 
	
	@Modifying
	@Query(value= ManageUserRepoQuery.DeleteUserById,nativeQuery = true)
	public void DeleteUserById(@Param("us_id") Integer us_id);
	
	@Modifying
	@Query(value= ManageUserRepoQuery.DeleteAllUserById,nativeQuery = true)
	public void DeleteAllUserById(@Param("us_sh_id") Integer us_sh_id,@Param("us_id")Integer us_id);
	
}
