package com.fsrstateaws.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fsrstateaws.backend.user.User;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    @JsonIgnore
    private Property property;
}


