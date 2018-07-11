package com.sasza.lifestyle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LifestyleApplication {

	public static void main(String[] args) {
		//JDBCConnector.createDatabase();
		//SchemaGenerator.createExportFile();
		SpringApplication.run(LifestyleApplication.class, args);
	}
}
