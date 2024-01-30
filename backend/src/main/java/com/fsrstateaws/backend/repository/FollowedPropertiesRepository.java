package com.fsrstateaws.backend.repository;

import com.fsrstateaws.backend.entities.FollowedProperty;
import com.fsrstateaws.backend.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface FollowedPropertiesRepository extends JpaRepository<FollowedProperty, Long> {

    @Query(
    value = """
        select p from Property p
        join FollowedProperty f_p on f_p.propertyId = p.propertyId
        join User u on u.id = f_p.userId
    """)
    Set<Property> allFollowedPropertiesByUser(Long userId);
}
