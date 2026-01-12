package com.campus.rideshare.dto;


import lombok.Data;

@Data
public class PassengerInfo {
    private String id;
    private String name;
    private String phone; // Only visible to rider
    private String rollNumber;
}
