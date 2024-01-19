package com.fsrstateaws.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "operation")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OperationRegister {

    @Id
    @GeneratedValue
    private Long id;

    private Long userId;
    private String userFirstname;
    private String userLastname;
    private String userEmail;
    private Long propertyId;
    private String propertyName;

    @Enumerated(EnumType.STRING)
    private OperationType type;
    private String description;
}
