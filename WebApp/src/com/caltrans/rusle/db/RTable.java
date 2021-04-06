package com.caltrans.rusle.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.caltrans.rusle.models.R;

public class RTable extends DbConnection {
	private static final String R = "r";
	private static final String R_VALUE = "r_value";
	private static final String LOCATION = "location";
	

	private static final String CREATE_R_TABLE = String.format(
			"CREATE TABLE IF NOT EXISTS %s (%s VARCHAR(250) NOT NULL, %s VARCHAR(250) NOT NULL,  PRIMARY KEY (%s))",
			R, R_VALUE, LOCATION, R_VALUE);
	private static final String INSERT_OR_UPDATE_INTO_R = String.format(
			"INSERT INTO %s (%s, %s) VALUES (?,?) ON DUPLICATE KEY UPDATE %s = ?", R, R_VALUE, LOCATION, R_VALUE);
	private static final String DELETE_FROM_R = String.format("DELETE FROM %s WHERE %s = ?", R, R_VALUE);

	public void createIfNotExist() {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(CREATE_R_TABLE);
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public void insert(R r) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(INSERT_OR_UPDATE_INTO_R);
			ps.setString(1, r.getrValue());
			ps.setString(2, r.getLocation());
			ps.setString(3, r.getrValue());
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	

	public void delete(R r) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(DELETE_FROM_R);
			ps.setString(1, r.getrValue());
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}
}