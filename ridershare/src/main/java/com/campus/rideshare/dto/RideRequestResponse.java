package com.campus.rideshare.dto;

import lombok.Data;

//@Data
//public class RideRequestResponse {
//    private String id;
//    private String rideId;
//    private PassengerInfo passenger;
//    private String passengerDestination;
//    private Integer seatsRequested;
//    private String status;
//    private String requestedAt;
//    private String respondedAt;
//}

@Data
public class RideRequestResponse {
    private String id;
    private String rideId;

    // Ride details
    private String rideStartLocation;
    private String rideEndLocation;
    private String rideDate;
    private String rideTime;
    private Integer rideDistance;
    private Integer rideCost;

    // Rider details
    private String riderName;
    private String riderPhone; // Only shown if accepted
    private String riderVehicleModel;
    private String riderVehicleNumber;

    // Request details
    private PassengerInfo passenger;
    private String passengerDestination;
    private Integer seatsRequested;
    private String status;
    private String requestedAt;
    private String respondedAt;
}
