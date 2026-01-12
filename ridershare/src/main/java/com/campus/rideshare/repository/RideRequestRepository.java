package com.campus.rideshare.repository;

import com.campus.rideshare.model.Ride;
import com.campus.rideshare.model.RideRequest;
import com.campus.rideshare.model.RideRequest.RequestStatus;
import com.campus.rideshare.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RideRequestRepository extends MongoRepository<RideRequest, String> {

    // Find requests by ride
    List<RideRequest> findByRide(Ride ride);

    // Find requests by ride and status
    List<RideRequest> findByRideAndStatus(Ride ride, RequestStatus status);

    // Find requests by passenger
    List<RideRequest> findByPassenger(User passenger);

    // Find requests by passenger and status
    List<RideRequest> findByPassengerAndStatus(User passenger, RequestStatus status);

    // Check if passenger already requested this ride
    boolean existsByRideAndPassenger(Ride ride, User passenger);
}