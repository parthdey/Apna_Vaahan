package com.campus.rideshare.service;

import com.campus.rideshare.dto.*;
import com.campus.rideshare.model.User;
import com.campus.rideshare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse signup(SignupRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Check if roll number already exists
        if (userRepository.existsByRollNumber(request.getRollNumber())) {
            throw new RuntimeException("Roll number already registered");
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRollNumber(request.getRollNumber());

        // IMPORTANT: Set isRider - default to true if not specified
        Boolean isRiderValue = request.getIsRider();
//        user.setRider(isRiderValue != null ? isRiderValue : true);
        user.setRider(isRiderValue != null ? isRiderValue : false);

        // Always set vehicle details if provided
//        if (request.getVehicleNumber() != null && !request.getVehicleNumber().isEmpty()) {
//            user.setRider(true); // If vehicle details provided, must be rider
//            user.setVehicleType("Two Wheeler");
//            user.setVehicleNumber(request.getVehicleNumber());
//            user.setVehicleModel(request.getVehicleModel());
//        }
        if (Boolean.TRUE.equals(request.getIsRider())) {
            user.setRider(true);
            user.setVehicleType("Two Wheeler");
            user.setVehicleNumber(request.getVehicleNumber());
            user.setVehicleModel(request.getVehicleModel());
        } else {
            user.setRider(false);
        }


        User savedUser = userRepository.save(user);

        return mapToAuthResponse(savedUser, "Registration successful!");
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return mapToAuthResponse(user, "Login successful!");
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private AuthResponse mapToAuthResponse(User user, String message) {
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
        response.setMessage(message);
        return response;
    }
}