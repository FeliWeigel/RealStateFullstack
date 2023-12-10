package com.fsrstateaws.backend.controller;

import com.fsrstateaws.backend.entities.Apartment;
import com.fsrstateaws.backend.service.ApartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/apartments")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class ApartmentController {

    private final ApartmentService apartmentService;

    @PostMapping("/upload")
    public ResponseEntity<Object> uploadApartment(@RequestBody Apartment apartment){
        return new ResponseEntity<>(apartmentService.uploadApartment(apartment), HttpStatus.OK);

    }
}
