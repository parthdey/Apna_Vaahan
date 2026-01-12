package com.campus.rideshare.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Data
@Document(collection = "ride_requests")
public class RideRequest {

    @Id
    private String id;

    // References
    @DBRef
    @NotNull(message = "Ride is required")
    private Ride ride;

    @DBRef
    @NotNull(message = "Passenger is required")
    private User passenger;

    // Passenger's exact destination
    @NotBlank(message = "Passenger destination is required")
    private String passengerDestination;

    // Number of seats requested
    @NotNull(message = "Seats requested is required")
    private Integer seatsRequested;

    // Status
    private RequestStatus status; // PENDING, ACCEPTED, REJECTED

    // Timestamps
    private LocalDateTime requestedAt;
    private LocalDateTime respondedAt;

    // Constructor
    public RideRequest() {
        this.status = RequestStatus.PENDING;
        this.requestedAt = LocalDateTime.now();
    }

    // Enum for request status
    public enum RequestStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }
}