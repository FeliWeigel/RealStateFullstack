package com.fsrstateaws.backend.controller;

import com.fsrstateaws.backend.entities.Apartment;
import com.fsrstateaws.backend.entities.House;
import com.fsrstateaws.backend.service.HouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/houses")
@RequiredArgsConstructor
public class HouseController {

    private final HouseService houseService;

    @PostMapping("/upload")
    public ResponseEntity<Object> uploadApartment(@RequestBody House house){
        return houseService.uploadHouse(house);
    }
}
