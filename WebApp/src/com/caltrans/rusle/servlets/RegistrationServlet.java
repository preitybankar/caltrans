package com.caltrans.rusle.servlets;

import java.io.IOException;

import com.caltrans.rusle.db.LoginTable;
import com.caltrans.rusle.models.Login;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/registration")
public class RegistrationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/json");
		JsonArray json = new JsonArray();

		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String user_role="guest";
		
		Login login = new Login(name, email, password, user_role);
		LoginTable loginTable = new LoginTable();
		
		
		LoginTable newloginTable = new LoginTable();
		JsonArray newjson = new JsonArray();
		JsonObject logJSON  = new JsonObject();
		
		if(loginTable.checkforregistration(email))
        {
			
			System.out.println("Username exists");
			logJSON.addProperty("success", false);
			json.add(logJSON);
        }
        else
        {
        	System.out.println("Registed succesfully");
        	loginTable.createIfNotExist();
    		loginTable.insert(login);
    		
    		for(Login newlogin : newloginTable.getDetailsByEmail(email.toString())) {
    			logJSON.addProperty("success", true);
      			logJSON.addProperty("id", newlogin.getId());
    			logJSON.addProperty("name", newlogin.getName());
    			logJSON.addProperty("email", newlogin.getEmail());
    			logJSON.addProperty("user_role", newlogin.getUser_role());
    			newjson.add(logJSON);
    		}	
			
        }
		
		
		response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(logJSON.toString());
		System.out.println("json : " + json); 
		
		
	}

}
