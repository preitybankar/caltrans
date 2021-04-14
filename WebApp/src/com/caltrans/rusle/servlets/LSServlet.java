package com.caltrans.rusle.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.stream.Collectors;

import com.caltrans.rusle.db.LSTable;
import com.caltrans.rusle.models.LS;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/ls")
public class LSServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/json");
		LSTable lsTable = new LSTable();
		JsonArray json = new JsonArray();
		for(LS ls : lsTable.getAllLS()) {
			JsonObject lsJSON  = new JsonObject();
			lsJSON.addProperty("slope", ls.getSlope());
			lsJSON.addProperty("slope_length", ls.getSlopeLength());
			lsJSON.addProperty("ls_value", ls.getLSValue());
			json.add(lsJSON);
		}
        response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/json");
		JsonArray json = new JsonArray();

		String ls_slope = request.getParameter("ls_slope");
		String ls_length = request.getParameter("ls_length");
		String ls_value = request.getParameter("ls_value");
		
		LS ls = new LS(Float.parseFloat(ls_slope), Integer.parseInt(ls_length), Float.parseFloat(ls_value));
		LSTable lsTable = new LSTable();
		lsTable.createIfNotExist();
		lsTable.insert(ls);
		response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}
	
	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("Inside doDelete");
		
		response.setContentType("text/json");
		JsonArray json = new JsonArray();
		
		JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);
		
		float ls_slope = data.get("slope").getAsFloat();
		int ls_length = data.get("slope_length").getAsInt();
		float ls_value = data.get("ls_value").getAsFloat();
		
		System.out.println(ls_slope);
		System.out.println(ls_length);
		System.out.println(ls_value);
	
		
		LS ls = new LS(ls_slope, ls_length, ls_value);
		
		System.out.println(ls);
		
		LSTable lsTable = new LSTable();	
		lsTable.delete(ls);
		response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}

}
