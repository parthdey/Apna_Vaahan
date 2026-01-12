package com.campus.rideshare.dto;

import lombok.Data;


@Data
public class AuthResponse {
    private String id;
    private String name;
    private String email;
    private String phone;
    private String rollNumber;
    private boolean isRider;
    private String vehicleType;
    private String vehicleNumber;
    private String vehicleModel;
    private String message;
}
