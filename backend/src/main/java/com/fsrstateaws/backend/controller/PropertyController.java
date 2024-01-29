package com.fsrstateaws.backend.controller;

import com.fsrstateaws.backend.entities.Property;
import com.fsrstateaws.backend.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/properties")
@CrossOrigin("http://localhost:5173")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping("/upload")
    public ResponseEntity<Object> uploadProperty(@RequestBody Property property){
        return propertyService.uploadProperty(property);
    }

    @PostMapping(
            value = "/upload/upload-image/{propertyId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Object> uploadPropertyImage(@RequestParam("file") MultipartFile file, @PathVariable Long propertyId){
        return new ResponseEntity<>(propertyService.uploadPropertyImage(propertyId, file), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Property>> allProperties(){
        return new ResponseEntity<>(propertyService.getAllProperties(), HttpStatus.OK);
    }

    @GetMapping("/details/{propertyId}")
    public ResponseEntity<Property> propertyDetails(@PathVariable Long propertyId){
        return new ResponseEntity<>(propertyService.getPropertyDetails(propertyId), HttpStatus.OK);
    }

    @GetMapping(
            value = "/all/{propertyId}/file",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public ResponseEntity<byte[]> propertyImage(@PathVariable Long propertyId){
        return new ResponseEntity<>(propertyService.getPropertyImage(propertyId), HttpStatus.OK);
    }

    @GetMapping(
            value = "/all/{propertyId}/all-files"
    )
    public ResponseEntity<List<String>> allImagesByProperty(@PathVariable Long propertyId){
        return new ResponseEntity<>(propertyService.getAllImagesByProperty(propertyId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{propertyId}")
    public ResponseEntity<Object> deleteProperty(@PathVariable Long propertyId){
        return new ResponseEntity<>(propertyService.deleteProperty(propertyId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        propertyService.deleteAllProperties();
    }

    @PostMapping("/favorites/add/{propertyId}")
    public ResponseEntity<Object> addPropertyToFavorite(
            @PathVariable Long propertyId,
            @RequestHeader(name = "Authorization") String authHeader
    ){
        String token = extractToken(authHeader);
        return propertyService.followProperty(token, propertyId);
    }

    @GetMapping("/favorites/all")
    public ResponseEntity<Object> allFavoritesByUser(@RequestHeader(name = "Authorization") String authHeader){
        String token = extractToken(authHeader);
        return propertyService.getFollowedProperties(token);
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
