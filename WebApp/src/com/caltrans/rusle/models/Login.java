package com.caltrans.rusle.models;

public class Login {
	private int id;
	private String name;
	private String email;
	private String password;
	private String user_role;
	
	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getUser_role() {
		return user_role;
	}

	
	public void setId(int id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setUser_role(String user_role) {
		this.user_role = user_role;
	}

	public Login(String name, String email, String password, String user_role) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.user_role = user_role;
	}
	
	public Login(String name, String email, String password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
	public Login(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public Login(int id, String name, String email, String user_role) {
		this.id=id;
		this.name = name;
		this.email = email;
		this.user_role = user_role;
	}

	@Override
	public String toString() {
		return String.format("id: %s, name: %s, email: %s, password: %s, user_role: %s,", id, name, email, password, user_role);
	}
}
