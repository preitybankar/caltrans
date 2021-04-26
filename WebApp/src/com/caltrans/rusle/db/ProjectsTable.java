package com.caltrans.rusle.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.sql.Date;
import java.util.List;
import com.caltrans.rusle.models.Project;

public class ProjectsTable extends DbConnection {
	private static final String PROJECTS = "projects";
	private static final String ID = "id";
	private static final String NAME = "name";
	private static final String AREA = "area";
	private static final String START_DATE = "start_date";
	private static final String END_DATE = "end_date";
	private static final String LOCATION = "location";
	private static final String DESCRIPTION = "description";
	private static final String SITE_DETAILS = "site_details";
	
	private static final String CREATE_PROJECTS_TABLE = String.format(
			"CREATE TABLE IF NOT EXISTS %s (%s INT NOT NULL AUTO_INCREMENT, %s VARCHAR(250) NOT NULL, %s FLOAT NOT NULL, %s DATE NOT NULL, %s DATE NOT NULL, %s VARCHAR(250) NOT NULL, "
			+ "%s VARCHAR(250) NOT NULL, %s TEXT, PRIMARY KEY (%s))",
			PROJECTS, ID, NAME, AREA, START_DATE, END_DATE, LOCATION, DESCRIPTION, SITE_DETAILS, ID);
	
	private static final String INSERT_INTO_PROJECTS = String.format(
			"INSERT INTO %s (%s, %s, %s, %s, %s, %s, %s) VALUES (?, ?, ?, ?, ?, ?, ?)", PROJECTS, NAME, AREA, START_DATE, END_DATE, LOCATION, DESCRIPTION, SITE_DETAILS);
	
	
	private static final String UPDATE_PROJECTS = String.format(
			"UPDATE %s SET %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ?, %s = ? WHERE %s = ?", PROJECTS, NAME, AREA, START_DATE, END_DATE, LOCATION, DESCRIPTION, SITE_DETAILS, ID);
	
	private static final String SELECT_FROM_PROJECTS = String.format("SELECT %s, %s, %s, %s, %s, %s, %s, %s FROM %s", ID, NAME, AREA, START_DATE, END_DATE, LOCATION, DESCRIPTION, SITE_DETAILS, PROJECTS);
	
	private static final String DELETE_FROM_PROJECTS = String.format("DELETE FROM %s WHERE %s = ?", PROJECTS, ID);
	
	public void createIfNotExist() {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(CREATE_PROJECTS_TABLE);
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}
	
	public boolean insert(Project project) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(INSERT_INTO_PROJECTS);
			ps.setString(1, project.getName());
			ps.setFloat(2, project.getArea());
			ps.setDate(3, project.getStartDate());
			ps.setDate(4, project.getEndDate());
			ps.setString(5, project.getLocation());
			ps.setString(6, project.getDescription());
			ps.setString(7, project.getSiteDetails());
			ps.execute();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			close();
		}
		
	}
	
	public void update(Project project) {
		openConnection();
		try {
			System.out.println(UPDATE_PROJECTS);
			PreparedStatement ps = mConnection.prepareStatement(UPDATE_PROJECTS);
			ps.setString(1, project.getName());
			ps.setFloat(2, project.getArea());
			ps.setDate(3, project.getStartDate());
			ps.setDate(4, project.getEndDate());
			ps.setString(5, project.getLocation());
			ps.setString(6, project.getDescription());
			ps.setString(7, project.getSiteDetails());
			ps.setInt(8, project.getId());
			System.out.println(ps);
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public List<Project> getAllProjects() {
		openConnection();
		List<Project> projectList = new ArrayList<Project>();
		try {
			Statement s = mConnection.createStatement();
			ResultSet rs = s.executeQuery(SELECT_FROM_PROJECTS);
			while (rs.next()) {
				int id = rs.getInt(ID);
				String name = rs.getString(NAME);
				float area = rs.getFloat(AREA);
				Date startDate = rs.getDate(START_DATE);
				Date endDate = rs.getDate(END_DATE);
				String location = rs.getString(LOCATION);
				String description = rs.getString(DESCRIPTION);
				String siteDetails = rs.getString(SITE_DETAILS);
				Project project = new Project(id, name, area, startDate, endDate, location, description, siteDetails);
				projectList.add(project);
			}
			if (rs != null && !rs.isClosed()) {
				rs.close();
			}
			if (s != null && !s.isClosed()) {
				s.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
		return projectList;
	}
	
	public void delete(Project project) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(DELETE_FROM_PROJECTS);
			ps.setInt(1, project.getId());
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}
	
	
}
