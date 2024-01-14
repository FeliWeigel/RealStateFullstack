package com.fsrstateaws.backend.repository;
import com.fsrstateaws.backend.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}
