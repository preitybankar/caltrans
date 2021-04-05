package com.caltrans.rusle.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.caltrans.rusle.models.C;

public class CTable extends DbConnection {
	private static final String C = "c";
	private static final String BMP = "bmp_name";
	private static final String REFERENCE = "reference";
	private static final String C_VALUE = "c_value";

	private static final String CREATE_C_TABLE = String.format(
			"CREATE TABLE IF NOT EXISTS %s (%s VARCHAR(250) NOT NULL, %s VARCHAR(250) NOT NULL, %s FLOAT NOT NULL, PRIMARY KEY (%s))",
			C, BMP, REFERENCE, C_VALUE, BMP);
	private static final String INSERT_OR_UPDATE_INTO_C = String.format(
			"INSERT INTO %s (%s, %s, %s) VALUES (?,?,?) ON DUPLICATE KEY UPDATE %s = ?", C, BMP, REFERENCE,
			C_VALUE, C_VALUE);
	private static final String SELECT_FROM_C = String.format("SELECT %s, %s, %s FROM %s", BMP, REFERENCE,
			C_VALUE, C);
	private static final String DELETE_FROM_C = String.format("DELETE FROM %s WHERE %s = ?", C, BMP);

	public void createIfNotExist() {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(CREATE_C_TABLE);
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public void insert(C c) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(INSERT_OR_UPDATE_INTO_C);
			ps.setString(1, c.getBMPName());
			ps.setString(2, c.getReference());
			ps.setFloat(3, c.getCValue());
			ps.setFloat(4, c.getCValue());
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public List<C> getAllC() {
		openConnection();
		List<C> cList = new ArrayList<C>();
		try {
			Statement s = mConnection.createStatement();
			ResultSet rs = s.executeQuery(SELECT_FROM_C);
			while (rs.next()) {
				String bmpName = rs.getString(BMP);
				String reference = rs.getString(REFERENCE);
				float cValue = rs.getFloat(C_VALUE);
				C c = new C(bmpName, reference, cValue);
				cList.add(c);
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
		return cList;
	}

	public void delete(C c) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(DELETE_FROM_C);
			ps.setString(1, c.getBMPName());
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}
}