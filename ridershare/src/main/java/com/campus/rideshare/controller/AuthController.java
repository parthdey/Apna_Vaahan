package com.campus.rideshare.controller;

import com.campus.rideshare.dto.*;
import com.campus.rideshare.service.AuthService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request,
                                    HttpSession session) {
        try {
            AuthResponse response = authService.signup(request);
            // Store user ID in session
            session.setAttribute("userId", response.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request,
                                   HttpSession session) {
        try {
            AuthResponse response = authService.login(request);
            // Store user ID in session
            session.setAttribute("userId", response.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401)
                    .body(new MessageResponse("Not authenticated", false));
        }

        try {
            var user = authService.getUserById(userId);
            AuthResponse response = new AuthResponse();
            response.setId(user.getId());
            response.setName(user.getName());
            response.setEmail(user.getEmail());
            response.setPhone(user.getPhone());
            response.setRollNumber(user.getRollNumber());
            response.setRider(user.isRider());
            response.setVehicleType(user.getVehicleType());
            response.setVehicleNumber(user.getVehicleNumber());
            response.setVehicleModel(user.getVehicleModel());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new MessageResponse("Logged out successfully", true));
    }
}