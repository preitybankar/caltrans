package com.caltrans.rusle.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.caltrans.rusle.models.LS;

public class LSTable extends DbConnection {
	private static final String LS = "ls";
	private static final String SLOPE = "slope";
	private static final String SLOPE_LENGTH = "slope_length";
	private static final String LS_VALUE = "ls_value";

	private static final String CREATE_LS_TABLE = String.format(
			"CREATE TABLE IF NOT EXISTS %s (%s FLOAT NOT NULL, %s INT NOT NULL, %s FLOAT NOT NULL, PRIMARY KEY (%s, %s))",
			LS, SLOPE, SLOPE_LENGTH, LS_VALUE, SLOPE, SLOPE_LENGTH);
	private static final String INSERT_OR_UPDATE_INTO_LS = String.format(
			"INSERT INTO %s (%s, %s, %s) VALUES (?,?,?) ON DUPLICATE KEY UPDATE %s = ?", LS, SLOPE, SLOPE_LENGTH,
			LS_VALUE, LS_VALUE);
	private static final String SELECT_FROM_LS = String.format("SELECT %s, %s, %s FROM %s", SLOPE, SLOPE_LENGTH,
			LS_VALUE, LS);
	private static final String DELETE_FROM_LS = String.format("DELETE FROM %s WHERE ABS(%s - ?) < 0.001 AND %s = ?", LS, SLOPE,
			SLOPE_LENGTH);

	public void createIfNotExist() {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(CREATE_LS_TABLE);
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public void insert(LS ls) {
		openConnection();
		try {
			System.out.println(INSERT_OR_UPDATE_INTO_LS);
			PreparedStatement ps = mConnection.prepareStatement(INSERT_OR_UPDATE_INTO_LS);
			ps.setFloat(1, ls.getSlope());
			ps.setInt(2, ls.getSlopeLength());
			ps.setFloat(3, ls.getLSValue());
			ps.setFloat(4, ls.getLSValue());
			System.out.println("Update query :: " + ps);
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public List<LS> getAllLS() {
		openConnection();
		List<LS> lsList = new ArrayList<LS>();
		try {
			Statement s = mConnection.createStatement();
			ResultSet rs = s.executeQuery(SELECT_FROM_LS);
			while (rs.next()) {
				float slope = rs.getFloat(SLOPE);
				int slopeLength = rs.getInt(SLOPE_LENGTH);
				float lsValue = rs.getFloat(LS_VALUE);
				LS ls = new LS(slope, slopeLength, lsValue);
				lsList.add(ls);
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
		return lsList;
	}

	public void delete(LS ls) {
		openConnection();
		try {
			System.out.println(DELETE_FROM_LS);
			System.out.println(ls);
			PreparedStatement ps = mConnection.prepareStatement(DELETE_FROM_LS);
			ps.setFloat(1, ls.getSlope());
			ps.setInt(2, ls.getSlopeLength());
			System.out.println(ps);
			int rowCount = ps.executeUpdate();
			if(rowCount > 0) {
				System.out.println("Record Deleted successfully from database. Total records deleted are :: " + rowCount);
			} else {
				System.out.println("false: Value could not be deleted from the database ::" + rowCount);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("An exception occured while Deleting records from Table. Exception is :: " + e);
		} finally {
			close();
		}
	}
}
