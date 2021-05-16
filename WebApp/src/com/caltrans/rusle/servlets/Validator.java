package com.caltrans.rusle.servlets;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class Validator {
	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    public static boolean isValidDate(final String date) {
    	if(!isValidString(date)) {
    		return false;
    	}
        try {
            sdf.parse(date);
            sdf.setLenient(false);
            return true;
        } catch (ParseException e) {
            e.printStackTrace();
            return false;
        }
    }
    
	public static boolean isValidString(String str) {
		return str != null && !str.isBlank();
	}
	
	public static boolean isFloatString(String num) {
		return isValidString(num) && num.matches("[-+]?[0-9]*\\.?[0-9]+");
	}
}
