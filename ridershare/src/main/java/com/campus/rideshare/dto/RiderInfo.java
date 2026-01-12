package com.campus.rideshare.dto;

import lombok.Data;

@Data
public class RiderInfo {
    private String id;
    private String name;
    private String phone; // Only visible to accepted passengers
    private String vehicleType;
    private String vehicleNumber;
    private String vehicleModel;
}
