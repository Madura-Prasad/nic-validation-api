package com.example.demo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepo;

@DataJpaTest
public class test {
	@Autowired
	private UserRepo repo;

@Test
public void test() {
	User user = new User();
	user.setFull_name("dfgdf");
	
	repo.save(user);
	Assertions.assertThat(user.getId()).isGreaterThan(0);
}
}
