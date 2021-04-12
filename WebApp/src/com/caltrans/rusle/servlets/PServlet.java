package com.caltrans.rusle.servlets;

import java.io.IOException;

import com.caltrans.rusle.db.PTable;
import com.caltrans.rusle.models.P;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/p")
public class PServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/json");
		PTable pTable = new PTable();
		JsonArray json = new JsonArray();
		for(P p : pTable.getAllP()) {
			JsonObject pJSON  = new JsonObject();
			pJSON.addProperty("supportpractices_name", p.getSupportPracticesName());
			pJSON.addProperty("reference", p.getReference());
			pJSON.addProperty("p_value", p.getPValue());
			json.add(pJSON);
		}
        response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/json");
		JsonArray json = new JsonArray();

		String supportpractices_name = request.getParameter("supportpractices_name");
		String reference = request.getParameter("reference");
		String p_value = request.getParameter("p_value");
		
		P p = new P(supportpractices_name, reference, Float.parseFloat(p_value));
		PTable pTable = new PTable();
		pTable.createIfNotExist();
		pTable.insert(p);
		response.setStatus(200);
		response.setContentType("application/json");
		response.getWriter().write(json.toString());
	}

}
