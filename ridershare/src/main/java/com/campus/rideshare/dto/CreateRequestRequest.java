package com.campus.rideshare.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateRequestRequest {
    @NotBlank(message = "Ride ID is required")
    private String rideId;

    @NotBlank(message = "Destination is required")
    private String passengerDestination;

    @NotNull(message = "Seats requested is required")
    @Min(value = 1, message = "At least 1 seat required")
    private Integer seatsRequested;
}
