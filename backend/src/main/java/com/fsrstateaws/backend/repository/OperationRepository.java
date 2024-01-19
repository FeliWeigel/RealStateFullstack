package com.fsrstateaws.backend.repository;

import com.fsrstateaws.backend.entities.OperationRegister;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationRepository extends JpaRepository<OperationRegister, Long> {
}
