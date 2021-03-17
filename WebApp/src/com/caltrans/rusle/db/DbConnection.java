package com.caltrans.rusle.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {
	private static final String JDBC_CONNECTION_STRING = "com.mysql.cj.jdbc.Driver";
	private static final String DB_CONNECTION_URL = "jdbc:mysql://localhost:3306/caltrans";
	private static final String DB_ADMIN = "root";
	private static final String DB_ADMIN_PASSWORD = "caltransadmin";

	protected Connection mConnection;

	protected void openConnection() {
		try {
			Class.forName(JDBC_CONNECTION_STRING);
			mConnection = DriverManager.getConnection(DB_CONNECTION_URL, DB_ADMIN, DB_ADMIN_PASSWORD);
			if (!mConnection.isClosed()) {
				System.out.printf("%s Successfully Connected!!!", this.getClass().getSimpleName());
				System.out.println();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void close() {
		try {
			mConnection.close();
			if (mConnection.isClosed()) {
				System.out.printf("%s DB connection closed successfully!!!", this.getClass().getSimpleName());
				System.out.println();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
