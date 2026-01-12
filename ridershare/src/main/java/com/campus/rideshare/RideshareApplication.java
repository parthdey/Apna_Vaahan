package com.campus.rideshare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class RideshareApplication {

	public static void main(String[] args) {
		SpringApplication.run(RideshareApplication.class, args);
		System.out.println("\n========================================");
		System.out.println("🚀 Campus Rideshare App is Running!");
		System.out.println("📍 Access at: http://localhost:8080");
		System.out.println("========================================\n");
	}
}