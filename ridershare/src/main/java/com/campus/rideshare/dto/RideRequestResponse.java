package com.campus.rideshare.dto;

import lombok.Data;

@Data
public class RideRequestResponse {
    private String id;
    private String rideId;
    private PassengerInfo passenger;
    private String passengerDestination;
    private Integer seatsRequested;
    private String status;
    private String requestedAt;
    private String respondedAt;
}
