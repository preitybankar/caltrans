package com.caltrans.rusle.servlets;

import java.io.IOException;
import java.sql.Date;
import com.caltrans.rusle.db.ProjectsTable;
import com.caltrans.rusle.models.Project;
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
		JsonArray siteDetailsJsonArray = new JsonParser().parse(req.getParameter("sites")).getAsJsonArray();
		String siteDetails = siteDetailsJsonArray.toString();		
		
		ProjectsTable projectsTable = new ProjectsTable();
		projectsTable.createIfNotExist();
		JsonObject resultJson = new JsonObject();

		try {
				if (id == null) {	
					System.out.println("Inside If: INSERT"); 
					Project project = new Project(name, Float.parseFloat(area), Date.valueOf(startDate), Date.valueOf(endDate), location, description, siteDetails);	
					resultJson = projectsTable.insert(project);
					System.out.println("resultJson : " + resultJson.get("success")); 
					if (resultJson.get("success").getAsBoolean()) {
						Utility.writeSuccess(resp, resultJson);
					}
				
				} else { 
					System.out.println("Inside Else: UPDATE"); 
					System.out.println("ID : " + id); 	
					Project project = new Project(Integer.parseInt(id), name, Float.parseFloat(area), Date.valueOf(startDate), Date.valueOf(endDate), location, description, siteDetails);
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
		// TODO Auto-generated method stub
		super.doDelete(req, resp);
	}

}
