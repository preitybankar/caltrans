package com.caltrans.rusle.servlets;

import java.io.IOException;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletResponse;

public abstract class Utility {
	public static final void writeSuccess(HttpServletResponse resp) {
		resp.setStatus(200);
		resp.setContentType("application/json");
		try {
			resp.getWriter().write(status(true));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static final void writeFailure(HttpServletResponse resp) {
		resp.setStatus(500);
		resp.setContentType("application/json");
		try {
			resp.getWriter().write(status(false));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static String status(boolean success) {
		JsonObject responseJson = new JsonObject();
		responseJson.addProperty("success", success);
		return responseJson.toString();
	}
}
