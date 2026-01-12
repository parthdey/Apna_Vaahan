package com.campus.rideshare.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Document(collection = "rides")
public class Ride {

    @Id
    private String id;

    // Rider reference
    @DBRef
    private User rider;

    // Location details
    @NotBlank(message = "Start location is required")
    private String startLocation; // Default: "College"

    @NotBlank(message = "End location is required")
    private String endLocation;

    // Date and time
    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Time is required")
    private LocalTime time;

    // Distance and cost
    @NotNull(message = "Distance is required")
    @Min(value = 1, message = "Distance must be at least 1 km")
    private Integer distanceKm;

    private Integer costPerKm; // ₹5 per km
    private Integer totalCost; // distanceKm * costPerKm

    // Seats
    @NotNull(message = "Available seats is required")
    @Min(value = 1, message = "At least 1 seat must be available")
    private Integer availableSeats;

    private Integer totalSeats; // Original seat count

    // Status
    private RideStatus status; // OPEN, FULL, COMPLETED, CANCELLED

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor
    public Ride() {
        this.startLocation = "College";
        this.costPerKm = 5;
        this.status = RideStatus.OPEN;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Calculate total cost
    public void calculateTotalCost() {
        if (this.distanceKm != null && this.costPerKm != null) {
            this.totalCost = this.distanceKm * this.costPerKm;
        }
    }

    // Enum for ride status
    public enum RideStatus {
        OPEN,
        FULL,
        COMPLETED,
        CANCELLED
    }
}