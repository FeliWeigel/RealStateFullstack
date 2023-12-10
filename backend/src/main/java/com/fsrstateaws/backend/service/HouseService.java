package com.fsrstateaws.backend.service;

import com.fsrstateaws.backend.entities.House;
import com.fsrstateaws.backend.exceptions.NullFieldsException;
import com.fsrstateaws.backend.repository.HouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HouseService {

    private final HouseRepository houseRepository;

    public ResponseEntity<Object> uploadHouse(House house){
        if(house.getName().isBlank() || house.getOnSale() == null || house.getBedrooms() == null ||
                house.getBathrooms() == null || house.getPrice() == null || house.getDescription().isBlank() || house.getSurface() == null ||
                    house.getHasPool() == null || house.getFloors() == null || house.getLocation().isBlank() || house.getUploadDate() == null
        ){
            return new ResponseEntity<>(new NullFieldsException("The fields cannot be null!"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(houseRepository.save(house), HttpStatus.OK);
    }

    public void deleteHouse(Long houseId){
        if(houseRepository.existsById(houseId)){
            houseRepository.deleteById(houseId);
        }
    }
}
