package com.fsrstateaws.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Entity
@Table(
        name = "apartment",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "apartment_image_id_unique",
                        columnNames = "apartmentImageId"
                )
        }
)
@Data
@Builder
@AllArgsConstructor@NoArgsConstructor
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long apartmentId;
    @Column(unique = true)
    private String apartmentImageId;
    private String name;
    private String description;
    private String location;
    private Date uploadDate;
    private Boolean onSale;
    private Integer surface;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double price;
}
