package com.campus.rideshare.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class SignupRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String phone;

    @NotBlank(message = "Roll number is required")
    private String rollNumber;

    // Vehicle details (optional, only for riders)
    private Boolean isRider;
    private String vehicleNumber;
    private String vehicleModel;

    // Explicit getter for isRider (Lombok might have issues with Boolean 'is' prefix)
    public Boolean getIsRider() {
        return isRider;
    }


    public void setIsRider(Boolean isRider) {
        this.isRider = isRider;
    }
}