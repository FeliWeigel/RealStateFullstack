package com.fsrstateaws.backend.service;

import com.fsrstateaws.backend.entities.Apartment;
import com.fsrstateaws.backend.exceptions.NullFieldsException;
import com.fsrstateaws.backend.repository.ApartmentRepository;
import com.fsrstateaws.backend.s3.S3Buckets;
import com.fsrstateaws.backend.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApartmentService {

    private final ApartmentRepository apartmentRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    public Object uploadApartment(Apartment apartment, MultipartFile file){
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
                .uploadDate(new Date())
                .onSale(apartment.getOnSale())
                .price(apartment.getPrice())
                .build();

        String apartmentImageId = UUID.randomUUID().toString();
        try{
            s3Service.putObject(
                    "apartments-images/%s/%s".formatted(apartmentSave.getApartmentId(), apartmentImageId),
                    s3Buckets.getGlobal(),
                    file.getBytes()
            );
            apartmentSave.setApartmentImageId(apartmentImageId);
            return apartmentRepository.save(apartmentSave);
        }catch (IOException e){
            throw new RuntimeException(e);
        }


    }

    public String uploadApartmentImage(Long apartmentId, MultipartFile file){
        Apartment apartmentSaved = apartmentRepository.findById(apartmentId)
                .orElse(null);

        if(apartmentSaved != null){
            String apartmentImageId = UUID.randomUUID().toString();
            try{
                s3Service.putObject(
                        "apartments-images/%s/%s".formatted(apartmentSaved.getApartmentId(), apartmentImageId),
                        s3Buckets.getGlobal(),
                        file.getBytes()
                );

                return apartmentImageId;
            }catch (IOException e){
                throw new RuntimeException(e);
            }
        }

        return "Object not found.";
    }

    public void deleteApartment(Long apartmentId){
        if(apartmentRepository.existsById(apartmentId)){
            apartmentRepository.deleteById(apartmentId);
        }
    }

    public List<Apartment> getAllApartments(){
        return apartmentRepository.findAll();
    }



}
