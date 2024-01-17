package com.fsrstateaws.backend.entities;

import com.fsrstateaws.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(
        name = "operation_register"
)
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OperationRegister {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    private OperationType type;
}
