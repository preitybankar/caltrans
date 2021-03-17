package com.caltrans.rusle;

import java.util.List;
import com.caltrans.rusle.db.LSTable;
import com.caltrans.rusle.models.LS;

public class Main {
	public static void main(String[] args) {
		LSTable lsTable = new LSTable();
		lsTable.createIfNotExist();
		lsTable.insert(new LS(0.2f, 3, 0.05f));
		lsTable.insert(new LS(0.5f, 3, 0.07f));
		lsTable.insert(new LS(1f, 3, 0.09f));
		lsTable.insert(new LS(0.2f, 6, 0.05f));
		
		/*List<LS> lsList = lsTable.getAllLS();
		for (LS dbLS : lsList) {
			System.out.println(dbLS);
		}*/
		//lsTable.delete(new LS(1f, 3, 0.09f));
	}
}
