package com.caltrans.rusle.db;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.caltrans.rusle.models.LS;
import com.caltrans.rusle.models.Login;
import com.caltrans.rusle.models.Project;

public class LoginTable extends DbConnection {
	private static final String LOGIN = "login";
	private static final String ID = "id";
	private static final String NAME = "name";
	private static final String EMAIL = "email";
	private static final String PASSWORD = "password";
	private static final String USER_ROLE = "user_role";
	
	
	private static final String CREATE_LOGIN_TABLE = String.format(
			"CREATE TABLE IF NOT EXISTS %s (%s INT NOT NULL AUTO_INCREMENT, %s VARCHAR(250) NOT NULL, %s VARCHAR(250) NOT NULL, %s VARCHAR(250) NOT NULL, %s VARCHAR(250) NOT NULL DEFAULT 'guest',  PRIMARY KEY (%s,%s))",
			LOGIN, ID, NAME, EMAIL, PASSWORD, USER_ROLE, ID, EMAIL);
	private static final String INSERT_OR_UPDATE_INTO_LOGIN = String.format(
			"INSERT INTO %s (%s, %s, %s, %s) VALUES (?,?,?,?)", LOGIN, NAME, EMAIL, PASSWORD, USER_ROLE);

	

	public void createIfNotExist() {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(CREATE_LOGIN_TABLE);
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public void insert(Login log) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(INSERT_OR_UPDATE_INTO_LOGIN);
			ps.setString(1, log.getName());
			ps.setString(2, log.getEmail());
			ps.setString(3, log.getPassword());
			ps.setString(4, log.getUser_role());
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}
	



	 public boolean checkUser(String email,String password) 
	    {
	        boolean st = false;
        	openConnection();
        	try {
            
	            PreparedStatement ps = mConnection.prepareStatement("select id, name, email, user_role from login where email=? and password=?");
	            ps.setString(1, email);
	            ps.setString(2, password);
	            ResultSet rs =ps.executeQuery();
	            st = rs.next();
	            
	        }
	        catch(Exception e) {
	            e.printStackTrace();
	        }finally {
				close();
			}
	        return st;                 
	    }   



public List<Login> getDetailsByEmail(String loginuser) {
	openConnection();
	List<Login> loginList = new ArrayList<Login>();
	try {
		Statement s = mConnection.createStatement();
		ResultSet rs = s.executeQuery("select id, name, email, user_role from login where email = '" + loginuser + "'");
		while (rs.next()) {
			int id = rs.getInt(ID);
			String name = rs.getString(NAME);
			String email = rs.getString(EMAIL);
			String user_role = rs.getString(USER_ROLE);
			Login login = new Login(id, name, email, user_role);
			loginList.add(login);
		}
		if (rs != null && !rs.isClosed()) {
			rs.close();
		}
		if (s != null && !s.isClosed()) {
			s.close();
		}
	} catch (SQLException e) {
		e.printStackTrace();
	} finally {
		close();
	}
	// System.out.println("projectList" + projectList);
	return loginList;	
}

public boolean checkforregistration(String email) 
{
    boolean st = false;
	openConnection();
	try {
    
        PreparedStatement ps = mConnection.prepareStatement("select id, name, email, user_role from login where email=?");
        ps.setString(1, email);
        ResultSet rs =ps.executeQuery();
        st = rs.next();
        
    }
    catch(Exception e) {
        e.printStackTrace();
    }finally {
		close();
	}
    return st;                 
}   


}