package com.caltrans.rusle;

import java.util.List;
import com.caltrans.rusle.db.LSTable;
import com.caltrans.rusle.models.LS;

public class Main {
	public static void main(String[] args) {
		LSTable lsTable = new LSTable();
		lsTable.createIfNotExist();
		lsTable.insert(new LS(0.2f, 3, 0.05f));
		lsTable.insert(new LS(0.2f, 6, 0.05f));
		lsTable.insert(new LS(0.2f, 9, 0.05f));
		lsTable.insert(new LS(0.2f, 12, 0.05f));
		lsTable.insert(new LS(0.2f, 15, 0.05f));
		lsTable.insert(new LS(0.2f, 25, 0.05f));
		lsTable.insert(new LS(0.2f, 50, 0.05f));
		lsTable.insert(new LS(0.2f, 75, 0.05f));
		lsTable.insert(new LS(0.2f, 100, 0.05f));
		lsTable.insert(new LS(0.2f, 150, 0.05f));
		lsTable.insert(new LS(0.2f, 200, 0.06f));
		lsTable.insert(new LS(0.2f, 250, 0.06f));
		lsTable.insert(new LS(0.2f, 300, 0.06f));
		lsTable.insert(new LS(0.2f, 400, 0.06f));
		lsTable.insert(new LS(0.2f, 600, 0.06f));
		lsTable.insert(new LS(0.2f, 800, 0.06f));
		lsTable.insert(new LS(0.2f, 1000, 0.06f));
		lsTable.insert(new LS(0.5f, 3, 0.07f));
		lsTable.insert(new LS(1f, 3, 0.09f));
		lsTable.insert(new LS(2f, 3, 0.13f));
		lsTable.insert(new LS(3f, 3, 0.17f));
		lsTable.insert(new LS(4f, 3, 0.20f));
		lsTable.insert(new LS(5f, 3, 0.23f));
		lsTable.insert(new LS(6f, 3, 0.26f));
		lsTable.insert(new LS(8f, 3, 0.32f));
		lsTable.insert(new LS(10f, 3, 0.35f));
		lsTable.insert(new LS(12f, 3, 0.36f));
		lsTable.insert(new LS(14f, 3, 0.38f));
		lsTable.insert(new LS(16f, 3, 0.39f));
		lsTable.insert(new LS(20f, 3, 0.41f));
		lsTable.insert(new LS(25f, 3, 0.45f));
		lsTable.insert(new LS(30f, 3, 0.48f));
		lsTable.insert(new LS(40f, 3, 0.53f));
		lsTable.insert(new LS(50f, 3, 0.58f));
		lsTable.insert(new LS(60f, 3, 0.63f));
		
		
		
		/*List<LS> lsList = lsTable.getAllLS();
		for (LS dbLS : lsList) {
			System.out.println(dbLS);
		}*/
		//lsTable.delete(new LS(1f, 3, 0.09f));
	}
}
