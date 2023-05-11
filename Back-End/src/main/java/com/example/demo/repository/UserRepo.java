package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

	//Native Queries
	@Query(value = "SELECT * FROM user WHERE " + "(:full_name IS NULL OR full_name = :full_name) AND "
			+ "(:address IS NULL OR address = :address) AND " + "(:mobile IS NULL OR mobile = :mobile) AND "
			+ "(:nic IS NULL OR nic = :nic) AND " + "(:nationality IS NULL OR nationality = :nationality) AND "
			+ "(:birthday IS NULL OR birthday = :birthday) AND " + "(:age IS NULL OR age = :age) AND "
			+ "(:gender IS NULL OR gender = :gender)", nativeQuery = true)
	List<User> searchUsers(@Param("full_name") String userFullName, @Param("address") String userAddress,
			@Param("mobile") String userMobile, @Param("nic") String userNic,
			@Param("nationality") String userNationality, @Param("birthday") Integer userBirthday,
			@Param("age") String userAge, @Param("gender") Integer userGender);

}
