package com.example.demo.model;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long Id;

	@Column(name = "full_name")
	private String full_name;

	@Column(name = "address")
	private String address;

	@Column(name = "mobile")
	private String mobile;

	@Column(name = "nic")
	private String nic;

	@Column(name = "nationality")
	private String nationality;

	@Column(name = "birthday")
	private LocalDate  birthday;

	@Column(name = "age")
	private Integer age;

	@Column(name = "gender")
	private String gender;

	public long getId() {
		return Id;
	}

	public void setId(long id) {
		Id = id;
	}

	public String getFull_name() {
		return full_name;
	}

	public void setFull_name(String full_name) {
		this.full_name = full_name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getNic() {
		return nic;
	}

	public void setNic(String nic) {
		this.nic = nic;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public LocalDate  getBirthday() {
		return birthday;
	}

	public void setBirthday(LocalDate  birthday) {
		this.birthday = birthday;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public User(long id, String full_name, String address, String mobile, String nic, String nationality, LocalDate  birthday,
			Integer age, String gender) {
		super();
		Id = id;
		this.full_name = full_name;
		this.address = address;
		this.mobile = mobile;
		this.nic = nic;
		this.nationality = nationality;
		this.birthday = birthday;
		this.age = age;
		this.gender = gender;
	}

	public User() {

	}

}
