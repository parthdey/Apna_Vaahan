package com.campus.rideshare.controller;

import com.campus.rideshare.dto.*;
import com.campus.rideshare.service.AuthService;
import com.campus.rideshare.service.RideService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.campus.rideshare.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rides")
@CrossOrigin(origins = "*")
public class RideController {

    @Autowired
    private AuthService authService;

    @Autowired
    private RideService rideService;

    @PostMapping
    public ResponseEntity<?> createRide(@Valid @RequestBody CreateRideRequest request,
                                        HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Please login first", false));
        }

        try {
            RideResponse response = rideService.createRide(userId, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllRides(@RequestParam(required = false) String destination) {
        try {
            List<RideResponse> rides;

            if (destination != null && !destination.isEmpty()) {
                rides = rideService.searchRides(destination);
            } else {
                rides = rideService.getAllAvailableRides();
            }

            return ResponseEntity.ok(rides);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/my-rides")
    public ResponseEntity<?> getMyRides(HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Please login first", false));
        }

        try {
            List<RideResponse> rides = rideService.getMyRides(userId);
            return ResponseEntity.ok(rides);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRideById(@PathVariable String id, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        boolean showPhone = userId != null;

        try {
            RideResponse ride = rideService.getRideById(id, showPhone);
            return ResponseEntity.ok(ride);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateRideStatus(@PathVariable String id,
                                              @RequestParam String status,
                                              HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Please login first", false));
        }

        try {
            MessageResponse response = rideService.updateRideStatus(userId, id, status);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }
    @DeleteMapping("/{rideId}")
    public ResponseEntity<?> deleteRide(
            @PathVariable String rideId,
            HttpSession session
    ) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "Please login first"));
        }

        User user = authService.getUserById(userId);

        rideService.deleteRide(rideId, user);

        return ResponseEntity.ok(Map.of("message", "Ride deleted successfully"));
    }


}