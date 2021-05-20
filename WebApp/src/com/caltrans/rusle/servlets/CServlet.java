package com.caltrans.rusle.servlets;

import java.io.IOException;

import com.caltrans.rusle.db.CTable;
import com.caltrans.rusle.models.C;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/c")
public class CServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/json");
		CTable cTable = new CTable();
		JsonArray json = new JsonArray();
		for(C c : cTable.getAllC()) {
			JsonObject cJSON  = new JsonObject();
			cJSON.addProperty("bmp_name", c.getBMPName());
			cJSON.addProperty("reference", c.getReference());
			cJSON.addProperty("c_value", c.getCValue());
			json.add(cJSON);
		}
        response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/json");
		JsonArray json = new JsonArray();
		
		JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);		
		String bmp = data.get("bmp_name").getAsString();
		String reference = data.get("reference").getAsString();
		float c_value = data.get("c_value").getAsFloat();
		
		C c = new C(bmp, reference, c_value);
		CTable cTable = new CTable();
		cTable.createIfNotExist();
		cTable.insert(c);
		response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}
	
	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/json");
		JsonArray json = new JsonArray();	
		JsonObject data = new Gson().fromJson(request.getReader(), JsonObject.class);		
		String bmp = data.get("bmp_name").getAsString();
		String reference = data.get("reference").getAsString();
		float c_value = data.get("c_value").getAsFloat();
		
		C c = new C(bmp, reference, c_value);
		CTable cTable = new CTable();	
		cTable.delete(c);
		response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}

}
