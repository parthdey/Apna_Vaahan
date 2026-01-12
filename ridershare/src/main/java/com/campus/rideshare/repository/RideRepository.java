package com.campus.rideshare.repository;

import com.campus.rideshare.model.Ride;
import com.campus.rideshare.model.Ride.RideStatus;
import com.campus.rideshare.model.User;  // ✅ FIXED THIS LINE
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface RideRepository extends MongoRepository<Ride, String> {

    // Find rides by rider
    List<Ride> findByRider(User rider);

    // Find rides by rider and status
    List<Ride> findByRiderAndStatus(User rider, RideStatus status);

    // Find available rides (OPEN status and future dates)
    List<Ride> findByStatusAndDateGreaterThanEqual(RideStatus status, LocalDate date);

    // Search rides by destination (case-insensitive)
    List<Ride> findByStatusAndEndLocationContainingIgnoreCaseAndDateGreaterThanEqual(
            RideStatus status, String endLocation, LocalDate date);
}