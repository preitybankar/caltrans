package com.caltrans.rusle.servlets;

import java.io.IOException;
import java.sql.Date;

import com.caltrans.rusle.db.LSTable;
import com.caltrans.rusle.db.ProjectsTable;
import com.caltrans.rusle.models.LS;
import com.caltrans.rusle.models.Project;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/project")
public class ProjectServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
        String id = req.getParameter("id");
        resp.setContentType("text/json");
		ProjectsTable projectsTable = new ProjectsTable();
		JsonArray json = new JsonArray();
        if (id == null) {
    		for(Project project : projectsTable.getAllProjects()) {
    			JsonObject projectJSON  = new JsonObject();
    			projectJSON.addProperty("id", project.getId());
    			projectJSON.addProperty("name", project.getName());
    			projectJSON.addProperty("area", project.getArea());
    			projectJSON.addProperty("start_date", project.getStartDate().toString());
    			projectJSON.addProperty("end_date", project.getEndDate().toString());
    			projectJSON.addProperty("location", project.getLocation());
    			projectJSON.addProperty("description", project.getDescription());
    			projectJSON.addProperty("pre_construction_soil_loss", project.getPreSoilLoss());
    			projectJSON.addProperty("post_construction_soil_loss", project.getPostSoilLoss());
    			projectJSON.addProperty("sites", project.getSiteDetails());
    			json.add(projectJSON);
    		}
    		
        } else {
        	for(Project project : projectsTable.getProjectById(id.toString())) {
    			JsonObject projectJSON  = new JsonObject();
    			projectJSON.addProperty("id", project.getId());
    			projectJSON.addProperty("name", project.getName());
    			projectJSON.addProperty("area", project.getArea());
    			projectJSON.addProperty("start_date", project.getStartDate().toString());
    			projectJSON.addProperty("end_date", project.getEndDate().toString());
    			projectJSON.addProperty("location", project.getLocation());
    			projectJSON.addProperty("description", project.getDescription());
    			projectJSON.addProperty("pre_construction_soil_loss", project.getPreSoilLoss());
    			projectJSON.addProperty("post_construction_soil_loss", project.getPostSoilLoss());
    			projectJSON.addProperty("sites", project.getSiteDetails());
    			json.add(projectJSON);
    		}
        	
        }
        resp.setStatus(200);
		resp.setContentType("application/json");
		resp.getWriter().write(json.toString()); 	
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {	
		String id = req.getParameter("id");
		String name = req.getParameter("name");
		String area = req.getParameter("area");
		String startDate = req.getParameter("start_date");
		String endDate = req.getParameter("end_date");
		String location = req.getParameter("location");
		String description = req.getParameter("description");
		String preSoilLoss = req.getParameter("pre_construction_soil_loss");
		String postSoilLoss = req.getParameter("post_construction_soil_loss");
		String sites = req.getParameter("sites");
		JsonArray siteDetailsJsonArray = new JsonParser().parse(sites).getAsJsonArray();
		String siteDetails = siteDetailsJsonArray.toString();
		
		if (!Validator.isValidString(name)) {
			Utility.writeFailure(resp, "Please enter project name.");
			return;
		} else if (!Validator.isFloatString(area)) {
			Utility.writeFailure(resp, "Please enter valid project area.");
			return;
		} else if (!Validator.isValidDate(startDate)) {
			Utility.writeFailure(resp, "Please enter valid project start date.");
			return;
		} else if (!Validator.isValidDate(endDate)) {
			Utility.writeFailure(resp, "Please enter valid project end date.");
			return;
		} else if (!Validator.isValidString(location)) {
			Utility.writeFailure(resp, "Please enter project location.");
			return;
		} else if (!Validator.isValidString(description)) {
			Utility.writeFailure(resp, "Please enter project description.");
			return;
		}
		
		ProjectsTable projectsTable = new ProjectsTable();
		projectsTable.createIfNotExist();
		JsonObject resultJson = new JsonObject();

		try {
				if (id == null) {
					System.out.println("Inside If: INSERT"); 
					Project project = new Project(name, Float.parseFloat(area.trim()), Date.valueOf(startDate), Date.valueOf(endDate), location, description, Float.parseFloat(preSoilLoss.trim()), Float.parseFloat(postSoilLoss.trim()), siteDetails);	
					resultJson = projectsTable.insert(project);
					System.out.println("resultJson : " + resultJson.get("success")); 
					if (resultJson.get("success").getAsBoolean()) {
						Utility.writeSuccess(resp, resultJson);
					}
				
				} else { 
					System.out.println("Inside Else: UPDATE"); 
					System.out.println("ID : " + id); 	
					Project project = new Project(Integer.parseInt(id), name, Float.parseFloat(area.trim()), Date.valueOf(startDate), Date.valueOf(endDate), location, description, Float.parseFloat(preSoilLoss.trim()), Float.parseFloat(postSoilLoss.trim()), siteDetails);
					resultJson = projectsTable.update(project);
					if (resultJson.get("success").getAsBoolean() == true) {
						Utility.writeSuccess(resp, resultJson);
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				resultJson.addProperty("fail", true);
				resultJson.addProperty("message", e.getMessage().strip());
				Utility.writeFailure(resp, resultJson);
			}
		
	}
		


	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
        resp.setContentType("text/json");
		JsonArray json = new JsonArray();
		
		JsonObject data = new Gson().fromJson(req.getReader(), JsonObject.class);		
		int id = data.get("id").getAsInt();
		String name = data.get("name").getAsString();
		float area = data.get("area").getAsFloat();	
		String startDate = data.get("start_date").getAsString();
		String endDate = data.get("end_date").getAsString();
		String location = data.get("location").getAsString();
		String description = data.get("description").getAsString();
		float preSoilLoss = data.get("pre_construction_soil_loss").getAsFloat();
		float postSoilLoss = data.get("post_construction_soil_loss").getAsFloat();
		String sites = data.get("sites").getAsString();
		JsonArray siteDetailsJsonArray = new JsonParser().parse(sites).getAsJsonArray();
		String siteDetails = siteDetailsJsonArray.toString();
		
		System.out.println("id :: " + id);
		System.out.println("name :: " + name);
		System.out.println("area :: " + area);
		System.out.println("startDate :: " + startDate);
		System.out.println("endDate :: " + endDate);
		System.out.println("location :: " + location);
		System.out.println("description :: " + description);
		System.out.println("preSoilLoss :: " + preSoilLoss);
		System.out.println("postSoilLoss :: " + postSoilLoss);
		System.out.println("siteDetails :: " + siteDetails);
				
		Project project = new Project(id, name, area, Date.valueOf(startDate), Date.valueOf(endDate), location, description, preSoilLoss, postSoilLoss, siteDetails);
		ProjectsTable projectsTable = new ProjectsTable();
		projectsTable.delete(project);

        resp.setStatus(200);
		resp.setContentType("application/json");
		resp.getWriter().write(json.toString());
		
	}

}
