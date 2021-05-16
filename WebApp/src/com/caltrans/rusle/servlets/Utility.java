package com.caltrans.rusle.servlets;

import java.io.IOException;

import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletResponse;

public abstract class Utility {
	private static final String SUCCESS = "success";
	private static final String MESSAGE = "message";
	private static final String FAIL = "fail";
	private static final String ID = "id";
	
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
		responseJson.addProperty(SUCCESS, response.get(SUCCESS).getAsBoolean());
		responseJson.addProperty(ID, response.get(ID).getAsInt());
		responseJson.addProperty(MESSAGE, response.get(MESSAGE).getAsString());
		return responseJson.toString();
	}
	
	public static final void writeFailure(HttpServletResponse resp, String errorMsg) {
		resp.setStatus(500);
		resp.setContentType("application/json");
		try {
			JsonObject temp = new JsonObject();
			temp.addProperty(SUCCESS, false);
			temp.addProperty(MESSAGE, errorMsg);
			resp.getWriter().write(temp.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static String statusFail(JsonObject response) {
		JsonObject responseJson = new JsonObject();
		responseJson.addProperty(FAIL, response.get(FAIL).getAsBoolean());
		responseJson.addProperty(MESSAGE, response.get(MESSAGE).getAsString());
		return responseJson.toString();
	}
}
