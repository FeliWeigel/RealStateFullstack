package com.fsrstateaws.backend.repository;

import com.fsrstateaws.backend.entities.FollowedProperty;
import com.fsrstateaws.backend.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface FollowedPropertiesRepository extends JpaRepository<FollowedProperty, Long> {

    @Query(
            value = """
        SELECT fp.property FROM FollowedProperty fp \s
        inner join User u on u.id = fp.user.id \s
        where u.id = :id \s
    """)
    Set<Property> allFollowedPropertiesByUser(Long id);
}
