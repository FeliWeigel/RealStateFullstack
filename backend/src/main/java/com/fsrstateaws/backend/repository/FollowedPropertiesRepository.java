package com.fsrstateaws.backend.repository;

import com.fsrstateaws.backend.entities.FollowedProperty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowedPropertiesRepository extends JpaRepository<FollowedProperty, Long> {
}
