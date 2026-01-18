package com.campus.rideshare.service;

import com.campus.rideshare.dto.*;
import com.campus.rideshare.model.Ride;
import com.campus.rideshare.model.RideRequest;
import com.campus.rideshare.model.RideRequest.RequestStatus;
import com.campus.rideshare.model.User;
import com.campus.rideshare.repository.RideRepository;
import com.campus.rideshare.repository.RideRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestService {

    @Autowired
    private RideRequestRepository requestRepository;

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private AuthService authService;

    @Autowired
    private RideService rideService;

    public RideRequestResponse createRequest(String userId, CreateRequestRequest request) {
        User passenger = authService.getUserById(userId);

        Ride ride = rideRepository.findById(request.getRideId())
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        // Check if ride is still open
        if (ride.getStatus() != Ride.RideStatus.OPEN) {
            throw new RuntimeException("This ride is not available");
        }

        // Check if enough seats available
        if (ride.getAvailableSeats() < request.getSeatsRequested()) {
            throw new RuntimeException("Not enough seats available");
        }

        // Check if already requested
        if (requestRepository.existsByRideAndPassenger(ride, passenger)) {
            throw new RuntimeException("You have already requested this ride");
        }

        // Create request
        RideRequest rideRequest = new RideRequest();
        rideRequest.setRide(ride);
        rideRequest.setPassenger(passenger);
        rideRequest.setPassengerDestination(request.getPassengerDestination());
        rideRequest.setSeatsRequested(request.getSeatsRequested());

        RideRequest savedRequest = requestRepository.save(rideRequest);

        return mapToRequestResponse(savedRequest, false, false);
    }

    public List<RideRequestResponse> getReceivedRequests(String userId) {
        User rider = authService.getUserById(userId);

        // Get all rides by this rider
        List<Ride> rides = rideRepository.findByRider(rider);

        // Get all requests for these rides
        List<RideRequest> requests = rides.stream()
                .flatMap(ride -> requestRepository.findByRide(ride).stream())
                .collect(Collectors.toList());

        return requests.stream()
                .map(req -> mapToRequestResponse(req, true, false))
                .collect(Collectors.toList());
    }

    public List<RideRequestResponse> getMySentRequests(String userId) {
        User passenger = authService.getUserById(userId);
        List<RideRequest> requests = requestRepository.findByPassenger(passenger);

        // Filter out requests where ride might be deleted
        return requests.stream()
                .filter(req -> req.getRide() != null) // Skip if ride is null
                .map(req -> mapToRequestResponse(req, false, true))
                .collect(Collectors.toList());
    }

    public MessageResponse acceptRequest(String userId, String requestId) {
        RideRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // Check if user is the rider
        if (!request.getRide().getRider().getId().equals(userId)) {
            throw new RuntimeException("Only the rider can accept requests");
        }

        // Check if request is pending
        if (request.getStatus() != RequestStatus.PENDING) {
            throw new RuntimeException("Request already processed");
        }

        // Check if enough seats available
        if (request.getRide().getAvailableSeats() < request.getSeatsRequested()) {
            throw new RuntimeException("Not enough seats available");
        }

        // Accept request
        request.setStatus(RequestStatus.ACCEPTED);
        request.setRespondedAt(LocalDateTime.now());
        requestRepository.save(request);

        // Reduce available seats
        rideService.reduceAvailableSeats(request.getRide(), request.getSeatsRequested());

        return new MessageResponse("Request accepted successfully", true);
    }

    public MessageResponse rejectRequest(String userId, String requestId) {
        RideRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // Check if user is the rider
        if (!request.getRide().getRider().getId().equals(userId)) {
            throw new RuntimeException("Only the rider can reject requests");
        }

        // Check if request is pending
        if (request.getStatus() != RequestStatus.PENDING) {
            throw new RuntimeException("Request already processed");
        }

        // Reject request
        request.setStatus(RequestStatus.REJECTED);
        request.setRespondedAt(LocalDateTime.now());
        requestRepository.save(request);

        return new MessageResponse("Request rejected", true);
    }

    public List<RideRequestResponse> getAcceptedRequests(String userId) {
        User passenger = authService.getUserById(userId);
        List<RideRequest> requests = requestRepository
                .findByPassengerAndStatus(passenger, RequestStatus.ACCEPTED);

        return requests.stream()
                .map(req -> mapToRequestResponse(req, false, true))
                .collect(Collectors.toList());
    }

    private RideRequestResponse mapToRequestResponse(
            RideRequest request, boolean showPassengerPhone, boolean showRiderPhone) {

        RideRequestResponse response = new RideRequestResponse();
        response.setId(request.getId());

        // Safety check for ride
        if (request.getRide() != null) {
            response.setRideId(request.getRide().getId());
        } else {
            response.setRideId("DELETED"); // Ride was deleted
        }

        response.setPassengerDestination(request.getPassengerDestination());
        response.setSeatsRequested(request.getSeatsRequested());
        response.setStatus(request.getStatus().toString());
        response.setRequestedAt(request.getRequestedAt().toString());

        if (request.getRespondedAt() != null) {
            response.setRespondedAt(request.getRespondedAt().toString());
        }

        // Map passenger info
        PassengerInfo passengerInfo = new PassengerInfo();
        passengerInfo.setId(request.getPassenger().getId());
        passengerInfo.setName(request.getPassenger().getName());
        passengerInfo.setRollNumber(request.getPassenger().getRollNumber());

        if (showPassengerPhone) {
            passengerInfo.setPhone(request.getPassenger().getPhone());
        }

        response.setPassenger(passengerInfo);

        return response;
    }
}