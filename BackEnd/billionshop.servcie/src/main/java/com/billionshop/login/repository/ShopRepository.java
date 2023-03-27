package com.billionshop.login.repository;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.billionshop.login.entity.ShopEntity;

@Repository
@Transactional
public interface ShopRepository extends JpaRepository<ShopEntity, Integer> {
	
	@Query(value= ShopRepoQuery.findShopId)
	public Integer findShopId(@Param("sh_code") String sh_code);

//	@Query(value= ShopRepoQuery.findShopCode)
//	public String findShopCode();
	
	@Query(value= ShopRepoQuery.findLastedShopId)
	public Integer findLastedShopId();
	
}