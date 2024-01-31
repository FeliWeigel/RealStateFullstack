package com.fsrstateaws.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fsrstateaws.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.Set;


@Entity
@Table(
        name = "property",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "property_image_id_unique",
                        columnNames = "propertyImageId"
                )
        }
)
@Builder
@Data
@AllArgsConstructor@NoArgsConstructor
public class Property{
    @Id
    @GeneratedValue
    private Long propertyId;

    @Column(unique = true)
    private String propertyImageId;
    private Boolean hasPool;
    private Integer floors;
    private String name;
    private String description;
    private String location;
    private Date uploadDate = new Date();
    private Boolean onSale;
    private Integer surface;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double price;
    private PropertyType type;

    @OneToMany(mappedBy = "property")
    @JsonIgnore
    private Set<FollowedProperty> followedProperties;

}