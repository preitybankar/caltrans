package com.caltrans.rusle;

import java.sql.Date;
import java.util.List;
import com.caltrans.rusle.db.LSTable;
import com.caltrans.rusle.models.LS;
import com.caltrans.rusle.db.CTable;
import com.caltrans.rusle.models.C;
import com.caltrans.rusle.db.RTable;
import com.caltrans.rusle.models.R;
import com.caltrans.rusle.db.PTable;
import com.caltrans.rusle.models.P;
import com.caltrans.rusle.models.Project;
import com.caltrans.rusle.db.ProjectsTable;
import com.caltrans.rusle.db.LoginTable;
import com.caltrans.rusle.models.Login;

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
		
		CTable cTable = new CTable();
		cTable.createIfNotExist();
		cTable.insert(new C("Straw (2 ton/acre)", "USDA straw small grain", 0.02f));
		cTable.insert(new C("BFM", "NTPEP ASTM 6459", 0.003f));
		cTable.insert(new C("Hydroseed", "USDA; permanent seeding (90 percent stand).", 0.01f));
		cTable.insert(new C("Jute Net", "-", 0.02f));
		cTable.insert(new C("Pavement", "Assumed to match lowest C factor", 0.001f));
		cTable.insert(new C("Competent gravel cover", "-", 0.05f));
		cTable.insert(new C("Earthguard Fiber Matrix", "NTPEP ASTM 6459", 0.001f));
		cTable.insert(new C("Grass, grasslike plants, or decaying compacted plant litter (80% cover)", "-", 0.013f));
		cTable.insert(new C("Mostly weeds with little lateral root networks or undecayed residues (80% cover)", "-", 0.043f));
		cTable.insert(new C("Tall weeds or short brush (average 20 inches high) (80% cover)", "-", 0.038f));
		cTable.insert(new C("None (Bare soil)", "USDA", 1.0f));
		cTable.insert(new C("Coconut fiber net", "AEC Product Data Sheet", 0.1f));
		
		PTable pTable = new PTable();
		pTable.createIfNotExist();
		pTable.insert(new P("Loose(no practices)", "USDA straw small grain", 1.0f));
		pTable.insert(new P("Track Walking (perpendicular to flow)", "NTPEP ASTM 6459", 0.9f));
		pTable.insert(new P("Terracing", "USDA; permanent seeding (90 percent stand).", 0.7f));
		pTable.insert(new P("Benching", "USDA", 0.7f));
		pTable.insert(new P("Fiber rolls ", "Assumed to match lowest P factor", 0.8f));
		pTable.insert(new P("Compacted/smooth", "NTPEP ASTM 6459", 1.3f));
		
		RTable rTable = new RTable();
		rTable.createIfNotExist(); 
		//rTable.insert(new R(45.49f, "Sacramento",12));
		//rTable.insert(new R(47.73f, "Davis",12));
		//rTable.insert(new R(52.53f, "Folsom",12));
		
		ProjectsTable project = new ProjectsTable();
		project.createIfNotExist();
		// project.insert(new Project("6369 Zulmida Backyard gardening project", 5000f, Date.valueOf("2021-04-21"), Date.valueOf("2021-04-30"), "backyard", "water irrigation system gardening", "{site 1}"));
		// project.update(new Project(1,"6369 Zulmida Backyard gardening project", 66000f, Date.valueOf("2021-04-10"), Date.valueOf("2021-04-20"), "backyard", "water irrigation system gardening", "{site 234}"));
		// project.delete(new Project(1,"6369 Zulmida Backyard gardening project", 66000f, Date.valueOf("2021-04-10"), Date.valueOf("2021-04-20"), "backyard", "water irrigation system gardening", "{site 234}")); 

		/*List<LS> lsList = lsTable.getAllLS();
		for (LS dbLS : lsList) {
			System.out.println(dbLS);
		}*/
		//lsTable.delete(new LS(1f, 3, 0.09f));
		
		LoginTable loginTable = new LoginTable();
		loginTable.createIfNotExist();
		loginTable.insert(new Login("Priti", "pritigbankar@csus.edu", "pritiadmin123", "admin"));
		loginTable.insert(new Login("Lekha", "llekha@csus.edu", "admin123", "admin"));
		loginTable.insert(new Login("user", "usermail@gmail.com", "user123", "guest"));
	}
}
