package com.campus.rideshare.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Data  // ✅ THIS IS CRITICAL - It auto-generates getters/setters
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Indexed(unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phone;

    @NotBlank(message = "Roll number is required")
    @Indexed(unique = true)
    private String rollNumber;

    // Vehicle details
    private String vehicleType; // "Two Wheeler" or null
    private String vehicleNumber;
    private String vehicleModel;

    // Is this user a rider (has vehicle)?
    private boolean isRider;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor
    public User() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}