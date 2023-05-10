package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

//	// NIC New or Old Count
//	@Query(value = "SELECT \n" + "  CASE \n" + "    WHEN nic >= '2020-01-01' THEN 'New NIC Range' \n"
//			+ "    ELSE 'Old NIC Range' \n" + "  END AS `NIC Range`, \n" + "  COUNT(*) AS `NIC Count` \n" + "FROM \n"
//			+ "  `nic-api`.user\n" + "GROUP BY \n" + "  `NIC Range`", nativeQuery = true)
//	List<Object> getCountNIC();
//
//	// Mobile Numbers Category Count
//	@Query(value = "SELECT \n" + "    CASE\n" + "        WHEN mobile LIKE '078%' THEN 'Hutch'\n"
//			+ "        WHEN mobile LIKE '071%' THEN 'Mobitel'\n" + "        WHEN mobile LIKE '070%' THEN 'Mobitel'\n"
//			+ "        WHEN mobile LIKE '076%' THEN 'Dialog'\n" + "        WHEN mobile LIKE '077%' THEN 'Dialog'\n"
//			+ "        WHEN mobile LIKE '072%' THEN 'Hutch'\n" + "        WHEN mobile LIKE '075%' THEN 'Airtel'\n"
//			+ "        ELSE 'Unknown'\n" + "    END AS category, \n" + "    COUNT(*) AS count\n"
//			+ "FROM `nic-api`.user\n" + "GROUP BY category", nativeQuery = true)
//	List<Object> getCountMobile();
//
//	// Gender Category Count
//	@Query(value = "SELECT gender, COUNT(*) as count\n" + "FROM `nic-api`.user\n"
//			+ "GROUP BY gender", nativeQuery = true)
//	List<Object> getCountGender();
//
//	// Age Category Count
//	@Query(value = "SELECT \n" + "  CASE\n" + "    WHEN age BETWEEN 0 AND 19 THEN '0-19'\n"
//			+ "    WHEN age BETWEEN 20 AND 29 THEN '20-29'\n" + "    WHEN age BETWEEN 30 AND 39 THEN '30-39'\n"
//			+ "    WHEN age > 40 THEN '51+'\n" + "  END AS age_category,\n" + "  COUNT(*) AS count\n"
//			+ "FROM `nic-api`.user\n" + "GROUP BY age_category", nativeQuery = true)
//	List<Object> getCountAge();
//
//	// BirthYear Category Count
//	@Query(value = "SELECT \n" + "    CONCAT(\n" + "        FLOOR(EXTRACT(YEAR FROM birthday) / 10) * 10, \n"
//			+ "        '-', \n" + "        FLOOR(EXTRACT(YEAR FROM birthday) / 10) * 10 + 9\n"
//			+ "    ) AS age_range, \n" + "    COUNT(*) AS count\n" + "FROM `nic-api`.user\n" + "GROUP BY age_range\n"
//			+ "ORDER BY age_range ASC;", nativeQuery = true)
//	List<Object> getCountBirthYear();

	
	
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
