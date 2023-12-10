package com.fsrstateaws.backend.repository;

import com.fsrstateaws.backend.entities.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
}
