package com.campus.rideshare.service;

import com.campus.rideshare.dto.*;
import com.campus.rideshare.model.Ride;
import com.campus.rideshare.model.Ride.RideStatus;
import com.campus.rideshare.model.User;
import com.campus.rideshare.repository.RideRepository;  // ✅ ADD THIS LINE
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private AuthService authService;

    public void deleteRide(String rideId, User user) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));


        if (!ride.getRider().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to delete this ride");
        }

        rideRepository.delete(ride);
    }


    public RideResponse createRide(String userId, CreateRideRequest request) {
        User rider = authService.getUserById(userId);

        // Check if user is a rider
        if (!rider.isRider()) {
            throw new RuntimeException("Only riders can create rides");
        }

        Ride ride = new Ride();
        ride.setRider(rider);
        ride.setEndLocation(request.getEndLocation());
        ride.setDate(LocalDate.parse(request.getDate()));
        ride.setTime(LocalTime.parse(request.getTime()));
        ride.setDistanceKm(request.getDistanceKm());
        ride.setAvailableSeats(request.getAvailableSeats());
        ride.setTotalSeats(request.getAvailableSeats());
        ride.calculateTotalCost();

        Ride savedRide = rideRepository.save(ride);

        return mapToRideResponse(savedRide, false);
    }

    public List<RideResponse> getAllAvailableRides() {
        LocalDate today = LocalDate.now();
        List<Ride> rides = rideRepository
                .findByStatusAndDateGreaterThanEqual(RideStatus.OPEN, today);

        return rides.stream()
                .map(ride -> mapToRideResponse(ride, false))
                .collect(Collectors.toList());
    }

    public List<RideResponse> searchRides(String destination) {
        LocalDate today = LocalDate.now();
        List<Ride> rides = rideRepository
                .findByStatusAndEndLocationContainingIgnoreCaseAndDateGreaterThanEqual(
                        RideStatus.OPEN, destination, today);

        return rides.stream()
                .map(ride -> mapToRideResponse(ride, false))
                .collect(Collectors.toList());
    }

    public List<RideResponse> getMyRides(String userId) {
        User rider = authService.getUserById(userId);
        List<Ride> rides = rideRepository.findByRider(rider);

        return rides.stream()
                .map(ride -> mapToRideResponse(ride, true))
                .collect(Collectors.toList());
    }

    public RideResponse getRideById(String rideId, boolean showPhone) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        return mapToRideResponse(ride, showPhone);
    }

    public MessageResponse updateRideStatus(String userId, String rideId, String status) {
        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        // Check if user is the rider
        if (!ride.getRider().getId().equals(userId)) {
            throw new RuntimeException("Only the rider can update ride status");
        }

        ride.setStatus(RideStatus.valueOf(status));
        rideRepository.save(ride);

        return new MessageResponse("Ride status updated successfully", true);
    }

    public void reduceAvailableSeats(Ride ride, int seats) {
        ride.setAvailableSeats(ride.getAvailableSeats() - seats);
        if (ride.getAvailableSeats() <= 0) {
            ride.setStatus(RideStatus.FULL);
        }
        rideRepository.save(ride);
    }

    private RideResponse mapToRideResponse(Ride ride, boolean showPhone) {
        RideResponse response = new RideResponse();
        response.setId(ride.getId());
        response.setStartLocation(ride.getStartLocation());
        response.setEndLocation(ride.getEndLocation());
        response.setDate(ride.getDate().toString());
        response.setTime(ride.getTime().format(DateTimeFormatter.ofPattern("HH:mm")));
        response.setDistanceKm(ride.getDistanceKm());
        response.setTotalCost(ride.getTotalCost());
        response.setAvailableSeats(ride.getAvailableSeats());
        response.setTotalSeats(ride.getTotalSeats());
        response.setStatus(ride.getStatus().toString());
        response.setCreatedAt(ride.getCreatedAt().toString());

        // Map rider info
        RiderInfo riderInfo = new RiderInfo();
        riderInfo.setId(ride.getRider().getId());
        riderInfo.setName(ride.getRider().getName());
        riderInfo.setVehicleType(ride.getRider().getVehicleType());
        riderInfo.setVehicleNumber(ride.getRider().getVehicleNumber());
        riderInfo.setVehicleModel(ride.getRider().getVehicleModel());

        // Only show phone if authorized
        if (showPhone) {
            riderInfo.setPhone(ride.getRider().getPhone());
        }

        response.setRider(riderInfo);

        return response;
    }
}