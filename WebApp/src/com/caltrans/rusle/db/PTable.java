package com.caltrans.rusle.db;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.caltrans.rusle.models.C;
import com.caltrans.rusle.models.P;

public class PTable extends DbConnection {
	private static final String P = "p";
	private static final String SupportPractices = "supportpractices_name";
	private static final String REFERENCE = "reference";
	private static final String P_VALUE = "p_value";

	private static final String CREATE_P_TABLE = String.format(
			"CREATE TABLE IF NOT EXISTS %s (%s VARCHAR(250) NOT NULL, %s VARCHAR(250) NOT NULL, %s FLOAT NOT NULL, PRIMARY KEY (%s))",
			P, SupportPractices, REFERENCE, P_VALUE, SupportPractices);
	private static final String INSERT_OR_UPDATE_INTO_P = String.format(
			"INSERT INTO %s (%s, %s, %s) VALUES (?,?,?) ON DUPLICATE KEY UPDATE %s = ?", P, SupportPractices, REFERENCE,
			P_VALUE, P_VALUE);
	private static final String SELECT_FROM_P = String.format("SELECT %s, %s, %s FROM %s", SupportPractices, REFERENCE,
			P_VALUE, P);
	private static final String DELETE_FROM_P = String.format("DELETE FROM %s WHERE %s = ?", P, SupportPractices);

	public void createIfNotExist() {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(CREATE_P_TABLE);
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public void insert(P p) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(INSERT_OR_UPDATE_INTO_P);
			ps.setString(1, p.getSupportPracticesName());
			ps.setString(2, p.getReference());
			ps.setFloat(3, p.getPValue());
			ps.setFloat(4, p.getPValue());
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}

	public List<P> getAllP() {
		openConnection();
		List<P> pList = new ArrayList<P>();
		try {
			Statement s = mConnection.createStatement();
			ResultSet rs = s.executeQuery(SELECT_FROM_P);
			while (rs.next()) {
				String supportpracticesName = rs.getString(SupportPractices);
				String reference = rs.getString(REFERENCE);
				float pValue = rs.getFloat(P_VALUE);
				P p = new P(supportpracticesName, reference, pValue);
				pList.add(p);
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
		return pList;
	}

	/*public void delete(P p) {
		openConnection();
		try {
			PreparedStatement ps = mConnection.prepareStatement(DELETE_FROM_P);
			ps.setString(1, p.getSupportPracticesName());
			ps.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			close();
		}
	}*/
	
	public void delete(P p) {
		openConnection();
		try {
			System.out.println(DELETE_FROM_P);
			System.out.println(p);
			PreparedStatement ps = mConnection.prepareStatement(DELETE_FROM_P);
			ps.setString(1, p.getSupportPracticesName());
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