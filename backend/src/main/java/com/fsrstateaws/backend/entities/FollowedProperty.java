package com.fsrstateaws.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@Table(name = "followed_property")
@AllArgsConstructor@NoArgsConstructor
public class FollowedProperty {

    @Id
    @GeneratedValue
    private Long id;
    private Long userId;
    private Long propertyId;
}


