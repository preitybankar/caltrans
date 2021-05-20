package com.caltrans.rusle.servlets;

import java.io.IOException;


import com.caltrans.rusle.db.LoginTable;
import com.caltrans.rusle.models.Login;
import com.caltrans.rusle.models.Project;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/json");

		String email = request.getParameter("email");
		LoginTable loginTable = new LoginTable();
		JsonArray json = new JsonArray();
		JsonObject logJSON  = new JsonObject();
		for(Login login : loginTable.getDetailsByEmail(email.toString())) {
  			logJSON.addProperty("id", login.getId());
			logJSON.addProperty("name", login.getName());
			logJSON.addProperty("email", login.getEmail());
			logJSON.addProperty("user_role", login.getUser_role());
			json.add(logJSON);
		}	
		response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(logJSON.toString());
		System.out.println("json : " + json); 
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/json");

		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		LoginTable loginTable = new LoginTable();
		JsonArray json = new JsonArray();
		JsonObject logJSON  = new JsonObject();
		if(loginTable.checkUser(email, password))
        {
			
			System.out.println("Correct login details");
			
			for(Login login : loginTable.getDetailsByEmail(email.toString())) {
      			logJSON.addProperty("success", true);
    			logJSON.addProperty("id", login.getId());
    			logJSON.addProperty("name", login.getName());
    			logJSON.addProperty("email", login.getEmail());
    			logJSON.addProperty("user_role", login.getUser_role());
    			json.add(logJSON);
			}			
        }
        else
        {
        	System.out.println("Username or Password is incorrect");
			logJSON.addProperty("success", false);
			json.add(logJSON);
			
        }
		
		//return responseJson.toString();
		response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(logJSON.toString());
		System.out.println("json : " + json); 
	}

}
