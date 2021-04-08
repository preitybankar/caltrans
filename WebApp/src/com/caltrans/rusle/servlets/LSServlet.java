package com.caltrans.rusle.servlets;

import java.io.IOException;
import com.caltrans.rusle.db.LSTable;
import com.caltrans.rusle.models.LS;
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

}
