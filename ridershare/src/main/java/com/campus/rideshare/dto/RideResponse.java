package com.campus.rideshare.dto;

import lombok.Data;

@Data
public class RideResponse {
    private String id;
    private RiderInfo rider;
    private String startLocation;
    private String endLocation;
    private String date;
    private String time;
    private Integer distanceKm;
    private Integer totalCost;
    private Integer availableSeats;
    private Integer totalSeats;
    private String status;
    private String createdAt;
}
