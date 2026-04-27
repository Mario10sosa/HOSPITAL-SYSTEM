package com.example.hospitalsystembackend.repository;

import com.example.hospitalsystembackend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByStatus(String status);

    List<Appointment> findByDateTimeBetween(LocalDateTime start, LocalDateTime end);

    long countByStatus(String status);
}
