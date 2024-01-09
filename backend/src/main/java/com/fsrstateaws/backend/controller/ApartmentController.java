package com.fsrstateaws.backend.controller;

import com.fsrstateaws.backend.entities.Apartment;
import com.fsrstateaws.backend.repository.ApartmentRepository;
import com.fsrstateaws.backend.service.ApartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/apartments")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
public class ApartmentController {

    private final ApartmentService apartmentService;
    private final ApartmentRepository apartmentRepository;

    @PostMapping(
            value = "/upload"
            //consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Object> uploadApartment(@RequestPart("file") MultipartFile file,
                                                  @RequestPart("apartment") Apartment apartment){
        return new ResponseEntity<>(apartmentService.uploadApartment(apartment, file), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Apartment>> allApartments(){
        return new ResponseEntity<>(apartmentRepository.findAll(), HttpStatus.OK);
    }
}
