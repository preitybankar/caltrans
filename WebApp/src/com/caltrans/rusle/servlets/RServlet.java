package com.caltrans.rusle.servlets;

import java.io.IOException;

import com.caltrans.rusle.db.RTable;
import com.caltrans.rusle.models.R;
import com.google.gson.JsonArray;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/r")
public class RServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doGet(request, response);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/json");
		JsonArray json = new JsonArray();
		
		String R_value = request.getParameter("r_value");
		Float  RValue=Float.parseFloat(R_value );  
		String Location = request.getParameter("location");
		
		R r= new R(RValue, Location);
		RTable rtable = new RTable();
		rtable.createIfNotExist();
		if (!R_value.isBlank() && !Location.isBlank())
		{
			rtable.insert(r);
		}
		resp.setContentType("application/json");
		resp.getWriter().write(json.toString());
		
	}

}
