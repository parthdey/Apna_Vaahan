package com.campus.rideshare.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateRideRequest {
    @NotBlank(message = "End location is required")
    private String endLocation;

    @NotNull(message = "Date is required")
    private String date; // Format: YYYY-MM-DD

    @NotNull(message = "Time is required")
    private String time; // Format: HH:MM

    @NotNull(message = "Distance is required")
    @Min(value = 1, message = "Distance must be at least 1 km")
    private Integer distanceKm;

    @NotNull(message = "Available seats is required")
    @Min(value = 1, message = "At least 1 seat required")
    private Integer availableSeats;
}
