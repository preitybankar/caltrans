package com.caltrans.rusle.servlets;

import java.io.IOException;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletResponse;

public abstract class Utility {
	public static final void writeSuccess(HttpServletResponse resp, JsonObject sqlResp) {
		resp.setStatus(200);
		resp.setContentType("application/json");
		try {
			resp.getWriter().write(statusSuccess(sqlResp));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static final void writeFailure(HttpServletResponse resp, JsonObject sqlResp) {
		resp.setStatus(500);
		resp.setContentType("application/json");
		try {
			resp.getWriter().write(statusFail(sqlResp));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static String statusSuccess(JsonObject response) {
		JsonObject responseJson = new JsonObject();
		responseJson.addProperty("success", response.get("success").getAsBoolean());
		responseJson.addProperty("id", response.get("id").getAsInt());
		responseJson.addProperty("message", response.get("message").getAsString());
		return responseJson.toString();
	}
	
	private static String statusFail(JsonObject response) {
		JsonObject responseJson = new JsonObject();
		responseJson.addProperty("fail", response.get("fail").getAsBoolean());
		responseJson.addProperty("message", response.get("message").getAsString());
		return response.toString();
	}
}
