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
	private static final String DURATION = "duration";
	

	private static final String CREATE_R_TABLE = String.format(
			"CREATE TABLE IF NOT EXISTS %s ( %s FLOAT NOT NULL, %s VARCHAR(250) NOT NULL, %s INT DEFAULT '12',  UNIQUE (%s))",
			R, R_VALUE, LOCATION, DURATION, LOCATION);
	private static final String INSERT_OR_UPDATE_INTO_R = String.format(
			"INSERT INTO %s (%s, %s, %s) VALUES (?,?,?) ON DUPLICATE KEY UPDATE %s = ?", R, R_VALUE, LOCATION, DURATION, R_VALUE);
	private static final String SELECT_FROM_R = String.format("SELECT %s, %s, %s FROM %s", R_VALUE, LOCATION, DURATION, R);
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
			ps.setFloat(1, r.getrValue());
			ps.setString(2, r.getLocation());
			ps.setInt(3, r.getDuration());
			ps.setFloat(4, r.getrValue());
			
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public List<R> getAllR() {
		openConnection();
		List<R> rList = new ArrayList<R>();
		try {
			Statement s = mConnection.createStatement();
			ResultSet rs = s.executeQuery(SELECT_FROM_R);
			while (rs.next()) {
				String location = rs.getString(LOCATION);
				float rValue = rs.getFloat(R_VALUE);
				int duration=rs.getInt(DURATION);
				R r = new R(rValue, location, duration);
				rList.add(r);
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
		return rList;
	}

	public void delete(R r) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(DELETE_FROM_R);
			ps.setFloat(1, r.getrValue());
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}
}