package com.fsrstateaws.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "house")
@Builder
@Data
@AllArgsConstructor@NoArgsConstructor
public class House {

    @Id
    @GeneratedValue
    private Long houseId;
    private Boolean hasPool;
    private Integer floors;
    private String name;
    private String description;
    private String location;
    private LocalDate uploadDate;
    private Boolean onSale;
    private Integer surface;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double price;
}