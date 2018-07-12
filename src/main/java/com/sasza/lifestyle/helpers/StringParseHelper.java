package com.sasza.lifestyle.helpers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringParseHelper {
	
	public static Date parseDate(String date) {
		
		Date formattedDate = null;
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		try {
            formattedDate = formatter.parse(date);            
        } catch (ParseException e) {
            e.printStackTrace();
        }
		
		return formattedDate;
	}
}
