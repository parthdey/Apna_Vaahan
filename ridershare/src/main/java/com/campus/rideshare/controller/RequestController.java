package com.campus.rideshare.controller;

import com.campus.rideshare.dto.*;
import com.campus.rideshare.service.RequestService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @PostMapping
    public ResponseEntity<?> createRequest(@Valid @RequestBody CreateRequestRequest request,
                                           HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Please login first", false));
        }

        try {
            RideRequestResponse response = requestService.createRequest(userId, request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/received")
    public ResponseEntity<?> getReceivedRequests(HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Please login first", false));
        }

        try {
            List<RideRequestResponse> requests = requestService.getReceivedRequests(userId);
            return ResponseEntity.ok(requests);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/sent")
    public ResponseEntity<?> getSentRequests(HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Please login first", false));
        }

        try {
            List<RideRequestResponse> requests = requestService.getMySentRequests(userId);
            return ResponseEntity.ok(requests);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/accepted")
    public ResponseEntity<?> getAcceptedRequests(HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Please login first", false));
        }

        try {
            List<RideRequestResponse> requests = requestService.getAcceptedRequests(userId);
            return ResponseEntity.ok(requests);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<?> acceptRequest(@PathVariable String id, HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Please login first", false));
        }

        try {
            MessageResponse response = requestService.acceptRequest(userId, id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<?> rejectRequest(@PathVariable String id, HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Please login first", false));
        }

        try {
            MessageResponse response = requestService.rejectRequest(userId, id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }
}