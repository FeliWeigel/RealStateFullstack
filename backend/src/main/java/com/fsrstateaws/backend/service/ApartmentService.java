package com.fsrstateaws.backend.service;

import com.fsrstateaws.backend.entities.Apartment;
import com.fsrstateaws.backend.exceptions.NullFieldsException;
import com.fsrstateaws.backend.repository.ApartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApartmentService {

    private final ApartmentRepository apartmentRepository;

    public Object uploadApartment(Apartment apartment){
        if(apartment.getName().isBlank() || apartment.getOnSale() == null || apartment.getBedrooms() == null ||
                apartment.getBathrooms() == null || apartment.getPrice() == null || apartment.getDescription().isBlank() || apartment.getSurface() == null){
            return new NullFieldsException("The fields cannot be null!");
        }

        var apartmentSave = Apartment.builder()
                .name(apartment.getName())
                .description(apartment.getDescription())
                .bathrooms(apartment.getBathrooms())
                .bedrooms(apartment.getBedrooms())
                .surface(apartment.getSurface())
                .location(apartment.getLocation())
                .onSale(apartment.getOnSale())
                .uploadDate(apartment.getUploadDate())
                .price(apartment.getPrice())
                .build();

        return apartmentRepository.save(apartmentSave);
    }

    public void deleteApartment(Long apartmentId){
        if(apartmentRepository.existsById(apartmentId)){
            apartmentRepository.deleteById(apartmentId);
        }
    }

}
