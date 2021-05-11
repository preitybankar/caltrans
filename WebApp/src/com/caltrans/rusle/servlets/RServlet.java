package com.caltrans.rusle.servlets;

import java.io.IOException;

import com.caltrans.rusle.db.RTable;
import com.caltrans.rusle.models.R;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

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
		response.setContentType("text/json");
		RTable rTable = new RTable();
		JsonArray json = new JsonArray();
		for(R r : rTable.getAllR()) {
			JsonObject rJSON  = new JsonObject();
			rJSON.addProperty("location", r.getLocation());
			rJSON.addProperty("r_value", r.getrValue());
			//rJSON.addProperty("duration", r.getDuration());
			json.add(rJSON);
		}
        response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/json");
		JsonArray json = new JsonArray();
		
		String R_value = request.getParameter("r_value");
		Float  RValue=Float.parseFloat(R_value );  
		String Location = request.getParameter("location");
		//String RDuration= request.getParameter("duration");
		//int  Duration=12;
		//if(RDuration!=null) {
		//	Duration= Integer.parseInt(RDuration);
		//}
		
		//R r = new R(RValue, Location, Duration);
		R r = new R(RValue, Location);
		RTable rtable = new RTable();
		rtable.createIfNotExist();
		rtable.insert(r);
		resp.setStatus(200);
		resp.setContentType("application/json");
		resp.getWriter().write(json.toString());
		
	}
	
	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		System.out.println("Inside doDelete");

		response.setContentType("text/json");
		JsonArray json = new JsonArray();

		JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);

		String location = data.get("location").getAsString();
		//int duration = data.get("duration").getAsInt();
		float r_value = data.get("r_value").getAsFloat();

		System.out.println(location);
		//System.out.println(duration);
		System.out.println(r_value);


		R r = new R(r_value, location);

		System.out.println(r);

		RTable rTable = new RTable();	
		rTable.delete(r);
		response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}
	
	

}
