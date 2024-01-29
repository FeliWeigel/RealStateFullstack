package com.fsrstateaws.backend.controller;

import com.fsrstateaws.backend.entities.EmailRequest;
import com.fsrstateaws.backend.entities.OperationRegister;
import com.fsrstateaws.backend.service.OperationService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/operations")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class OperationController {

    private final OperationService operationService;

    @PostMapping("/new/{propertyId}")
    public ResponseEntity<Object> newOperation(
            @RequestBody EmailRequest emailRequest,
            @PathVariable Long propertyId,
            @RequestHeader(name = "Authorization") String authorizationHeader
    ) throws MessagingException {
        String userToken = extractToken(authorizationHeader);
        return operationService.registerOperation(emailRequest, propertyId, userToken);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OperationRegister>> getAllOperations(){
        return new ResponseEntity<>(operationService.getAllOperationRegisters(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    public void deleteAllOperations(){
        operationService.deleteAllRegisters();
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
